import React, { useMemo } from 'react';
import { ExamHeader, SDGrade, Semester, SubjectName, AssessmentType } from '../types/exam';
import { School, User, Calendar, BookOpen, Clock, ListChecks, Plus, Trash2, Sparkles, CheckCircle2, Edit3, FileEdit } from 'lucide-react';
import { getCurriculumTopics } from '../utils/curriculumTopics';

interface ExamHeaderFormProps {
  header: ExamHeader;
  onChange: (updatedHeader: ExamHeader) => void;
  onGoToAiGenerator: () => void;
  onGoToQuestions?: () => void;
}

const SD_SUBJECTS: SubjectName[] = [
  'Pendidikan Pancasila',
  'Bahasa Indonesia',
  'Matematika',
  'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
  'Pendidikan Agama Islam dan Budi Pekerti',
  'Bahasa Inggris',
  'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
  'Seni Rupa',
  'Seni Musik',
  'Seni Teater',
  'Seni Tari',
  'Bahasa Daerah / Muatan Lokal',
  'Koding dan Kecerdasan Digital',
  'Lainnya'
];

const ASSESSMENT_TYPES: AssessmentType[] = [
  'Asesmen Sumatif Lingkup Materi',
  'Asesmen Sumatif Tengah Semester (STS)',
  'Asesmen Sumatif Akhir Semester (SAS)',
  'Asesmen Sumatif Akhir Tahun (SAT)',
  'Ujian Sekolah / Asesmen Akhir Jenjang SD'
];

export const ExamHeaderForm: React.FC<ExamHeaderFormProps> = ({
  header,
  onChange,
  onGoToAiGenerator,
  onGoToQuestions
}) => {
  const availableTopics = useMemo(() => {
    return getCurriculumTopics(header.mataPelajaran, header.kelas);
  }, [header.mataPelajaran, header.kelas]);

  const updateField = (field: keyof ExamHeader, value: any) => {
    const updated = { ...header, [field]: value };

    // Auto calculate Fase based on Kelas
    if (field === 'kelas') {
      const kelasNum = Number(value) as SDGrade;
      if (kelasNum <= 2) updated.fase = 'Fase A';
      else if (kelasNum <= 4) updated.fase = 'Fase B';
      else updated.fase = 'Fase C';
    }

    onChange(updated);
  };

  const handleAddPetunjuk = () => {
    const updated = [...header.petunjukUmum, 'Petunjuk baru pengerjaan soal.'];
    onChange({ ...header, petunjukUmum: updated });
  };

  const handleUpdatePetunjuk = (index: number, text: string) => {
    const updated = [...header.petunjukUmum];
    updated[index] = text;
    onChange({ ...header, petunjukUmum: updated });
  };

  const handleDeletePetunjuk = (index: number) => {
    const updated = header.petunjukUmum.filter((_, i) => i !== index);
    onChange({ ...header, petunjukUmum: updated });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Identitas Satuan Pendidikan &amp; Kop Asesmen Sumatif
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Data yang Anda masukkan di sini akan otomatis diformat menjadi KOP Surat resmi ujian sekolah standar Kemendikbudristek dan disematkan langsung pada berkas Microsoft Word (.docx).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri: Data Sekolah & Kurikulum */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <School className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Satuan Pendidikan</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dinas Pendidikan / Yayasan (Kop Atas)
            </label>
            <textarea
              rows={2}
              value={header.dinasPendidikan}
              onChange={(e) => updateField('dinasPendidikan', e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-mono"
              placeholder="Contoh: PEMERINTAH KABUPATEN BOGOR&#10;DINAS PENDIDIKAN"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Sekolah Dasar (SD)
            </label>
            <input
              type="text"
              value={header.namaSekolah}
              onChange={(e) => updateField('namaSekolah', e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-semibold"
              placeholder="Contoh: SD NEGERI 01 TELADAN"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Lengkap Sekolah (Baris Miring Kop)
            </label>
            <input
              type="text"
              value={header.alamatSekolah}
              onChange={(e) => updateField('alamatSekolah', e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
              placeholder="Contoh: Jl. Pendidikan No. 10, Desa Sukamaju, Kec. Cemerlang"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tahun Ajaran
              </label>
              <input
                type="text"
                value={header.tahunPelajaran}
                onChange={(e) => updateField('tahunPelajaran', e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                placeholder="2024/2025"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester
              </label>
              <select
                value={header.semester}
                onChange={(e) => updateField('semester', e.target.value as Semester)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden bg-white"
              >
                <option value="1 (Ganjil)">1 (Ganjil)</option>
                <option value="2 (Genap)">2 (Genap)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Kelas & Mata Pelajaran */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">Mata Pelajaran &amp; Jenjang Kelas</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jenis Asesmen
            </label>
            <select
              value={header.jenisAsesmen}
              onChange={(e) => updateField('jenisAsesmen', e.target.value as AssessmentType)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden bg-white font-medium"
            >
              {ASSESSMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mata Pelajaran SD
            </label>
            <select
              value={header.mataPelajaran}
              onChange={(e) => updateField('mataPelajaran', e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden bg-white font-semibold text-blue-900"
            >
              {SD_SUBJECTS.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Kelas SD
              </label>
              <select
                value={header.kelas}
                onChange={(e) => updateField('kelas', Number(e.target.value) as SDGrade)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden bg-white font-bold text-slate-800"
              >
                <option value={1}>Kelas 1 SD (Fase A)</option>
                <option value={2}>Kelas 2 SD (Fase A)</option>
                <option value={3}>Kelas 3 SD (Fase B)</option>
                <option value={4}>Kelas 4 SD (Fase B)</option>
                <option value={5}>Kelas 5 SD (Fase C)</option>
                <option value={6}>Kelas 6 SD (Fase C)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fase Kurikulum
              </label>
              <input
                type="text"
                readOnly
                value={header.fase}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-600 font-semibold cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alokasi Waktu
              </label>
              <input
                type="text"
                value={header.alokasiWaktu}
                onChange={(e) => updateField('alokasiWaktu', e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                placeholder="Contoh: 90 Menit"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hari, Tanggal Pelaksanaan
              </label>
              <input
                type="text"
                value={header.tanggalPelaksanaan}
                onChange={(e) => updateField('tanggalPelaksanaan', e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
                placeholder="Contoh: Senin, 20 Oktober 2025"
              />
            </div>
          </div>

          {/* Section Materi Pokok: Pilihan Kurikulum Merdeka + Kolom Isian Manual */}
          <div className="space-y-4 pt-1">
            <div className="border-b border-slate-100 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Materi Pokok / Bab / Lingkup Pembelajaran
                </h4>
                <p className="text-[11px] text-slate-500">
                  Anda dapat memilih dari daftar resmi Kurikulum Merdeka di bawah, ATAU mengetik topik secara manual pada kolom isian.
                </p>
              </div>
              <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-semibold border border-blue-200 inline-flex items-center gap-1 self-start sm:self-auto shrink-0">
                <Sparkles className="w-3 h-3 text-blue-600" />
                {header.mataPelajaran} • Kelas {header.kelas} SD ({header.fase})
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

              {/* Dropdown Menu Pilihan */}
              <div className="flex items-center gap-2">
                <select
                  value={availableTopics.some((t) => t.title === header.materiPokok) ? header.materiPokok : ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      updateField('materiPokok', e.target.value);
                    }
                  }}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-blue-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden cursor-pointer"
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

              {/* Quick-Pick Chips */}
              {availableTopics.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="text-[11px] text-slate-600 font-medium">
                    Atau klik tombol bab di bawah ini untuk memilih cepat:
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-white rounded-lg border border-blue-100">
                    {availableTopics.map((topic) => {
                      const isSelected = header.materiPokok === topic.title;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => updateField('materiPokok', topic.title)}
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
                          <span className="truncate max-w-[280px] sm:max-w-none">{topic.title}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-200 shrink-0" />}
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
                {header.materiPokok && (
                  <button
                    type="button"
                    onClick={() => updateField('materiPokok', '')}
                    className="text-[11px] text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                  >
                    Kosongkan Kolom
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <input
                  type="text"
                  list="curriculum-topics-datalist"
                  value={header.materiPokok}
                  onChange={(e) => updateField('materiPokok', e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-lg border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden font-medium text-slate-900 shadow-2xs"
                  placeholder="Ketik topik materi secara manual di sini (Contoh: Bab 1: Fotosintesis & Rantai Makanan Sawah, atau Topik Gabungan Bab 1 dan Bab 2)..."
                />
                <datalist id="curriculum-topics-datalist">
                  {availableTopics.map((t) => (
                    <option key={t.id} value={t.title} />
                  ))}
                </datalist>

                <div className="text-[11px] text-slate-600 flex items-center justify-between">
                  <span>
                    💡 <em>Catatan:</em> Teks pada kolom manual ini yang akan <strong>dicetak di Kop Soal Ujian</strong> dan dijadikan <strong>acuan utama oleh Generator AI</strong>.
                  </span>
                  <span className="font-semibold text-slate-500 shrink-0">
                    {header.materiPokok.length} karakter
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Identitas Guru Pengampu & Tanda Tangan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <User className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-slate-800 text-sm">
            Identitas Guru Penyusun (Untuk Kolom Tanda Tangan &amp; Lembar Penilaian)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap Guru Penyusun &amp; Gelar
            </label>
            <input
              type="text"
              value={header.namaPenyusun}
              onChange={(e) => updateField('namaPenyusun', e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
              placeholder="Contoh: Budi Santoso, S.Pd., M.Pd."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              NIP Guru Penyusun (Opsional)
            </label>
            <input
              type="text"
              value={header.nipPenyusun}
              onChange={(e) => updateField('nipPenyusun', e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-mono"
              placeholder="Contoh: 19850412 201001 1 015 atau -"
            />
          </div>
        </div>
      </div>

      {/* Petunjuk Umum Pengerjaan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-slate-800 text-sm">
              Petunjuk Umum Pengerjaan Soal untuk Siswa
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddPetunjuk}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2.5 py-1 rounded-md hover:bg-blue-50 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah Petunjuk
          </button>
        </div>

        <div className="space-y-2">
          {header.petunjukUmum.map((petunjuk, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-5 text-right shrink-0">
                {index + 1}.
              </span>
              <input
                type="text"
                value={petunjuk}
                onChange={(e) => handleUpdatePetunjuk(index, e.target.value)}
                className="flex-1 text-xs sm:text-sm p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden"
              />
              <button
                type="button"
                onClick={() => handleDeletePetunjuk(index)}
                className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer"
                title="Hapus petunjuk ini"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
        <button
          type="button"
          onClick={onGoToQuestions}
          className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer order-2 sm:order-1"
        >
          Lewati ke Pengelolaan Butir Soal Manual →
        </button>

        <button
          type="button"
          onClick={onGoToAiGenerator}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition cursor-pointer order-1 sm:order-2"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span>Lanjut ke Generator Cerdas AI →</span>
        </button>
      </div>
    </div>
  );
};
