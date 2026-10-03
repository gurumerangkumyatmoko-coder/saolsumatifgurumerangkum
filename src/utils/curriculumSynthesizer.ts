import { AnyQuestion, SDGrade, QuestionType } from '../types/exam';

interface SynthesizeParams {
  kelas: SDGrade;
  mataPelajaran: string;
  materiPokok: string;
  tingkatKesulitan: string;
  sertakanGambar: boolean;
  jumlahSoal: {
    pilihanGanda: number;
    pilihanGandaKompleks: number;
    pilihanGandaKategori: number;
    isian: number;
    uraian: number;
  };
}

export function synthesizeExamQuestions(params: SynthesizeParams): AnyQuestion[] {
  const { kelas, mataPelajaran, materiPokok, jumlahSoal, sertakanGambar } = params;
  const questions: AnyQuestion[] = [];
  let counter = 1;

  const topicName = materiPokok || `Materi Pokok ${mataPelajaran} Semester Ini`;
  const isLowerGrade = kelas <= 3;
  const isScience = /ipas|ipa|sains|alam/i.test(mataPelajaran);
  const isMath = /matematika|hitung|angka|pecahan/i.test(mataPelajaran);
  const isCivics = /pancasila|pkn|kewarganegaraan/i.test(mataPelajaran);

  // 1. Pilihan Ganda (PG)
  for (let i = 0; i < (jumlahSoal.pilihanGanda || 0); i++) {
    const num = counter++;
    let qText = '';
    let options: { key: string; text: string }[] = [];
    let correct = 'A';
    let explanation = '';
    let hasImage = false;
    let imageKey: string | undefined = undefined;
    let imageUrl: string | undefined = undefined;
    let imageCaption: string | undefined = undefined;

    if (isScience) {
      if (i === 0 && sertakanGambar) {
        hasImage = true;
        imageKey = 'foto_ekosistem_sawah';
        imageUrl = '/src/assets/images/ricefield_ecosystem_1791028919414.jpg';
        imageCaption = 'Gambar 1. Foto Realistis Ekosistem Sawah Alami';
        qText = `Perhatikan foto realistis ekosistem sawah alami di atas! Pada ekosistem tersebut, organisme yang bertindak sebagai produsen utama penyedia makanan bagi konsumen pertama adalah ....`;
        options = isLowerGrade
          ? [
              { key: 'A', text: 'Tanaman padi yang hijau' },
              { key: 'B', text: 'Belalang pemakan daun' },
              { key: 'C', text: 'Katak sawah' }
            ]
          : [
              { key: 'A', text: 'Tanaman padi yang melakukan fotosintesis' },
              { key: 'B', text: 'Belalang dan serangga pemakan daun' },
              { key: 'C', text: 'Katak sawah pemangsa serangga' },
              { key: 'D', text: 'Ular dan elang sebagai predator' }
            ];
        correct = 'A';
        explanation = 'Tanaman padi adalah tumbuhan berklorofil autotrof yang bertindak sebagai produsen pertama dalam rantai makanan sawah.';
      } else {
        qText = `Terkait dengan materi ${topicName}, bagian tumbuhan yang bertugas menyerap air dan unsur hara dari dalam tanah adalah ....`;
        options = isLowerGrade
          ? [
              { key: 'A', text: 'Akar' },
              { key: 'B', text: 'Daun' },
              { key: 'C', text: 'Batang' }
            ]
          : [
              { key: 'A', text: 'Akar' },
              { key: 'B', text: 'Batang' },
              { key: 'C', text: 'Daun' },
              { key: 'D', text: 'Bunga' }
            ];
        correct = 'A';
        explanation = 'Akar menembus ke dalam tanah untuk menyerap air dan zat hara penting bagi kelangsungan hidup tumbuhan.';
      }
    } else if (isMath) {
      if (i === 0 && sertakanGambar) {
        hasImage = true;
        imageKey = 'pecahan_kue_lingkaran';
        imageCaption = 'Gambar 1. Model Pecahan Juring Lingkaran';
        qText = `Perhatikan gambar model pecahan juring lingkaran di atas! Berdasarkan bagian yang diarsir, nilai pecahan yang ditunjukkan adalah ....`;
        options = isLowerGrade
          ? [
              { key: 'A', text: '3/8' },
              { key: 'B', text: '5/8' },
              { key: 'C', text: '1/2' }
            ]
          : [
              { key: 'A', text: '3/8' },
              { key: 'B', text: '5/8' },
              { key: 'C', text: '3/5' },
              { key: 'D', text: '1/4' }
            ];
        correct = 'A';
        explanation = 'Dari 8 juring lingkaran yang berukuran sama, terdapat 3 juring yang diarsir sehingga bernilai 3/8.';
      } else {
        qText = `Sebuah persegi panjang memiliki panjang 12 cm dan lebar 5 cm. Luas persegi panjang tersebut adalah ....`;
        options = [
          { key: 'A', text: '60 cm²' },
          { key: 'B', text: '34 cm²' },
          { key: 'C', text: '17 cm²' },
          { key: 'D', text: '70 cm²' }
        ];
        correct = 'A';
        explanation = 'Luas persegi panjang = panjang × lebar = 12 cm × 5 cm = 60 cm².';
      }
    } else if (isCivics) {
      if (i === 0 && sertakanGambar) {
        hasImage = true;
        imageKey = 'foto_garuda_pancasila';
        imageUrl = '/src/assets/images/garuda_pancasila_shield_1791028968634.jpg';
        imageCaption = 'Gambar 1. Foto Realistis Perisai Lambang Garuda Pancasila';
        qText = `Perhatikan foto perisai lambang Garuda Pancasila di atas! Simbol bintang emas yang terletak di bagian tengah perisai merupakan lambang dari sila ....`;
        options = isLowerGrade
          ? [
              { key: 'A', text: 'Pertama (Ketuhanan Yang Maha Esa)' },
              { key: 'B', text: 'Kedua (Kemanusiaan yang Adil dan Beradab)' },
              { key: 'C', text: 'Ketiga (Persatuan Indonesia)' }
            ]
          : [
              { key: 'A', text: 'Pertama: Ketuhanan Yang Maha Esa' },
              { key: 'B', text: 'Kedua: Kemanusiaan yang Adil dan Beradab' },
              { key: 'C', text: 'Ketiga: Persatuan Indonesia' },
              { key: 'D', text: 'Kelima: Keadilan Sosial bagi Seluruh Rakyat Indonesia' }
            ];
        correct = 'A';
        explanation = 'Bintang emas berlatar perisai hitam adalah lambang sila ke-1 Pancasila.';
      } else {
        qText = `Sikap yang mencerminkan pengamalan sila ketiga Pancasila "Persatuan Indonesia" di lingkungan sekolah adalah ....`;
        options = [
          { key: 'A', text: 'Berteman rukun tanpa membeda-bedakan suku dan daerah asal' },
          { key: 'B', text: 'Memilih-milih teman yang memiliki hobi sama saja' },
          { key: 'C', text: 'Menolak bekerja sama saat piket kelas' },
          { key: 'D', text: 'Berbicara kasar kepada teman yang berbeda pendapat' }
        ];
        correct = 'A';
        explanation = 'Menjaga persatuan dan kerukunan antar teman adalah wujud nyata sila ke-3.';
      }
    } else {
      qText = `Berdasarkan pemahaman mengenai topik ${topicName}, pernyataan di bawah ini yang paling tepat adalah ....`;
      options = [
        { key: 'A', text: 'Menerapkan konsep secara cermat dan bertanggung jawab' },
        { key: 'B', text: 'Mengabaikan langkah-langkah yang telah ditentukan' },
        { key: 'C', text: 'Melakukan kegiatan tanpa perencanaan yang matang' },
        { key: 'D', text: 'Menyerahkan seluruh tugas kepada orang lain' }
      ];
      correct = 'A';
      explanation = 'Menerapkan konsep dengan cermat dan bertanggung jawab merupakan sikap belajar yang baik.';
    }

    questions.push({
      id: `q-syn-${num}`,
      number: num,
      type: 'pilihan_ganda',
      question: qText,
      options,
      correctAnswer: correct,
      score: 10,
      explanation,
      hasImage,
      imageKey,
      imageUrl,
      imageCaption
    });
  }

  // 2. Pilihan Ganda Kompleks (PGK: 3 pilihan jawaban, kemungkinan >1 benar)
  for (let i = 0; i < (jumlahSoal.pilihanGandaKompleks || 0); i++) {
    const num = counter++;
    let qText = '';
    let options: { key: string; text: string; isCorrect: boolean }[] = [];
    let explanation = '';
    let hasImage = false;
    let imageKey: string | undefined = undefined;
    let imageUrl: string | undefined = undefined;
    let imageCaption: string | undefined = undefined;

    if (isScience) {
      if (i === 0 && sertakanGambar) {
        hasImage = true;
        imageKey = 'foto_fotosintesis_daun';
        imageUrl = '/src/assets/images/plant_photosynthesis_1791028945936.jpg';
        imageCaption = 'Gambar Foto Realistis Daun Hijau Berfotosintesis';
      }
      qText = `Perhatikan proses fotosintesis pada tumbuhan hijau! Manakah pernyataan di bawah ini yang merupakan bahan/faktor penting yang dibutuhkan tumbuhan untuk berfotosintesis?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)`;
      options = [
        { key: 'A', text: 'Karbon dioksida (CO₂) yang diserap dari udara', isCorrect: true },
        { key: 'B', text: 'Air (H₂O) yang diserap oleh akar dari dalam tanah', isCorrect: true },
        { key: 'C', text: 'Oksigen (O₂) dalam jumlah besar sebagai bahan baku utama', isCorrect: false }
      ];
      explanation = 'Tumbuhan memerlukan CO₂, air, klorofil, dan sinar matahari. Oksigen adalah hasil sampingan, bukan bahan baku.';
    } else if (isMath) {
      qText = `Ibu membeli 3/4 kg gula pasir dan 1/2 kg tepung terigu. Dari data tersebut, manakah pernyataan berikut yang bernilai benar?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)`;
      options = [
        { key: 'A', text: 'Total berat belanjaan Ibu adalah 5/4 kg (atau 1 1/4 kg)', isCorrect: true },
        { key: 'B', text: 'Gula pasir yang dibeli Ibu lebih berat daripada tepung terigu', isCorrect: true },
        { key: 'C', text: 'Tepung terigu Ibu lebih berat daripada gula pasir', isCorrect: false }
      ];
      explanation = 'Total = 3/4 + 1/2 = 3/4 + 2/4 = 5/4 kg. Karena 3/4 > 2/4, gula lebih berat daripada tepung.';
    } else if (isCivics) {
      if (i === 0 && sertakanGambar) {
        hasImage = true;
        imageKey = 'foto_gotong_royong';
        imageUrl = '/src/assets/images/gotong_royong_students_1791028957062.jpg';
        imageCaption = 'Gambar Foto Realistis Gotong Royong Siswa di Sekolah';
      }
      qText = `Perhatikan kegiatan kerja bakti di sekolah! Manakah di antara pilihan berikut yang merupakan contoh tindakan mencerminkan sikap gotong royong?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)`;
      options = [
        { key: 'A', text: 'Bekerja sama menyapu dan mengumpulkan daun kering bersama teman', isCorrect: true },
        { key: 'B', text: 'Menanam bibit pohon dan merawat tanaman taman sekolah secara bergantian', isCorrect: true },
        { key: 'C', text: 'Duduk diam melihat teman sekelas sedang bekerja membersihkan kelas', isCorrect: false }
      ];
      explanation = 'Menyapu bersama dan merawat tanaman adalah gotong royong. Menonton teman bekerja adalah sikap pasif.';
    } else {
      qText = `Dalam mempelajari topik ${topicName}, manakah sikap atau keterampilan yang penting untuk dikembangkan?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)`;
      options = [
        { key: 'A', text: 'Mengamati dan mencatat informasi penting dengan teliti', isCorrect: true },
        { key: 'B', text: 'Berdiskusi dan bertukar pikiran secara santun dengan teman', isCorrect: true },
        { key: 'C', text: 'Menolak bertanya meskipun ada materi yang belum dimengerti', isCorrect: false }
      ];
      explanation = 'Ketelitian dan diskusi santun adalah keterampilan esensial dalam pembelajaran.';
    }

    questions.push({
      id: `q-syn-${num}`,
      number: num,
      type: 'pilihan_ganda_kompleks',
      question: qText,
      instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
      options,
      score: 15,
      explanation,
      hasImage,
      imageKey,
      imageUrl,
      imageCaption
    });
  }

  // 3. Pilihan Ganda Kompleks Kategori (Tabel Benar / Salah: 3 deskripsi)
  for (let i = 0; i < (jumlahSoal.pilihanGandaKategori || 0); i++) {
    const num = counter++;
    let qText = '';
    let statements: { statement: string; correctAnswer: 'Benar' | 'Salah' }[] = [];
    let explanation = '';
    let hasImage = false;
    let imageKey: string | undefined = undefined;
    let imageUrl: string | undefined = undefined;
    let imageCaption: string | undefined = undefined;

    if (isScience) {
      if (sertakanGambar) {
        hasImage = true;
        imageKey = 'foto_daur_air';
        imageUrl = '/src/assets/images/water_cycle_nature_1791028933204.jpg';
        imageCaption = 'Gambar Foto Realistis Daur Air di Alam Bebas';
      }
      qText = `Perhatikan proses siklus air di alam! Tentukan Benar atau Salah untuk setiap pernyataan di bawah ini dengan memberi tanda centang (✓)!`;
      statements = [
        { statement: 'Evaporasi adalah proses penguapan air dari permukaan bumi ke atmosfer akibat panas sinar matahari.', correctAnswer: 'Benar' },
        { statement: 'Kondensasi adalah proses jatuhnya air dari langit ke permukaan tanah dalam bentuk tetesan hujan.', correctAnswer: 'Salah' },
        { statement: 'Infiltrasi merupakan proses meresapnya sebagian air hujan ke dalam pori-pori tanah.', correctAnswer: 'Benar' }
      ];
      explanation = 'Pernyataan 1 Benar (evaporasi = penguapan). Pernyataan 2 Salah (jatuhnya air hujan adalah presipitasi). Pernyataan 3 Benar (infiltrasi = peresapan).';
    } else if (isMath) {
      qText = `Tentukan Benar atau Salah untuk setiap pernyataan matematika mengenai bangun datar dan operasi hitung berikut!`;
      statements = [
        { statement: 'Persegi memiliki 4 sisi yang sama panjang dan 4 sudut siku-siku (90 derajat).', correctAnswer: 'Benar' },
        { statement: 'Pecahan 2/4 memiliki nilai yang lebih besar daripada pecahan 1/2.', correctAnswer: 'Salah' },
        { statement: 'Keliling persegi dengan panjang sisi 7 cm adalah 28 cm.', correctAnswer: 'Benar' }
      ];
      explanation = 'Pernyataan 1 Benar. Pernyataan 2 Salah (2/4 = 1/2 senilai). Pernyataan 3 Benar (K = 4 × 7 = 28 cm).';
    } else {
      qText = `Berkaitan dengan materi ${topicName}, tentukan Benar atau Salah pada setiap pernyataan berikut!`;
      statements = [
        { statement: 'Membaca petunjuk dengan seksama mempermudah pemahaman konsep materi.', correctAnswer: 'Benar' },
        { statement: 'Semua persoalan dapat diselesaikan tanpa memerlukan kerjasama dan ketelitian.', correctAnswer: 'Salah' },
        { statement: 'Menghargai pendapat orang lain menciptakan suasana belajar yang nyaman dan kondusif.', correctAnswer: 'Benar' }
      ];
      explanation = 'Pernyataan 1 dan 3 benar karena mencerminkan prinsip pembelajaran bermakna.';
    }

    questions.push({
      id: `q-syn-${num}`,
      number: num,
      type: 'pilihan_ganda_kategori',
      question: qText,
      instruction: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
      statements,
      score: 20,
      explanation,
      hasImage,
      imageKey,
      imageUrl,
      imageCaption
    });
  }

  // 4. Isian Singkat
  for (let i = 0; i < (jumlahSoal.isian || 0); i++) {
    const num = counter++;
    let qText = '';
    let correctAnswer = '';
    let explanation = '';

    if (isScience) {
      if (i === 0) {
        qText = `Zat hijau daun pada tumbuhan yang berfungsi untuk menangkap energi cahaya matahari saat fotosintesis disebut ....`;
        correctAnswer = 'Klorofil';
        explanation = 'Klorofil adalah zat hijau daun yang menyerap radiasi cahaya matahari.';
      } else {
        qText = `Makhluk hidup yang menempati urutan pertama dalam rantai makanan dan mampu menghasilkan makanannya sendiri disebut ....`;
        correctAnswer = 'Produsen';
        explanation = 'Produsen adalah organisme autotrof yang menghasilkan energi makanan.';
      }
    } else if (isMath) {
      if (i === 0) {
        qText = `Hasil dari operasi hitung 25 × 4 - 30 adalah ....`;
        correctAnswer = '70';
        explanation = '25 × 4 = 100. Kemudian 100 - 30 = 70.';
      } else {
        qText = `Sebuah kolam renang anak berbentuk persegi panjang memiliki panjang 10 m dan lebar 6 m. Luas kolam tersebut adalah ... m².`;
        correctAnswer = '60';
        explanation = 'Luas = 10 × 6 = 60 m².';
      }
    } else if (isCivics) {
      if (i === 0) {
        qText = `Semboyan persatuan bangsa Indonesia yang tertulis pada pita burung Garuda Pancasila adalah ....`;
        correctAnswer = 'Bhinneka Tunggal Ika';
        explanation = 'Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu jua.';
      } else {
        qText = `Lambang sila kedua Pancasila yang berbunyi "Kemanusiaan yang Adil dan Beradab" adalah ....`;
        correctAnswer = 'Rantai Emas';
        explanation = 'Rantai emas melambangkan ikatan kemanusiaan yang erat antar sesama manusia.';
      }
    } else {
      qText = `Dalam mempelajari topik ${topicName}, hal mendasar yang harus dipahami terlebih dahulu adalah ....`;
      correctAnswer = 'Konsep dasar materi';
      explanation = 'Pemahaman konsep dasar menjadi pondasi utama sebelum materi lanjutan.';
    }

    questions.push({
      id: `q-syn-${num}`,
      number: num,
      type: 'isian',
      question: qText,
      correctAnswer,
      score: 15,
      explanation
    });
  }

  // 5. Uraian / Essay
  for (let i = 0; i < (jumlahSoal.uraian || 0); i++) {
    const num = counter++;
    let qText = '';
    let correctAnswer = '';
    let rubricGuidelines: string[] = [];
    let explanation = '';

    if (isScience) {
      qText = `Jelaskan secara singkat apa saja hasil yang diperoleh dari proses fotosintesis pada tumbuhan hijau, dan sebutkan manfaat dari masing-masing hasil tersebut bagi kehidupan makhluk hidup di bumi!`;
      correctAnswer = `Hasil fotosintesis:\n1. Karbohidrat/Glukosa: Berfungsi sebagai sumber energi dan cadangan makanan bagi tumbuhan itu sendiri serta makhluk hidup lain (hewan dan manusia).\n2. Gas Oksigen (O₂): Dilepaskan ke udara bebas untuk digunakan manusia dan hewan bernapas (respirasi).`;
      rubricGuidelines = [
        'Menyebutkan glukosa/karbohidrat beserta fungsinya (skor 10)',
        'Menyebutkan oksigen (O₂) beserta fungsinya untuk respirasi (skor 10)'
      ];
      explanation = 'Fotosintesis menghasilkan glukosa sebagai cadangan makanan dan oksigen untuk respirasi.';
    } else if (isMath) {
      qText = `Pak Budi memiliki sebidang kebun berbentuk persegi panjang dengan ukuran panjang 20 meter dan lebar 15 meter. Hitunglah:\na. Keliling kebun Pak Budi\nb. Luas kebun Pak Budi\n(Tuliskan langkah-langkah pengerjaannya secara rinci!)`;
      correctAnswer = `Langkah pengerjaan:\na. Keliling = 2 × (panjang + lebar)\n   Keliling = 2 × (20 m + 15 m) = 2 × 35 m = 70 meter\n\nb. Luas = panjang × lebar\n   Luas = 20 m × 15 m = 300 m²`;
      rubricGuidelines = [
        'Langkah dan rumus keliling benar (skor 10)',
        'Langkah dan rumus luas benar (skor 10)'
      ];
      explanation = 'Keliling = 70 m, Luas = 300 m².';
    } else if (isCivics) {
      qText = `Sebutkan 3 contoh perbuatan terpuji di lingkungan sekolah yang mencerminkan penerapan nilai-nilai Pancasila dalam kehidupan sehari-hari!`;
      correctAnswer = `Contoh perbuatan terpuji:\n1. Menghormati teman yang sedang beribadah (Sila 1).\n2. Menolong teman yang terjatuh atau kesulitan tanpa pamrih (Sila 2).\n3. Bekerja sama membersihkan kelas saat piket dan tidak membeda-bedakan teman (Sila 3).`;
      rubricGuidelines = [
        'Menyebutkan minimal 2 contoh yang relevan (skor 10)',
        'Menyebutkan 3 contoh dengan kaitan nilai Pancasila yang tepat (skor 20)'
      ];
      explanation = 'Penerapan nilai Pancasila tampak dalam ibadah, tolong-menolong, dan persatuan.';
    } else {
      qText = `Jelaskan kesimpulan utama yang kamu pelajari dari materi ${topicName}, dan berikan 2 contoh penerapannya dalam kehidupanmu sehari-hari!`;
      correctAnswer = `Kesimpulan materi ${topicName} menguraikan pentingnya pemahaman konsep yang terstruktur.\nPenerapan nyata:\n1. Menggunakan pengetahuan untuk menyelesaikan masalah sehari-hari secara disiplin.\n2. Berbagi pengetahuan dan saling membantu sesama teman.`;
      rubricGuidelines = [
        'Penjelasan kesimpulan tepat (skor 10)',
        'Memberikan 2 contoh konkret (skor 10)'
      ];
      explanation = 'Penjelasan menyeluruh konsep materi.';
    }

    questions.push({
      id: `q-syn-${num}`,
      number: num,
      type: 'uraian',
      question: qText,
      correctAnswer,
      rubricGuidelines,
      score: 20,
      explanation
    });
  }

  return questions;
}
