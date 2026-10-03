import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  BookOpen,
  PlusCircle,
  FileCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { ExamPackage } from '../types/exam';
import { SAMPLE_EXAMS } from '../utils/sampleExams';
import { exportExamToDocx } from '../utils/docxExport';
import { exportExamToWordHtmlDoc } from '../utils/docHtmlExport';

interface HeaderNavProps {
  currentExam: ExamPackage;
  onSelectSample: (exam: ExamPackage) => void;
  onResetExam: () => void;
  onOpenAIGenerator: () => void;
  onOpenPrintModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentExam,
  onSelectSample,
  onResetExam,
  onOpenAIGenerator,
  onOpenPrintModal,
  activeTab,
  setActiveTab
}) => {
  const [showSampleDropdown, setShowSampleDropdown] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleDocxExport = async (type: 'full' | 'questions_only' | 'keys_only' | 'answer_sheet') => {
    setIsExporting(true);
    setShowDownloadDropdown(false);
    try {
      await exportExamToDocx(currentExam, type);
      setExportNotice('File DOCX berhasil diunduh!');
      setTimeout(() => setExportNotice(null), 3000);
    } catch (err: any) {
      console.error(err);
      alert('Gagal mengunduh DOCX: ' + (err?.message || 'Terjadi kesalahan'));
    } finally {
      setIsExporting(false);
    }
  };

  const handleDocHtmlExport = async (type: 'full' | 'questions_only' | 'keys_only') => {
    setIsExporting(true);
    setShowDownloadDropdown(false);
    try {
      await exportExamToWordHtmlDoc(currentExam, type);
      setExportNotice('File DOC berhasil diunduh!');
      setTimeout(() => setExportNotice(null), 3000);
    } catch (err: any) {
      console.error(err);
      alert('Gagal mengunduh DOC: ' + (err?.message || 'Terjadi kesalahan'));
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    // Switch to preview tab then print
    setActiveTab('preview');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-lg leading-tight tracking-tight">
                  SiSumatif <span className="text-blue-600 font-extrabold">SD</span>
                </h1>
                <span className="text-[11px] px-2 py-0.5 font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Penyusun &amp; Unduh Soal Sumatif Lengkap Semua Mapel &amp; Kelas SD
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Generator CTA */}
            <button
              onClick={onOpenAIGenerator}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all duration-150 cursor-pointer hover:shadow-md hover:shadow-indigo-500/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Susun Soal AI</span>
            </button>

            {/* Contoh Bank Soal Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowSampleDropdown(!showSampleDropdown);
                  setShowDownloadDropdown(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="hidden md:inline">Contoh Bank Soal</span>
                <span className="md:hidden">Bank Soal</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showSampleDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Pilih Contoh Naskah Soal Siap Pakai
                  </div>
                  {SAMPLE_EXAMS.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        onSelectSample(sample);
                        setShowSampleDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2.5 hover:bg-blue-50/70 transition flex flex-col gap-0.5 border-b border-slate-100 last:border-b-0 cursor-pointer"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-slate-800">
                        {sample.header.mataPelajaran} - Kelas {sample.header.kelas}
                      </span>
                      <span className="text-xs text-slate-500 line-clamp-1">
                        {sample.header.materiPokok}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-600 font-medium">
                        <span className="bg-blue-100/70 px-1.5 py-0.2 rounded text-[10px]">
                          {sample.questions.length} Soal
                        </span>
                        <span>Semua 5 Tipe Soal + Gambar + Kunci</span>
                      </div>
                    </button>
                  ))}
                  <div className="p-2 bg-slate-50 border-t border-slate-100 mt-1">
                    <button
                      onClick={() => {
                        onResetExam();
                        setShowSampleDropdown(false);
                      }}
                      className="w-full text-center py-1.5 text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer"
                    >
                      + Buat Lembar Kosong Baru
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Print / PDF Button */}
            <button
              onClick={onOpenPrintModal}
              title="Cetak Naskah Soal atau Simpan PDF"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold shadow-2xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-600" />
              <span>Cetak / PDF</span>
            </button>

            {/* Download DOCX Dropdown */}
            <div className="relative">
              <button
                type="button"
                disabled={isExporting}
                onClick={() => {
                  setShowDownloadDropdown(!showDownloadDropdown);
                  setShowSampleDropdown(false);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-sm transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span className="font-semibold">Unduh DOCX</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-200" />
              </button>

              {showDownloadDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Format Microsoft Word (.docx)
                  </div>
                  <button
                    onClick={() => handleDocxExport('full')}
                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 text-xs sm:text-sm text-slate-800 font-medium flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-emerald-800">Paket Lengkap (.docx)</div>
                      <div className="text-[11px] text-slate-500">Kop + Naskah Soal + Kunci + LJK</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Rekomendasi
                    </span>
                  </button>
                  <button
                    onClick={() => handleDocxExport('questions_only')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-xs sm:text-sm text-slate-800 flex flex-col cursor-pointer"
                  >
                    <span className="font-medium">Naskah Soal Siswa Saja (.docx)</span>
                    <span className="text-[11px] text-slate-500">Bersih tanpa kunci jawaban</span>
                  </button>
                  <button
                    onClick={() => handleDocxExport('keys_only')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-xs sm:text-sm text-slate-800 flex flex-col cursor-pointer"
                  >
                    <span className="font-medium">Kunci Jawaban &amp; Rubrik (.docx)</span>
                    <span className="text-[11px] text-slate-500">Tabel skor &amp; pedoman penskoran</span>
                  </button>
                  <button
                    onClick={() => handleDocxExport('answer_sheet')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-xs sm:text-sm text-slate-800 flex flex-col cursor-pointer border-b border-slate-100"
                  >
                    <span className="font-medium">Lembar Jawaban Siswa / LJK (.docx)</span>
                    <span className="text-[11px] text-slate-500">Format kotak isian siap fotokopi</span>
                  </button>

                  <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Format Alternatif (.doc MSO)
                  </div>
                  <button
                    onClick={() => handleDocHtmlExport('full')}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-xs text-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <span>Unduh Format Word .DOC Klasik</span>
                    <span className="text-[10px] text-slate-400">Word 2003-2021</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {exportNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}
    </header>
  );
};
