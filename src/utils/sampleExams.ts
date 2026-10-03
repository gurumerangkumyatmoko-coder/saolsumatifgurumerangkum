import { ExamPackage } from '../types/exam';

export const SAMPLE_EXAMS: ExamPackage[] = [
  {
    id: 'sample-ipas-kelas4',
    title: 'Asesmen Sumatif IPAS Kelas 4 - Tumbuhan & Rantai Makanan',
    createdAt: '2025-01-15T08:00:00.000Z',
    updatedAt: '2025-01-15T08:00:00.000Z',
    header: {
      dinasPendidikan: 'PEMERINTAH KABUPATEN / KOTA\nDINAS PENDIDIKAN DAN KEBUDAYAAN',
      namaSekolah: 'SD NEGERI 01 TELADAN BANGSA',
      alamatSekolah: 'Jl. Merdeka Belajar No. 45, Kecamatan Sukamaju',
      jenisAsesmen: 'Asesmen Sumatif Lingkup Materi',
      mataPelajaran: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
      kelas: 4,
      fase: 'Fase B',
      semester: '1 (Ganjil)',
      tahunPelajaran: '2024/2025',
      alokasiWaktu: '90 Menit',
      tanggalPelaksanaan: 'Senin, 20 Oktober 2025',
      namaPenyusun: 'Budi Santoso, S.Pd., M.Pd.',
      nipPenyusun: '19850412 201001 1 015',
      materiPokok: 'Bab 1: Tumbuhan Sumber Kehidupan di Bumi & Ekosistem Sawah',
      petunjukUmum: [
        'Berdoalah sebelum mengerjakan soal sesuai agama dan keyakinan masing-masing.',
        'Tulislah nama, nomor absen, dan identitasmu secara jelas pada lembar jawaban yang tersedia.',
        'Bacalah setiap butir soal dengan teliti dan cermat sebelum memutuskan untuk menjawab.',
        'Dahulukan menjawab soal-soal yang kamu anggap lebih mudah.',
        'Periksa kembali seluruh lembar jawabanmu sebelum diserahkan kepada Bapak/Ibu Guru pengawas.'
      ]
    },
    questions: [
      // 1. Pilihan Ganda (PG)
      {
        id: 'q-ipas-1',
        number: 1,
        type: 'pilihan_ganda',
        question: 'Bagian tumbuhan yang berfungsi utama untuk menyerap air dan unsur hara dari dalam tanah serta memperkokoh berdirinya tumbuhan adalah ....',
        options: [
          { key: 'A', text: 'Daun' },
          { key: 'B', text: 'Akar' },
          { key: 'C', text: 'Batang' },
          { key: 'D', text: 'Bunga' }
        ],
        correctAnswer: 'B',
        score: 10,
        explanation: 'Akar bertugas menyerap air dan zat hara dari dalam tanah serta menancapkan tumbuhan agar kokoh tidak mudah roboh.'
      },
      {
        id: 'q-ipas-2',
        number: 2,
        type: 'pilihan_ganda',
        question: 'Perhatikan foto realistis ekosistem sawah alami di bawah ini!\nBerdasarkan kondisi rantai makanan pada ekosistem tersebut, apabila populasi katak menurun drastis karena diburu manusia, akibat yang paling mungkin terjadi pada keseimbangan alam sawah adalah ....',
        hasImage: true,
        imageKey: 'foto_ekosistem_sawah',
        imageUrl: '/src/assets/images/ricefield_ecosystem_1791028919414.jpg',
        imageCaption: 'Gambar 1. Foto Realistis Ekosistem Sawah Alami (Padi, Belalang, dan Katak)',
        options: [
          { key: 'A', text: 'Populasi serangga/belalang melonjak pesat dan tanaman padi terancam rusak' },
          { key: 'B', text: 'Populasi ular meningkat pesat karena tidak ada saingan mencari makan' },
          { key: 'C', text: 'Hasil panen padi melimpah karena belalang punah secara alami' },
          { key: 'D', text: 'Populasi elang bertambah banyak secara mendadak' }
        ],
        correctAnswer: 'A',
        score: 10,
        explanation: 'Katak adalah predator pengendali serangga/belalang di sawah. Penurunan populasi katak menyebabkan lonjakan populasi serangga perusak padi.'
      },
      // 2. Pilihan Ganda Kompleks (PGK: 3 pilihan jawaban, kemungkinan > 1 jawaban benar)
      {
        id: 'q-ipas-3',
        number: 3,
        type: 'pilihan_ganda_kompleks',
        question: 'Perhatikan foto makro daun hijau di bawah ini! Daun tumbuhan hijau memiliki zat klorofil yang bekerja aktif melakukan fotosintesis. Manakah komponen penting yang dibutuhkan daun untuk fotosintesis?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)',
        instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
        hasImage: true,
        imageKey: 'foto_fotosintesis_daun',
        imageUrl: '/src/assets/images/plant_photosynthesis_1791028945936.jpg',
        imageCaption: 'Gambar 2. Foto Realistis Daun Tumbuhan Hijau Terpapar Sinar Matahari (Klorofil)',
        options: [
          { key: 'A', text: 'Gas Karbon dioksida (CO₂) yang diserap dari udara melalui stomata', isCorrect: true },
          { key: 'B', text: 'Air (H₂O) dan unsur hara mineral yang diserap oleh akar dari tanah', isCorrect: true },
          { key: 'C', text: 'Gas Oksigen (O₂) dalam jumlah banyak sebagai bahan baku utama', isCorrect: false }
        ],
        score: 15,
        explanation: 'Tumbuhan membutuhkan Karbon dioksida (CO₂), Air (H₂O), dan Cahaya Matahari dengan bantuan klorofil. Oksigen adalah hasil buangan/produk fotosintesis, bukan bahan bakunya.'
      },
      {
        id: 'q-ipas-4',
        number: 4,
        type: 'pilihan_ganda_kompleks',
        question: 'Peran makhluk hidup dalam menjaga kelestarian alam sangat vital. Di bawah ini, manakah contoh tindakan manusia yang dapat merusak tatanan rantai makanan di lingkungan sekitar?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)',
        instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
        options: [
          { key: 'A', text: 'Penggunaan pestisida dan racun kimia secara berlebihan yang mematikan fauna sawah', isCorrect: true },
          { key: 'B', text: 'Perburuan liar burung pemakan ulat dan elang di alam bebas', isCorrect: true },
          { key: 'C', text: 'Melakukan penanaman bibit pohon di lahan gundul (reboisasi)', isCorrect: false }
        ],
        score: 15,
        explanation: 'Penggunaan pestisida berlebih dan perburuan liar memutus rantai makanan ekosistem. Reboisasi justru menyehatkan ekosistem.'
      },
      // 3. Pilihan Ganda Kompleks Kategori (Benar/Salah: 3 deskripsi/pernyataan)
      {
        id: 'q-ipas-5',
        number: 5,
        type: 'pilihan_ganda_kategori',
        question: 'Perhatikan foto pemandangan alam siklus air di bawah ini! Tentukan apakah pernyataan mengenai tahapan siklus air di bawah ini Benar atau Salah dengan memberi tanda centang (✓) pada kolom yang tepat!',
        instruction: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
        hasImage: true,
        imageKey: 'foto_daur_air',
        imageUrl: '/src/assets/images/water_cycle_nature_1791028933204.jpg',
        imageCaption: 'Gambar 3. Foto Realistis Daur Air di Alam (Evaporasi Danau dan Awan Presipitasi)',
        statements: [
          {
            statement: 'Evaporasi adalah proses penguapan air dari permukaan danau, laut, dan sungai menuju atmosfer akibat panas matahari.',
            correctAnswer: 'Benar'
          },
          {
            statement: 'Kondensasi adalah proses jatuhnya air dari langit ke tanah dalam bentuk butiran air hujan.',
            correctAnswer: 'Salah'
          },
          {
            statement: 'Infiltrasi merupakan proses meresapnya sebagian air hujan ke dalam lapisan tanah menjadi cadangan air tanah.',
            correctAnswer: 'Benar'
          }
        ],
        score: 20,
        explanation: 'Pernyataan 1 Benar (evaporasi = penguapan). Pernyataan 2 Salah (jatuhnya air hujan adalah presipitasi; kondensasi adalah pembentukan awan). Pernyataan 3 Benar (infiltrasi = peresapan ke tanah).'
      },
      // 4. Isian Singkat
      {
        id: 'q-ipas-6',
        number: 6,
        type: 'isian',
        question: 'Zat hijau daun pada tumbuhan yang berfungsi untuk menangkap energi cahaya matahari saat proses pembuatan makanan sendiri disebut ....',
        correctAnswer: 'Klorofil',
        score: 15,
        explanation: 'Klorofil adalah zat hijau daun yang menyerap radiasi cahaya matahari.'
      },
      {
        id: 'q-ipas-7',
        number: 7,
        type: 'isian',
        question: 'Pada rantai makanan sawah, organisme yang menempati tingkat trofik pertama dan mampu menghasilkan makanannya sendiri disebut ....',
        correctAnswer: 'Produsen (Tumbuhan hijau / Padi)',
        score: 15,
        explanation: 'Organisme penghasil energi pertama adalah produsen autotrof seperti padi dan tumbuhan hijau.'
      },
      // 5. Uraian
      {
        id: 'q-ipas-8',
        number: 8,
        type: 'uraian',
        question: 'Jelaskan secara ringkas apa saja hasil dari proses fotosintesis pada tumbuhan hijau, dan sebutkan manfaat masing-masing hasil tersebut bagi kehidupan makhluk hidup di bumi!',
        correctAnswer: 'Hasil fotosintesis berupa:\n1. Karbohidrat / Glukosa: Digunakan oleh tumbuhan itu sendiri untuk tumbuh dan disimpan sebagai cadangan makanan (umbi, buah, biji) yang menjadi sumber makanan bagi hewan dan manusia.\n2. Gas Oksigen (O₂): Dilepaskan ke atmosfer bebas yang sangat dibutuhkan manusia dan seluruh hewan untuk bernapas (respirasi).',
        rubricGuidelines: [
          'Menyebutkan hasil karbohidrat/glukosa dan fungsinya (skor 5)',
          'Menyebutkan hasil gas oksigen (O₂) dan fungsinya untuk bernapas (skor 5)'
        ],
        score: 10,
        explanation: 'Fotosintesis menghasilkan glukosa untuk cadangan makanan dan oksigen untuk respirasi makhluk hidup.'
      }
    ]
  },
  {
    id: 'sample-matematika-kelas5',
    title: 'Asesmen Sumatif Matematika Kelas 5 - Pecahan, Bangun Datar & Data',
    createdAt: '2025-01-16T08:00:00.000Z',
    updatedAt: '2025-01-16T08:00:00.000Z',
    header: {
      dinasPendidikan: 'PEMERINTAH KOTA PENDIDIKAN\nDINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA',
      namaSekolah: 'SD NEGERI HARAPAN BANGSA',
      alamatSekolah: 'Jl. Ki Hajar Dewantara No. 12',
      jenisAsesmen: 'Asesmen Sumatif Tengah Semester (STS)',
      mataPelajaran: 'Matematika',
      kelas: 5,
      fase: 'Fase C',
      semester: '1 (Ganjil)',
      tahunPelajaran: '2024/2025',
      alokasiWaktu: '90 Menit',
      tanggalPelaksanaan: 'Rabu, 22 Oktober 2025',
      namaPenyusun: 'Siti Aminah, S.Pd.',
      nipPenyusun: '19880725 201402 2 003',
      materiPokok: 'Operasi Hitung Pecahan, Luas Bangun Datar, dan Membaca Diagram Batang',
      petunjukUmum: [
        'Awali pekerjaan dengan membaca basmalah atau doa sesuai keyakinan.',
        'Tuliskan identitas nama lengkap dan kelas pada kolom yang disediakan.',
        'Gunakan pensil atau bolpoin hitam/biru yang terbaca dengan jelas.',
        'Periksa kembali hitunganmu sebelum lembar soal dikumpulkan.'
      ]
    },
    questions: [
      {
        id: 'q-mat-1',
        number: 1,
        type: 'pilihan_ganda',
        question: 'Hasil penjumlahan dari pecahan 2/5 + 1/3 adalah ....',
        options: [
          { key: 'A', text: '3/8' },
          { key: 'B', text: '11/15' },
          { key: 'C', text: '7/15' },
          { key: 'D', text: '13/15' }
        ],
        correctAnswer: 'B',
        score: 10,
        explanation: 'KPK dari 5 dan 3 adalah 15. Maka: 2/5 = 6/15, dan 1/3 = 5/15. Penjumlahan: 6/15 + 5/15 = 11/15.'
      },
      {
        id: 'q-mat-2',
        number: 2,
        type: 'pilihan_ganda',
        question: 'Perhatikan gambar pecahan lingkaran di bawah ini!\nBerdasarkan juring yang diarsir, nilai pecahan dan bentuk pecahan desimalnya berturut-turut adalah ....',
        hasImage: true,
        imageKey: 'pecahan_kue_lingkaran',
        imageCaption: 'Gambar Model Pecahan Juring Lingkaran',
        options: [
          { key: 'A', text: '3/8 dan 0,375' },
          { key: 'B', text: '5/8 dan 0,625' },
          { key: 'C', text: '3/5 dan 0,60' },
          { key: 'D', text: '1/4 dan 0,25' }
        ],
        correctAnswer: 'A',
        score: 10,
        explanation: 'Dari 8 bagian sama besar, 3 bagian diarsir. Pecahan biasanya adalah 3/8. Bentuk desimal: 3 ÷ 8 = 0,375.'
      },
      {
        id: 'q-mat-3',
        number: 3,
        type: 'pilihan_ganda_kompleks',
        question: 'Ibu memiliki persediaan tepung terigu sebanyak 3/4 kg. Kemudian Ibu membeli lagi 1/2 kg. Tepung tersebut digunakan untuk membuat bolu sebanyak 2/3 kg. Manakah pernyataan perhitungan matematika di bawah ini yang benar?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)',
        instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
        options: [
          { key: 'A', text: 'Total persediaan tepung terigu Ibu mula-mula setelah membeli adalah 5/4 kg (atau 1 1/4 kg)', isCorrect: true },
          { key: 'B', text: 'Sisa tepung terigu yang belum digunakan oleh Ibu adalah 7/12 kg', isCorrect: true },
          { key: 'C', text: 'Sisa tepung terigu Ibu habis tidak bersisa (0 kg)', isCorrect: false }
        ],
        score: 15,
        explanation: 'Tepung total = 3/4 + 1/2 = 3/4 + 2/4 = 5/4 kg (Opsi A Benar). Sisa = 5/4 - 2/3 = 15/12 - 8/12 = 7/12 kg (Opsi B Benar).'
      },
      {
        id: 'q-mat-4',
        number: 4,
        type: 'pilihan_ganda_kategori',
        question: 'Perhatikan diagram batang data peserta ekstrakurikuler SD berikut! Berikan penilaian Benar atau Salah pada setiap deskripsi di bawah ini berdasarkan data grafik tersebut!',
        instruction: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
        hasImage: true,
        imageKey: 'diagram_batang_ekskul',
        imageCaption: 'Gambar Diagram Batang Siswa Peserta Ekstrakurikuler',
        statements: [
          {
            statement: 'Ekstrakurikuler yang paling banyak diminati siswa adalah Futsal dengan jumlah 45 siswa.',
            correctAnswer: 'Benar'
          },
          {
            statement: 'Selisih jumlah siswa yang memilih ekstrakurikuler Pramuka dan Seni Tari adalah 10 siswa.',
            correctAnswer: 'Salah'
          },
          {
            statement: 'Jumlah keseluruhan siswa yang mengikuti keempat cabang ekstrakurikuler tersebut adalah 120 siswa.',
            correctAnswer: 'Benar'
          }
        ],
        score: 20,
        explanation: 'Pernyataan 1 Benar (Futsal tertinggi = 45). Pernyataan 2 Salah (Pramuka 30, Tari 25, selisihnya 5 bukan 10). Pernyataan 3 Benar (30 + 45 + 25 + 20 = 120).'
      },
      {
        id: 'q-mat-5',
        number: 5,
        type: 'isian',
        question: 'Sebuah kolam renang anak berbentuk persegi panjang memiliki panjang 15 meter dan lebar 8 meter. Luas permukaan kolam tersebut adalah ... meter persegi (m²).',
        correctAnswer: '120',
        score: 15,
        explanation: 'Luas persegi panjang = panjang × lebar = 15 m × 8 m = 120 m².'
      },
      {
        id: 'q-mat-6',
        number: 6,
        type: 'uraian',
        question: 'Perhatikan foto realistis aneka model bangun ruang geometri di atas meja kelas berikut ini!\na. Sebutkan minimal 3 nama bangun ruang yang tampak pada foto tersebut!\nb. Tuliskan ciri-ciri utama dari salah satu bangun ruang yang kamu sebutkan (jumlah sisi, rusuk, atau titik sudut)!\n(Tuliskan jawabanmu secara lengkap dan terstruktur!)',
        hasImage: true,
        imageKey: 'foto_bangun_ruang',
        imageUrl: '/src/assets/images/geometric_shapes_math_1791029359029.jpg',
        imageCaption: 'Gambar Foto Realistis Model Peraga Bangun Ruang Geometri 3D di Meja Kelas',
        correctAnswer: 'Jawaban uraian model:\na. Tiga bangun ruang yang tampak pada foto peraga adalah: Kubus, Tabung (Silinder), dan Kerucut (atau Balok/Bola).\nb. Ciri-ciri Kubus: Memiliki 6 sisi berbentuk persegi yang kongruen (sama besar), 12 rusuk sama panjang, dan 8 titik sudut.\n(Atau jika Tabung: Memiliki 3 sisi yaitu alas dan tutup lingkaran serta selimut tabung, 2 rusuk lengkung, tidak memiliki titik sudut).',
        rubricGuidelines: [
          'Menyebutkan 3 nama bangun ruang dengan benar (skor 15)',
          'Menuliskan ciri-ciri (sisi, rusuk, titik sudut) dengan tepat (skor 15)'
        ],
        score: 30,
        explanation: 'Model peraga memuat bangun ruang 3D: kubus, tabung, balok, kerucut, dan bola.'
      }
    ]
  },
  {
    id: 'sample-pancasila-kelas2',
    title: 'Asesmen Sumatif Pendidikan Pancasila Kelas 2 - Simbol Sila & Gotong Royong',
    createdAt: '2025-01-17T08:00:00.000Z',
    updatedAt: '2025-01-17T08:00:00.000Z',
    header: {
      dinasPendidikan: 'PEMERINTAH KABUPATEN PENDIDIKAN\nDINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA',
      namaSekolah: 'SD NEGERI 02 PANCASILA',
      alamatSekolah: 'Jl. Garuda No. 17',
      jenisAsesmen: 'Asesmen Sumatif Lingkup Materi',
      mataPelajaran: 'Pendidikan Pancasila',
      kelas: 2,
      fase: 'Fase A',
      semester: '1 (Ganjil)',
      tahunPelajaran: '2024/2025',
      alokasiWaktu: '60 Menit',
      tanggalPelaksanaan: 'Kamis, 23 Oktober 2025',
      namaPenyusun: 'Dewi Lestari, S.Pd.',
      nipPenyusun: '19920110 201903 2 011',
      materiPokok: 'Unit 1: Aku Cinta Pancasila dan Perilaku Hidup Rukun',
      petunjukUmum: [
        'Ucapkan bismillah atau doa sebelum mulai mengerjakan.',
        'Minta bantuan guru jika ada tulisan yang belum kamu pahami.',
        'Jawablah dengan jujur dan teliti.'
      ]
    },
    questions: [
      {
        id: 'q-pan-1',
        number: 1,
        type: 'pilihan_ganda',
        question: 'Simbol sila pertama Pancasila "Ketuhanan Yang Maha Esa" yang terletak di tengah perisai burung Garuda adalah ....',
        options: [
          { key: 'A', text: 'Bintang Emas' },
          { key: 'B', text: 'Pohon Beringin' },
          { key: 'C', text: 'Rantai Emas' }
        ],
        correctAnswer: 'A',
        score: 15,
        explanation: 'Sila pertama dilambangkan dengan Bintang Emas berlatar belakang hitam.'
      },
      {
        id: 'q-pan-2',
        number: 2,
        type: 'pilihan_ganda_kompleks',
        question: 'Perhatikan foto realistis kegiatan kerja bakti di sekolah berikut! Manakah perilaku terpuji yang menunjukkan sikap gotong royong dan menjaga kebersihan sekolah?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)',
        instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
        hasImage: true,
        imageKey: 'foto_gotong_royong',
        imageUrl: '/src/assets/images/gotong_royong_students_1791028957062.jpg',
        imageCaption: 'Gambar Kegiatan Nyata Gotong Royong Siswa di Lingkungan Sekolah (Foto Realistis)',
        options: [
          { key: 'A', text: 'Bekerja sama menyapu halaman sekolah bersama teman sekelas', isCorrect: true },
          { key: 'B', text: 'Membuang sampah ke tempat sampah dan merawat bibit pohon', isCorrect: true },
          { key: 'C', text: 'Duduk berdiam diri menonton teman-teman yang sedang bersusah payah membersihkan kelas', isCorrect: false }
        ],
        score: 20,
        explanation: 'Sikap gotong royong ditunjukkan dengan aktif menyapu bersama dan memilah sampah. Membiarkan teman bekerja sendiri adalah perilaku tidak terpuji.'
      },
      {
        id: 'q-pan-3',
        number: 3,
        type: 'pilihan_ganda_kategori',
        question: 'Perhatikan foto perisai lambang negara Garuda Pancasila berikut! Tentukan Benar atau Salah pada setiap pernyataan mengenai makna simbol sila berikut!',
        instruction: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
        hasImage: true,
        imageKey: 'foto_garuda_pancasila',
        imageUrl: '/src/assets/images/garuda_pancasila_shield_1791028968634.jpg',
        imageCaption: 'Gambar Perisai 5 Simbol Sila Garuda Pancasila (Foto Realistis)',
        statements: [
          {
            statement: 'Pohon beringin adalah simbol sila ketiga Pancasila yaitu Persatuan Indonesia.',
            correctAnswer: 'Benar'
          },
          {
            statement: 'Menghormati teman yang sedang beribadah sesuai agamanya merupakan pengamalan sila kedua.',
            correctAnswer: 'Salah'
          },
          {
            statement: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia dilambangkan dengan Padi dan Kapas.',
            correctAnswer: 'Benar'
          }
        ],
        score: 25,
        explanation: 'Pernyataan 1 Benar (Sila 3 = Beringin). Pernyataan 2 Salah (Menghormati ibadah adalah Sila 1 Ketuhanan YME). Pernyataan 3 Benar (Sila 5 = Padi dan Kapas).'
      },
      {
        id: 'q-pan-4',
        number: 4,
        type: 'isian',
        question: 'Semboyan bangsa Indonesia yang tertulis pada pita yang dicengkeram oleh burung Garuda Pancasila dan memiliki arti "berbeda-beda tetapi tetap satu jua" adalah ....',
        correctAnswer: 'Bhinneka Tunggal Ika',
        score: 20,
        explanation: 'Bhinneka Tunggal Ika adalah semboyan pemersatu bangsa Indonesia.'
      },
      {
        id: 'q-pan-5',
        number: 5,
        type: 'uraian',
        question: 'Sebutkan 2 contoh sikap atau perbuatan di rumah yang mencerminkan rasa sayang dan patuh kepada orang tua!',
        correctAnswer: 'Contoh perbuatan di rumah:\n1. Membantu orang tua membersihkan tempat tidur atau mencuci piring.\n2. Berbicara sopan, mendengarkan nasihat orang tua, dan berpamitan saat hendak pergi keluar bermain.',
        rubricGuidelines: [
          'Menyebutkan 1 contoh yang relevan (skor 10)',
          'Menyebutkan 2 contoh yang relevan dan santun (skor 20)'
        ],
        score: 20,
        explanation: 'Contoh patuh kepada orang tua: berbicara sopan, mendengarkan nasihat, dan membantu pekerjaan rumah tangga.'
      }
    ]
  }
];
