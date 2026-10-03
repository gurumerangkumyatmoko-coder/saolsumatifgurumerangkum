import React from 'react';
import { ExamPackage, AnyQuestion } from '../types/exam';
import { getDiagramById } from '../utils/diagramLibrary';
import { Printer, Download, Eye, PackageCheck } from 'lucide-react';

interface PrintAllSectionsProps {
  exam: ExamPackage;
  onPrint: () => void;
  onDownloadFullDocx: () => void;
}

export const PrintAllSections: React.FC<PrintAllSectionsProps> = ({
  exam,
  onPrint,
  onDownloadFullDocx
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
      <div className="my-2.5 flex flex-col items-center avoid-break-inside">
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

  let totalMaxScore = 0;

  return (
    <div className="py-6 px-4">
      {/* Top Action Bar */}
      <div className="max-w-[210mm] mx-auto mb-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <PackageCheck className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-semibold text-slate-700">
            Pratinjau Paket Lengkap (Naskah Soal + Kunci Jawaban + Lembar Jawab LJK)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Cetak Semua Halaman (PDF)
          </button>
          <button
            onClick={onDownloadFullDocx}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh Paket DOCX
          </button>
        </div>
      </div>

      {/* Container for All Sections */}
      <div id="printable-all-package" className="max-w-[210mm] mx-auto space-y-8">
        {/* ================= SECTION 1: NASKAH SOAL SISWA ================= */}
        <div className="bg-white shadow-xl rounded-sm p-[15mm] sm:p-[20mm] border border-slate-200 text-black font-serif print-sheet print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full">
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
            <div className="border-b-[3px] border-double border-black mt-2 mb-3"></div>
          </div>

          {/* TITLE BANNER */}
          <div className="text-center font-extrabold text-sm sm:text-base uppercase tracking-wider mb-4">
            {header.jenisAsesmen}
          </div>

          {/* METADATA TABLE */}
          <div className="border border-slate-400 p-2.5 rounded-sm mb-4 text-xs sm:text-sm font-sans avoid-break-inside">
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
          <div className="border border-slate-300 bg-slate-50/50 p-2.5 rounded-sm mb-5 text-[11px] sm:text-xs font-sans avoid-break-inside">
            <div className="font-bold mb-1">PETUNJUK UMUM:</div>
            <ol className="list-decimal ml-4 space-y-0.5 text-slate-700">
              {header.petunjukUmum.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ol>
          </div>

          {/* PG */}
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
                  <div key={q.id} className="text-xs sm:text-sm avoid-break-inside">
                    <div className="flex items-start gap-1.5 font-medium leading-relaxed">
                      <span className="font-bold shrink-0">{q.number}.</span>
                      <span className="whitespace-pre-line">{q.question}</span>
                    </div>

                    {renderQuestionImage(q)}

                    <div className="mt-2 ml-5 space-y-1 font-sans">
                      {q.options.map((opt) => (
                        <div key={opt.key} className="flex items-start gap-2">
                          <span className="font-bold w-4 shrink-0">{opt.key}.</span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PGK */}
          {pgkQuestions.length > 0 && (
            <div className="mb-6">
              <div className="font-bold text-xs sm:text-sm uppercase tracking-wide mb-0.5">
                II. PILIHAN GANDA KOMPLEKS (LEBIH DARI SATU JAWABAN BENAR)
              </div>
              <div className="text-[11px] sm:text-xs italic text-slate-600 mb-3">
                Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓] pada kotak yang tersedia!
              </div>

              <div className="space-y-4">
                {pgkQuestions.map((q) => (
                  <div key={q.id} className="text-xs sm:text-sm avoid-break-inside">
                    <div className="flex items-start gap-1.5 font-medium leading-relaxed">
                      <span className="font-bold shrink-0">{q.number}.</span>
                      <span className="whitespace-pre-line">{q.question}</span>
                    </div>

                    {renderQuestionImage(q)}

                    <div className="mt-2 ml-5 space-y-1.5 font-sans">
                      {q.options.map((opt) => (
                        <div key={opt.key} className="flex items-start gap-2.5">
                          <span className="inline-block w-4 h-4 border border-black text-center font-mono text-xs leading-none shrink-0 mt-0.5">
                            &nbsp;
                          </span>
                          <span className="font-bold w-4 shrink-0">{opt.key}.</span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PGK Kategori */}
          {katQuestions.length > 0 && (
            <div className="mb-6">
              <div className="font-bold text-xs sm:text-sm uppercase tracking-wide mb-0.5">
                III. PILIHAN GANDA KOMPLEKS KATEGORI (BENAR / SALAH)
              </div>
              <div className="text-[11px] sm:text-xs italic text-slate-600 mb-3">
                Tentukan pernyataan-pernyataan berikut Benar atau Salah dengan memberi tanda centang (✓) pada kolom yang tepat!
              </div>

              <div className="space-y-4">
                {katQuestions.map((q) => (
                  <div key={q.id} className="text-xs sm:text-sm avoid-break-inside">
                    <div className="flex items-start gap-1.5 font-medium leading-relaxed mb-2">
                      <span className="font-bold shrink-0">{q.number}.</span>
                      <span className="whitespace-pre-line">{q.question}</span>
                    </div>

                    {renderQuestionImage(q)}

                    <table className="w-full border-collapse border border-black font-sans text-xs">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-black p-1.5 text-center w-8">No</th>
                          <th className="border border-black p-1.5 text-left">Pernyataan / Deskripsi</th>
                          <th className="border border-black p-1.5 text-center w-16">Benar</th>
                          <th className="border border-black p-1.5 text-center w-16">Salah</th>
                        </tr>
                      </thead>
                      <tbody>
                        {q.statements.map((st, sIdx) => (
                          <tr key={sIdx}>
                            <td className="border border-black p-1.5 text-center font-bold">
                              {String.fromCharCode(97 + sIdx)}.
                            </td>
                            <td className="border border-black p-1.5 leading-snug">{st.statement}</td>
                            <td className="border border-black p-1.5 text-center font-bold text-slate-400">[ &nbsp; ]</td>
                            <td className="border border-black p-1.5 text-center font-bold text-slate-400">[ &nbsp; ]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Isian */}
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
                  <div key={q.id} className="text-xs sm:text-sm avoid-break-inside">
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

          {/* Uraian */}
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
                  <div key={q.id} className="text-xs sm:text-sm avoid-break-inside">
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

        {/* ================= PAGE BREAK TO SECTION 2 ================= */}
        <div className="page-break my-8 border-b-2 border-dashed border-slate-300 print:border-none print:my-0"></div>

        {/* ================= SECTION 2: KUNCI JAWABAN & PENSKORAN ================= */}
        <div className="bg-white shadow-xl rounded-sm p-[15mm] sm:p-[20mm] border border-slate-200 text-black font-sans print-sheet print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full">
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

          <table className="w-full border-collapse border border-black text-xs mb-6">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-black p-2 text-center w-10">No</th>
                <th className="border border-black p-2 text-center w-28">Tipe Soal</th>
                <th className="border border-black p-2 text-left">Kunci Jawaban Resmi</th>
                <th className="border border-black p-2 text-left">Pembahasan / Rubrik Penilaian</th>
                <th className="border border-black p-2 text-center w-16">Skor</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => {
                totalMaxScore += q.score;
                return (
                  <tr key={q.id} className="avoid-break-inside">
                    <td className="border border-black p-2 text-center font-bold">{q.number}</td>
                    <td className="border border-black p-2 text-center capitalize font-medium">
                      {q.type.replace(/_/g, ' ')}
                    </td>
                    <td className="border border-black p-2 font-semibold">
                      {q.type === 'pilihan_ganda' && <span>{q.correctAnswer}</span>}
                      {q.type === 'pilihan_ganda_kompleks' && (
                        <span>
                          {q.options.filter((o) => o.isCorrect).map((o) => o.key).join(', ')}
                        </span>
                      )}
                      {q.type === 'pilihan_ganda_kategori' && (
                        <div className="space-y-0.5">
                          {q.statements.map((s, idx) => (
                            <div key={idx}>
                              {String.fromCharCode(97 + idx)}. {s.correctAnswer}
                            </div>
                          ))}
                        </div>
                      )}
                      {(q.type === 'isian' || q.type === 'uraian') && (
                        <span className="whitespace-pre-line">{q.correctAnswer}</span>
                      )}
                    </td>
                    <td className="border border-black p-2 text-slate-700">
                      <div>{q.explanation}</div>
                      {q.type === 'uraian' && q.rubricGuidelines && (
                        <ul className="list-disc ml-4 mt-1 text-[11px] text-slate-600">
                          {q.rubricGuidelines.map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="border border-black p-2 text-center font-bold text-blue-700">
                      {q.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold">
                <td colSpan={4} className="border border-black p-2 text-right">
                  TOTAL SKOR MAKSIMAL:
                </td>
                <td className="border border-black p-2 text-center text-blue-900 font-extrabold text-sm">
                  {totalMaxScore}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Formula Penilaian */}
          <div className="border border-black p-3 bg-slate-50 text-xs avoid-break-inside">
            <div className="font-bold text-slate-900 mb-1">RUMUS PENGHITUNGAN NILAI AKHIR (SKALA 0 - 100):</div>
            <div className="font-mono bg-white p-2 border border-slate-300 text-center font-bold my-1 text-sm">
              Nilai Akhir = ( Skor Perolehan Siswa ÷ {totalMaxScore} ) × 100
            </div>
          </div>
        </div>

        {/* ================= PAGE BREAK TO SECTION 3 ================= */}
        <div className="page-break my-8 border-b-2 border-dashed border-slate-300 print:border-none print:my-0"></div>

        {/* ================= SECTION 3: LEMBAR JAWABAN SISWA (LJK) ================= */}
        <div className="bg-white shadow-xl rounded-sm p-[15mm] sm:p-[20mm] border border-slate-200 text-black font-sans print-sheet print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full">
          <div className="text-center mb-4 border-b-2 border-black pb-2">
            <div className="text-xs font-bold uppercase text-slate-600">
              {header.namaSekolah}
            </div>
            <h2 className="text-base sm:text-lg font-extrabold uppercase mt-1">
              LEMBAR JAWABAN PESERTA DIDIK
            </h2>
            <div className="text-xs font-semibold text-slate-800">
              {header.jenisAsesmen} • TP {header.tahunPelajaran}
            </div>
          </div>

          {/* Biodata Siswa */}
          <div className="border border-black p-3 mb-5 text-xs avoid-break-inside">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-24 font-bold shrink-0">Nama Lengkap</span>
                  <span className="mr-2">:</span>
                  <span className="flex-1 border-b border-dotted border-black"></span>
                </div>
                <div className="flex">
                  <span className="w-24 font-bold shrink-0">Nomor Absen</span>
                  <span className="mr-2">:</span>
                  <span className="flex-1 border-b border-dotted border-black"></span>
                </div>
                <div className="flex">
                  <span className="w-24 font-bold shrink-0">Kelas / Fase</span>
                  <span className="mr-2">:</span>
                  <span>Kelas {header.kelas} ({header.fase})</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-24 font-bold shrink-0">Mata Pelajaran</span>
                  <span className="mr-2">:</span>
                  <span className="font-semibold">{header.mataPelajaran}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-bold shrink-0">Hari, Tanggal</span>
                  <span className="mr-2">:</span>
                  <span>{header.tanggalPelaksanaan || '............................'}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-bold shrink-0">Nilai Perolehan</span>
                  <span className="mr-2">:</span>
                  <span className="w-16 h-8 border border-black inline-block text-center font-bold text-sm"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Respon PG */}
          {pgQuestions.length > 0 && (
            <div className="mb-5 avoid-break-inside">
              <div className="font-bold text-xs mb-2 bg-slate-100 p-1 border-y border-black">
                A. LEMBAR JAWABAN PILIHAN GANDA (Beri tanda silang X pada huruf yang benar)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {pgQuestions.map((q) => (
                  <div key={q.id} className="flex items-center gap-1.5 p-1 border border-slate-300">
                    <span className="font-bold w-5 text-right">{q.number}.</span>
                    <div className="flex gap-1.5 font-bold">
                      {q.options.map((opt) => (
                        <span key={opt.key} className="w-5 h-5 border border-black inline-flex items-center justify-center text-[10px]">
                          {opt.key}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Respon Isian Singkat */}
          {isianQuestions.length > 0 && (
            <div className="mb-5 avoid-break-inside">
              <div className="font-bold text-xs mb-2 bg-slate-100 p-1 border-y border-black">
                B. LEMBAR JAWABAN ISIAN SINGKAT
              </div>
              <div className="space-y-2 text-xs">
                {isianQuestions.map((q) => (
                  <div key={q.id} className="flex items-center gap-2">
                    <span className="font-bold w-6 text-right shrink-0">{q.number}.</span>
                    <div className="flex-1 border-b border-dotted border-black h-5"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tanda Tangan */}
          <div className="grid grid-cols-2 text-center text-xs mt-8 pt-4 border-t border-slate-300 avoid-break-inside">
            <div>
              <div>Mengetahui,</div>
              <div className="font-bold">Orang Tua / Wali Murid</div>
              <div className="mt-14 font-semibold">( ......................................... )</div>
            </div>
            <div>
              <div>..................., .................... 2025</div>
              <div className="font-bold">Guru Penguji / Penilai</div>
              <div className="mt-14 font-bold underline">{header.namaPenyusun || '.........................................'}</div>
              <div className="text-[11px] text-slate-600">NIP. {header.nipPenyusun || '.........................................'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
