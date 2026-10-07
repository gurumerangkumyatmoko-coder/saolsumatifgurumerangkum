import React from 'react';
import { ExamPackage } from '../types/exam';
import { Printer, Download, FileCheck } from 'lucide-react';

interface AnswerSheetPreviewProps {
  exam: ExamPackage;
  onPrint: () => void;
  onDownloadLjkDocx: () => void;
}

export const AnswerSheetPreview: React.FC<AnswerSheetPreviewProps> = ({
  exam,
  onPrint,
  onDownloadLjkDocx
}) => {
  const { header, questions } = exam;

  const pgQuestions = questions.filter((q) => q.type === 'pilihan_ganda');
  const pgkQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kompleks');
  const katQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kategori');
  const isianQuestions = questions.filter((q) => q.type === 'isian');
  const uraianQuestions = questions.filter((q) => q.type === 'uraian');

  return (
    <div className="py-6 px-4">
      {/* Top Action Bar */}
      <div className="max-w-[210mm] mx-auto mb-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-700">
            Lembar Jawaban Siswa (LJK Manual Siap Fotokopi)
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
            onClick={onDownloadLjkDocx}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh LJK (.docx)
          </button>
        </div>
      </div>

      {/* A4 Sheet */}
      <div
        id="printable-answer-sheet"
        className="max-w-[210mm] mx-auto bg-white shadow-xl rounded-sm p-[15mm] sm:p-[20mm] border border-slate-200 text-black font-sans print-sheet print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full"
      >
        {/* Header */}
        <div className="text-center mb-4 border-b-2 border-black pb-2">
          <div className="text-xs font-bold uppercase text-slate-600">
            {header.namaSekolah}
          </div>
          <h2 className="text-base sm:text-lg font-extrabold uppercase mt-1">
            LEMBAR JAWABAN PESERTA DIDIK
          </h2>
          <div className="text-xs text-slate-700 font-semibold">
            {header.jenisAsesmen} • {header.mataPelajaran} • KELAS {header.kelas} ({header.fase})
          </div>
        </div>

        {/* Student Identity Box & Score Box */}
        <div className="grid grid-cols-3 gap-3 border border-black p-3 rounded-sm mb-5 text-xs">
          <div className="col-span-2 space-y-1.5">
            <div className="flex">
              <span className="w-24 font-bold shrink-0">Nama Siswa</span>
              <span className="mr-2">:</span>
              <span className="border-b border-dotted border-slate-400 flex-1"></span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold shrink-0">Nomor Absen</span>
              <span className="mr-2">:</span>
              <span className="border-b border-dotted border-slate-400 w-24"></span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold shrink-0">Kelas / Semester</span>
              <span className="mr-2">:</span>
              <span>Kelas {header.kelas} / Semester {header.semester}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-bold shrink-0">Hari, Tanggal</span>
              <span className="mr-2">:</span>
              <span>{header.tanggalPelaksanaan || '........................................'}</span>
            </div>
          </div>

          <div className="border border-black flex flex-col items-center justify-center p-2 bg-slate-50">
            <span className="font-bold text-[11px] uppercase text-slate-700">Nilai / Skor</span>
            <div className="h-12 flex items-center justify-center font-bold text-xl text-slate-400">
              ...... / 100
            </div>
            <span className="text-[10px] text-slate-500">Paraf Guru: ...........</span>
          </div>
        </div>

        {/* Section A: PG */}
        {pgQuestions.length > 0 && (
          <div className="mb-5">
            <div className="font-bold text-xs uppercase mb-1.5 bg-slate-100 p-1 border border-black">
              A. PILIHAN GANDA (Beri tanda silang X pada huruf yang benar)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-xs mt-2">
              {pgQuestions.map((q) => (
                <div key={q.id} className="flex items-center gap-1.5 border-b border-slate-200 pb-1 font-mono">
                  <span className="font-bold w-6 text-right font-sans">{q.number}.</span>
                  <div className="flex items-center gap-1.5">
                    <span className="border border-black px-1.5 py-0.5 rounded-xs text-xs">A</span>
                    <span className="border border-black px-1.5 py-0.5 rounded-xs text-xs">B</span>
                    <span className="border border-black px-1.5 py-0.5 rounded-xs text-xs">C</span>
                    {q.options.length > 3 && (
                      <span className="border border-black px-1.5 py-0.5 rounded-xs text-xs">D</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section B: PGK */}
        {pgkQuestions.length > 0 && (
          <div className="mb-5">
            <div className="font-bold text-xs uppercase mb-1.5 bg-slate-100 p-1 border border-black">
              B. PILIHAN GANDA KOMPLEKS (Centang ✓ pada kotak jawaban yang benar)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-2">
              {pgkQuestions.map((q) => (
                <div key={q.id} className="border border-slate-300 p-2 rounded-sm bg-slate-50/50">
                  <span className="font-bold">No. {q.number}:</span>
                  <div className="flex items-center gap-4 mt-1 font-mono">
                    <label className="flex items-center gap-1">
                      <span className="w-4 h-4 border border-black inline-block text-center text-xs"></span>
                      <span className="font-sans font-bold">Opsi A</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <span className="w-4 h-4 border border-black inline-block text-center text-xs"></span>
                      <span className="font-sans font-bold">Opsi B</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <span className="w-4 h-4 border border-black inline-block text-center text-xs"></span>
                      <span className="font-sans font-bold">Opsi C</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section C: PGK Kategori (Benar/Salah) */}
        {katQuestions.length > 0 && (
          <div className="mb-5">
            <div className="font-bold text-xs uppercase mb-1.5 bg-slate-100 p-1 border border-black">
              C. PILIHAN GANDA KOMPLEKS KATEGORI (Centang ✓ Benar atau Salah)
            </div>
            {katQuestions.map((q) => (
              <div key={q.id} className="mb-2">
                <span className="text-xs font-bold">Soal No. {q.number}:</span>
                <table className="w-full border-collapse border border-black text-xs mt-1">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-black p-1 w-10 text-center font-bold">Poin</th>
                      <th className="border border-black p-1 text-left font-bold">Pernyataan Soal</th>
                      <th className="border border-black p-1 w-16 text-center font-bold">Benar</th>
                      <th className="border border-black p-1 w-16 text-center font-bold">Salah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {q.statements.map((st, i) => (
                      <tr key={i}>
                        <td className="border border-black p-1 text-center font-bold">{i + 1}</td>
                        <td className="border border-black p-1 line-clamp-1">{st.statement}</td>
                        <td className="border border-black p-1 text-center font-mono">[ &nbsp; ]</td>
                        <td className="border border-black p-1 text-center font-mono">[ &nbsp; ]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* Section D: Isian Singkat */}
        {isianQuestions.length > 0 && (
          <div className="mb-5">
            <div className="font-bold text-xs uppercase mb-1.5 bg-slate-100 p-1 border border-black">
              D. ISIAN SINGKAT (Tuliskan jawaban singkat pada baris yang tersedia)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs mt-2">
              {isianQuestions.map((q) => (
                <div key={q.id} className="flex items-center gap-2">
                  <span className="font-bold w-6 text-right shrink-0">{q.number}.</span>
                  <span className="border-b border-black flex-1 h-5"></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section E: Uraian */}
        {uraianQuestions.length > 0 && (
          <div className="mb-5">
            <div className="font-bold text-xs uppercase mb-1.5 bg-slate-100 p-1 border border-black">
              E. URAIAN / ESSAY
            </div>
            <div className="space-y-4 text-xs mt-2">
              {uraianQuestions.map((q) => (
                <div key={q.id} className="border border-slate-300 p-2.5 rounded-sm">
                  <div className="font-bold mb-1">Jawaban Soal No. {q.number}:</div>
                  <div className="space-y-3 pt-1">
                    <div className="border-b border-dotted border-slate-400 h-4"></div>
                    <div className="border-b border-dotted border-slate-400 h-4"></div>
                    <div className="border-b border-dotted border-slate-400 h-4"></div>
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
