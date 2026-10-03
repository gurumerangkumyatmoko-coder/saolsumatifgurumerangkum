import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ImageRun,
  Packer,
  PageBreak
} from 'docx';
import { saveAs } from 'file-saver';
import { AnyQuestion, ExamPackage } from '../types/exam';
import { getDiagramById, convertSvgToPngDataUrl, convertImageUrlToDataUrl } from './diagramLibrary';

function base64ToUint8Array(dataUrl: string): Uint8Array {
  const commaIdx = dataUrl.indexOf(',');
  const base64 = commaIdx !== -1 ? dataUrl.substring(commaIdx + 1) : dataUrl;
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function prepareQuestionImage(q: AnyQuestion): Promise<Uint8Array | null> {
  if (!q.hasImage) return null;
  try {
    if (q.imageDataUrl && q.imageDataUrl.startsWith('data:image/')) {
      return base64ToUint8Array(q.imageDataUrl);
    }
    if (q.imageUrl) {
      const dataUrl = await convertImageUrlToDataUrl(q.imageUrl, 520, 360);
      return base64ToUint8Array(dataUrl);
    }
    if (q.imageKey) {
      const diagram = getDiagramById(q.imageKey);
      if (diagram) {
        if (diagram.imageUrl) {
          const dataUrl = await convertImageUrlToDataUrl(diagram.imageUrl, 520, 360);
          return base64ToUint8Array(dataUrl);
        }
        if (diagram.svg) {
          const pngUrl = await convertSvgToPngDataUrl(
            diagram.svg,
            520,
            240,
            diagram.name
          );
          return base64ToUint8Array(pngUrl);
        }
      }
    }
  } catch (err) {
    console.warn('Could not render question image for docx, skipping image:', err);
  }
  return null;
}

export type ExportDocxType = 'full' | 'questions_only' | 'keys_only' | 'answer_sheet';

export async function exportExamToDocx(
  exam: ExamPackage,
  exportType: ExportDocxType = 'full'
): Promise<void> {
  const { header, questions } = exam;

  // Pre-render any diagrams/images to uint8 arrays
  const imageMap = new Map<string, Uint8Array>();
  for (const q of questions) {
    if (q.hasImage) {
      const bytes = await prepareQuestionImage(q);
      if (bytes) {
        imageMap.set(q.id, bytes);
      }
    }
  }

  const sections: any[] = [];
  const children: any[] = [];

  // Helper for borders
  const thinBorder = {
    style: BorderStyle.SINGLE,
    size: 4,
    color: '94A3B8'
  };
  const tableBorders = {
    top: thinBorder,
    bottom: thinBorder,
    left: thinBorder,
    right: thinBorder,
    insideHorizontal: thinBorder,
    insideVertical: thinBorder
  };

  // --- KOP SURAT ---
  function buildKopSurat(): (Paragraph | Table)[] {
    const lines = header.dinasPendidikan.split('\n');
    const kopParas: Paragraph[] = lines.map(
      (line) =>
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: 240, before: 40, after: 40 },
          children: [
            new TextRun({
              text: line.toUpperCase(),
              bold: true,
              size: 22, // 11pt
              font: 'Times New Roman'
            })
          ]
        })
    );

    kopParas.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { line: 260, before: 60, after: 40 },
        children: [
          new TextRun({
            text: header.namaSekolah.toUpperCase(),
            bold: true,
            size: 26, // 13pt
            font: 'Times New Roman'
          })
        ]
      })
    );

    if (header.alamatSekolah) {
      kopParas.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: 240, after: 100 },
          children: [
            new TextRun({
              text: header.alamatSekolah,
              italics: true,
              size: 18, // 9pt
              font: 'Times New Roman'
            })
          ]
        })
      );
    }

    // Double divider line under Kop
    kopParas.push(
      new Paragraph({
        spacing: { after: 160 },
        border: {
          bottom: {
            color: '000000',
            size: 18,
            style: BorderStyle.DOUBLE
          }
        },
        children: []
      })
    );

    return kopParas;
  }

  // --- IDENTITAS SOAL TABLE ---
  function buildMetaTable(): Table {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE }
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 55, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Mata Pelajaran : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: header.mataPelajaran, size: 20, font: 'Times New Roman' })
                  ]
                }),
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Kelas / Fase    : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: `Kelas ${header.kelas} (${header.fase})`, size: 20, font: 'Times New Roman' })
                  ]
                }),
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Semester         : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: header.semester, size: 20, font: 'Times New Roman' })
                  ]
                }),
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Tahun Ajaran   : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: header.tahunPelajaran, size: 20, font: 'Times New Roman' })
                  ]
                })
              ]
            }),
            new TableCell({
              width: { size: 45, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Hari, Tanggal : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: header.tanggalPelaksanaan || '.............................', size: 20, font: 'Times New Roman' })
                  ]
                }),
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Waktu            : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: header.alokasiWaktu, size: 20, font: 'Times New Roman' })
                  ]
                }),
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Nama Siswa   : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: '.............................', size: 20, font: 'Times New Roman' })
                  ]
                }),
                new Paragraph({
                  spacing: { line: 240 },
                  children: [
                    new TextRun({ text: 'Nomor Absen : ', bold: true, size: 20, font: 'Times New Roman' }),
                    new TextRun({ text: '............', size: 20, font: 'Times New Roman' })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }

  // --- PETUNJUK UMUM ---
  function buildPetunjukUmum(): Paragraph[] {
    const paras: Paragraph[] = [
      new Paragraph({
        spacing: { before: 180, after: 60 },
        children: [
          new TextRun({
            text: 'PETUNJUK UMUM:',
            bold: true,
            size: 20,
            font: 'Times New Roman'
          })
        ]
      })
    ];

    header.petunjukUmum.forEach((p, idx) => {
      paras.push(
        new Paragraph({
          spacing: { line: 240, after: 40 },
          children: [
            new TextRun({
              text: `${idx + 1}. ${p}`,
              size: 19,
              font: 'Times New Roman'
            })
          ]
        })
      );
    });

    paras.push(
      new Paragraph({
        spacing: { before: 80, after: 180 },
        border: { bottom: { color: 'CCCCCC', size: 4, style: BorderStyle.SINGLE } },
        children: []
      })
    );

    return paras;
  }

  // If questions included (either 'full' or 'questions_only')
  if (exportType === 'full' || exportType === 'questions_only') {
    // 1. Kop
    children.push(...buildKopSurat());

    // Title banner
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 140 },
        children: [
          new TextRun({
            text: header.jenisAsesmen.toUpperCase(),
            bold: true,
            size: 24,
            font: 'Times New Roman'
          })
        ]
      })
    );

    // Meta table
    children.push(buildMetaTable());
    children.push(...buildPetunjukUmum());

    // Categorize questions
    const pgQuestions = questions.filter((q) => q.type === 'pilihan_ganda');
    const pgkQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kompleks');
    const katQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kategori');
    const isianQuestions = questions.filter((q) => q.type === 'isian');
    const uraianQuestions = questions.filter((q) => q.type === 'uraian');

    // Section I: PG
    if (pgQuestions.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: 'I. PILIHAN GANDA',
              bold: true,
              size: 22,
              font: 'Times New Roman'
            }),
            new TextRun({
              text: '\nBerilah tanda silang (X) pada huruf A, B, C, atau D di depan jawaban yang paling tepat!',
              italics: true,
              size: 20,
              font: 'Times New Roman'
            })
          ]
        })
      );

      for (const q of pgQuestions) {
        // Question text
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 60, line: 260 },
            children: [
              new TextRun({
                text: `${q.number}. `,
                bold: true,
                size: 21,
                font: 'Times New Roman'
              }),
              new TextRun({
                text: q.question,
                size: 21,
                font: 'Times New Roman'
              })
            ]
          })
        );

        // Image if present
        if (imageMap.has(q.id)) {
          const imgBytes = imageMap.get(q.id)!;
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 40 },
              children: [
                new ImageRun({
                  data: imgBytes,
                  transformation: { width: 380, height: 180 },
                  type: 'png'
                })
              ]
            })
          );
          if (q.imageCaption) {
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [
                  new TextRun({
                    text: q.imageCaption,
                    italics: true,
                    size: 18,
                    font: 'Times New Roman'
                  })
                ]
              })
            );
          }
        }

        // Options
        for (const opt of q.options) {
          children.push(
            new Paragraph({
              indent: { left: 400 },
              spacing: { line: 240, after: 40 },
              children: [
                new TextRun({
                  text: `${opt.key}.  `,
                  bold: true,
                  size: 20,
                  font: 'Times New Roman'
                }),
                new TextRun({
                  text: opt.text,
                  size: 20,
                  font: 'Times New Roman'
                })
              ]
            })
          );
        }
      }
    }

    // Section II: PGK (Pilihan Ganda Kompleks)
    if (pgkQuestions.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 240, after: 100 },
          children: [
            new TextRun({
              text: 'II. PILIHAN GANDA KOMPLEKS (LEBIH DARI SATU JAWABAN BENAR)',
              bold: true,
              size: 22,
              font: 'Times New Roman'
            }),
            new TextRun({
              text: '\nPilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang (✓) pada kotak di depan pilihan jawaban!',
              italics: true,
              size: 20,
              font: 'Times New Roman'
            })
          ]
        })
      );

      for (const q of pgkQuestions) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 60, line: 260 },
            children: [
              new TextRun({
                text: `${q.number}. `,
                bold: true,
                size: 21,
                font: 'Times New Roman'
              }),
              new TextRun({
                text: q.question,
                size: 21,
                font: 'Times New Roman'
              })
            ]
          })
        );

        if (imageMap.has(q.id)) {
          const imgBytes = imageMap.get(q.id)!;
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 40 },
              children: [
                new ImageRun({
                  data: imgBytes,
                  transformation: { width: 380, height: 180 },
                  type: 'png'
                })
              ]
            })
          );
          if (q.imageCaption) {
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [
                  new TextRun({
                    text: q.imageCaption,
                    italics: true,
                    size: 18,
                    font: 'Times New Roman'
                  })
                ]
              })
            );
          }
        }

        // 3 Options with checkboxes
        for (const opt of q.options) {
          children.push(
            new Paragraph({
              indent: { left: 400 },
              spacing: { line: 240, after: 50 },
              children: [
                new TextRun({
                  text: '[   ]  ',
                  bold: true,
                  size: 22,
                  font: 'Consolas'
                }),
                new TextRun({
                  text: `${opt.key}. `,
                  bold: true,
                  size: 20,
                  font: 'Times New Roman'
                }),
                new TextRun({
                  text: opt.text,
                  size: 20,
                  font: 'Times New Roman'
                })
              ]
            })
          );
        }
      }
    }

    // Section III: PGK Kategori (Benar/Salah Table)
    if (katQuestions.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 240, after: 100 },
          children: [
            new TextRun({
              text: 'III. PILIHAN GANDA KOMPLEKS KATEGORI (BENAR / SALAH)',
              bold: true,
              size: 22,
              font: 'Times New Roman'
            }),
            new TextRun({
              text: '\nBacalah pernyataan-pernyataan berikut dengan seksama, kemudian berilah tanda centang (✓) pada kolom Benar atau Salah!',
              italics: true,
              size: 20,
              font: 'Times New Roman'
            })
          ]
        })
      );

      for (const q of katQuestions) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 60, line: 260 },
            children: [
              new TextRun({
                text: `${q.number}. `,
                bold: true,
                size: 21,
                font: 'Times New Roman'
              }),
              new TextRun({
                text: q.question,
                size: 21,
                font: 'Times New Roman'
              })
            ]
          })
        );

        if (imageMap.has(q.id)) {
          const imgBytes = imageMap.get(q.id)!;
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 40 },
              children: [
                new ImageRun({
                  data: imgBytes,
                  transformation: { width: 380, height: 180 },
                  type: 'png'
                })
              ]
            })
          );
          if (q.imageCaption) {
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [
                  new TextRun({
                    text: q.imageCaption,
                    italics: true,
                    size: 18,
                    font: 'Times New Roman'
                  })
                ]
              })
            );
          }
        }

        // Table for statements with Benar / Salah columns
        const statementRows = [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 10, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: 'No', bold: true, size: 20, font: 'Times New Roman' })]
                  })
                ]
              }),
              new TableCell({
                width: { size: 66, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: 'Pernyataan / Deskripsi', bold: true, size: 20, font: 'Times New Roman' })]
                  })
                ]
              }),
              new TableCell({
                width: { size: 12, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: 'Benar', bold: true, size: 20, font: 'Times New Roman' })]
                  })
                ]
              }),
              new TableCell({
                width: { size: 12, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: 'Salah', bold: true, size: 20, font: 'Times New Roman' })]
                  })
                ]
              })
            ]
          })
        ];

        q.statements.forEach((st, sIdx) => {
          statementRows.push(
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: `${sIdx + 1}`, size: 20, font: 'Times New Roman' })]
                    })
                  ]
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      spacing: { line: 240 },
                      children: [new TextRun({ text: st.statement, size: 20, font: 'Times New Roman' })]
                    })
                  ]
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: '[   ]', size: 20, font: 'Consolas' })]
                    })
                  ]
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: '[   ]', size: 20, font: 'Consolas' })]
                    })
                  ]
                })
              ]
            })
          );
        });

        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: statementRows
          })
        );
        children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
      }
    }

    // Section IV: Isian Singkat
    if (isianQuestions.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 240, after: 100 },
          children: [
            new TextRun({
              text: 'IV. ISIAN SINGKAT',
              bold: true,
              size: 22,
              font: 'Times New Roman'
            }),
            new TextRun({
              text: '\nIsilah titik-titik di bawah ini dengan jawaban yang singkat, tepat, dan benar!',
              italics: true,
              size: 20,
              font: 'Times New Roman'
            })
          ]
        })
      );

      for (const q of isianQuestions) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 80, line: 260 },
            children: [
              new TextRun({
                text: `${q.number}. `,
                bold: true,
                size: 21,
                font: 'Times New Roman'
              }),
              new TextRun({
                text: q.question,
                size: 21,
                font: 'Times New Roman'
              })
            ]
          })
        );

        if (imageMap.has(q.id)) {
          const imgBytes = imageMap.get(q.id)!;
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 40 },
              children: [
                new ImageRun({
                  data: imgBytes,
                  transformation: { width: 380, height: 180 },
                  type: 'png'
                })
              ]
            })
          );
          if (q.imageCaption) {
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [
                  new TextRun({
                    text: q.imageCaption,
                    italics: true,
                    size: 18,
                    font: 'Times New Roman'
                  })
                ]
              })
            );
          }
        }
      }
    }

    // Section V: Uraian
    if (uraianQuestions.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 240, after: 100 },
          children: [
            new TextRun({
              text: 'V. URAIAN / ESSAY',
              bold: true,
              size: 22,
              font: 'Times New Roman'
            }),
            new TextRun({
              text: '\nJawablah pertanyaan-pertanyaan di bawah ini secara jelas, lengkap, dan runtut!',
              italics: true,
              size: 20,
              font: 'Times New Roman'
            })
          ]
        })
      );

      for (const q of uraianQuestions) {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 60, line: 260 },
            children: [
              new TextRun({
                text: `${q.number}. `,
                bold: true,
                size: 21,
                font: 'Times New Roman'
              }),
              new TextRun({
                text: q.question,
                size: 21,
                font: 'Times New Roman'
              })
            ]
          })
        );

        if (imageMap.has(q.id)) {
          const imgBytes = imageMap.get(q.id)!;
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 40 },
              children: [
                new ImageRun({
                  data: imgBytes,
                  transformation: { width: 380, height: 180 },
                  type: 'png'
                })
              ]
            })
          );
          if (q.imageCaption) {
            children.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
                children: [
                  new TextRun({
                    text: q.imageCaption,
                    italics: true,
                    size: 18,
                    font: 'Times New Roman'
                  })
                ]
              })
            );
          }
        }

        // Blank lines for answering
        children.push(
          new Paragraph({
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({
                text: 'Jawab:\n....................................................................................................................................................................................\n....................................................................................................................................................................................\n....................................................................................................................................................................................',
                size: 20,
                color: '94A3B8',
                font: 'Times New Roman'
              })
            ]
          })
        );
      }
    }
  }

  // --- KUNCI JAWABAN & PEMBAHASAN SECTION ---
  if (exportType === 'full' || exportType === 'keys_only') {
    if (exportType === 'full') {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 60 },
        children: [
          new TextRun({
            text: 'KUNCI JAWABAN, PEMBAHASAN & PEDOMAN PENSKORAN',
            bold: true,
            size: 24,
            font: 'Times New Roman'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: `${header.mataPelajaran} - Kelas ${header.kelas} (${header.fase}) - Tahun Ajaran ${header.tahunPelajaran}`,
            italics: true,
            size: 20,
            font: 'Times New Roman'
          })
        ]
      })
    );

    // Kunci Jawaban Table
    const keyRows = [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 8, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'No', bold: true, size: 20, font: 'Times New Roman' })] })]
          }),
          new TableCell({
            width: { size: 18, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tipe Soal', bold: true, size: 20, font: 'Times New Roman' })] })]
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Kunci Jawaban', bold: true, size: 20, font: 'Times New Roman' })] })]
          }),
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Pembahasan / Catatan', bold: true, size: 20, font: 'Times New Roman' })] })]
          }),
          new TableCell({
            width: { size: 10, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Skor', bold: true, size: 20, font: 'Times New Roman' })] })]
          })
        ]
      })
    ];

    let totalScore = 0;
    for (const q of questions) {
      totalScore += q.score;
      let keyText = '';
      let typeLabel = '';

      if (q.type === 'pilihan_ganda') {
        typeLabel = 'Pilihan Ganda';
        const correctOpt = q.options.find((o) => o.key === q.correctAnswer);
        keyText = `${q.correctAnswer} (${correctOpt ? correctOpt.text : ''})`;
      } else if (q.type === 'pilihan_ganda_kompleks') {
        typeLabel = 'PG Kompleks';
        const correctOpts = q.options.filter((o) => o.isCorrect).map((o) => `${o.key}. ${o.text}`);
        keyText = correctOpts.join('\n');
      } else if (q.type === 'pilihan_ganda_kategori') {
        typeLabel = 'PGK Benar/Salah';
        keyText = q.statements.map((st, i) => `${i + 1}. [${st.correctAnswer}]`).join('\n');
      } else if (q.type === 'isian') {
        typeLabel = 'Isian Singkat';
        keyText = q.correctAnswer;
      } else if (q.type === 'uraian') {
        typeLabel = 'Uraian';
        keyText = q.correctAnswer;
      }

      keyRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${q.number}`, size: 20, font: 'Times New Roman' })] })]
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: typeLabel, size: 19, font: 'Times New Roman' })] })]
            }),
            new TableCell({
              children: [new Paragraph({ spacing: { line: 240 }, children: [new TextRun({ text: keyText, bold: true, size: 19, font: 'Times New Roman' })] })]
            }),
            new TableCell({
              children: [new Paragraph({ spacing: { line: 240 }, children: [new TextRun({ text: q.explanation || '-', size: 18, font: 'Times New Roman' })] })]
            }),
            new TableCell({
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${q.score}`, bold: true, size: 20, font: 'Times New Roman' })] })]
            })
          ]
        })
      );
    }

    // Total score row
    keyRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [] })]
          }),
          new TableCell({
            children: [new Paragraph({ children: [] })]
          }),
          new TableCell({
            children: [new Paragraph({ children: [] })]
          }),
          new TableCell({
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'TOTAL SKOR MAKSIMAL :', bold: true, size: 20, font: 'Times New Roman' })] })]
          }),
          new TableCell({
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totalScore}`, bold: true, size: 22, color: '0284C7', font: 'Times New Roman' })] })]
          })
        ]
      })
    );

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: tableBorders,
        rows: keyRows
      })
    );

    // Formula Penilaian & Signature
    children.push(
      new Paragraph({
        spacing: { before: 180, after: 60 },
        children: [
          new TextRun({
            text: 'PEDOMAN PENILAIAN AKHIR:',
            bold: true,
            size: 20,
            font: 'Times New Roman'
          })
        ]
      }),
      new Paragraph({
        spacing: { after: 180, line: 240 },
        children: [
          new TextRun({
            text: 'Nilai Akhir = (Total Skor yang Diperoleh Peserta Didik ÷ Total Skor Maksimal) × 100',
            bold: true,
            italics: true,
            size: 20,
            font: 'Times New Roman'
          })
        ]
      })
    );

    // Signature table
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: 'Mengetahui,\nKepala Sekolah\n\n\n\n', size: 20, font: 'Times New Roman' }),
                      new TextRun({ text: '( ..................................................... )', bold: true, size: 20, font: 'Times New Roman' }),
                      new TextRun({ text: '\nNIP. ...............................................', size: 19, font: 'Times New Roman' })
                    ]
                  })
                ]
              }),
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({ text: `Guru Penyusun / Pengampu,\n\n\n\n`, size: 20, font: 'Times New Roman' }),
                      new TextRun({ text: `( ${header.namaPenyusun || '.................................................'} )`, bold: true, size: 20, font: 'Times New Roman' }),
                      new TextRun({ text: `\nNIP. ${header.nipPenyusun || '...............................................'}`, size: 19, font: 'Times New Roman' })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    );
  }

  // --- LEMBAR JAWABAN SISWA (LJK) SECTION ---
  if (exportType === 'full' || exportType === 'answer_sheet') {
    if (exportType === 'full') {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({
            text: 'LEMBAR JAWABAN SISWA',
            bold: true,
            size: 24,
            font: 'Times New Roman'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: `${header.jenisAsesmen.toUpperCase()} - ${header.mataPelajaran.toUpperCase()}`,
            bold: true,
            size: 20,
            font: 'Times New Roman'
          })
        ]
      }),
      buildMetaTable(),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        border: { bottom: { color: '000000', size: 6, style: BorderStyle.SINGLE } },
        children: []
      }),
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({
            text: 'PETUNJUK PENGERJAAN LEMBAR JAWABAN:',
            bold: true,
            size: 19,
            font: 'Times New Roman'
          }),
          new TextRun({
            text: '\n• Untuk Pilihan Ganda, silanglah (X) kotak huruf A, B, C, atau D.\n• Untuk Pilihan Ganda Kompleks & Kategori, berilah tanda centang (✓) pada kotak pilihanmu.\n• Tuliskan jawaban isian singkat dan uraian pada kolom yang telah disediakan.',
            size: 18,
            font: 'Times New Roman'
          })
        ]
      })
    );

    // LJK Grid for PG
    const pgList = questions.filter((q) => q.type === 'pilihan_ganda');
    if (pgList.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [new TextRun({ text: 'A. LEMBAR PILIHAN GANDA', bold: true, size: 20, font: 'Times New Roman' })]
        })
      );
      for (const q of pgList) {
        children.push(
          new Paragraph({
            spacing: { line: 240, after: 40 },
            children: [
              new TextRun({ text: `No. ${q.number} :   `, bold: true, size: 20, font: 'Times New Roman' }),
              new TextRun({ text: '[ A ]    [ B ]    [ C ]    [ D ]', size: 20, font: 'Consolas' })
            ]
          })
        );
      }
    }

    // LJK for PGK
    const pgkList = questions.filter((q) => q.type === 'pilihan_ganda_kompleks');
    if (pgkList.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 140, after: 60 },
          children: [new TextRun({ text: 'B. LEMBAR PILIHAN GANDA KOMPLEKS (Centang ✓)', bold: true, size: 20, font: 'Times New Roman' })]
        })
      );
      for (const q of pgkList) {
        children.push(
          new Paragraph({
            spacing: { line: 240, after: 40 },
            children: [
              new TextRun({ text: `No. ${q.number} :   `, bold: true, size: 20, font: 'Times New Roman' }),
              new TextRun({ text: '[  ] Pilihan A      [  ] Pilihan B      [  ] Pilihan C', size: 19, font: 'Consolas' })
            ]
          })
        );
      }
    }

    // LJK for Isian
    const isianList = questions.filter((q) => q.type === 'isian');
    if (isianList.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 140, after: 60 },
          children: [new TextRun({ text: 'C. LEMBAR ISIAN SINGKAT', bold: true, size: 20, font: 'Times New Roman' })]
        })
      );
      for (const q of isianList) {
        children.push(
          new Paragraph({
            spacing: { line: 260, after: 50 },
            children: [
              new TextRun({ text: `${q.number}. `, bold: true, size: 20, font: 'Times New Roman' }),
              new TextRun({ text: '........................................................................................................................', size: 20, font: 'Times New Roman' })
            ]
          })
        );
      }
    }
  }

  // Create docx Document
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              bottom: 1000,
              left: 1200,
              right: 1200
            }
          }
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const cleanSubject = header.mataPelajaran.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Soal_Sumatif_SD_Kelas_${header.kelas}_${cleanSubject}_${exportType}.docx`;
  saveAs(blob, filename);
}
