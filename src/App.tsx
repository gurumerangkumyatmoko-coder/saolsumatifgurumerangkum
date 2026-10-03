import React, { useState, useEffect } from 'react';
import { ExamPackage, AnyQuestion } from './types/exam';
import { SAMPLE_EXAMS } from './utils/sampleExams';
import { HeaderNav } from './components/HeaderNav';
import { TabNav } from './components/TabNav';
import { ExamHeaderForm } from './components/ExamHeaderForm';
import { QuestionEditor } from './components/QuestionEditor';
import { ExamPaperPreview } from './components/ExamPaperPreview';
import { AnswerKeyPreview } from './components/AnswerKeyPreview';
import { AnswerSheetPreview } from './components/AnswerSheetPreview';
import { AIGeneratorModal } from './components/AIGeneratorModal';
import { PrintPdfModal } from './components/PrintPdfModal';
import { PrintAllSections } from './components/PrintAllSections';
import { exportExamToDocx } from './utils/docxExport';
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  BookOpen,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const STORAGE_KEY = 'sisumatif_sd_exam_data_v1';

export default function App() {
  const [exam, setExam] = useState<ExamPackage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load exam from localStorage', e);
    }
    return SAMPLE_EXAMS[0]; // Default to sample IPAS Kelas 4
  });

  const [activeTab, setActiveTab] = useState<string>('preview');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save to localStorage whenever exam changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exam));
    } catch (e) {
      console.error('Failed to save exam to localStorage', e);
    }
  }, [exam]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectSample = (sample: ExamPackage) => {
    setExam(sample);
    showToast(`Naskah soal "${sample.title}" berhasil dimuat!`);
  };

  const handleResetExam = () => {
    if (confirm('Apakah Anda ingin mengosongkan lembar soal dan memulai naskah baru?')) {
      const emptyExam: ExamPackage = {
        id: `exam-${Date.now()}`,
        title: 'Naskah Asesmen Sumatif SD Baru',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        header: {
          dinasPendidikan: 'PEMERINTAH KABUPATEN / KOTA\nDINAS PENDIDIKAN DAN KEBUDAYAAN',
          namaSekolah: 'SD NEGERI ............................................',
          alamatSekolah: 'Alamat Sekolah Dasar',
          jenisAsesmen: 'Asesmen Sumatif Lingkup Materi',
          mataPelajaran: 'Matematika',
          kelas: 4,
          fase: 'Fase B',
          semester: '1 (Ganjil)',
          tahunPelajaran: '2024/2025',
          alokasiWaktu: '90 Menit',
          tanggalPelaksanaan: '',
          namaPenyusun: '',
          nipPenyusun: '',
          materiPokok: '',
          petunjukUmum: [
            'Berdoalah sebelum mengerjakan soal sesuai agama dan keyakinan masing-masing.',
            'Tulislah nama dan identitasmu secara jelas pada lembar jawaban yang tersedia.',
            'Bacalah setiap butir soal dengan teliti dan cermat sebelum menjawab.',
            'Dahulukan menjawab soal-soal yang kamu anggap lebih mudah.',
            'Periksa kembali seluruh lembar jawabanmu sebelum diserahkan kepada Bapak/Ibu Guru.'
          ]
        },
        questions: []
      };
      setExam(emptyExam);
      setActiveTab('header');
      showToast('Naskah soal baru siap diisi.');
    }
  };

  const handleApplyAiQuestions = (
    newQuestions: AnyQuestion[],
    generatedMateri?: string
  ) => {
    setExam((prev) => {
      const updatedHeader = { ...prev.header };
      if (generatedMateri) {
        updatedHeader.materiPokok = generatedMateri;
      }
      return {
        ...prev,
        header: updatedHeader,
        questions: newQuestions,
        updatedAt: new Date().toISOString()
      };
    });
    setActiveTab('editor');
    showToast(`Berhasil menyusun ${newQuestions.length} butir soal Kurikulum Merdeka!`);
  };

  const handleDownloadFullDocx = async () => {
    try {
      await exportExamToDocx(exam, 'full');
      showToast('Naskah lengkap format Word (.docx) berhasil diunduh!');
    } catch (e: any) {
      alert('Gagal mengunduh: ' + (e?.message || 'Error'));
    }
  };

  const handleDownloadKeysDocx = async () => {
    try {
      await exportExamToDocx(exam, 'keys_only');
      showToast('Kunci jawaban (.docx) berhasil diunduh!');
    } catch (e: any) {
      alert('Gagal mengunduh: ' + (e?.message || 'Error'));
    }
  };

  const handleDownloadLjkDocx = async () => {
    try {
      await exportExamToDocx(exam, 'answer_sheet');
      showToast('Lembar jawaban (.docx) berhasil diunduh!');
    } catch (e: any) {
      alert('Gagal mengunduh: ' + (e?.message || 'Error'));
    }
  };

  const handlePrint = () => {
    setIsPrintModalOpen(true);
  };

  const handleTriggerDirectPrint = (targetTab: string) => {
    if (targetTab === 'questions') {
      setActiveTab('preview');
    } else if (targetTab === 'keys') {
      setActiveTab('keys');
    } else if (targetTab === 'ljk') {
      setActiveTab('ljk');
    } else if (targetTab === 'all') {
      setActiveTab('all');
    }
    setTimeout(() => {
      window.print();
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Navbar */}
      <HeaderNav
        currentExam={exam}
        onSelectSample={handleSelectSample}
        onResetExam={handleResetExam}
        onOpenAIGenerator={() => setIsAiModalOpen(true)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tabs Bar */}
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} exam={exam} />

      {/* Main Workspace Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'header' && (
          <ExamHeaderForm
            header={exam.header}
            onChange={(updatedHeader) =>
              setExam((prev) => ({ ...prev, header: updatedHeader }))
            }
            onGoToAiGenerator={() => {
              setActiveTab('ai');
              setIsAiModalOpen(true);
            }}
            onGoToQuestions={() => setActiveTab('editor')}
          />
        )}

        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Generator Soal Sumatif Berbasis AI (Gemini 3.8 Flash)
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Asisten AI siap menyusun butir soal berstandar Kurikulum Merdeka untuk semua jenjang SD (Kelas 1 - 6) dan semua mata pelajaran secara instan dengan stimulus gambar, kunci jawaban, dan rubrik penskoran.
              </p>

              {/* Status summary of current selected exam */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-lg mx-auto text-left space-y-1.5 text-xs text-slate-700">
                <div className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                  Target Konfigurasi Ujian Saat Ini:
                </div>
                <div>• Satuan Pendidikan: <span className="font-semibold">{exam.header.namaSekolah}</span></div>
                <div>• Mata Pelajaran: <span className="font-semibold text-blue-700">{exam.header.mataPelajaran}</span></div>
                <div>• Jenjang: <span className="font-semibold">Kelas {exam.header.kelas} SD ({exam.header.fase})</span></div>
                <div>• Topik/Bab: <span className="font-semibold">{exam.header.materiPokok || 'Belum diisi'}</span></div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Buka Form Penyusun Soal AI</span>
                </button>

                {exam.questions.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('editor')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-2xl transition cursor-pointer border border-slate-300"
                  >
                    Lihat & Kelola Butir Soal ({exam.questions.length}) →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <QuestionEditor
            questions={exam.questions}
            onChange={(updatedQuestions) =>
              setExam((prev) => ({ ...prev, questions: updatedQuestions }))
            }
            onOpenAIGenerator={() => setIsAiModalOpen(true)}
          />
        )}

        {activeTab === 'preview' && (
          <ExamPaperPreview
            exam={exam}
            onPrint={handlePrint}
            onDownloadDocx={handleDownloadFullDocx}
          />
        )}

        {activeTab === 'keys' && (
          <AnswerKeyPreview
            exam={exam}
            onPrint={handlePrint}
            onDownloadKeysDocx={handleDownloadKeysDocx}
          />
        )}

        {activeTab === 'ljk' && (
          <AnswerSheetPreview
            exam={exam}
            onPrint={handlePrint}
            onDownloadLjkDocx={handleDownloadLjkDocx}
          />
        )}

        {activeTab === 'all' && (
          <PrintAllSections
            exam={exam}
            onPrint={handlePrint}
            onDownloadFullDocx={handleDownloadFullDocx}
          />
        )}
      </main>

      {/* AI Generator Modal */}
      <AIGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        header={exam.header}
        onApplyQuestions={handleApplyAiQuestions}
      />

      {/* Print & PDF Modal */}
      <PrintPdfModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        exam={exam}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTriggerDirectPrint={handleTriggerDirectPrint}
      />

      {/* Floating Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
