import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Image as ImageIcon,
  Check,
  X,
  BookOpen,
  Edit3
} from 'lucide-react';
import { ExamHeader, GenerateExamRequest, AnyQuestion } from '../types/exam';
import { getCurriculumTopics } from '../utils/curriculumTopics';

interface AIGeneratorModalProps {
  header: ExamHeader;
  onApplyQuestions: (newQuestions: AnyQuestion[], generatedMateri?: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  header,
  onApplyQuestions,
  onClose,
  isOpen
}) => {
  const [materiPokok, setMateriPokok] = useState(header.materiPokok || '');
  const [capaianPembelajaran, setCapaianPembelajaran] = useState('');
  const [tingkatKesulitan, setTingkatKesulitan] = useState<'Mudah' | 'Sedang' | 'HOTS / Analisis Kognitif'>('Sedang');
  const [sertakanGambar, setSertakanGambar] = useState(true);

  // Sync with header.materiPokok when opened
  useEffect(() => {
    if (header.materiPokok) {
      setMateriPokok(header.materiPokok);
    }
  }, [header.materiPokok, isOpen]);

  const availableTopics = useMemo(() => {
    return getCurriculumTopics(header.mataPelajaran, header.kelas);
  }, [header.mataPelajaran, header.kelas]);

  // Exact 5 question types requested
  const [jumlahPG, setJumlahPG] = useState(2);
  const [jumlahPGK, setJumlahPGK] = useState(2);
  const [jumlahKategori, setJumlahKategori] = useState(1);
  const [jumlahIsian, setJumlahIsian] = useState(2);
  const [jumlahUraian, setJumlahUraian] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalQuestions =
    Number(jumlahPG) +
    Number(jumlahPGK) +
    Number(jumlahKategori) +
    Number(jumlahIsian) +
    Number(jumlahUraian);

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessInfo(null);

    const payload: GenerateExamRequest = {
      kelas: header.kelas,
      mataPelajaran: header.mataPelajaran,
      jenisAsesmen: header.jenisAsesmen,
      materiPokok: materiPokok || header.materiPokok,
      capaianPembelajaran,
      tingkatKesulitan,
      sertakanGambar,
      jumlahSoal: {
        pilihanGanda: Number(jumlahPG),
        pilihanGandaKompleks: Number(jumlahPGK),
        pilihanGandaKategori: Number(jumlahKategori),
        isian: Number(jumlahIsian),
        uraian: Number(jumlahUraian)
      }
    };

    try {
      const response = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Terjadi gangguan saat menyusun soal dengan AI.');
      }

      const generatedList: AnyQuestion[] = data.questions;
      if (!generatedList || generatedList.length === 0) {
        throw new Error('AI tidak mengembalikan butir soal. Silakan coba kembali.');
      }

      const infoMsg = data.isBackup
        ? `Berhasil menyusun ${generatedList.length} butir soal sumatif lengkap dengan stimulus foto realistis!`
        : `Berhasil menyusun ${generatedList.length} butir soal sumatif dengan AI Gemini & foto realistis!`;
      setSuccessInfo(infoMsg);
      setTimeout(() => {
        onApplyQuestions(generatedList, data.materiPokokDisusun);
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      let msg = err.message || 'Gagal menghubungi asisten AI penyusun soal.';
      if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('high demand')) {
        msg = 'Layanan AI pusat sedang mengalami lonjakan antrean sesaat (503). Silakan klik "Susun Naskah Soal Sekarang" sekali lagi.';
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Penyusun Soal Otomatis (Gemini AI)
              </h2>
              <p className="text-xs text-blue-100">
                Menyusun kisi-kisi dan butir soal Kurikulum Merdeka untuk {header.mataPelajaran} Kelas {header.kelas}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Target Info Badge */}
          <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <span className="font-semibold text-slate-700">Target Kurikulum:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-medium">
              Kelas {header.kelas} SD ({header.fase})
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md font-medium">
              {header.mataPelajaran}
            </span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-medium">
              {header.jenisAsesmen}
            </span>
          </div>

          {/* Section Materi Pokok: Pilihan Kurikulum Merdeka + Kolom Isian Manual */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Topik Pokok / Bab / Materi Pembelajaran *
                </h4>
                <p className="text-[11px] text-slate-500">
                  Pilih bab Kurikulum Merdeka di bawah, ATAU isi/ketik materi pokok secara manual pada kolom isian.
                </p>
              </div>
              <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-semibold border border-blue-200 inline-flex items-center gap-1 self-start sm:self-auto shrink-0">
                <Sparkles className="w-3 h-3 text-blue-600" />
                {header.mataPelajaran} • Kelas {header.kelas} SD
              </span>
            </div>

            {/* Bagian 1: Pilihan Bab Kurikulum Merdeka (Otomatis) */}
            <div className="bg-blue-50/40 border border-blue-200/80 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. Pilihan Bab Resmi Kurikulum Merdeka:</span>
                </label>
                <span className="text-[10px] text-blue-600 font-medium bg-blue-100/60 px-1.5 py-0.5 rounded">
                  {availableTopics.length} Bab Tersedia
                </span>
              </div>

              {/* Dropdown Bab Kurikulum Merdeka */}
              <div className="flex items-center gap-2">
                <select
                  value={availableTopics.some((t) => t.title === materiPokok) ? materiPokok : ''}
                  onChange={(e) => {
                    const selectedTitle = e.target.value;
                    if (selectedTitle) {
                      setMateriPokok(selectedTitle);
                      const matched = availableTopics.find((t) => t.title === selectedTitle);
                      if (matched && matched.subtopics && matched.subtopics.length > 0 && !capaianPembelajaran) {
                        setCapaianPembelajaran(`Peserta didik mampu memahami dan menganalisis ${matched.subtopics.join(', ')}.`);
                      }
                    }
                  }}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-blue-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden cursor-pointer"
                >
                  <option value="">
                    -- 📌 Klik di sini untuk memilih bab ({header.mataPelajaran} Kelas {header.kelas}) --
                  </option>
                  <optgroup label={`Semester 1 (Ganjil) - ${header.mataPelajaran} Kelas ${header.kelas}`}>
                    {availableTopics
                      .filter((t) => t.semester === 1)
                      .map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={`Semester 2 (Genap) - ${header.mataPelajaran} Kelas ${header.kelas}`}>
                    {availableTopics
                      .filter((t) => t.semester === 2)
                      .map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>

              {/* Quick-Pick Topic Chips */}
              {availableTopics.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="text-[11px] text-slate-600 font-medium">
                    Atau klik tombol bab di bawah ini:
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-white rounded-lg border border-blue-100">
                    {availableTopics.map((topic) => {
                      const isSelected = materiPokok === topic.title;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => {
                            setMateriPokok(topic.title);
                            if (topic.subtopics && topic.subtopics.length > 0 && !capaianPembelajaran) {
                              setCapaianPembelajaran(`Peserta didik mampu memahami dan menganalisis ${topic.subtopics.join(', ')}.`);
                            }
                          }}
                          className={`text-left text-xs px-2.5 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-700 shadow-xs font-semibold ring-1 ring-blue-500'
                              : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <span
                            className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                              isSelected ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            Smt {topic.semester}
                          </span>
                          <span className="truncate max-w-[260px] sm:max-w-none">{topic.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-200 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bagian 2: Kolom Isian Manual Materi Pokok */}
            <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                  <span>2. Kolom Isian Manual Materi Pokok (Bisa Diisi / Diketik Bebas):</span>
                </label>
                {materiPokok && (
                  <button
                    type="button"
                    onClick={() => setMateriPokok('')}
                    className="text-[11px] text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                  >
                    Kosongkan Kolom
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <input
                  type="text"
                  list="ai-curriculum-topics-datalist"
                  value={materiPokok}
                  onChange={(e) => setMateriPokok(e.target.value)}
                  placeholder="Ketik topik materi secara manual di sini (Contoh: Bab 1: Fotosintesis & Rantai Makanan Sawah, atau Topik Gabungan Bab 1 dan Bab 2)..."
                  className="w-full text-xs sm:text-sm p-3 rounded-lg border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden font-medium text-slate-900 shadow-2xs"
                />
                <datalist id="ai-curriculum-topics-datalist">
                  {availableTopics.map((t) => (
                    <option key={t.id} value={t.title} />
                  ))}
                </datalist>

                <div className="text-[11px] text-slate-600 flex items-center justify-between">
                  <span>
                    💡 <em>AI akan menyusun soal sesuai dengan teks pada kolom manual ini.</em>
                  </span>
                  <span className="font-semibold text-slate-500 shrink-0">
                    {materiPokok.length} karakter
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form CP/TP (Opsional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tujuan Pembelajaran (TP) / Capaian Pembelajaran (Opsional)
            </label>
            <textarea
              rows={2}
              value={capaianPembelajaran}
              onChange={(e) => setCapaianPembelajaran(e.target.value)}
              placeholder="Contoh: Peserta didik mampu menganalisis peran produsen dan konsumen serta mengidentifikasi faktor fotosintesis"
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
            />
          </div>

          {/* Tingkat Kesulitan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Kognitif / Kesulitan
              </label>
              <select
                value={tingkatKesulitan}
                onChange={(e) => setTingkatKesulitan(e.target.value as any)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-blue-500 outline-hidden"
              >
                <option value="Mudah">Mudah (Pemahaman Dasar / LOTS)</option>
                <option value="Sedang">Sedang (Penerapan & Pemecahan Masalah / MOTS)</option>
                <option value="HOTS / Analisis Kognitif">Tinggi (Penalaran Kritis & Analisis / HOTS)</option>
              </select>
            </div>

            {/* Stimulus Gambar Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stimulus Gambar Soal
              </label>
              <label className="flex items-center gap-2 p-2.5 border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/70 rounded-xl transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={sertakanGambar}
                  onChange={(e) => setSertakanGambar(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                  📸 Sertakan Foto Realistis (HD Real)
                </span>
              </label>
            </div>
          </div>
          <p className="text-[11px] text-emerald-800 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-200">
            ✨ <strong>Foto Realistis Diaktifkan:</strong> Soal akan dilengkapi gambar nyata beresolusi tinggi (ekosistem sawah alami, daur air pegunungan, anatomi 3D, magnet, tata surya, model bangun ruang, atau gotong royong).
          </p>

          {/* Komposisi 5 Jenis Soal */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Tentukan Jumlah Soal Berdasarkan Jenis (Total: {totalQuestions} Butir)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 1. PG */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">1. Pilihan Ganda (PG)</div>
                  <div className="text-[11px] text-slate-500">Pilihan A, B, C (atau D)</div>
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={jumlahPG}
                  onChange={(e) => setJumlahPG(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-14 text-center font-bold text-sm p-1.5 border border-slate-300 rounded-lg"
                />
              </div>

              {/* 2. PG Kompleks */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">2. PG Kompleks</div>
                  <div className="text-[11px] text-slate-500">3 pilihan, &gt;1 jawaban benar</div>
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={jumlahPGK}
                  onChange={(e) => setJumlahPGK(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-14 text-center font-bold text-sm p-1.5 border border-slate-300 rounded-lg"
                />
              </div>

              {/* 3. PGK Kategori */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">3. PGK Kategori (Benar/Salah)</div>
                  <div className="text-[11px] text-slate-500">3 deskripsi respons Benar/Salah</div>
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={jumlahKategori}
                  onChange={(e) => setJumlahKategori(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-14 text-center font-bold text-sm p-1.5 border border-slate-300 rounded-lg"
                />
              </div>

              {/* 4. Isian Singkat */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">4. Isian Singkat</div>
                  <div className="text-[11px] text-slate-500">Jawaban kata/angka singkat</div>
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={jumlahIsian}
                  onChange={(e) => setJumlahIsian(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-14 text-center font-bold text-sm p-1.5 border border-slate-300 rounded-lg"
                />
              </div>

              {/* 5. Uraian */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between sm:col-span-2">
                <div>
                  <div className="text-xs font-bold text-slate-800">5. Uraian / Essay</div>
                  <div className="text-[11px] text-slate-500">Pertanyaan penjelasan mendalam + rubrik penskoran</div>
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={jumlahUraian}
                  onChange={(e) => setJumlahUraian(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-14 text-center font-bold text-sm p-1.5 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successInfo && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{successInfo}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || totalQuestions === 0}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>AI Sedang Menyusun Soal &amp; Kunci...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Susun {totalQuestions} Soal Otomatis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
