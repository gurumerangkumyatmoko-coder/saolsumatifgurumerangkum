import React, { useState } from 'react';
import {
  Printer,
  FileDown,
  X,
  FileText,
  KeyRound,
  FileCheck2,
  PackageCheck,
  CheckCircle2,
  Loader2,
  Info,
  HelpCircle
} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { ExamPackage } from '../types/exam';

interface PrintPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamPackage;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTriggerDirectPrint: (targetTab: string) => void;
}

export type PrintTargetType = 'questions' | 'keys' | 'ljk' | 'all';

export const PrintPdfModal: React.FC<PrintPdfModalProps> = ({
  isOpen,
  onClose,
  exam,
  activeTab,
  setActiveTab,
  onTriggerDirectPrint
}) => {
  const [selectedTarget, setSelectedTarget] = useState<PrintTargetType>('questions');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccessNotice, setDownloadSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const getElementIdForTarget = (target: PrintTargetType): string => {
    switch (target) {
      case 'questions':
        return 'printable-exam-paper';
      case 'keys':
        return 'printable-answer-key';
      case 'ljk':
        return 'printable-answer-sheet';
      case 'all':
        return 'printable-all-package';
      default:
        return 'printable-exam-paper';
    }
  };

  const getFilenameForTarget = (target: PrintTargetType): string => {
    const cleanMapel = exam.header.mataPelajaran.replace(/[^a-zA-Z0-9]/g, '_');
    const kelas = `Kelas_${exam.header.kelas}`;
    switch (target) {
      case 'questions':
        return `Soal_Sumatif_${cleanMapel}_${kelas}.pdf`;
      case 'keys':
        return `Kunci_Jawaban_${cleanMapel}_${kelas}.pdf`;
      case 'ljk':
        return `Lembar_Jawaban_Siswa_${cleanMapel}_${kelas}.pdf`;
      case 'all':
        return `Paket_Lengkap_Soal_Sumatif_${cleanMapel}_${kelas}.pdf`;
      default:
        return `Naskah_Soal_${cleanMapel}_${kelas}.pdf`;
    }
  };

  // Direct HTML2PDF file download
  const handleDownloadDirectPdf = async () => {
    setIsGeneratingPdf(true);
    setDownloadSuccessNotice(null);

    // Switch to corresponding tab first if single target so element is rendered
    if (selectedTarget === 'questions') {
      setActiveTab('preview');
    } else if (selectedTarget === 'keys') {
      setActiveTab('keys');
    } else if (selectedTarget === 'ljk') {
      setActiveTab('ljk');
    }

    // Give react time to mount container
    await new Promise((r) => setTimeout(r, 400));

    try {
      const elementId = getElementIdForTarget(selectedTarget);
      const element = document.getElementById(elementId);

      if (!element) {
        throw new Error('Halaman naskah belum selesai dimuat. Silakan coba kembali.');
      }

      const filename = getFilenameForTarget(selectedTarget);

      const opt = {
        margin: [10, 15, 12, 15] as [number, number, number, number],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          before: '.page-break',
          avoid: '.avoid-break-inside'
        }
      };

      await html2pdf().from(element).set(opt).save();

      setDownloadSuccessNotice(`File PDF "${filename}" berhasil diunduh ke perangkat Anda!`);
      setTimeout(() => {
        setDownloadSuccessNotice(null);
      }, 4000);
    } catch (err: any) {
      console.error('Failed generating PDF:', err);
      // Fallback: suggest browser print
      alert(
        'Pengunduhan PDF langsung dialihkan ke jendela Cetak Browser. Pilih "Save as PDF" / "Simpan sebagai PDF".'
      );
      handleBrowserPrint();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Trigger browser print dialog (Ctrl+P / window.print)
  const handleBrowserPrint = () => {
    onClose();
    onTriggerDirectPrint(selectedTarget);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Printer className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Cetak Naskah &amp; Simpan Dokumen PDF
              </h2>
              <p className="text-xs text-blue-100">
                Pilih naskah yang ingin dicetak ke printer atau diunduh sebagai file PDF A4
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-slate-800">
          {/* Target Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              1. Pilih Naskah yang Ingin Dicetak / Dikonversi ke PDF:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Option 1: Naskah Soal */}
              <div
                onClick={() => setSelectedTarget('questions')}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  selectedTarget === 'questions'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedTarget === 'questions'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Naskah Soal Siswa</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Bersih dengan Kop Surat dan gambar stimulus (tanpa kunci jawaban).
                  </div>
                </div>
              </div>

              {/* Option 2: Kunci Jawaban */}
              <div
                onClick={() => setSelectedTarget('keys')}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  selectedTarget === 'keys'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedTarget === 'keys'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Kunci &amp; Penskoran</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Tabel jawaban, pembahasan detail, dan rumus penilaian skor guru.
                  </div>
                </div>
              </div>

              {/* Option 3: LJK */}
              <div
                onClick={() => setSelectedTarget('ljk')}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  selectedTarget === 'ljk'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedTarget === 'ljk'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Lembar Jawab (LJK)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Format lembar respon siswa siap cetak &amp; fotokopi manual.
                  </div>
                </div>
              </div>

              {/* Option 4: Paket Lengkap */}
              <div
                onClick={() => setSelectedTarget('all')}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  selectedTarget === 'all'
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    selectedTarget === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <PackageCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Paket Lengkap (Semua)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Gabungan Soal + Kunci Jawaban + LJK berurutan dalam 1 file.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Download Notice */}
          {downloadSuccessNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccessNotice}</span>
            </div>
          )}

          {/* Tips Info Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-800">
                Panduan Mencetak / Menyimpan PDF di Komputer &amp; Smartphone:
              </span>
              <p className="leading-relaxed">
                1. Klik <strong>"Cetak via Printer / PDF Browser"</strong> untuk membuka jendela cetak resmi.
                <br />
                2. Pada menu <strong>Tujuan / Destination</strong>, pilih <em>"Save as PDF"</em> (Simpan sebagai PDF) atau pilih mesin printer Anda.
                <br />
                3. Pastikan ukuran kertas disetel ke <strong>A4</strong> dan centang <em>"Grafik Latar Belakang / Background Graphics"</em> agar warna dan garis cetak sempurna.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition cursor-pointer order-3 sm:order-1"
          >
            Tutup
          </button>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 order-1 sm:order-2">
            {/* Direct PDF Download Button */}
            <button
              type="button"
              disabled={isGeneratingPdf}
              onClick={handleDownloadDirectPdf}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition cursor-pointer disabled:opacity-60"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span>Membuat File PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-rose-600" />
                  <span>Unduh File PDF Langsung (.pdf)</span>
                </>
              )}
            </button>

            {/* Browser Print / Save to PDF Button */}
            <button
              type="button"
              onClick={handleBrowserPrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Cetak via Printer / PDF Browser</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
