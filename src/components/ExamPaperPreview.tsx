import React from 'react';
import {
  ExamPackage,
  AnyQuestion,
  MultipleChoiceQuestion,
  ComplexMultipleChoiceQuestion,
  CategoryComplexQuestion
} from '../types/exam';
import { getDiagramById } from '../utils/diagramLibrary';
import { Printer, Download, Eye } from 'lucide-react';

interface ExamPaperPreviewProps {
  exam: ExamPackage;
  onPrint: () => void;
  onDownloadDocx: () => void;
}

export const ExamPaperPreview: React.FC<ExamPaperPreviewProps> = ({
  exam,
  onPrint,
  onDownloadDocx
}) => {
  const { header, questions } = exam;

  const pgQuestions = questions.filter((q) => q.type === 'pilihan_ganda');
  const pgkQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kompleks');
  const katQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kategori');
  const isianQuestions = questions.filter((q) => q.type === 'isian');
  const uraianQuestions = questions.filter((q) => q.type === 'uraian');

  const renderQuestionImage = (q: AnyQuestion) => {
    if (!q.hasImage) return null;
    const diag = q.imageKey ? getDiagramById(q.imageKey) : null;
    const photoSrc = q.imageUrl || diag?.imageUrl || q.imageDataUrl;

    return (
      <div className="my-2.5 flex flex-col items-center">
        <div className="border border-slate-300 p-1.5 rounded-sm bg-slate-50/50 max-w-md w-full flex items-center justify-center overflow-hidden">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={q.imageCaption || 'Stimulus Soal'}
              referrerPolicy="no-referrer"
              className="max-h-56 w-auto object-cover rounded-xs shadow-2xs"
            />
          ) : diag?.svg ? (
            <div
              className="w-full max-h-48 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: diag.svg }}
            />
          ) : null}
        </div>
        {q.imageCaption && (
          <div className="text-[10px] sm:text-xs italic text-slate-600 mt-1 text-center font-sans">
            {q.imageCaption}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-6 px-4">
      {/* Action Bar */}
      <div className="max-w-[210mm] mx-auto mb-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-600">
            Pratinjau Kertas A4 Naskah Soal (Standar Ujian Sekolah)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-300 rounded-lg hover:bg-blue-100 shadow-2xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-blue-600" />
            Cetak / Simpan PDF
          </button>
          <button
            onClick={onDownloadDocx}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh Format DOCX
          </button>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div
        id="printable-exam-paper"
        className="max-w-[210mm] mx-auto bg-white shadow-xl rounded-sm p-[15mm] sm:p-[20mm] border border-slate-200 text-black font-serif print-sheet print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full"
      >
        {/* KOP SURAT */}
        <div className="text-center">
          {header.dinasPendidikan.split('\n').map((line, idx) => (
            <div key={idx} className="text-xs sm:text-sm font-bold uppercase tracking-wide">
              {line}
            </div>
          ))}
          <div className="text-base sm:text-lg font-extrabold uppercase mt-1">
            {header.namaSekolah}
          </div>
          {header.alamatSekolah && (
            <div className="text-[10px] sm:text-xs italic text-slate-700 mt-0.5">
              {header.alamatSekolah}
            </div>
          )}
          {/* Double underline border under KOP */}
          <div className="border-b-[3px] border-double border-black mt-2 mb-3"></div>
        </div>

        {/* TITLE BANNER */}
        <div className="text-center font-extrabold text-sm sm:text-base uppercase tracking-wider mb-4">
          {header.jenisAsesmen}
        </div>

        {/* METADATA TABLE */}
        <div className="border border-slate-400 p-2.5 rounded-sm mb-4 text-xs sm:text-sm font-sans">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex">
              <span className="w-28 font-semibold shrink-0">Mata Pelajaran</span>
              <span className="mr-2">:</span>
              <span className="font-bold">{header.mataPelajaran}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold shrink-0">Hari, Tanggal</span>
              <span className="mr-2">:</span>
              <span>{header.tanggalPelaksanaan || '.............................'}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold shrink-0">Kelas / Fase</span>
              <span className="mr-2">:</span>
              <span>Kelas {header.kelas} ({header.fase})</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold shrink-0">Waktu</span>
              <span className="mr-2">:</span>
              <span>{header.alokasiWaktu}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold shrink-0">Semester / TP</span>
              <span className="mr-2">:</span>
              <span>{header.semester} / {header.tahunPelajaran}</span>
            </div>
            <div className="flex">
              <span className="w-28 font-semibold shrink-0">Nama Siswa</span>
              <span className="mr-2">:</span>
              <span>........................................</span>
            </div>
          </div>
        </div>

        {/* PETUNJUK UMUM */}
        <div className="border border-slate-300 bg-slate-50/50 p-2.5 rounded-sm mb-5 text-[11px] sm:text-xs font-sans">
          <div className="font-bold mb-1">PETUNJUK UMUM:</div>
          <ol className="list-decimal ml-4 space-y-0.5 text-slate-700">
            {header.petunjukUmum.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ol>
        </div>

        {/* SECTION I: PILIHAN GANDA */}
        {pgQuestions.length > 0 && (
          <div className="mb-6">
            <div className="font-bold text-xs sm:text-sm uppercase tracking-wide mb-0.5">
              I. PILIHAN GANDA
            </div>
            <div className="text-[11px] sm:text-xs italic text-slate-600 mb-3">
              Berilah tanda silang (X) pada huruf A, B, C, atau D di depan jawaban yang paling tepat!
            </div>

            <div className="space-y-4">
              {pgQuestions.map((q) => (
                <div key={q.id} className="text-xs sm:text-sm">
                  <div className="flex items-start gap-1.5 font-medium leading-relaxed">
                    <span className="font-bold shrink-0">{q.number}.</span>
                    <span className="whitespace-pre-line">{q.question}</span>
                  </div>

                  {renderQuestionImage(q)}

                  {/* Options */}
                  <div className="ml-5 mt-1.5 space-y-1">
                    {(q as MultipleChoiceQuestion).options.map((opt) => (
                      <div key={opt.key} className="flex items-start gap-2">
                        <span className="font-bold shrink-0">{opt.key}.</span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION II: PILIHAN GANDA KOMPLEKS (3 OPSI) */}
        {pgkQuestions.length > 0 && (
          <div className="mb-6">
            <div className="font-bold text-xs sm:text-sm uppercase tracking-wide mb-0.5">
              II. PILIHAN GANDA KOMPLEKS (LEBIH DARI SATU JAWABAN BENAR)
            </div>
            <div className="text-[11px] sm:text-xs italic text-slate-600 mb-3">
              Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang (✓) pada kotak di depan pilihan jawaban!
            </div>

            <div className="space-y-4">
              {pgkQuestions.map((q) => (
                <div key={q.id} className="text-xs sm:text-sm">
                  <div className="flex items-start gap-1.5 font-medium leading-relaxed">
                    <span className="font-bold shrink-0">{q.number}.</span>
                    <span className="whitespace-pre-line">{q.question}</span>
                  </div>

                  {renderQuestionImage(q)}

                  {/* 3 Checkboxes */}
                  <div className="ml-5 mt-1.5 space-y-1.5">
                    {(q as ComplexMultipleChoiceQuestion).options.map((opt) => (
                      <div key={opt.key} className="flex items-start gap-2">
                        <span className="inline-block w-4 h-4 border border-black rounded-xs shrink-0 text-center text-[10px] leading-3.5">
                          &nbsp;
                        </span>
                        <span className="font-bold shrink-0">{opt.key}.</span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION III: PILIHAN GANDA KOMPLEKS KATEGORI (BENAR / SALAH) */}
        {katQuestions.length > 0 && (
          <div className="mb-6">
            <div className="font-bold text-xs sm:text-sm uppercase tracking-wide mb-0.5">
              III. PILIHAN GANDA KOMPLEKS KATEGORI (BENAR / SALAH)
            </div>
            <div className="text-[11px] sm:text-xs italic text-slate-600 mb-3">
              Bacalah pernyataan-pernyataan berikut dengan seksama, kemudian berilah tanda centang (✓) pada kolom Benar atau Salah!
            </div>

            <div className="space-y-4">
              {katQuestions.map((q) => (
                <div key={q.id} className="text-xs sm:text-sm">
                  <div className="flex items-start gap-1.5 font-medium leading-relaxed">
                    <span className="font-bold shrink-0">{q.number}.</span>
                    <span className="whitespace-pre-line">{q.question}</span>
                  </div>

                  {renderQuestionImage(q)}

                  {/* Table with 3 statements */}
                  <table className="w-full border-collapse border border-black mt-2 text-xs font-sans">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-black p-1.5 w-10 text-center font-bold">No</th>
                        <th className="border border-black p-1.5 text-left font-bold">Pernyataan / Deskripsi</th>
                        <th className="border border-black p-1.5 w-16 text-center font-bold">Benar</th>
                        <th className="border border-black p-1.5 w-16 text-center font-bold">Salah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(q as CategoryComplexQuestion).statements.map((st, sIdx) => (
                        <tr key={sIdx}>
                          <td className="border border-black p-1.5 text-center font-semibold">{sIdx + 1}</td>
                          <td className="border border-black p-1.5 leading-relaxed">{st.statement}</td>
                          <td className="border border-black p-1.5 text-center font-bold text-slate-400">
                            [ &nbsp; ]
                          </td>
                          <td className="border border-black p-1.5 text-center font-bold text-slate-400">
                            [ &nbsp; ]
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION IV: ISIAN SINGKAT */}
        {isianQuestions.length > 0 && (
          <div className="mb-6">
            <div className="font-bold text-xs sm:text-sm uppercase tracking-wide mb-0.5">
              IV. ISIAN SINGKAT
            </div>
            <div className="text-[11px] sm:text-xs italic text-slate-600 mb-3">
              Isilah titik-titik di bawah ini dengan jawaban yang singkat, tepat, dan benar!
            </div>

            <div className="space-y-3.5">
              {isianQuestions.map((q) => (
                <div key={q.id} className="text-xs sm:text-sm">
                  <div className="flex items-start gap-1.5 font-medium leading-relaxed">
                    <span className="font-bold shrink-0">{q.number}.</span>
                    <span className="whitespace-pre-line">{q.question}</span>
                  </div>

                  {renderQuestionImage(q)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION V: URAIAN */}
        {uraianQuestions.length > 0 && (
          <div className="mb-6">
            <div className="font-bold text-xs sm:text-sm uppercase tracking-wide mb-0.5">
              V. URAIAN / ESSAY
            </div>
            <div className="text-[11px] sm:text-xs italic text-slate-600 mb-3">
              Jawablah pertanyaan-pertanyaan di bawah ini secara jelas, lengkap, dan runtut!
            </div>

            <div className="space-y-4">
              {uraianQuestions.map((q) => (
                <div key={q.id} className="text-xs sm:text-sm">
                  <div className="flex items-start gap-1.5 font-medium leading-relaxed">
                    <span className="font-bold shrink-0">{q.number}.</span>
                    <span className="whitespace-pre-line">{q.question}</span>
                  </div>

                  {renderQuestionImage(q)}

                  <div className="mt-2 text-slate-400 font-sans text-xs">
                    Jawab:<br/>
                    ........................................................................................................................................................................................<br/>
                    ........................................................................................................................................................................................
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
