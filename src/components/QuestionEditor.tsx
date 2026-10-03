import React, { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Upload,
  Layers,
  CheckSquare,
  FileQuestion,
  FileText,
  X
} from 'lucide-react';
import {
  AnyQuestion,
  QuestionType,
  MultipleChoiceQuestion,
  ComplexMultipleChoiceQuestion,
  CategoryComplexQuestion,
  FillInTheBlankQuestion,
  EssayQuestion
} from '../types/exam';
import { DIAGRAM_LIBRARY, getDiagramById } from '../utils/diagramLibrary';

interface QuestionEditorProps {
  questions: AnyQuestion[];
  onChange: (updatedQuestions: AnyQuestion[]) => void;
  onOpenAIGenerator: () => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  questions,
  onChange,
  onOpenAIGenerator
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [imageCategoryFilter, setImageCategoryFilter] = useState<'all' | 'photo' | 'diagram'>('photo');
  const [selectedImageQuestionId, setSelectedImageQuestionId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to renumber questions 1 to N
  const renumberQuestions = (list: AnyQuestion[]): AnyQuestion[] => {
    return list.map((q, idx) => ({ ...q, number: idx + 1 }));
  };

  const handleUpdateQuestion = (id: string, updatedFields: Partial<AnyQuestion>) => {
    const updated = questions.map((q) => (q.id === id ? ({ ...q, ...updatedFields } as AnyQuestion) : q));
    onChange(updated);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus butir soal ini?')) {
      const filtered = questions.filter((q) => q.id !== id);
      onChange(renumberQuestions(filtered));
    }
  };

  const handleMoveQuestion = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= questions.length) return;

    const copy = [...questions];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    onChange(renumberQuestions(copy));
  };

  const handleAddNewQuestion = (type: QuestionType) => {
    const nextNumber = questions.length + 1;
    const baseId = `q-new-${Date.now()}`;

    let newQ: AnyQuestion;

    if (type === 'pilihan_ganda') {
      newQ = {
        id: baseId,
        number: nextNumber,
        type: 'pilihan_ganda',
        question: 'Tuliskan teks pertanyaan pilihan ganda di sini ....',
        options: [
          { key: 'A', text: 'Pilihan jawaban A' },
          { key: 'B', text: 'Pilihan jawaban B' },
          { key: 'C', text: 'Pilihan jawaban C' },
          { key: 'D', text: 'Pilihan jawaban D' }
        ],
        correctAnswer: 'A',
        score: 10,
        explanation: 'Penjelasan kunci jawaban pilihan ganda.'
      };
    } else if (type === 'pilihan_ganda_kompleks') {
      newQ = {
        id: baseId,
        number: nextNumber,
        type: 'pilihan_ganda_kompleks',
        question: 'Tuliskan pertanyaan stimulus dengan lebih dari satu jawaban benar ....',
        instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
        options: [
          { key: 'A', text: 'Pernyataan pilihan 1', isCorrect: true },
          { key: 'B', text: 'Pernyataan pilihan 2', isCorrect: true },
          { key: 'C', text: 'Pernyataan pilihan 3', isCorrect: false }
        ],
        score: 15,
        explanation: 'Penjelasan mengapa pilihan A dan B bernilai benar.'
      };
    } else if (type === 'pilihan_ganda_kategori') {
      newQ = {
        id: baseId,
        number: nextNumber,
        type: 'pilihan_ganda_kategori',
        question: 'Perhatikan pernyataan-pernyataan berikut ini, lalu tentukan Benar atau Salah!',
        instruction: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
        statements: [
          { statement: 'Deskripsi pernyataan pertama materi pembelajaran.', correctAnswer: 'Benar' },
          { statement: 'Deskripsi pernyataan kedua materi pembelajaran.', correctAnswer: 'Salah' },
          { statement: 'Deskripsi pernyataan ketiga materi pembelajaran.', correctAnswer: 'Benar' }
        ],
        score: 20,
        explanation: 'Pembahasan kategori Benar/Salah untuk tiap poin deskripsi.'
      };
    } else if (type === 'isian') {
      newQ = {
        id: baseId,
        number: nextNumber,
        type: 'isian',
        question: 'Kalimat stimulus pertanyaan yang diakhiri dengan titik-titik ....',
        correctAnswer: 'Jawaban singkat',
        score: 15,
        explanation: 'Kunci jawaban isian singkat yang tepat.'
      };
    } else {
      newQ = {
        id: baseId,
        number: nextNumber,
        type: 'uraian',
        question: 'Jelaskan konsep berikut ini secara lengkap dan berikan contoh penerapannya!',
        correctAnswer: 'Uraian jawaban model lengkap beserta langkah dan contoh.',
        rubricGuidelines: [
          'Konsep utama dijabarkan dengan tepat (skor 10)',
          'Memberikan contoh konkret yang relevan (skor 10)'
        ],
        score: 20,
        explanation: 'Pedoman penskoran uraian.'
      };
    }

    onChange([...questions, newQ]);
  };

  // Image Upload handler
  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedImageQuestionId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      handleUpdateQuestion(selectedImageQuestionId, {
        hasImage: true,
        imageDataUrl: dataUrl,
        imageKey: 'custom',
        imageCaption: file.name.replace(/\.[^/.]+$/, '')
      });
      setSelectedImageQuestionId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectLibraryDiagram = (diagramId: string) => {
    if (!selectedImageQuestionId) return;
    const diagram = getDiagramById(diagramId);
    handleUpdateQuestion(selectedImageQuestionId, {
      hasImage: true,
      imageKey: diagramId,
      imageUrl: diagram?.imageUrl,
      imageDataUrl: undefined,
      imageCaption: diagram ? diagram.name : 'Gambar Stimulus Soal'
    });
    setSelectedImageQuestionId(null);
  };

  const handleRemoveImage = (qId: string) => {
    handleUpdateQuestion(qId, {
      hasImage: false,
      imageKey: undefined,
      imageUrl: undefined,
      imageDataUrl: undefined,
      imageCaption: undefined
    });
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterType === 'all') return true;
    return q.type === filterType;
  });

  const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Hidden file input for custom image upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleCustomImageUpload}
      />

      {/* Top Bar: Stats & Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Daftar Butir Soal Asesmen Sumatif
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {questions.length} Butir Soal
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Total Skor: {totalScore}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Anda dapat menambah, menyunting naskah soal, menyematkan gambar stimulus, menentukan kunci jawaban, dan mengatur bobot skor.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAIGenerator}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Otomatis AI</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs by Question Type */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filterType === 'all'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Semua ({questions.length})
        </button>
        <button
          onClick={() => setFilterType('pilihan_ganda')}
          className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filterType === 'pilihan_ganda'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Pilihan Ganda ({questions.filter((q) => q.type === 'pilihan_ganda').length})
        </button>
        <button
          onClick={() => setFilterType('pilihan_ganda_kompleks')}
          className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filterType === 'pilihan_ganda_kompleks'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          PG Kompleks 3 Opsi ({questions.filter((q) => q.type === 'pilihan_ganda_kompleks').length})
        </button>
        <button
          onClick={() => setFilterType('pilihan_ganda_kategori')}
          className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filterType === 'pilihan_ganda_kategori'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          PGK Benar/Salah ({questions.filter((q) => q.type === 'pilihan_ganda_kategori').length})
        </button>
        <button
          onClick={() => setFilterType('isian')}
          className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filterType === 'isian'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Isian ({questions.filter((q) => q.type === 'isian').length})
        </button>
        <button
          onClick={() => setFilterType('uraian')}
          className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filterType === 'uraian'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Uraian ({questions.filter((q) => q.type === 'uraian').length})
        </button>
      </div>

      {/* Question Items List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center space-y-3">
            <FileQuestion className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-sm">Belum ada butir soal dalam kategori ini</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Silakan tambahkan butir soal secara manual menggunakan tombol di bawah atau gunakan Generator AI Gemini untuk menyusun otomatis.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const originalIndex = questions.findIndex((item) => item.id === q.id);

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 transition hover:border-slate-300"
              >
                {/* Header item: Number, Type Badge, Score, and Actions */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {q.number}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-md font-semibold uppercase tracking-wider ${
                        q.type === 'pilihan_ganda'
                          ? 'bg-sky-100 text-sky-800'
                          : q.type === 'pilihan_ganda_kompleks'
                          ? 'bg-indigo-100 text-indigo-800'
                          : q.type === 'pilihan_ganda_kategori'
                          ? 'bg-amber-100 text-amber-800'
                          : q.type === 'isian'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {q.type === 'pilihan_ganda'
                        ? 'Pilihan Ganda'
                        : q.type === 'pilihan_ganda_kompleks'
                        ? 'PG Kompleks (3 Opsi)'
                        : q.type === 'pilihan_ganda_kategori'
                        ? 'PGK Kategori (Benar/Salah)'
                        : q.type === 'isian'
                        ? 'Isian Singkat'
                        : 'Uraian'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Score input */}
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-slate-500 font-medium">Skor:</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={q.score}
                        onChange={(e) =>
                          handleUpdateQuestion(q.id, { score: parseInt(e.target.value) || 1 })
                        }
                        className="w-12 text-center text-xs font-bold p-1 border border-slate-300 rounded-md"
                      />
                    </div>

                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={originalIndex === 0}
                      onClick={() => handleMoveQuestion(originalIndex, 'up')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-md hover:bg-slate-100 transition cursor-pointer"
                      title="Geser ke atas"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={originalIndex === questions.length - 1}
                      onClick={() => handleMoveQuestion(originalIndex, 'down')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-md hover:bg-slate-100 transition cursor-pointer"
                      title="Geser ke bawah"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition cursor-pointer"
                      title="Hapus butir soal ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teks Soal / Pertanyaan
                  </label>
                  <textarea
                    rows={3}
                    value={q.question}
                    onChange={(e) => handleUpdateQuestion(q.id, { question: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-medium"
                    placeholder="Tuliskan stimulus atau teks pertanyaan..."
                  />
                </div>

                {/* Stimulus Gambar Preview & Configuration */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-slate-700">
                        Stimulus Gambar Soal
                      </span>
                    </div>

                    {q.hasImage ? (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(q.id)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Hapus Gambar
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedImageQuestionId(q.id)}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-2.5 py-1 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Sematan Gambar
                      </button>
                    )}
                  </div>

                  {q.hasImage && (
                    <div className="space-y-2 pt-1">
                      {/* Diagram or photo image rendered */}
                      <div className="bg-white border border-slate-200 rounded-lg p-2 flex flex-col items-center">
                        {q.imageDataUrl ? (
                          <img
                            src={q.imageDataUrl}
                            alt="Custom stimulus"
                            referrerPolicy="no-referrer"
                            className="max-h-52 object-contain rounded"
                          />
                        ) : q.imageUrl ? (
                          <img
                            src={q.imageUrl}
                            alt={q.imageCaption || "Foto stimulus soal"}
                            referrerPolicy="no-referrer"
                            className="max-h-52 object-cover rounded shadow-2xs"
                          />
                        ) : q.imageKey ? (
                          (() => {
                            const diagram = getDiagramById(q.imageKey);
                            if (!diagram) return <div className="text-xs text-slate-400">Gambar tidak ditemukan</div>;
                            if (diagram.imageUrl) {
                              return (
                                <img
                                  src={diagram.imageUrl}
                                  alt={diagram.name}
                                  referrerPolicy="no-referrer"
                                  className="max-h-52 object-cover rounded shadow-2xs"
                                />
                              );
                            }
                            if (diagram.svg) {
                              return (
                                <div
                                  className="max-w-md w-full"
                                  dangerouslySetInnerHTML={{ __html: diagram.svg }}
                                />
                              );
                            }
                            return null;
                          })()
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={q.imageCaption || ''}
                          onChange={(e) =>
                            handleUpdateQuestion(q.id, { imageCaption: e.target.value })
                          }
                          placeholder="Keterangan teks di bawah gambar (misal: Gambar 1. Rantai Makanan Sawah)"
                          className="flex-1 text-xs p-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-blue-500 outline-hidden italic"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedImageQuestionId(q.id)}
                          className="text-xs px-2.5 py-2 border border-slate-300 rounded-lg hover:bg-white text-slate-700 font-medium cursor-pointer"
                        >
                          Ganti
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Question-Type Specific Answer Editor */}
                {/* 1. Pilihan Ganda */}
                {q.type === 'pilihan_ganda' && (
                  <div className="space-y-2 pt-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Pilihan Jawaban (Pilih radio untuk menentukan kunci jawaban yang benar):
                    </label>
                    <div className="space-y-1.5">
                      {(q as MultipleChoiceQuestion).options.map((opt, oIdx) => (
                        <div key={opt.key} className="flex items-center gap-2">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name={`correct-pg-${q.id}`}
                              checked={q.correctAnswer === opt.key}
                              onChange={() => handleUpdateQuestion(q.id, { correctAnswer: opt.key })}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs font-bold text-slate-800 w-5">
                              {opt.key}.
                            </span>
                          </label>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => {
                              const newOpts = [...(q as MultipleChoiceQuestion).options];
                              newOpts[oIdx] = { ...opt, text: e.target.value };
                              handleUpdateQuestion(q.id, { options: newOpts });
                            }}
                            className={`flex-1 text-xs sm:text-sm p-2 rounded-lg border outline-hidden ${
                              q.correctAnswer === opt.key
                                ? 'border-emerald-500 bg-emerald-50/50 font-medium text-emerald-950'
                                : 'border-slate-300 bg-white'
                            }`}
                          />
                          {q.correctAnswer === opt.key && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                              Kunci Benar
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Pilihan Ganda Kompleks (3 opsi, kemungkinan >1 benar) */}
                {q.type === 'pilihan_ganda_kompleks' && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700">
                        3 Pilihan Jawaban (Beri centang pada semua pilihan yang benar):
                      </label>
                      <span className="text-[11px] text-indigo-700 font-medium bg-indigo-50 px-2 py-0.5 rounded">
                        Tepat 3 opsi (sesuai ketentuan)
                      </span>
                    </div>
                    <div className="space-y-2">
                      {(q as ComplexMultipleChoiceQuestion).options.map((opt, oIdx) => (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                            opt.isCorrect
                              ? 'border-emerald-300 bg-emerald-50/70'
                              : 'border-slate-200 bg-slate-50/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={opt.isCorrect}
                            onChange={(e) => {
                              const newOpts = [...(q as ComplexMultipleChoiceQuestion).options];
                              newOpts[oIdx] = { ...opt, isCorrect: e.target.checked };
                              handleUpdateQuestion(q.id, { options: newOpts });
                            }}
                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-800 w-5">
                            {opt.key}.
                          </span>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => {
                              const newOpts = [...(q as ComplexMultipleChoiceQuestion).options];
                              newOpts[oIdx] = { ...opt, text: e.target.value };
                              handleUpdateQuestion(q.id, { options: newOpts });
                            }}
                            className="flex-1 text-xs sm:text-sm p-1.5 rounded-md border border-slate-300 bg-white outline-hidden"
                          />
                          {opt.isCorrect && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                              Benar
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Pilihan Ganda Kompleks Kategori (Tabel Benar/Salah, 3 deskripsi) */}
                {q.type === 'pilihan_ganda_kategori' && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700">
                        3 Deskripsi / Pernyataan (Tentukan respon Benar atau Salah):
                      </label>
                      <span className="text-[11px] text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded">
                        Tepat 3 deskripsi respon Benar / Salah
                      </span>
                    </div>
                    <div className="space-y-2">
                      {(q as CategoryComplexQuestion).statements.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center gap-2"
                        >
                          <span className="text-xs font-bold text-slate-600 w-6 text-center shrink-0">
                            {sIdx + 1}.
                          </span>
                          <input
                            type="text"
                            value={st.statement}
                            onChange={(e) => {
                              const newSt = [...(q as CategoryComplexQuestion).statements];
                              newSt[sIdx] = { ...st, statement: e.target.value };
                              handleUpdateQuestion(q.id, { statements: newSt });
                            }}
                            className="flex-1 text-xs sm:text-sm p-1.5 rounded-md border border-slate-300 bg-white outline-hidden"
                          />
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-slate-500 font-medium">Kunci:</span>
                            <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden bg-white text-xs">
                              <button
                                type="button"
                                onClick={() => {
                                  const newSt = [...(q as CategoryComplexQuestion).statements];
                                  newSt[sIdx] = { ...st, correctAnswer: 'Benar' };
                                  handleUpdateQuestion(q.id, { statements: newSt });
                                }}
                                className={`px-2.5 py-1 font-semibold transition cursor-pointer ${
                                  st.correctAnswer === 'Benar'
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                Benar
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const newSt = [...(q as CategoryComplexQuestion).statements];
                                  newSt[sIdx] = { ...st, correctAnswer: 'Salah' };
                                  handleUpdateQuestion(q.id, { statements: newSt });
                                }}
                                className={`px-2.5 py-1 font-semibold transition cursor-pointer ${
                                  st.correctAnswer === 'Salah'
                                    ? 'bg-rose-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                Salah
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Isian Singkat */}
                {q.type === 'isian' && (
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Kunci Jawaban Isian Singkat
                    </label>
                    <input
                      type="text"
                      value={(q as FillInTheBlankQuestion).correctAnswer}
                      onChange={(e) => handleUpdateQuestion(q.id, { correctAnswer: e.target.value })}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-emerald-400 bg-emerald-50/40 text-emerald-950 font-semibold outline-hidden"
                      placeholder="Contoh: Klorofil"
                    />
                  </div>
                )}

                {/* 5. Uraian */}
                {q.type === 'uraian' && (
                  <div className="space-y-2 pt-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Model Jawaban Uraian &amp; Rubrik Penskoran
                    </label>
                    <textarea
                      rows={3}
                      value={(q as EssayQuestion).correctAnswer}
                      onChange={(e) => handleUpdateQuestion(q.id, { correctAnswer: e.target.value })}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-purple-300 bg-purple-50/40 text-purple-950 outline-hidden font-medium"
                      placeholder="Tuliskan kunci jawaban model dan langkah pengerjaan..."
                    />
                  </div>
                )}

                {/* Penjelasan / Pembahasan Soal */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pembahasan / Catatan Penilaian
                  </label>
                  <input
                    type="text"
                    value={q.explanation}
                    onChange={(e) => handleUpdateQuestion(q.id, { explanation: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 text-slate-700 outline-hidden"
                    placeholder="Alasan mengapa jawaban tersebut benar untuk dicantumkan di lembar kunci jawaban..."
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New Question Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Tambah Butir Soal Baru Secara Manual
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <button
            type="button"
            onClick={() => handleAddNewQuestion('pilihan_ganda')}
            className="p-3 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-sky-600" />
            <span>Pilihan Ganda</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddNewQuestion('pilihan_ganda_kompleks')}
            className="p-3 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>PG Kompleks</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddNewQuestion('pilihan_ganda_kategori')}
            className="p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-600" />
            <span>PGK Benar/Salah</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddNewQuestion('isian')}
            className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Isian Singkat</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddNewQuestion('uraian')}
            className="p-3 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer col-span-2 sm:col-span-1"
          >
            <Plus className="w-4 h-4 text-purple-600" />
            <span>Uraian / Essay</span>
          </button>
        </div>
      </div>

      {/* Modal for Selecting Diagram / Uploading Image */}
      {selectedImageQuestionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm sm:text-base">
                  Pilih Stimulus Gambar Edukatif atau Unggah Sendiri
                </h3>
              </div>
              <button
                onClick={() => setSelectedImageQuestionId(null)}
                className="text-white/70 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {/* Option 1: Custom Upload */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-blue-900">Unggah Gambar Sendiri</h4>
                  <p className="text-[11px] text-blue-700">Format PNG, JPG, atau WEBP dari komputer/ponsel Anda</p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Pilih File Gambar
                </button>
              </div>

              {/* Option 2: Diagram & Realistic Photo Library */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pilih dari Pustaka Visual Edukasi SD
                  </h4>
                  {/* Category Filter */}
                  <div className="flex items-center gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageCategoryFilter('all')}
                      className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                        imageCategoryFilter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageCategoryFilter('photo')}
                      className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                        imageCategoryFilter === 'photo'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>📸 Foto Realistis</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageCategoryFilter('diagram')}
                      className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                        imageCategoryFilter === 'diagram'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      📐 Diagram Vektor
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DIAGRAM_LIBRARY.filter((item) => {
                    if (imageCategoryFilter === 'photo') return !!item.isRealisticPhoto;
                    if (imageCategoryFilter === 'diagram') return !item.isRealisticPhoto;
                    return true;
                  }).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectLibraryDiagram(item.id)}
                      className={`border rounded-xl p-3 hover:border-blue-500 hover:bg-blue-50/50 transition cursor-pointer flex flex-col justify-between group ${
                        item.isRealisticPhoto
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="bg-white border border-slate-100 rounded-lg p-1.5 mb-2 flex items-center justify-center overflow-hidden h-40">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-md group-hover:scale-102 transition duration-200"
                          />
                        ) : item.svg ? (
                          <div
                            className="w-full max-h-36 overflow-hidden flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: item.svg }}
                          />
                        ) : null}
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                            {item.name}
                          </span>
                          {item.isRealisticPhoto ? (
                            <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-1.5 py-0.5 rounded shrink-0">
                              Foto Realistis
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedImageQuestionId(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
