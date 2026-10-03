import React from 'react';
import { ExamPackage } from '../types/exam';
import { KeyRound, Printer, Download, CheckCircle2 } from 'lucide-react';

interface AnswerKeyPreviewProps {
  exam: ExamPackage;
  onPrint: () => void;
  onDownloadKeysDocx: () => void;
}

export const AnswerKeyPreview: React.FC<AnswerKeyPreviewProps> = ({
  exam,
  onPrint,
  onDownloadKeysDocx
}) => {
  const { header, questions } = exam;

  let totalMaxScore = 0;

  return (
    <div className="py-6 px-4">
      {/* Top Action Bar */}
      <div className="max-w-[210mm] mx-auto mb-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-slate-700">
            Kunci Jawaban, Pembahasan &amp; Pedoman Penskoran
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
            onClick={onDownloadKeysDocx}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh Kunci (.docx)
          </button>
        </div>
      </div>

      {/* A4 Sheet */}
      <div
        id="printable-answer-key"
        className="max-w-[210mm] mx-auto bg-white shadow-xl rounded-sm p-[15mm] sm:p-[20mm] border border-slate-200 text-black font-sans print-sheet print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full"
      >
        {/* Header Title */}
        <div className="text-center mb-6 border-b border-black pb-3">
          <div className="text-xs font-bold uppercase text-slate-600 tracking-wider">
            {header.namaSekolah}
          </div>
          <h2 className="text-base sm:text-lg font-extrabold uppercase mt-1">
            KUNCI JAWABAN &amp; PEDOMAN PENSKORAN ASESMEN SUMATIF
          </h2>
          <div className="text-xs text-slate-700 mt-1 font-medium">
            {header.mataPelajaran} • Kelas {header.kelas} ({header.fase}) • Semester {header.semester} TP {header.tahunPelajaran}
          </div>
        </div>

        {/* Table of Keys */}
        <table className="w-full border-collapse border border-black text-xs mb-6">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-black p-2 w-10 text-center font-bold">No</th>
              <th className="border border-black p-2 w-28 text-left font-bold">Tipe Soal</th>
              <th className="border border-black p-2 text-left font-bold">Kunci Jawaban Benar</th>
              <th className="border border-black p-2 text-left font-bold">Pembahasan / Catatan</th>
              <th className="border border-black p-2 w-14 text-center font-bold">Bobot</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => {
              totalMaxScore += q.score;

              let typeLabel = '';
              let keyContent = null;

              if (q.type === 'pilihan_ganda') {
                typeLabel = 'Pilihan Ganda';
                const correctOpt = q.options.find((o) => o.key === q.correctAnswer);
                keyContent = (
                  <div>
                    <span className="font-bold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 mr-1.5">
                      {q.correctAnswer}
                    </span>
                    <span>{correctOpt ? correctOpt.text : ''}</span>
                  </div>
                );
              } else if (q.type === 'pilihan_ganda_kompleks') {
                typeLabel = 'PG Kompleks';
                const correctOpts = q.options.filter((o) => o.isCorrect);
                keyContent = (
                  <div className="space-y-1">
                    {correctOpts.map((o) => (
                      <div key={o.key} className="flex items-start gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-bold">{o.key}.</span>
                        <span>{o.text}</span>
                      </div>
                    ))}
                  </div>
                );
              } else if (q.type === 'pilihan_ganda_kategori') {
                typeLabel = 'PGK Benar/Salah';
                keyContent = (
                  <div className="space-y-1">
                    {q.statements.map((st, i) => (
                      <div key={i} className="text-[11px] flex items-center justify-between border-b border-slate-100 last:border-b-0 pb-0.5">
                        <span className="line-clamp-1">{i + 1}. {st.statement}</span>
                        <span
                          className={`font-bold px-1.5 py-0.2 rounded text-[10px] ml-2 shrink-0 ${
                            st.correctAnswer === 'Benar'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {st.correctAnswer}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              } else if (q.type === 'isian') {
                typeLabel = 'Isian Singkat';
                keyContent = (
                  <div className="font-bold text-emerald-900 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    {q.correctAnswer}
                  </div>
                );
              } else {
                typeLabel = 'Uraian';
                keyContent = (
                  <div className="text-[11px] space-y-1">
                    <div className="font-medium whitespace-pre-line bg-purple-50/70 p-1.5 rounded border border-purple-200">
                      {q.correctAnswer}
                    </div>
                    {q.rubricGuidelines && q.rubricGuidelines.length > 0 && (
                      <div className="text-[10px] text-slate-600 italic">
                        <strong>Rubrik:</strong> {q.rubricGuidelines.join(' | ')}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <tr key={q.id}>
                  <td className="border border-black p-2 text-center font-bold">{q.number}</td>
                  <td className="border border-black p-2 text-slate-600 font-medium">{typeLabel}</td>
                  <td className="border border-black p-2 leading-relaxed">{keyContent}</td>
                  <td className="border border-black p-2 text-slate-600 italic text-[11px]">
                    {q.explanation || '-'}
                  </td>
                  <td className="border border-black p-2 text-center font-bold">{q.score}</td>
                </tr>
              );
            })}
            <tr className="bg-slate-100 font-bold">
              <td colSpan={4} className="border border-black p-2 text-right">
                TOTAL SKOR MAKSIMAL :
              </td>
              <td className="border border-black p-2 text-center text-blue-700 text-sm">
                {totalMaxScore}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Formula Penilaian */}
        <div className="border border-slate-300 p-3 bg-slate-50 rounded-sm mb-8 text-xs">
          <div className="font-bold text-slate-800 mb-1">RUMUS PERHITUNGAN NILAI AKHIR (SKOR 0 - 100):</div>
          <div className="font-mono text-sm text-blue-800 font-bold bg-white p-2 rounded border border-slate-200 text-center">
            Nilai Akhir = ( Skor Perolehan Siswa ÷ {totalMaxScore} ) × 100
          </div>
        </div>

        {/* Tanda Tangan */}
        <div className="grid grid-cols-2 gap-8 text-xs text-center pt-4">
          <div>
            <div>Mengetahui,</div>
            <div className="font-bold">Kepala Sekolah</div>
            <div className="h-20"></div>
            <div className="font-bold underline">( ..................................................... )</div>
            <div>NIP. ...............................................</div>
          </div>
          <div>
            <div>Guru Penyusun / Pengampu,</div>
            <div className="font-bold">{header.mataPelajaran}</div>
            <div className="h-20"></div>
            <div className="font-bold underline">
              ( {header.namaPenyusun || '.................................................'} )
            </div>
            <div>NIP. {header.nipPenyusun || '...............................................'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
