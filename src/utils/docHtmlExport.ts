import { ExamPackage, AnyQuestion } from '../types/exam';
import { getDiagramById, convertSvgToPngDataUrl, convertImageUrlToDataUrl } from './diagramLibrary';

export async function exportExamToWordHtmlDoc(
  exam: ExamPackage,
  mode: 'full' | 'questions_only' | 'keys_only' = 'full'
): Promise<void> {
  const { header, questions } = exam;

  // Preload image data URLs
  const imageMap = new Map<string, string>();
  for (const q of questions) {
    if (q.hasImage) {
      if (q.imageDataUrl) {
        imageMap.set(q.id, q.imageDataUrl);
      } else if (q.imageUrl) {
        try {
          const imgData = await convertImageUrlToDataUrl(q.imageUrl, 520, 360);
          imageMap.set(q.id, imgData);
        } catch (e) {
          console.warn('Could not convert photo for doc:', e);
        }
      } else if (q.imageKey) {
        const diagram = getDiagramById(q.imageKey);
        if (diagram) {
          try {
            if (diagram.imageUrl) {
              const imgData = await convertImageUrlToDataUrl(diagram.imageUrl, 520, 360);
              imageMap.set(q.id, imgData);
            } else if (diagram.svg) {
              const pngData = await convertSvgToPngDataUrl(
                diagram.svg,
                520,
                240,
                diagram.name
              );
              imageMap.set(q.id, pngData);
            }
          } catch (e) {
            console.warn('Could not convert image for doc, skipping image:', e);
          }
        }
      }
    }
  }

  const pgQuestions = questions.filter((q) => q.type === 'pilihan_ganda');
  const pgkQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kompleks');
  const katQuestions = questions.filter((q) => q.type === 'pilihan_ganda_kategori');
  const isianQuestions = questions.filter((q) => q.type === 'isian');
  const uraianQuestions = questions.filter((q) => q.type === 'uraian');

  let htmlContent = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset="utf-8">
    <title>${header.jenisAsesmen} - ${header.mataPelajaran}</title>
    <style>
      @page {
        size: A4;
        margin: 2cm 2.5cm 2cm 2.5cm;
        mso-page-orientation: portrait;
      }
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt;
        line-height: 1.35;
        color: #000000;
      }
      .kop-text-dinas {
        text-align: center;
        font-size: 11pt;
        font-weight: bold;
        margin: 2px 0;
        text-transform: uppercase;
      }
      .kop-text-sekolah {
        text-align: center;
        font-size: 14pt;
        font-weight: bold;
        margin: 4px 0;
        text-transform: uppercase;
      }
      .kop-text-alamat {
        text-align: center;
        font-size: 9.5pt;
        font-style: italic;
        margin: 2px 0;
      }
      .kop-divider {
        border-top: 3px double #000000;
        margin-top: 8px;
        margin-bottom: 14px;
      }
      .exam-title {
        text-align: center;
        font-size: 13pt;
        font-weight: bold;
        margin-bottom: 14px;
        text-transform: uppercase;
      }
      .meta-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 12px;
        font-size: 11pt;
      }
      .meta-table td {
        padding: 3px 6px;
        vertical-align: top;
      }
      .petunjuk-box {
        border: 1px solid #777777;
        padding: 8px 12px;
        margin-bottom: 18px;
        font-size: 10.5pt;
        background-color: #fafafa;
      }
      .section-heading {
        font-size: 11.5pt;
        font-weight: bold;
        margin-top: 18px;
        margin-bottom: 6px;
      }
      .section-subtext {
        font-size: 10.5pt;
        font-style: italic;
        margin-bottom: 12px;
      }
      .question-item {
        margin-bottom: 14px;
        page-break-inside: avoid;
      }
      .question-text {
        margin-bottom: 6px;
      }
      .stimulus-img-wrapper {
        text-align: center;
        margin: 10px 0;
      }
      .stimulus-img {
        max-width: 480px;
        height: auto;
        border: 1px solid #cccccc;
      }
      .stimulus-caption {
        font-size: 9.5pt;
        font-style: italic;
        color: #333333;
        margin-top: 3px;
      }
      .options-list {
        margin-left: 20px;
      }
      .option-item {
        margin-bottom: 3px;
      }
      .kategori-table, .key-table {
        width: 100%;
        border-collapse: collapse;
        margin: 8px 0;
        font-size: 11pt;
      }
      .kategori-table th, .kategori-table td,
      .key-table th, .key-table td {
        border: 1px solid #000000;
        padding: 6px 8px;
      }
      .kategori-table th, .key-table th {
        background-color: #f1f5f9;
        text-align: center;
        font-weight: bold;
      }
      .page-break {
        page-break-before: always;
      }
      .signature-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
      }
      .signature-table td {
        width: 50%;
        text-align: center;
        vertical-align: top;
      }
    </style>
  </head>
  <body>
  `;

  // Questions Section
  if (mode === 'full' || mode === 'questions_only') {
    htmlContent += `
      <!-- KOP SURAT -->
      <div>
        ${header.dinasPendidikan.split('\n').map((l) => `<div class="kop-text-dinas">${l}</div>`).join('')}
        <div class="kop-text-sekolah">${header.namaSekolah}</div>
        ${header.alamatSekolah ? `<div class="kop-text-alamat">${header.alamatSekolah}</div>` : ''}
        <div class="kop-divider"></div>
      </div>

      <div class="exam-title">${header.jenisAsesmen}</div>

      <!-- METADATA TABLE -->
      <table class="meta-table">
        <tr>
          <td style="width: 18%;"><strong>Mata Pelajaran</strong></td>
          <td style="width: 2%;">:</td>
          <td style="width: 35%;">${header.mataPelajaran}</td>
          <td style="width: 18%;"><strong>Hari, Tanggal</strong></td>
          <td style="width: 2%;">:</td>
          <td style="width: 25%;">${header.tanggalPelaksanaan || '.............................'}</td>
        </tr>
        <tr>
          <td><strong>Kelas / Fase</strong></td>
          <td>:</td>
          <td>Kelas ${header.kelas} (${header.fase})</td>
          <td><strong>Waktu</strong></td>
          <td>:</td>
          <td>${header.alokasiWaktu}</td>
        </tr>
        <tr>
          <td><strong>Semester / TP</strong></td>
          <td>:</td>
          <td>${header.semester} / ${header.tahunPelajaran}</td>
          <td><strong>Nama Siswa</strong></td>
          <td>:</td>
          <td>........................................</td>
        </tr>
      </table>

      <!-- PETUNJUK UMUM -->
      <div class="petunjuk-box">
        <strong>PETUNJUK UMUM:</strong>
        <ol style="margin: 4px 0 0 16px; padding: 0;">
          ${header.petunjukUmum.map((p) => `<li>${p}</li>`).join('')}
        </ol>
      </div>
    `;

    // 1. Pilihan Ganda
    if (pgQuestions.length > 0) {
      htmlContent += `
        <div class="section-heading">I. PILIHAN GANDA</div>
        <div class="section-subtext">Berilah tanda silang (X) pada huruf A, B, C, atau D di depan jawaban yang paling tepat!</div>
      `;
      for (const q of pgQuestions) {
        htmlContent += `
          <div class="question-item">
            <div class="question-text"><strong>${q.number}.</strong> ${q.question.replace(/\n/g, '<br/>')}</div>
            ${
              imageMap.has(q.id)
                ? `<div class="stimulus-img-wrapper">
                    <img src="${imageMap.get(q.id)}" class="stimulus-img" alt="Stimulus" />
                    ${q.imageCaption ? `<div class="stimulus-caption">${q.imageCaption}</div>` : ''}
                   </div>`
                : ''
            }
            <div class="options-list">
              ${q.options
                .map(
                  (opt) => `<div class="option-item"><strong>${opt.key}.</strong> ${opt.text}</div>`
                )
                .join('')}
            </div>
          </div>
        `;
      }
    }

    // 2. Pilihan Ganda Kompleks
    if (pgkQuestions.length > 0) {
      htmlContent += `
        <div class="section-heading">II. PILIHAN GANDA KOMPLEKS (LEBIH DARI 1 JAWABAN BENAR)</div>
        <div class="section-subtext">Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang (✓) pada kotak di depan jawaban!</div>
      `;
      for (const q of pgkQuestions) {
        htmlContent += `
          <div class="question-item">
            <div class="question-text"><strong>${q.number}.</strong> ${q.question.replace(/\n/g, '<br/>')}</div>
            ${
              imageMap.has(q.id)
                ? `<div class="stimulus-img-wrapper">
                    <img src="${imageMap.get(q.id)}" class="stimulus-img" alt="Stimulus" />
                    ${q.imageCaption ? `<div class="stimulus-caption">${q.imageCaption}</div>` : ''}
                   </div>`
                : ''
            }
            <div class="options-list">
              ${q.options
                .map(
                  (opt) => `<div class="option-item">[ &nbsp; ] <strong>${opt.key}.</strong> ${opt.text}</div>`
                )
                .join('')}
            </div>
          </div>
        `;
      }
    }

    // 3. Pilihan Ganda Kompleks Kategori (Tabel Benar/Salah)
    if (katQuestions.length > 0) {
      htmlContent += `
        <div class="section-heading">III. PILIHAN GANDA KOMPLEKS KATEGORI (BENAR / SALAH)</div>
        <div class="section-subtext">Bacalah pernyataan berikut, lalu berilah tanda centang (✓) pada kolom Benar atau Salah!</div>
      `;
      for (const q of katQuestions) {
        htmlContent += `
          <div class="question-item">
            <div class="question-text"><strong>${q.number}.</strong> ${q.question.replace(/\n/g, '<br/>')}</div>
            ${
              imageMap.has(q.id)
                ? `<div class="stimulus-img-wrapper">
                    <img src="${imageMap.get(q.id)}" class="stimulus-img" alt="Stimulus" />
                    ${q.imageCaption ? `<div class="stimulus-caption">${q.imageCaption}</div>` : ''}
                   </div>`
                : ''
            }
            <table class="kategori-table">
              <thead>
                <tr>
                  <th style="width: 8%;">No</th>
                  <th style="width: 72%;">Pernyataan / Deskripsi</th>
                  <th style="width: 10%;">Benar</th>
                  <th style="width: 10%;">Salah</th>
                </tr>
              </thead>
              <tbody>
                ${q.statements
                  .map(
                    (st, i) => `
                  <tr>
                    <td style="text-align: center;">${i + 1}</td>
                    <td>${st.statement}</td>
                    <td style="text-align: center;">[ &nbsp; ]</td>
                    <td style="text-align: center;">[ &nbsp; ]</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }

    // 4. Isian Singkat
    if (isianQuestions.length > 0) {
      htmlContent += `
        <div class="section-heading">IV. ISIAN SINGKAT</div>
        <div class="section-subtext">Isilah titik-titik di bawah ini dengan jawaban yang tepat dan benar!</div>
      `;
      for (const q of isianQuestions) {
        htmlContent += `
          <div class="question-item">
            <div class="question-text"><strong>${q.number}.</strong> ${q.question.replace(/\n/g, '<br/>')}</div>
            ${
              imageMap.has(q.id)
                ? `<div class="stimulus-img-wrapper">
                    <img src="${imageMap.get(q.id)}" class="stimulus-img" alt="Stimulus" />
                    ${q.imageCaption ? `<div class="stimulus-caption">${q.imageCaption}</div>` : ''}
                   </div>`
                : ''
            }
          </div>
        `;
      }
    }

    // 5. Uraian
    if (uraianQuestions.length > 0) {
      htmlContent += `
        <div class="section-heading">V. URAIAN / ESSAY</div>
        <div class="section-subtext">Jawablah pertanyaan-pertanyaan di bawah ini secara jelas dan lengkap!</div>
      `;
      for (const q of uraianQuestions) {
        htmlContent += `
          <div class="question-item">
            <div class="question-text"><strong>${q.number}.</strong> ${q.question.replace(/\n/g, '<br/>')}</div>
            ${
              imageMap.has(q.id)
                ? `<div class="stimulus-img-wrapper">
                    <img src="${imageMap.get(q.id)}" class="stimulus-img" alt="Stimulus" />
                    ${q.imageCaption ? `<div class="stimulus-caption">${q.imageCaption}</div>` : ''}
                   </div>`
                : ''
            }
            <div style="margin-top: 8px; color: #888888; font-size: 11pt;">
              Jawab:<br/>
              ....................................................................................................................................................................................<br/>
              ....................................................................................................................................................................................
            </div>
          </div>
        `;
      }
    }
  }

  // Kunci Jawaban Section
  if (mode === 'full' || mode === 'keys_only') {
    if (mode === 'full') {
      htmlContent += `<div class="page-break"></div>`;
    }

    htmlContent += `
      <div class="exam-title" style="margin-top: 10px;">KUNCI JAWABAN & PEDOMAN PENSKORAN</div>
      <div style="text-align: center; font-size: 11pt; margin-bottom: 14px;">
        ${header.mataPelajaran} - Kelas ${header.kelas} (${header.fase}) - Tahun Ajaran ${header.tahunPelajaran}
      </div>

      <table class="key-table">
        <thead>
          <tr>
            <th style="width: 6%;">No</th>
            <th style="width: 18%;">Tipe Soal</th>
            <th style="width: 34%;">Kunci Jawaban</th>
            <th style="width: 32%;">Pembahasan</th>
            <th style="width: 10%;">Skor</th>
          </tr>
        </thead>
        <tbody>
    `;

    let totalScore = 0;
    for (const q of questions) {
      totalScore += q.score;
      let keyText = '';
      let typeLabel = '';

      if (q.type === 'pilihan_ganda') {
        typeLabel = 'Pilihan Ganda';
        const opt = q.options.find((o) => o.key === q.correctAnswer);
        keyText = `<strong>${q.correctAnswer}</strong>. ${opt ? opt.text : ''}`;
      } else if (q.type === 'pilihan_ganda_kompleks') {
        typeLabel = 'PG Kompleks';
        const correctOpts = q.options.filter((o) => o.isCorrect).map((o) => `<strong>${o.key}</strong>. ${o.text}`);
        keyText = correctOpts.join('<br/>');
      } else if (q.type === 'pilihan_ganda_kategori') {
        typeLabel = 'PGK Benar/Salah';
        keyText = q.statements.map((st, i) => `${i + 1}. [<strong>${st.correctAnswer}</strong>]`).join('<br/>');
      } else if (q.type === 'isian') {
        typeLabel = 'Isian Singkat';
        keyText = `<strong>${q.correctAnswer}</strong>`;
      } else if (q.type === 'uraian') {
        typeLabel = 'Uraian';
        keyText = q.correctAnswer.replace(/\n/g, '<br/>');
      }

      htmlContent += `
        <tr>
          <td style="text-align: center;">${q.number}</td>
          <td>${typeLabel}</td>
          <td>${keyText}</td>
          <td>${q.explanation || '-'}</td>
          <td style="text-align: center; font-weight: bold;">${q.score}</td>
        </tr>
      `;
    }

    htmlContent += `
        <tr>
          <td colspan="4" style="text-align: right; font-weight: bold;">TOTAL SKOR MAKSIMAL :</td>
          <td style="text-align: center; font-weight: bold; color: #0284c7; font-size: 12pt;">${totalScore}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 14px; font-size: 11pt;">
      <strong>Pedoman Penilaian:</strong><br/>
      <em>Nilai Akhir = (Total Skor yang Diperoleh ÷ Total Skor Maksimal) × 100</em>
    </div>

    <table class="signature-table">
      <tr>
        <td>
          Mengetahui,<br/>
          Kepala Sekolah<br/><br/><br/><br/>
          ( ..................................................... )<br/>
          NIP. ...............................................
        </td>
        <td>
          Guru Pengampu / Penyusun,<br/><br/><br/><br/>
          ( <strong>${header.namaPenyusun || '.................................................'}</strong> )<br/>
          NIP. ${header.nipPenyusun || '...............................................'}
        </td>
      </tr>
    </table>
    `;
  }

  htmlContent += `
    </body>
    </html>
  `;

  // Create Blob as application/msword
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const cleanSubject = header.mataPelajaran.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Soal_Sumatif_SD_Kelas_${header.kelas}_${cleanSubject}_${mode}.doc`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
