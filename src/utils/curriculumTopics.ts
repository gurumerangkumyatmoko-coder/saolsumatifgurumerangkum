import { SDGrade, SubjectName } from '../types/exam';

export interface TopicItem {
  id: string;
  semester: 1 | 2;
  title: string;
  subtopics?: string[];
}

export interface SubjectGradeCurriculum {
  subject: string;
  grade: SDGrade;
  topics: TopicItem[];
}

// Database Kurikulum Merdeka Terintegrasi SD (Kelas 1 - 6)
export const CURRICULUM_MERDEKA_DATABASE: Record<string, Record<SDGrade, TopicItem[]>> = {
  // ===================== IPAS =====================
  'IPAS (Ilmu Pengetahuan Alam dan Sosial)': {
    1: [
      { id: 'ipas-1-1', semester: 1, title: 'Bab 1: Mengenal Anggota Tubuh dan Panca Indra', subtopics: ['Fungsi mata, telinga, hidung, lidah, kulit', 'Cara merawat panca indra'] },
      { id: 'ipas-1-2', semester: 1, title: 'Bab 2: Benda Hidup dan Benda Tak Hidup di Sekitarku', subtopics: ['Ciri-ciri makhluk hidup', 'Benda di dalam kelas dan rumah'] },
      { id: 'ipas-1-3', semester: 1, title: 'Bab 3: Siang dan Malam serta Perubahan Cuaca', subtopics: ['Matahari, bulan, bintang', 'Cuaca cerah, berawan, hujan'] },
      { id: 'ipas-1-4', semester: 2, title: 'Bab 4: Hewan dan Tumbuhan di Lingkungan Sekolah', subtopics: ['Bagian tubuh hewan', 'Bagian tanaman bunga dan pohon'] },
      { id: 'ipas-1-5', semester: 2, title: 'Bab 5: Rumah Sehat dan Keluargaku yang Rukun', subtopics: ['Menjaga kebersihan rumah', 'Peran anggota keluarga'] }
    ],
    2: [
      { id: 'ipas-2-1', semester: 1, title: 'Bab 1: Mengenal Bentuk dan Sifat Benda di Sekitar', subtopics: ['Benda padat, cair, dan gas sederhana', 'Perubahan wujud es mencair'] },
      { id: 'ipas-2-2', semester: 1, title: 'Bab 2: Tempat Tinggal Hewan dan Tumbuhan (Habitat)', subtopics: ['Hewan darat dan air', 'Tanaman darat dan air'] },
      { id: 'ipas-2-3', semester: 1, title: 'Bab 3: Lingkungan Rumah Bersih dan Sehat', subtopics: ['Memilah sampah organik dan anorganik', 'Pola hidup bersih'] },
      { id: 'ipas-2-4', semester: 2, title: 'Bab 4: Sumber Energi Sehari-hari (Matahari, Angin, Air)', subtopics: ['Manfaat sinar matahari', 'Pemanfaatan energi air dan angin'] },
      { id: 'ipas-2-5', semester: 2, title: 'Bab 5: Kenampakan Alam Sekitar dan Gotong Royong Warga', subtopics: ['Sungai, gunung, bukit, pantai', 'Bekerja bakti di kampung'] }
    ],
    3: [
      { id: 'ipas-3-1', semester: 1, title: 'Bab 1: Mari Kenali Hewan di Sekitar Kita', subtopics: ['Pengelompokan hewan herbivora, karnivora, omnivora', 'Alat gerak dan pernapasan hewan'] },
      { id: 'ipas-3-2', semester: 1, title: 'Bab 2: Ayo, Mengenal Siklus pada Makhluk Hidup', subtopics: ['Metamorfosis kupu-kupu dan katak', 'Daur hidup tumbuhan berbiji'] },
      { id: 'ipas-3-3', semester: 1, title: 'Bab 3: Hidup Bersama Alam (Ekosistem Lingkungan)', subtopics: ['Komponen biotik dan abiotik', 'Saling ketergantungan makhluk hidup'] },
      { id: 'ipas-3-4', semester: 1, title: 'Bab 4: Berkenalan dengan Energi dan Perubahannya', subtopics: ['Bentuk-bentuk energi (gerak, panas, cahaya, bunyi)', 'Hemat energi di rumah'] },
      { id: 'ipas-3-5', semester: 2, title: 'Bab 5: Denah Rumahku dan Denah Lingkungan Sekitar', subtopics: ['Membaca mata angin (U, S, T, B)', 'Membuat denah kelas dan sekolah'] },
      { id: 'ipas-3-6', semester: 2, title: 'Bab 6: Tradisi Keluarga dan Masyarakat Sekitarku', subtopics: ['Upacara adat daerah', 'Nilai kearifan lokal Nusantara'] },
      { id: 'ipas-3-7', semester: 2, title: 'Bab 7: Cerita dari Kampung Halaman (Sejarah Lokal)', subtopics: ['Asal-usul nama desa/kota', 'Tokoh berjasa di lingkungan sekitar'] },
      { id: 'ipas-3-8', semester: 2, title: 'Bab 8: Bentang Alam dan Kekayaan Wilayah Indonesia', subtopics: ['Dataran tinggi, dataran rendah, lautan', 'Hasil bumi daerah'] }
    ],
    4: [
      { id: 'ipas-4-1', semester: 1, title: 'Bab 1: Tumbuhan, Sumber Kehidupan di Bumi (Fotosintesis)', subtopics: ['Bagian tumbuhan dan fungsinya', 'Proses fotosintesis klorofil & matahari', 'Perkembangbiakan tumbuhan'] },
      { id: 'ipas-4-2', semester: 1, title: 'Bab 2: Wujud Zat dan Perubahannya', subtopics: ['Massa dan volume zat padat, cair, gas', 'Mencair, membeku, menguap, mengembun, menyublim'] },
      { id: 'ipas-4-3', semester: 1, title: 'Bab 3: Gaya di Sekitar Kita (Otot, Gesek, Magnet, Gravitasi)', subtopics: ['Pengaruh gaya terhadap gerak dan bentuk benda', 'Manfaat gaya gesek dan magnet bumi'] },
      { id: 'ipas-4-4', semester: 1, title: 'Bab 4: Mengubah Bentuk Energi', subtopics: ['Transformasi energi listrik ke panas/gerak/cahaya', 'Energi potensial dan kinetik'] },
      { id: 'ipas-4-5', semester: 2, title: 'Bab 5: Cerita Tentang Daerahku (Sejarah Kerajaan & Pahlawan)', subtopics: ['Kerajaan Hindu-Buddha dan Islam di Nusantara', 'Tokoh pahlawan daerah'] },
      { id: 'ipas-4-6', semester: 2, title: 'Bab 6: Indonesiaku Kaya Budaya', subtopics: ['Keragaman suku bangsa, rumah adat, tarian tradisional', 'Sikap toleransi kebinekaan'] },
      { id: 'ipas-4-7', semester: 2, title: 'Bab 7: Bagaimana Mendapatkan Semua Keperluan Kita? (Kebutuhan & Uang)', subtopics: ['Kebutuhan primer, sekunder, tersier', 'Sejarah uang dan kegiatan ekonomi (produksi, distribusi, konsumsi)'] },
      { id: 'ipas-4-8', semester: 2, title: 'Bab 8: Membangun Masyarakat yang Beradab (Norma & Aturan)', subtopics: ['Norma agama, kesusilaan, kesopanan, hukum', 'Hak dan kewajiban warga masyarakat'] }
    ],
    5: [
      { id: 'ipas-5-1', semester: 1, title: 'Bab 1: Melihat karena Cahaya, Mendengar karena Bunyi', subtopics: ['Sifat-sifat cahaya (merambat lurus, menembus benda bening, memantul, membias)', 'Bagian dan cara kerja mata serta telinga', 'Sifat gelombang bunyi'] },
      { id: 'ipas-5-2', semester: 1, title: 'Bab 2: Harmoni dalam Ekosistem (Rantai & Jaring Makanan)', subtopics: ['Produsen, konsumen I/II/III, pengurai (dekomposer)', 'Piramida makanan dan keseimbangan ekosistem'] },
      { id: 'ipas-5-3', semester: 1, title: 'Bab 3: Magnet, Listrik, dan Teknologi untuk Kehidupan', subtopics: ['Rangkaian listrik seri dan paralel', 'Sifat kutub magnet dan elektromagnet', 'Pembangkit listrik dan hemat energi'] },
      { id: 'ipas-5-4', semester: 1, title: 'Bab 4: Berkenalan dengan Bumi Kita (Struktur & Litosfer)', subtopics: ['Lapisan bumi (kerak, mantel, inti)', 'Bentuk muka bumi, hidrosfer (daur air), atmosfer'] },
      { id: 'ipas-5-5', semester: 2, title: 'Bab 5: Bagaimana Kita Hidup dan Bertumbuh (Sistem Tubuh Manusia)', subtopics: ['Sistem pencernaan makanan dan fungsinya', 'Sistem pernapasan manusia', 'Masa pubertas dan menjaga kesehatan reproduksi'] },
      { id: 'ipas-5-6', semester: 2, title: 'Bab 6: Indonesiaku Kaya Raya (Flora, Fauna & Geografis)', subtopics: ['Letak geografis & astronomis Indonesia', 'Garis Wallace dan Weber', 'Kekayaan maritim dan agraris'] },
      { id: 'ipas-5-7', semester: 2, title: 'Bab 7: Warisan Budaya Indonesia yang Mendunia', subtopics: ['Situs candi, wayang, batik, kuliner Nusantara diakui UNESCO', 'Pelestarian warisan budaya bangsa'] },
      { id: 'ipas-5-8', semester: 2, title: 'Bab 8: Bumiku Sayang, Bumiku Malang (Perubahan Iklim)', subtopics: ['Pemanasan global dan efek rumah kaca', 'Pengelolaan sampah 3R (Reduce, Reuse, Recycle)', 'Bencana alam dan mitigasinya'] }
    ],
    6: [
      { id: 'ipas-6-1', semester: 1, title: 'Bab 1: Bagaimana Tubuh Kita Bergerak? (Rangka, Sendi, Otot)', subtopics: ['Rangka tengkorak, badan, anggota gerak', 'Macam-macam sendi (engsel, peluru, putar, pelana)', 'Kelainan tulang (lordosis, kifosis, skoliosis) dan cara merawatnya'] },
      { id: 'ipas-6-2', semester: 1, title: 'Bab 2: Cerita tentang Indonesia Kita (Perjuangan Kemerdekaan)', subtopics: ['Pergerakan nasional Budi Utomo & Sumpah Pemuda', 'Peristiwa Rengasdengklok & Proklamasi 17 Agustus 1945', 'Mempertahankan kemerdekaan Indonesia'] },
      { id: 'ipas-6-3', semester: 1, title: 'Bab 3: Pelesir Keliling Dunia (Enam Benua dan Samudra)', subtopics: ['Ciri geografis benua Asia, Afrika, Amerika, Eropa, Australia, Antartika', 'Bentang alam dunia terkenal (Sungai Nil, Amazon, Himalaya)'] },
      { id: 'ipas-6-4', semester: 1, title: 'Bab 4: Indonesia dan Masyarakat Dunia (Kerjasama & ASEAN)', subtopics: ['Peran aktif Indonesia di ASEAN dan PBB', 'Kerjasama bidang ekonomi, pendidikan, sosial budaya internasional', 'Globalisasi dan dampaknya'] },
      { id: 'ipas-6-5', semester: 2, title: 'Bab 5: Menjelajahi Bumi dan Antariksa (Sistem Tata Surya)', subtopics: ['Matahari dan 8 planet dalam tata surya', 'Rotasi dan revolusi bumi serta bulan', 'Gerhana matahari, gerhana bulan, pasang surut air laut'] },
      { id: 'ipas-6-6', semester: 2, title: 'Bab 6: Gawat! Benarkah Energi di Bumi Akan Habis? (Energi Baru Terbarukan)', subtopics: ['Keterbatasan bahan bakar fosil', 'Energi alternatif (surya, angin, biomassa, geotermal)', 'Gaya hidup hemat energi masa depan'] },
      { id: 'ipas-6-7', semester: 2, title: 'Bab 7: Bumi Kita Terancam Bahaya (Pelestarian Lingkungan Global)', subtopics: ['Deforestasi, pencemaran laut, krisis air bersih', 'Aksi nyata konservasi alam anak sekolah'] }
    ]
  },

  // ===================== MATEMATIKA =====================
  'Matematika': {
    1: [
      { id: 'mat-1-1', semester: 1, title: 'Bab 1: Bilangan Cacah sampai dengan 10 (Membilang & Menulis)', subtopics: ['Membilang banyak benda 1 - 10', 'Membandingkan dan mengurutkan bilangan'] },
      { id: 'mat-1-2', semester: 1, title: 'Bab 2: Menguraikan dan Menyusun Bilangan (Ikatan Bilangan)', subtopics: ['Pasangan bilangan penjumlah 5 dan 10'] },
      { id: 'mat-1-3', semester: 1, title: 'Bab 3: Operasi Penjumlahan sampai dengan 10', subtopics: ['Penjumlahan dengan gambar benda', 'Kalimat matematika penjumlahan'] },
      { id: 'mat-1-4', semester: 1, title: 'Bab 4: Operasi Pengurangan sampai dengan 10', subtopics: ['Pengurangan konsep mengambil dan sisa', 'Soal cerita pengurangan sederhana'] },
      { id: 'mat-1-5', semester: 2, title: 'Bab 5: Bentuk-Bentuk Bangun (Segitiga, Segiempat, Lingkaran)', subtopics: ['Mengenal bangun datar di sekitar', 'Menyusun dan mengelompokkan bentuk'] },
      { id: 'mat-1-6', semester: 2, title: 'Bab 6: Bilangan Lebih dari 10 (Bilangan 11 sampai 20)', subtopics: ['Nilai tempat puluhan dan satuan dasar'] },
      { id: 'mat-1-7', semester: 2, title: 'Bab 7: Mengukur dan Membandingkan Panjang Benda', subtopics: ['Lebih panjang, lebih pendek, sama panjang'] },
      { id: 'mat-1-8', semester: 2, title: 'Bab 8: Mengenal Diagram Gambar (Piktogram Sederhana)', subtopics: ['Membaca data gambar buah dan hewan'] }
    ],
    2: [
      { id: 'mat-2-1', semester: 1, title: 'Bab 1: Bilangan Cacah sampai 100 dan Nilai Tempat', subtopics: ['Membaca, menulis bilangan sampai 100', 'Nilai tempat puluhan dan satuan'] },
      { id: 'mat-2-2', semester: 1, title: 'Bab 2: Penjumlahan dan Pengurangan Bersusun (sampai 100)', subtopics: ['Penjumlahan teknik menyimpan', 'Pengurangan teknik meminjam'] },
      { id: 'mat-2-3', semester: 1, title: 'Bab 3: Waktu dan Durasi (Membaca Jam Analog & Digital)', subtopics: ['Membaca jarum jam tepat dan setengah', 'Nama-nama hari dan bulan'] },
      { id: 'mat-2-4', semester: 1, title: 'Bab 4: Pengukuran Panjang (Centimeter dan Meter)', subtopics: ['Mengukur dengan penggaris dan meteran', 'Satuan baku cm dan m'] },
      { id: 'mat-2-5', semester: 2, title: 'Bab 5: Bangun Datar dan Bangun Ruang Sederhana', subtopics: ['Sisi dan sudut bangun datar', 'Kubus, balok, bola, tabung sederhana'] },
      { id: 'mat-2-6', semester: 2, title: 'Bab 6: Konsep Dasar Perkalian dan Pembagian', subtopics: ['Perkalian sebagai penjumlahan berulang', 'Pembagian sebagai pengurangan berulang sampai nol'] },
      { id: 'mat-2-7', semester: 2, title: 'Bab 7: Pecahan Sederhana (1/2, 1/3, 1/4)', subtopics: ['Membagi benda menjadi bagian sama besar'] },
      { id: 'mat-2-8', semester: 2, title: 'Bab 8: Pengumpulan Data dan Diagram Batang Gambar', subtopics: ['Menyajikan data hobi dan makanan favorit'] }
    ],
    3: [
      { id: 'mat-3-1', semester: 1, title: 'Bab 1: Bilangan Cacah sampai 1.000 dan Nilai Tempat Ratusan', subtopics: ['Membaca & menulis bilangan hingga 1.000', 'Nilai tempat ratusan, puluhan, satuan'] },
      { id: 'mat-3-2', semester: 1, title: 'Bab 2: Operasi Hitung Campuran Penjumlahan & Pengurangan', subtopics: ['Sifat komutatif dan asosiatif', 'Penyelesaian soal cerita kontekstual'] },
      { id: 'mat-3-3', semester: 1, title: 'Bab 3: Perkalian dan Pembagian Bilangan Cacah (Tabel Perkalian)', subtopics: ['Perkalian dua angka dengan satu angka', 'Pembagian bersusun porogapit sederhana'] },
      { id: 'mat-3-4', semester: 1, title: 'Bab 4: Pecahan dengan Pembilang Satu dan Penyebut Sama', subtopics: ['Membandingkan pecahan berpenyebut sama', 'Penjumlahan pecahan berpenyebut sama'] },
      { id: 'mat-3-5', semester: 2, title: 'Bab 5: Pola Bilangan Membesar dan Mengecil serta Pola Gambar', subtopics: ['Melengkapi barisan pola bilangan loncat'] },
      { id: 'mat-3-6', semester: 2, title: 'Bab 6: Pengukuran Panjang, Berat (Gram/Kilogram), dan Waktu', subtopics: ['Konversi satuan panjang m ke cm', 'Menimbang berat benda dengan timbangan'] },
      { id: 'mat-3-7', semester: 2, title: 'Bab 7: Unsur Bangun Datar (Sisi, Sudut Siku-Siku, Lancip, Tumpul)', subtopics: ['Mengenal jenis-jenis sudut', 'Sifat persegi, persegi panjang, segitiga'] },
      { id: 'mat-3-8', semester: 2, title: 'Bab 8: Pengumpulan Data dan Diagram Turus (Tally)', subtopics: ['Membuat tabel frekuensi sederhana'] }
    ],
    4: [
      { id: 'mat-4-1', semester: 1, title: 'Bab 1: Bilangan Cacah sampai 10.000 dan Komposisi Nilai Tempat', subtopics: ['Membaca & menulis bilangan ribuan', 'Operasi perkalian dan pembagian bersusun ratusan'] },
      { id: 'mat-4-2', semester: 1, title: 'Bab 2: Pecahan Senilai, Pecahan Desimal, dan Persen', subtopics: ['Menentukan pecahan senilai', 'Mengubah pecahan biasa ke desimal & persen'] },
      { id: 'mat-4-3', semester: 1, title: 'Bab 3: Pola Gambar dan Pola Bilangan Teratur', subtopics: ['Menemukan aturan pola bilangan dan relasi'] },
      { id: 'mat-4-4', semester: 1, title: 'Bab 4: Pengukuran Luas dan Volume (Satuan Baku cm² & Liter)', subtopics: ['Luas persegi dan persegi panjang', 'Volume kubus satuan dan wadah air'] },
      { id: 'mat-4-5', semester: 2, title: 'Bab 5: Bangun Datar (Keliling, Luas Segitiga & Segiempat)', subtopics: ['Rumus keliling & luas persegi, persegi panjang, segitiga', 'Sudut pada bangun datar'] },
      { id: 'mat-4-6', semester: 2, title: 'Bab 6: Piktogram dan Diagram Batang Horizontal/Vertikal', subtopics: ['Membaca dan membuat diagram batang', 'Menafsirkan data tertinggi, terendah, selisih'] }
    ],
    5: [
      { id: 'mat-5-1', semester: 1, title: 'Bab 1: Bilangan Cacah sampai 100.000 dan Operasi Hitung Campuran', subtopics: ['Membaca, menulis, membandingkan bilangan puluhan ribu', 'Operasi hitung campuran tanda kurung'] },
      { id: 'mat-5-2', semester: 1, title: 'Bab 2: Faktor dan Kelipatan (FPB dan KPK)', subtopics: ['Bilangan prima dan faktorisasi prima', 'Pohon faktor dan penerapan KPK & FPB dalam kehidupan'] },
      { id: 'mat-5-3', semester: 1, title: 'Bab 3: Pecahan (Penjumlahan & Pengurangan Beda Penyebut)', subtopics: ['Menyamakan penyebut dengan KPK', 'Perkalian dan pembagian pecahan biasa serta campuran'] },
      { id: 'mat-5-4', semester: 1, title: 'Bab 4: Keliling dan Luas Bangun Datar (Jajar Genjang, Trapesium, Belah Ketupat, Layang-layang)', subtopics: ['Menghitung keliling dan luas bangun datar segi banyak'] },
      { id: 'mat-5-5', semester: 2, title: 'Bab 5: Pengukuran Sudut dengan Busur Derajat', subtopics: ['Mengukur dan menggambar besar sudut', 'Sudut pada segitiga dan segiempat'] },
      { id: 'mat-5-6', semester: 2, title: 'Bab 6: Data dan Diagram Batang Ganda', subtopics: ['Menyajikan perbandingan dua kelompok data', 'Menganalisis tren data'] }
    ],
    6: [
      { id: 'mat-6-1', semester: 1, title: 'Bab 1: Operasi Hitung Pecahan dan Desimal', subtopics: ['Perkalian pecahan biasa dengan desimal', 'Pembagian pecahan dan menyelesaikan masalah sehari-hari'] },
      { id: 'mat-6-2', semester: 1, title: 'Bab 2: Rasio, Perbandingan, dan Skala Denah/Peta', subtopics: ['Konsep rasio dua besaran', 'Perbandingan senilai dan berbalik nilai dasar', 'Menghitung jarak sebenarnya pada peta'] },
      { id: 'mat-6-3', semester: 1, title: 'Bab 3: Bangun Ruang (Kubus, Balok, Prisma, Limas, Tabung, Kerucut, Bola)', subtopics: ['Jaring-jaring bangun ruang', 'Luas permukaan dan volume kubus, balok, prisma, tabung'] },
      { id: 'mat-6-4', semester: 2, title: 'Bab 4: Bilangan Bulat Negatif dan Garis Bilangan', subtopics: ['Konsep suhu di bawah nol, kedalaman laut', 'Operasi hitung penjumlahan dan pengurangan bilangan bulat'] },
      { id: 'mat-6-5', semester: 2, title: 'Bab 5: Statistika Dasar (Rata-rata / Mean, Median, dan Modus)', subtopics: ['Menghitung nilai rata-rata ulangan', 'Menentukan nilai tengah dan modus data'] },
      { id: 'mat-6-6', semester: 2, title: 'Bab 6: Peluang Peristiwa dan Diagram Lingkaran', subtopics: ['Membaca diagram lingkaran persen & derajat', 'Peluang pasti, mungkin, dan mustahil'] }
    ]
  },

  // ===================== BAHASA INDONESIA =====================
  'Bahasa Indonesia': {
    1: [
      { id: 'bi-1-1', semester: 1, title: 'Bab 1: Bunyi Apa? (Mengenal Huruf B dan Bunyi Sekitar)', subtopics: ['Mendengarkan bunyi alam dan buatan', 'Membaca suku kata bo-bi-bu-be-ba'] },
      { id: 'bi-1-2', semester: 1, title: 'Bab 2: Ayo Bermain! (Huruf C dan Kata Tanya)', subtopics: ['Tanda tanya, kata tanya Apa, Siapa, Di mana', 'Aturan bermain bersama'] },
      { id: 'bi-1-3', semester: 1, title: 'Bab 3: Awas Kuman! (Huruf K dan Kebersihan Diri)', subtopics: ['Mencuci tangan 6 langkah', 'Membaca kosakata kesehatan'] },
      { id: 'bi-1-4', semester: 1, title: 'Bab 4: Aku Bisa! (Huruf L dan Gerakan Binatang)', subtopics: ['Menirukan gerak hewan', 'Membaca dan menulis kata berawalan L'] },
      { id: 'bi-1-5', semester: 2, title: 'Bab 5: Teman Baru (Huruf M dan Bersikap Ramah)', subtopics: ['Perkenalan diri dan menghargai teman'] },
      { id: 'bi-1-6', semester: 2, title: 'Bab 6: Berbeda Itu Tak Apa (Huruf G dan Keberagaman)', subtopics: ['Mengenali ciri fisik diri dan orang lain'] },
      { id: 'bi-1-7', semester: 2, title: 'Bab 7: Aku Ingin (Huruf P, Membedakan Kebutuhan & Keinginan)', subtopics: ['Cerita bergambar menabung'] },
      { id: 'bi-1-8', semester: 2, title: 'Bab 8: Di Sekitar Rumah (Huruf D, Arah dan Denah Sederhana)', subtopics: ['Kanan, kiri, depan, belakang rumah'] }
    ],
    2: [
      { id: 'bi-2-1', semester: 1, title: 'Bab 1: Mengenal Perasaan (Mengungkapkan Emosi & Kosakata)', subtopics: ['Senang, sedih, marah, takut, bangga', 'Tanda titik dan huruf kapital'] },
      { id: 'bi-2-2', semester: 1, title: 'Bab 2: Menjaga Kesehatan (Membaca Grafik Sederhana)', subtopics: ['Pola makan sehat 4 sehat 5 sempurna', 'Kosakata pencegahan penyakit'] },
      { id: 'bi-2-3', semester: 1, title: 'Bab 3: Berhati-hati di Mana Saja (Rambu Peringatan & Keselamatan)', subtopics: ['Menyeberang di zebra cross', 'Menghindari bahaya di tempat umum'] },
      { id: 'bi-2-4', semester: 1, title: 'Bab 4: Keluargaku Unik (Kata Sapaan dan Fakta-Opini Ringan)', subtopics: ['Silsilah keluarga', 'Menghormati orang tua'] },
      { id: 'bi-2-5', semester: 2, title: 'Bab 5: Berteman dalam Keragaman (Membaca Puisi Anak)', subtopics: ['Mendeklamasikan puisi dengan lafal dan intonasi'] },
      { id: 'bi-2-6', semester: 2, title: 'Bab 6: Bijak Memakai Uang (Cerita Menabung & Barter)', subtopics: ['Peribahasa hemat pangkal kaya', 'Membuat celengan impian'] },
      { id: 'bi-2-7', semester: 2, title: 'Bab 7: Sayangi Lingkungan (Teks Imbauan Memilah Sampah)', subtopics: ['Kalimat ajakan dan larangan'] },
      { id: 'bi-2-8', semester: 2, title: 'Bab 8: Hobi yang Menyenangkan (Teks Prosedur Sederhana)', subtopics: ['Langkah-langkah membuat kerajinan atau memasak'] }
    ],
    3: [
      { id: 'bi-3-1', semester: 1, title: 'Bab 1: Ayo, Main! (Permainan Tradisional & Teks Narasi)', subtopics: ['Egrang, gobak sodor, petak umpet', 'Menemukan ide pokok cerita'] },
      { id: 'bi-3-2', semester: 1, title: 'Bab 2: Kawan Seiring (Ekspresi Perasaan & Kalimat Tanya)', subtopics: ['Wawancara teman sekelas', 'Kata tanya adiksimba'] },
      { id: 'bi-3-3', semester: 1, title: 'Bab 3: Pengobar Semangat (Tokoh Inspiratif & Kalimat Majemuk)', subtopics: ['Membaca biografi pahlawan anak', 'Kata hubung dan, tetapi, atau'] },
      { id: 'bi-3-4', semester: 1, title: 'Bab 4: Senyum di Sekitarku (Mengenal Berbagai Profesi)', subtopics: ['Petani, dokter, polisi, guru, masinis', 'Dialog wawancara singkat'] },
      { id: 'bi-3-5', semester: 2, title: 'Bab 5: Bola-Bola Cokelat (Teks Prosedur & Resep Makanan)', subtopics: ['Menulis bahan dan langkah kerja yang urut'] },
      { id: 'bi-3-6', semester: 2, title: 'Bab 6: Tersesat (Membaca Peta & Denah Lingkungan)', subtopics: ['Memberi petunjuk arah jalan', 'Kata depan di, ke, dari'] },
      { id: 'bi-3-7', semester: 2, title: 'Bab 7: Aku dan Si Merah (Cerita Fiksi & Menulis Cerpen)', subtopics: ['Unsur intrinsik: tokoh, watak, latar tempat, amanat'] },
      { id: 'bi-3-8', semester: 2, title: 'Bab 8: Sahabat dari Seberang (Menulis Surat Pribadi)', subtopics: ['Bagian-bagian surat pribadi', 'Etika berkirim kabar santun'] }
    ],
    4: [
      { id: 'bi-4-1', semester: 1, title: 'Bab 1: Sudah Besar (Kalimat Transitif dan Intransitif)', subtopics: ['Struktur SPOK dasar', 'Menghadapi rasa takut dan bersikap mandiri'] },
      { id: 'bi-4-2', semester: 1, title: 'Bab 2: Di Bawah Atap (Kata Homofon & Kalimat Majemuk)', subtopics: ['Kata berbunyi sama beda makna', 'Menulis cerita pengalaman di rumah'] },
      { id: 'bi-4-3', semester: 1, title: 'Bab 3: Lihat Sekitar (Teks Petunjuk Rambu & Paragraf Argumentasi)', subtopics: ['Menulis alasan logis yang meyakinkan', 'Rambu lalu lintas jalan'] },
      { id: 'bi-4-4', semester: 1, title: 'Bab 4: Meliuk dan Menerjang (Teks Deskripsi & Majas Personifikasi)', subtopics: ['Gaya bahasa personifikasi (benda mati seolah hidup)', 'Mendeskripsikan tarian dan silat'] },
      { id: 'bi-4-5', semester: 2, title: 'Bab 5: Bertukar atau Membayar (Cerita Sejarah Uang & Teks Informasi)', subtopics: ['Asal mula barter sampai uang koin dan kertas', 'Menulis paragraf sebab-akibat'] },
      { id: 'bi-4-6', semester: 2, title: 'Bab 6: Satu Titik (Teks Puisi & Fakta Bentang Alam Indonesia)', subtopics: ['Menemukan rima dan makna kata kiasan puisi', 'Raja Ampat dan keindahan laut'] },
      { id: 'bi-4-7', semester: 2, title: 'Bab 7: Asal Usul (Kata Penghubung Antarkalimat & Cerita Nenek Moyang)', subtopics: ['Konjungsi: oleh karena itu, selain itu, namun', 'Asal-usul lagu daerah dan suku bangsa'] },
      { id: 'bi-4-8', semester: 2, title: 'Bab 8: Sehatlah Ragaku (Laporan Hasil Pengamatan & Wawancara)', subtopics: ['Membuat daftar pertanyaan wawancara', 'Menulis laporan fakta kesehatan'] }
    ],
    5: [
      { id: 'bi-5-1', semester: 1, title: 'Bab 1: Aku yang Unik (Kata Sifat, Sinonim, Antonim & Puisi Akrostik)', subtopics: ['Mendeskripsikan kepribadian diri', 'Puisi akrostik berdasarkan nama'] },
      { id: 'bi-5-2', semester: 1, title: 'Bab 2: Buku Jendela Dunia (Unsur Intrinsik & Resensi Cerita)', subtopics: ['Tema, alur maju/mundur, sudut pandang pengarang', 'Membedakan teks fiksi dan nonfiksi'] },
      { id: 'bi-5-3', semester: 1, title: 'Bab 3: Ekspresi Diri Melalui Hobi (Teks Prosedur & Surat Elektronik/Email)', subtopics: ['Menulis panduan cara membuat sesuatu', 'Menulis surel resmi dan santun'] },
      { id: 'bi-5-4', semester: 1, title: 'Bab 4: Belajar Berwirausaha (Wawancara Tokoh Usaha & Kalimat Tanggapan)', subtopics: ['Ide bisnis kreatif anak sekolah', 'Etika mengajukan pertanyaan wawancara'] },
      { id: 'bi-5-5', semester: 2, title: 'Bab 5: Menjadi Warga Dunia (Singkatan, Akronim & Fakta/Opini Digital)', subtopics: ['Membedakan fakta dan opini di media sosial', 'Etika bermedia digital (anti-hoaks)'] },
      { id: 'bi-5-6', semester: 2, title: 'Bab 6: Cinta Indonesia (Teks Sejarah Museum & Pidato Singkat)', subtopics: ['Menulis kerangka teks pidato kemerdekaan', 'Membaca teks informasi sejarah peninggalan'] },
      { id: 'bi-5-7', semester: 2, title: 'Bab 7: Sayangi Bumi (Teks Eksposisi & Ringkasan Berita Lingkungan)', subtopics: ['Membuat ringkasan (rangkuman) teks panjang', 'Menulis gagasan solusi krisis lingkungan'] },
      { id: 'bi-5-8', semester: 2, title: 'Bab 8: Bergerak Bersama (Teks Pengumuman & Pantun Nasehat)', subtopics: ['Ciri-ciri pantun (sampiran, isi, rima a-b-a-b)', 'Menulis pantun persahabatan'] }
    ],
    6: [
      { id: 'bi-6-1', semester: 1, title: 'Bab 1: Bangga Menjadi Anak Indonesia (Surat Resmi & Pengisian Formulir)', subtopics: ['Struktur surat resmi sekolah', 'Mengisi formulir pendaftaran dan wesel/kartu anggota'] },
      { id: 'bi-6-2', semester: 1, title: 'Bab 2: Musisi Indonesia di Pentas Dunia (Teks Eksplanasi Ilmiah)', subtopics: ['Hubungan sebab-akibat fenomena musik dan sains', 'Kosakata serapan bahasa asing'] },
      { id: 'bi-6-3', semester: 1, title: 'Bab 3: Taman Nasional dan Situs Warisan Dunia (Laporan Pengamatan)', subtopics: ['Menganalisis data laporan kunjungan wisata edukatif', 'Fakta pelestarian satwa langka'] },
      { id: 'bi-6-4', semester: 1, title: 'Bab 4: Jeda untuk Iklim (Teks Pidato Persuasif & Infografis)', subtopics: ['Menulis pidato ajakan menjaga iklim bumi', 'Membaca dan menafsirkan diagram infografis'] },
      { id: 'bi-6-5', semester: 2, title: 'Bab 5: Anak-Anak Mengubah Dunia (Biografi Singkat Tokoh Inspiratif)', subtopics: ['Menulis biografi tokoh penemu cilik', 'Nilai perjuangan dan ketekunan'] },
      { id: 'bi-6-6', semester: 2, title: 'Bab 6: Liburan Perpisahan Kelas (Menulis Naskah Drama & Cerpen Reflektif)', subtopics: ['Menulis dialog tokoh dan latar panggung', 'Kesan dan pesan selama enam tahun di SD'] }
    ]
  },

  // ===================== PENDIDIKAN PANCASILA =====================
  'Pendidikan Pancasila': {
    1: [
      { id: 'pp-1-1', semester: 1, title: 'Bab 1: Aku dan Simbol Garuda Pancasila', subtopics: ['Mengenal 5 simbol sila Pancasila (Bintang, Rantai, Pohon Beringin, Kepala Banteng, Padi & Kapas)', 'Lagu Garuda Pancasila'] },
      { id: 'pp-1-2', semester: 1, title: 'Bab 2: Aturan di Rumah dan di Sekolah', subtopics: ['Menaati tata tertib kelas', 'Disiplin waktu bangun pagi dan belajar'] },
      { id: 'pp-1-3', semester: 2, title: 'Bab 3: Kita Berbeda tetapi Tetap Satu (Kebinekaan)', subtopics: ['Saling menghormati teman berbeda suku dan agama'] },
      { id: 'pp-1-4', semester: 2, title: 'Bab 4: Aku Cinta Lingkungan Negaraku (Cinta Tanah Air)', subtopics: ['Menjaga kebersihan lingkungan tempat tinggal'] }
    ],
    2: [
      { id: 'pp-2-1', semester: 1, title: 'Bab 1: Nilai-Nilai Sila Pancasila dalam Keseharian', subtopics: ['Contoh perilaku beriman, berakhlak mulia, dan gemar menolong'] },
      { id: 'pp-2-2', semester: 1, title: 'Bab 2: Menaati Tata Tertib di Sekolah dan Masyarakat', subtopics: ['Manfaat mematuhi aturan', 'Akibat melanggar aturan'] },
      { id: 'pp-2-3', semester: 2, title: 'Bab 3: Menghargai Keragaman Bahasa dan Tradisi Daerah', subtopics: ['Mengenal salam dan bahasa daerah teman'] },
      { id: 'pp-2-4', semester: 2, title: 'Bab 4: Gotong Royong Menjaga Keasrian Desa/Kelurahan', subtopics: ['Bekerja sama membersihkan selokan dan taman'] }
    ],
    3: [
      { id: 'pp-3-1', semester: 1, title: 'Bab 1: Pengamalan Sila-Sila Pancasila di Lingkungan Sekolah', subtopics: ['Musyawarah pemilihan ketua kelas', 'Sikap adil terhadap semua teman'] },
      { id: 'pp-3-2', semester: 1, title: 'Bab 2: Hak dan Kewajiban sebagai Siswa dan Anggota Keluarga', subtopics: ['Hak mendapat kasih sayang dan pengajaran', 'Kewajiban belajar dan membantu orang tua'] },
      { id: 'pp-3-3', semester: 2, title: 'Bab 3: Keberagaman Suku, Rumah Adat, dan Pakaian Daerah', subtopics: ['Semboyan Bhinneka Tunggal Ika', 'Menghindari diskriminasi suku'] },
      { id: 'pp-3-4', semester: 2, title: 'Bab 4: Wilayah NKRI dan Menjaga Persatuan di Lingkungan RT/RW', subtopics: ['Batas wilayah tempat tinggal', 'Kerukunan antarwarga'] }
    ],
    4: [
      { id: 'pp-4-1', semester: 1, title: 'Bab 1: Makna dan Sejarah Perumusan Pancasila', subtopics: ['Sidang BPUPKI dan Piagam Jakarta', 'Tokoh perumus: Ir. Soekarno, Moh. Yamin, Soepomo'] },
      { id: 'pp-4-2', semester: 1, title: 'Bab 2: Norma dalam Masyarakat (Agama, Kesusilaan, Kesopanan, Hukum)', subtopics: ['Pengertian dan sanksi masing-masing norma', 'Menerapkan sopan santun kepada yang lebih tua'] },
      { id: 'pp-4-3', semester: 2, title: 'Bab 3: Menghargai Keberagaman Budaya Bangsa Indonesia', subtopics: ['Kearifan lokal daerah', 'Sikap toleransi antarumat beragama'] },
      { id: 'pp-4-4', semester: 2, title: 'Bab 4: Menjaga Keutuhan Negara Kesatuan Republik Indonesia (NKRI)', subtopics: ['Bentuk negara kepulauan', 'Bangga menggunakan produk buatan Indonesia'] }
    ],
    5: [
      { id: 'pp-5-1', semester: 1, title: 'Bab 1: Pancasila sebagai Pedoman Hidup Bangsa Indonesia', subtopics: ['Butir-butir pengamalan kelima sila', 'Pancasila dalam menghadapi era modern'] },
      { id: 'pp-5-2', semester: 1, title: 'Bab 2: Norma, Hak, dan Kewajiban Berdasarkan UUD NRI 1945', subtopics: ['Pasal-pasal perlindungan hak anak dan pendidikan', 'Tanggung jawab warga negara'] },
      { id: 'pp-5-3', semester: 2, title: 'Bab 3: Harmoni dalam Keberagaman Sosial Budaya Nusantara', subtopics: ['Menghargai mata pencaharian dan status sosial sesama', 'Toleransi hari besar keagamaan'] },
      { id: 'pp-5-4', semester: 2, title: 'Bab 4: Semangat Gotong Royong sebagai Kepribadian Bangsa', subtopics: ['Tradisi gotong royong di berbagai daerah (Sambatan, Subak, Rambu Solo)'] }
    ],
    6: [
      { id: 'pp-6-1', semester: 1, title: 'Bab 1: Hubungan Sila-Sila Pancasila sebagai Satu Kesatuan Utuh', subtopics: ['Hierarki dan keterkaitan sila 1 sampai 5', 'Mempertahankan ideologi Pancasila'] },
      { id: 'pp-6-2', semester: 1, title: 'Bab 2: Konstitusi dan Peraturan Perundang-undangan di Indonesia', subtopics: ['Hierarki hukum di Indonesia', 'Ketaatan hukum bagi generasi muda'] },
      { id: 'pp-6-3', semester: 2, title: 'Bab 3: Menjaga Persatuan dan Kesatuan Bangsa di Era Global', subtopics: ['Menyaring budaya asing dengan nilai Pancasila', 'Bela negara melalui prestasi'] },
      { id: 'pp-6-4', semester: 2, title: 'Bab 4: Kedaulatan Rakyat, Demokrasi Pancasila, dan Pemilu', subtopics: ['Asas Luber dan Jurdil dalam Pemilihan Umum', 'Musyawarah mufakat'] }
    ]
  },

  // ===================== PENDIDIKAN AGAMA ISLAM (PAI) =====================
  'Pendidikan Agama Islam dan Budi Pekerti': {
    1: [
      { id: 'pai-1-1', semester: 1, title: 'Bab 1: Mengenal Huruf Hijaiyah Berharakat Fathah, Kasrah, Dhammah', subtopics: ['Membaca huruf alif sampai ya', 'Menyambung dua huruf'] },
      { id: 'pai-1-2', semester: 1, title: 'Bab 2: Mengenal Rukun Iman dan Asmaulhusna (Ar-Rahman & Ar-Rahim)', subtopics: ['Iman kepada Allah Pencipta alam semesta'] },
      { id: 'pai-1-3', semester: 2, title: 'Bab 3: Praktik Bersuci (Wudhu) dan Menjaga Kebersihan', subtopics: ['Rukun wudhu yang benar', 'Adab masuk dan keluar kamar mandi'] },
      { id: 'pai-1-4', semester: 2, title: 'Bab 4: Kisah Teladan Nabi Adam a.s. dan Nabi Muhammad saw.', subtopics: ['Sifat jujur Nabi Muhammad (Al-Amin)'] }
    ],
    2: [
      { id: 'pai-2-1', semester: 1, title: 'Bab 1: Menghafal dan Memahami Surah An-Nas dan Al-Falaq', subtopics: ['Melafalkan dengan makhraj fasih', 'Memohon perlindungan hanya kepada Allah'] },
      { id: 'pai-2-2', semester: 1, title: 'Bab 2: Mengenal Asmaulhusna (Al-Quddus, As-Salam, Al-Khaliq)', subtopics: ['Mengamalkan kesucian hati dan kedamaian'] },
      { id: 'pai-2-3', semester: 2, title: 'Bab 3: Tata Cara Salat Fardu 5 Waktu dan Bacaannya', subtopics: ['Gerakan takbir, ruku, sujud, tahiyyat', 'Jumlah rakaat salat fardu'] },
      { id: 'pai-2-4', semester: 2, title: 'Bab 4: Kisah Nabi Nuh a.s. dan Ketabahan Membangun Bahtera', subtopics: ['Sabar dalam ketaatan kepada Allah'] }
    ],
    3: [
      { id: 'pai-3-1', semester: 1, title: 'Bab 1: Menghafal dan Mengkaji Surah Al-Kausar dan Al-Ikhlas', subtopics: ['Pesan syukur nikmat dan ketauhidan'] },
      { id: 'pai-3-2', semester: 1, title: 'Bab 2: Mengenal Sifat Wajib dan Mustahil bagi Allah Swt.', subtopics: ['Wujud, Qidam, Baqa, Mukhalafatu lil hawadisi'] },
      { id: 'pai-3-3', semester: 2, title: 'Bab 3: Berbakti kepada Orang Tua dan Guru (Birrul Walidain)', subtopics: ['Adab berbicara santun dan mendoakan orang tua'] },
      { id: 'pai-3-4', semester: 2, title: 'Bab 4: Kisah Nabi Ibrahim a.s. Mencari Tuhan dan Ujian Keimanan', subtopics: ['Keteguhan tauhid Nabi Ibrahim'] }
    ],
    4: [
      { id: 'pai-4-1', semester: 1, title: 'Bab 1: Mengkaji Surah Al-Hujurat Ayat 13 (Menghargai Keragaman)', subtopics: ['Pesan toleransi dan persaudaraan antarbangsa'] },
      { id: 'pai-4-2', semester: 1, title: 'Bab 2: Beriman kepada Kitab-Kitab Allah (Taurat, Zabur, Injil, Al-Qur\'an)', subtopics: ['Nama rasul penerima kitab suci', 'Al-Qur\'an sebagai penyempurna'] },
      { id: 'pai-4-3', semester: 1, title: 'Bab 3: Perilaku Terpuji: Saling Menghargai dan Menjaga Amanah', subtopics: ['Menepati janji dan menjauhi sifat munafik'] },
      { id: 'pai-4-4', semester: 2, title: 'Bab 4: Zakat Fitrah, Infak, dan Sedekah untuk Umat', subtopics: ['Syarat wajib zakat dan golongan mustahik'] },
      { id: 'pai-4-5', semester: 2, title: 'Bab 5: Kisah Hijrah Nabi Muhammad saw. ke Madinah', subtopics: ['Peristiwa Gua Tsur dan persaudaraan Muhajirin-Anshar'] }
    ],
    5: [
      { id: 'pai-5-1', semester: 1, title: 'Bab 1: Menghafal dan Memahami Surah Al-Ma\'un (Peduli Anak Yatim)', subtopics: ['Ciri pendusta agama: menghardik anak yatim, enggan menolong'] },
      { id: 'pai-5-2', semester: 1, title: 'Bab 2: Mengenal Asmaulhusna (Al-Qawiyyu, Al-Qayyum, Al-Muhyi, Al-Mumit)', subtopics: ['Meyakini kekuasaan mutlak Allah Swt.'] },
      { id: 'pai-5-3', semester: 1, title: 'Bab 3: Beriman kepada Hari Akhir (Kiamat Sugra dan Kubra)', subtopics: ['Tanda-tanda kiamat dan persiapan amal saleh'] },
      { id: 'pai-5-4', semester: 2, title: 'Bab 4: Ibadah Puasa Ramadan dan Salat Tarawih', subtopics: ['Syarat sah dan rukun puasa, hikmah menahan hawa nafsu'] },
      { id: 'pai-5-5', semester: 2, title: 'Bab 5: Kisah Keteladanan Fathu Makkah dan Haji Wada\'', subtopics: ['Sikap pemaaf Rasulullah saw. kepada kaum Quraisy'] }
    ],
    6: [
      { id: 'pai-6-1', semester: 1, title: 'Bab 1: Menghafal dan Mengamalkan Surah Ad-Duha dan Al-Insyirah', subtopics: ['Keyakinan bahwa di balik kesulitan selalu ada kemudahan'] },
      { id: 'pai-6-2', semester: 1, title: 'Bab 2: Beriman kepada Qada dan Qadar Allah Swt.', subtopics: ['Ikhtiar maksimal, tawakal, dan rida atas takdir Allah'] },
      { id: 'pai-6-3', semester: 1, title: 'Bab 3: Adab Pergaulan Remaja Islami dan Toleransi Antarumat', subtopics: ['Menjaga pandangan, menutup aurat, saling menghormati'] },
      { id: 'pai-6-4', semester: 2, title: 'Bab 4: Ibadah Kurban dan Akikah', subtopics: ['Sejarah Nabi Ibrahim dan Ismail a.s., ketentuan hewan kurban'] },
      { id: 'pai-6-5', semester: 2, title: 'Bab 5: Kisah Khulafaur Rasyidin (Abu Bakar, Umar, Utsman, Ali)', subtopics: ['Ketegasan Umar bin Khattab dan kedermawanan Utsman bin Affan'] }
    ]
  },

  // ===================== BAHASA INGGRIS =====================
  'Bahasa Inggris': {
    1: [
      { id: 'eng-1-1', semester: 1, title: 'Unit 1: Hello Friends! (Greetings and Saying Names)', subtopics: ['Good morning, good afternoon, goodbye, what is your name?'] },
      { id: 'eng-1-2', semester: 1, title: 'Unit 2: Colors and Numbers 1 to 10', subtopics: ['Red, blue, yellow, green; counting classroom items'] },
      { id: 'eng-1-3', semester: 2, title: 'Unit 3: My Family and My Home', subtopics: ['Father, mother, brother, sister; living room, bedroom'] },
      { id: 'eng-1-4', semester: 2, title: 'Unit 4: Cute Animals Around Us', subtopics: ['Cat, dog, bird, fish, rabbit; what animal is this?'] }
    ],
    2: [
      { id: 'eng-2-1', semester: 1, title: 'Unit 1: My School Supplies and Classroom', subtopics: ['Pencil, eraser, ruler, book, bag; how many books do you have?'] },
      { id: 'eng-2-2', semester: 1, title: 'Unit 2: Parts of the Body and Senses', subtopics: ['Head, eyes, ears, mouth, hands, legs; touch your nose!'] },
      { id: 'eng-2-3', semester: 2, title: 'Unit 3: Yummy Fruits and Vegetables', subtopics: ['Apple, banana, carrot, orange; I like and I do not like'] },
      { id: 'eng-2-4', semester: 2, title: 'Unit 4: Clothes We Wear', subtopics: ['Shirt, pants, shoes, hat, dress; putting on clothes'] }
    ],
    3: [
      { id: 'eng-3-1', semester: 1, title: 'Unit 1: Days of the Week and My Daily Routine', subtopics: ['Monday to Sunday; wake up, brush teeth, take a bath, go to school'] },
      { id: 'eng-3-2', semester: 1, title: 'Unit 2: What Time Is It? (Telling Time Simply)', subtopics: ['It is seven o\'clock; half past eight; time for breakfast'] },
      { id: 'eng-3-3', semester: 2, title: 'Unit 3: Delicious Food and Drinks at the Canteen', subtopics: ['Noodles, fried rice, milk, tea, water; ordering politely'] },
      { id: 'eng-3-4', semester: 2, title: 'Unit 4: Rooms and Objects in My House', subtopics: ['Sofa, table, refrigerator, lamp; where is the cat? On/in/under'] }
    ],
    4: [
      { id: 'eng-4-1', semester: 1, title: 'Unit 1: What Are You Doing? (Present Continuous Tense)', subtopics: ['Reading, writing, playing football, cooking; is he sleeping?'] },
      { id: 'eng-4-2', semester: 1, title: 'Unit 2: Numbers 20 to 100 and Prices', subtopics: ['Twenty to one hundred; how much is this pencil?'] },
      { id: 'eng-4-3', semester: 2, title: 'Unit 3: My Hobbies and Favorite Sports', subtopics: ['Swimming, painting, cycling, singing; what do you like to do?'] },
      { id: 'eng-4-4', semester: 2, title: 'Unit 4: My Neighborhood and Public Places', subtopics: ['Hospital, market, bank, park, school; giving simple directions'] }
    ],
    5: [
      { id: 'eng-5-1', semester: 1, title: 'Unit 1: How Do You Feel? (Expressing Emotions and Health)', subtopics: ['Happy, sad, excited, tired, sick; I have a toothache/headache'] },
      { id: 'eng-5-2', semester: 1, title: 'Unit 2: Describing People and Animals (Adjectives)', subtopics: ['Tall, short, smart, friendly; comparing two things with -er than'] },
      { id: 'eng-5-3', semester: 2, title: 'Unit 3: Means of Transportation (How Do You Go to School?)', subtopics: ['By bus, by bicycle, on foot, by train; traffic rules'] },
      { id: 'eng-5-4', semester: 2, title: 'Unit 4: Weather, Seasons, and Clothes', subtopics: ['Sunny, rainy, windy, cloudy; what should we wear in the rainy season?'] }
    ],
    6: [
      { id: 'eng-6-1', semester: 1, title: 'Unit 1: Where Were You Yesterday? (Simple Past Tense)', subtopics: ['Was, were, visited, played, bought; telling vacation stories'] },
      { id: 'eng-6-2', semester: 1, title: 'Unit 2: What Will You Be in the Future? (Professions & Dreams)', subtopics: ['Doctor, pilot, astronaut, teacher; I want to be a scientist'] },
      { id: 'eng-6-3', semester: 2, title: 'Unit 3: Saving Our Planet (Environment & Recycling)', subtopics: ['Reduce, reuse, recycle; do not litter; turn off the lights'] },
      { id: 'eng-6-4', semester: 2, title: 'Unit 4: Farewell and Future Plans (Going to Junior High)', subtopics: ['I am going to study hard; congratulations on your graduation'] }
    ]
  },

  // ===================== PJOK =====================
  'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)': {
    1: [
      { id: 'pjok-1-1', semester: 1, title: 'Bab 1: Gerak Dasar Lokomotor (Jalan, Lari, Lompat)', subtopics: ['Lari zig-zag, melompati rintangan'] },
      { id: 'pjok-1-2', semester: 1, title: 'Bab 2: Gerak Non-Lokomotor (Memutar, Menekuk, Mengayun)', subtopics: ['Peregangan otot leher, lengan, pinggang'] },
      { id: 'pjok-1-3', semester: 2, title: 'Bab 3: Gerak Manipulatif Sederhana (Melempar dan Menangkap Bola)', subtopics: ['Koordinasi mata dan tangan'] },
      { id: 'pjok-1-4', semester: 2, title: 'Bab 4: Menjaga Kebersihan Tubuh dan Pakaian Bersih', subtopics: ['Mandi 2 kali sehari, cuci tangan sebelum makan'] }
    ],
    2: [
      { id: 'pjok-2-1', semester: 1, title: 'Bab 1: Variasi Gerak Berjalan, Berlari, dan Melompat Berirama', subtopics: ['Gerak lokomotor berkelompok'] },
      { id: 'pjok-2-2', semester: 1, title: 'Bab 2: Keseimbangan Tubuh (Berdiri Satu Kaki, Sikap Kapal Terbang)', subtopics: ['Melatih kekuatan tumpuan kaki'] },
      { id: 'pjok-2-3', semester: 2, title: 'Bab 3: Aktivitas Gerak Senam Irama Anak', subtopics: ['Langkah kaki dan ayunan lengan mengikuti ketukan lagu'] },
      { id: 'pjok-2-4', semester: 2, title: 'Bab 4: Makanan Bergizi Seimbang dan Istirahat Cukup', subtopics: ['Pentingnya tidur malam 8 jam dan minum air putih'] }
    ],
    3: [
      { id: 'pjok-3-1', semester: 1, title: 'Bab 1: Kombinasi Gerak Dasar dalam Permainan Tradisional', subtopics: ['Kasti, bentengan, gobak sodor'] },
      { id: 'pjok-3-2', semester: 1, title: 'Bab 2: Latihan Kebugaran Jasmani (Kelentukan dan Kekuatan)', subtopics: ['Push-up modifikasi, sit-up, lari bolak-balik'] },
      { id: 'pjok-3-3', semester: 2, title: 'Bab 3: Gerak Dasar Renang dan Keselamatan di Kolam Air', subtopics: ['Mengapung, meluncur, pernapasan air'] },
      { id: 'pjok-3-4', semester: 2, title: 'Bab 4: Memilih Jajanan Sehat dan Menghindari Bahaya Penyakit', subtopics: ['Membedakan jajanan higienis dan berpewarna bahaya'] }
    ],
    4: [
      { id: 'pjok-4-1', semester: 1, title: 'Bab 1: Variasi Gerak Dasar Permainan Bola Besar (Sepak Bola & Bola Voli)', subtopics: ['Menendang, menggiring, passing bawah voli'] },
      { id: 'pjok-4-2', semester: 1, title: 'Bab 2: Variasi Gerak Dasar Permainan Bola Kecil (Kasti & Rounders)', subtopics: ['Melempar melambung/mendatar, memukul bola kasti'] },
      { id: 'pjok-4-3', semester: 1, title: 'Bab 3: Atletik Dasar (Lari Cepat 40m dan Lompat Jauh)', subtopics: ['Start jongkok, teknik tolakan melompat'] },
      { id: 'pjok-4-4', semester: 2, title: 'Bab 4: Seni Beladiri Pencak Silat (Kuda-kuda, Pukulan, Tangkisan)', subtopics: ['Kuda-kuda depan, tengah, samping'] },
      { id: 'pjok-4-5', semester: 2, title: 'Bab 5: Aktivitas Senam Lantai (Guling Depan & Senam Ketangkasan)', subtopics: ['Matras senam, sikap akhir guling depan'] },
      { id: 'pjok-4-6', semester: 2, title: 'Bab 6: Bahaya Merokok, Minuman Keras, dan Menjaga Pergaulan Sehat', subtopics: ['Dampak negatif zat adiktif bagi paru-paru'] }
    ],
    5: [
      { id: 'pjok-5-1', semester: 1, title: 'Bab 1: Kombinasi Gerak Spesifik Bola Basket dan Sepak Bola', subtopics: ['Dribbling, lay-up shoot, shooting gawang'] },
      { id: 'pjok-5-2', semester: 1, title: 'Bab 2: Bulu Tangkis dan Tenis Meja (Servis, Smash, Lob)', subtopics: ['Pegang raket forehand dan backhand'] },
      { id: 'pjok-5-3', semester: 1, title: 'Bab 3: Lari Jarak Menengah dan Lempar Roket / Turbo', subtopics: ['Mengatur ritme napas lari 600 meter'] },
      { id: 'pjok-5-4', semester: 2, title: 'Bab 4: Senam Ketangkasan dengan Alat (Lompat Peti & Palang Tunggal)', subtopics: ['Mendarat aman dengan kedua kaki mengeper'] },
      { id: 'pjok-5-5', semester: 2, title: 'Bab 5: Gerak Renang Gaya Dada (Katak) dan Gaya Bebas', subtopics: ['Kombinasi kayuhan tangan dan dorongan kaki katak'] },
      { id: 'pjok-5-6', semester: 2, title: 'Bab 6: Pemeliharaan Kebersihan Alat Reproduksi pada Masa Pubertas', subtopics: ['Pakaian dalam bersih, kebersihan diri mandi'] }
    ],
    6: [
      { id: 'pjok-6-1', semester: 1, title: 'Bab 1: Taktik Permainan Beregu (Sepak Bola, Futsal, Bola Basket)', subtopics: ['Formasi menyerang dan bertahan, sportivitas'] },
      { id: 'pjok-6-2', semester: 1, title: 'Bab 2: Rounders dan Kasti Tingkat Lanjutan', subtopics: ['Peraturan resmi, mencetak nilai, peran pitcher & catcher'] },
      { id: 'pjok-6-3', semester: 1, title: 'Bab 3: Lari Estafet (Sambung) dan Tolak Peluru', subtopics: ['Teknik memberi dan menerima tongkat estafet visual/non-visual'] },
      { id: 'pjok-6-4', semester: 2, title: 'Bab 4: Senam Irama Kreatif Kelompok (SKJ Pelajar)', subtopics: ['Koreografi kelompok dengan musik berirama'] },
      { id: 'pjok-6-5', semester: 2, title: 'Bab 5: Penyelamatan Diri di Air dan P3K Dasar', subtopics: ['Menolong korban tergelincir, mengobati luka lecet'] },
      { id: 'pjok-6-6', semester: 2, title: 'Bab 6: Pola Hidup Sehat untuk Menghindari Penyakit Menular dan Tidak Menular', subtopics: ['Penyakit flu, diare, obesitas, diabetes dini'] }
    ]
  },

  // ===================== SENI RUPA =====================
  'Seni Rupa': {
    1: [
      { id: 'sr-1-1', semester: 1, title: 'Unit 1: Mengenal Garis Lurus, Lengkung, dan Gelombang di Sekitar Kita', subtopics: ['Menebalkan dan menggambar ekspresi garis'] },
      { id: 'sr-1-2', semester: 1, title: 'Unit 2: Warna Primer (Merah, Kuning, Biru) dan Mewarnai Bentuk', subtopics: ['Mewarnai buah dan hewan kesukaan'] },
      { id: 'sr-1-3', semester: 2, title: 'Unit 3: Membuat Kolase Sederhana dari Daun Kering dan Kertas Origami', subtopics: ['Menempel bentuk hewan atau bunga'] },
      { id: 'sr-1-4', semester: 2, title: 'Unit 4: Membentuk Model dari Plastisin / Tanah Liat', subtopics: ['Membuat patung buah dan miniatur hewan'] }
    ],
    2: [
      { id: 'sr-2-1', semester: 1, title: 'Unit 1: Menggambar Rumah Tetangga dan Lingkungan Sekolah', subtopics: ['Komposisi atap, dinding, pintu, jendela, pohon'] },
      { id: 'sr-2-2', semester: 1, title: 'Unit 2: Mengenal Warna Sekunder (Campuran Merah + Kuning = Oranye, dll)', subtopics: ['Eksperimen mencampur cat air'] },
      { id: 'sr-2-3', semester: 2, title: 'Unit 3: Membuat Cetakan Cap Sederhana (Pelepah Pisang, Belimbing, Kentang)', subtopics: ['Mencetak pola berulang pada kertas'] },
      { id: 'sr-2-4', semester: 2, title: 'Unit 4: Kolase dan Montase Gambar Majalah Bekas', subtopics: ['Menata gambar bertema pemandangan'] }
    ],
    3: [
      { id: 'sr-3-1', semester: 1, title: 'Unit 1: Mengenal Tekstur Nyata dan Tekstur Semu (Teknik Mengarsir & Menggosok)', subtopics: ['Frottage uang koin dan daun'] },
      { id: 'sr-3-2', semester: 1, title: 'Unit 2: Menggambar Ragam Hias Flora dan Fauna Nusantara', subtopics: ['Motif batik sederhana flora fauna'] },
      { id: 'sr-3-3', semester: 2, title: 'Unit 3: Membuat Anyaman Kertas Dua Warna Selang-Seling', subtopics: ['Pola anyaman 1-1 dan 2-2'] },
      { id: 'sr-3-4', semester: 2, title: 'Unit 4: Membuat Wayang Kertas Karton Sederhana', subtopics: ['Mewarnai karakter wayang dan memberi tangkai lidi'] }
    ],
    4: [
      { id: 'sr-4-1', semester: 1, title: 'Unit 1: Menggambar Lanskap Pemandangan dengan Perspektif Sederhana', subtopics: ['Garis cakrawala (horizon), objek dekat besar & jauh kecil'] },
      { id: 'sr-4-2', semester: 1, title: 'Unit 2: Daur Ulang Sampah Plastik Menjadi Karya Seni Kriya', subtopics: ['Membuat tempat pensil dari botol bekas'] },
      { id: 'sr-4-3', semester: 1, title: 'Unit 3: Bereksperimen dengan Tekstur Alami dan Buatan', subtopics: ['Membuat cap relief dari kardus bekas'] },
      { id: 'sr-4-4', semester: 2, title: 'Unit 4: Membuat Komik / Cerita Bergambar Sederhana (4 Panel)', subtopics: ['Balon kata, ekspresi wajah tokoh, alur cerita'] },
      { id: 'sr-4-5', semester: 2, title: 'Unit 5: Seni Dekoratif Motif Tradisional Nusantara', subtopics: ['Motif ukir Toraja, Dayak, Jawa, Minangkabau'] },
      { id: 'sr-4-6', semester: 2, title: 'Unit 6: Membuat Celengan Karakter dari Kertas Bubur / Kardus', subtopics: ['Membentuk karya 3 dimensi'] }
    ],
    5: [
      { id: 'sr-5-1', semester: 1, title: 'Unit 1: Prinsip Seni Rupa (Keseimbangan, Proporsi, dan Kesatuan)', subtopics: ['Keseimbangan simetris dan asimetris'] },
      { id: 'sr-5-2', semester: 1, title: 'Unit 2: Menggambar Ragam Hias Nusantara pada Media Kain / Totebag', subtopics: ['Membatik jumputan (ikat celup)'] },
      { id: 'sr-5-3', semester: 2, title: 'Unit 3: Membuat Maket Rumah Tradisional dari Stik Es Krim / Kardus', subtopics: ['Konstruksi 3 dimensi rumah adat'] },
      { id: 'sr-5-4', semester: 2, title: 'Unit 4: Membuat Poster Edukatif Pelestarian Lingkungan', subtopics: ['Tata letak gambar dan tipografi slogan persuasif'] }
    ],
    6: [
      { id: 'sr-6-1', semester: 1, title: 'Unit 1: Menggambar Ilustrasi Cerita Rakyat Daerah', subtopics: ['Pewarnaan teknik gelap terang (gradasi)'] },
      { id: 'sr-6-2', semester: 1, title: 'Unit 2: Seni Anyaman dan Tenun Tradisional Indonesia', subtopics: ['Anyaman bambu/pita jepang berpola motif'] },
      { id: 'sr-6-3', semester: 2, title: 'Unit 3: Membuat Patung Konstruksi 3 Dimensi dari Bahan Bekas', subtopics: ['Merakit patung figuratif atau robotik'] },
      { id: 'sr-6-4', semester: 2, title: 'Unit 4: Merancang Pameran Seni Rupa Kelas / Sekolah', subtopics: ['Kurasi karya, tata pamer display, kartu deskripsi karya'] }
    ]
  },

  // ===================== SENI MUSIK =====================
  'Seni Musik': {
    1: [
      { id: 'sm-1-1', semester: 1, title: 'Unit 1: Mengenal Suara Tinggi dan Rendah, Cepat dan Lambat', subtopics: ['Menirukan bunyi binatang dan alat musik'] },
      { id: 'sm-1-2', semester: 2, title: 'Unit 2: Menyanyikan Lagu Anak Nasional (Kasih Ibu, Pelangi, Balonku)', subtopics: ['Tepuk birama 2/4 dan 4/4'] }
    ],
    2: [
      { id: 'sm-2-1', semester: 1, title: 'Unit 1: Mengenal Alat Musik Ritmis (Rebana, Marakas, Kastanyet, Drum)', subtopics: ['Menjaga tempo ketukan lagu'] },
      { id: 'sm-2-2', semester: 2, title: 'Unit 2: Menyanyikan Lagu Daerah dengan Dinamika Keras dan Lembut', subtopics: ['Dinamika forte dan piano'] }
    ],
    3: [
      { id: 'sm-3-1', semester: 1, title: 'Unit 1: Mengenal Notasi Angka (1 2 3 4 5 6 7 i) dan Tangga Nada', subtopics: ['Solmisasi nada do re mi fa sol la si do'] },
      { id: 'sm-3-2', semester: 2, title: 'Unit 2: Memainkan Alat Musik Melodis Sederhana (Pianika / Rekorder)', subtopics: ['Posisi penjarian not dasar'] }
    ],
    4: [
      { id: 'sm-4-1', semester: 1, title: 'Unit 1: Tangga Nada Diatonis Mayor dan Minor pada Lagu Nasional', subtopics: ['Lagu Indonesia Raya, Hari Merdeka, Bagimu Negeri'] },
      { id: 'sm-4-2', semester: 2, title: 'Unit 2: Alat Musik Tradisional Nusantara (Angklung, Gamelan, Kolintang, Tifa)', subtopics: ['Bahan bambu, kayu, logam'] }
    ],
    5: [
      { id: 'sm-5-1', semester: 1, title: 'Unit 1: Bermain Pianika Bersama (Ansambel Musik Campuran)', subtopics: ['Harmoni suara satu dan suara dua'] },
      { id: 'sm-5-2', semester: 2, title: 'Unit 2: Mengapresiasi dan Menyanyikan Lagu Daerah se-Nusantara', subtopics: ['Gundul Pacul, Ampar-Ampar Pisang, Yamko Rambe Yamko'] }
    ],
    6: [
      { id: 'sm-6-1', semester: 1, title: 'Unit 1: Mengaransemen Musik Pengiring Lagu Populer / Nasional', subtopics: ['Pola ritmik perkusi botol dan galon air'] },
      { id: 'sm-6-2', semester: 2, title: 'Unit 2: Paduan Suara dan Pertunjukan Musik Perpisahan Sekolah', subtopics: ['Vokal grup, artikulasi, pernapasan diafragma'] }
    ]
  },

  // ===================== KODING & DIGITAL =====================
  'Koding dan Kecerdasan Digital': {
    1: [
      { id: 'kod-1-1', semester: 1, title: 'Bab 1: Mengenal Perangkat Digital (Komputer, Laptop, Tablet, Ponsel)', subtopics: ['Bagian monitor, keyboard, mouse', 'Menjaga jarak mata saat menatap layar'] },
      { id: 'kod-1-2', semester: 2, title: 'Bab 2: Berpikir Komputasional Dasar (Mengurutkan Langkah Aktivitas)', subtopics: ['Urutan memakai seragam, menyikat gigi (Algoritma)'] }
    ],
    2: [
      { id: 'kod-2-1', semester: 1, title: 'Bab 1: Pola dan Simbol Digital (Labirin Arah Panah)', subtopics: ['Mengarahkan karakter: maju, belok kanan, belok kiri'] },
      { id: 'kod-2-2', semester: 2, title: 'Bab 2: Etika Berinternet Aman bagi Anak', subtopics: ['Tidak membagikan kata sandi dan alamat rumah'] }
    ],
    3: [
      { id: 'kod-3-1', semester: 1, title: 'Bab 1: Logika Dekomposisi dan Pengenalan Pola Gambar', subtopics: ['Memecah masalah besar menjadi bagian kecil'] },
      { id: 'kod-3-2', semester: 2, title: 'Bab 2: Pemrograman Blok Visual Dasar (ScratchJr)', subtopics: ['Membuat karakter bergerak dan bersuara'] }
    ],
    4: [
      { id: 'kod-4-1', semester: 1, title: 'Bab 1: Pengulangan (Looping) dan Kondisi Logika (If-Else) di Scratch', subtopics: ['Membuat game tangkap apel jatuh'] },
      { id: 'kod-4-2', semester: 2, title: 'Bab 2: Mengenal Kecerdasan Buatan (AI) di Kehidupan Sehari-hari', subtopics: ['Asisten suara, deteksi wajah, rekomendasi video'] }
    ],
    5: [
      { id: 'kod-5-1', semester: 1, title: 'Bab 1: Variabel dan Skor dalam Pemrograman Blok', subtopics: ['Menghitung poin kuis dan pengatur waktu game'] },
      { id: 'kod-5-2', semester: 2, title: 'Bab 2: Literasi Data dan Etika Kecerdasan Artifisial (AI Ethics)', subtopics: ['Mengenali berita palsu (hoaks) dan hak cipta karya digital'] }
    ],
    6: [
      { id: 'kod-6-1', semester: 1, title: 'Bab 1: Proyek Game Edukasi Interaktif Berbasis Scratch', subtopics: ['Game kuis matematika atau tebak sains'] },
      { id: 'kod-6-2', semester: 2, title: 'Bab 2: Mengenal Dasar Jaringan Internet dan Keamanan Siber (Cyber Safety)', subtopics: ['Keamanan kata sandi, phising, jejak digital positif'] }
    ]
  },

  // ===================== BAHASA DAERAH / MULOK =====================
  'Bahasa Daerah / Muatan Lokal': {
    1: [
      { id: 'bd-1-1', semester: 1, title: 'Wulangan 1: Pandhapuking Basa / Perkenalan lan Kulawarga (Basa Krama)', subtopics: ['Tembung sapaan, unggah-ungguh kulawarga'] },
      { id: 'bd-1-2', semester: 2, title: 'Wulangan 2: Dolanan Tradisional lan Tembang Dolanan (Cublak Suweng, Gundul Pacul)', subtopics: ['Nembang bebarengan lan maknane'] }
    ],
    2: [
      { id: 'bd-2-1', semester: 1, title: 'Wulangan 1: Tetuwuhan lan Sato Kewan ing Saubenge Omah', subtopics: ['Jeneng anak kewan lan arane wit-witan'] },
      { id: 'bd-2-2', semester: 2, title: 'Wulangan 2: Dongeng Fabel Kewan Basa Daerah (Kancil lan Baya)', subtopics: ['Watak paraga lan pitutur luhur'] }
    ],
    3: [
      { id: 'bd-3-1', semester: 1, title: 'Wulangan 1: Crita Wayang Pandhawa Lima (Puntadewa, Werkudara, Janaka, Nakula, Sadewa)', subtopics: ['Kasatriyan lan gaman paraga wayang'] },
      { id: 'bd-3-2', semester: 2, title: 'Wulangan 2: Sandhangan Swara Aksara Jawa / Aksara Daerah Dasar', subtopics: ['Nulis lan maca aksara legena'] }
    ],
    4: [
      { id: 'bd-4-1', semester: 1, title: 'Wulangan 1: Unggah-Ungguh Basa Ngoko Lugu lan Krama Alus marang Wong Tuwa', subtopics: ['Pacelathon (dialog) santun ing omah lan sekolah'] },
      { id: 'bd-4-2', semester: 2, title: 'Wulangan 2: Crita Rakyat Asal-Usul Kutha / Desa ing Daerah', subtopics: ['Paraga, latar panggonan, lan piwulang becik'] }
    ],
    5: [
      { id: 'bd-5-1', semester: 1, title: 'Wulangan 1: Tembang Macapat (Maskumambang, Mijil, Pocung, Gambuh)', subtopics: ['Guru gatra, guru wilangan, guru lagu'] },
      { id: 'bd-5-2', semester: 2, title: 'Wulangan 2: Paribasan, Bebasan, lan Saloka Basa Daerah', subtopics: ['Unen-unen Jawa / daerah lan tegese'] }
    ],
    6: [
      { id: 'bd-6-1', semester: 1, title: 'Wulangan 1: Maca lan Nulis Paragraf Aksara Daerah / Jawa nganggo Pasangan', subtopics: ['Pasangan aksara lan sandhangan panyigeg'] },
      { id: 'bd-6-2', semester: 2, title: 'Wulangan 2: Pidhato / Sesorah Basa Daerah Basa Krama Inggil', subtopics: ['Struktur pambuka, surasa basa (isi), wasana basa (panutup)'] }
    ]
  }
};

/**
 * Mendapatkan daftar pilihan topik Kurikulum Merdeka
 * yang disesuaikan dengan Mata Pelajaran, Jenjang Kelas (1-6), dan Semester (opsional).
 */
export function getCurriculumTopics(
  subjectName: string,
  grade: SDGrade,
  semesterFilter?: 'all' | 1 | 2
): TopicItem[] {
  // Cek kecocokan langsung
  let subjectData = CURRICULUM_MERDEKA_DATABASE[subjectName];

  // Jika tidak ditemukan secara eksak, cari kecocokan parsial
  if (!subjectData) {
    const keys = Object.keys(CURRICULUM_MERDEKA_DATABASE);
    const matchedKey = keys.find(
      (k) =>
        k.toLowerCase().includes(subjectName.toLowerCase()) ||
        subjectName.toLowerCase().includes(k.toLowerCase())
    );
    if (matchedKey) {
      subjectData = CURRICULUM_MERDEKA_DATABASE[matchedKey];
    }
  }

  // Jika masih belum ada (misal Seni Tari, Seni Teater, Lainnya), sediakan topik kurikulum generik bermakna
  if (!subjectData) {
    return generateFallbackTopics(subjectName, grade);
  }

  const gradeTopics = subjectData[grade] || [];

  if (semesterFilter === 1) {
    return gradeTopics.filter((t) => t.semester === 1);
  } else if (semesterFilter === 2) {
    return gradeTopics.filter((t) => t.semester === 2);
  }

  return gradeTopics;
}

/**
 * Topik generik cadangan jika mapel tidak ada dalam basis data utama
 */
function generateFallbackTopics(subjectName: string, grade: SDGrade): TopicItem[] {
  const fase = grade <= 2 ? 'Fase A' : grade <= 4 ? 'Fase B' : 'Fase C';

  if (subjectName.toLowerCase().includes('tari')) {
    return [
      { id: 'tari-1', semester: 1, title: `Bab 1: Eksplorasi Gerak Tari Tradisional & Irama Alam (${fase})`, subtopics: ['Gerak kepala, tangan, kaki sesuai irama'] },
      { id: 'tari-2', semester: 1, title: `Bab 2: Pola Lantai dan Tata Rias Kostum Tari Daerah (${fase})`, subtopics: ['Garis lurus, lingkaran, zigzag'] },
      { id: 'tari-3', semester: 2, title: `Bab 3: Karakter Tokoh dan Properti Tari Nusantara (${fase})`, subtopics: ['Penggunaan selendang, kipas, piring'] },
      { id: 'tari-4', semester: 2, title: `Bab 4: Penampilan Karya Tari Kreasi Kelompok (${fase})`, subtopics: ['Kekompakan panggung dan ekspresi penari'] }
    ];
  }

  if (subjectName.toLowerCase().includes('teater')) {
    return [
      { id: 'teater-1', semester: 1, title: `Bab 1: Olah Tubuh, Olah Vokal, dan Mimik Wajah (${fase})`, subtopics: ['Intonasi, artikulasi, dan ekspresi emosi'] },
      { id: 'teater-2', semester: 1, title: `Bab 2: Memerankan Tokoh Fabel & Karakter Cerita Rakyat (${fase})`, subtopics: ['Improvisasi dialog sederhana'] },
      { id: 'teater-3', semester: 2, title: `Bab 3: Merancang Properti Panggung dan Kostum Karakter (${fase})`, subtopics: ['Pemanfaatan barang bekas untuk panggung'] },
      { id: 'teater-4', semester: 2, title: `Bab 4: Pementasan Drama Pendek Edukatif (${fase})`, subtopics: ['Kerja sama tim dan pesan moral cerita'] }
    ];
  }

  return [
    { id: 'gen-1', semester: 1, title: `Bab 1: Konsep Dasar dan Pemahaman Awal ${subjectName} Kelas ${grade}`, subtopics: ['Pengenalan materi pokok dan kompetensi dasar'] },
    { id: 'gen-2', semester: 1, title: `Bab 2: Penerapan dan Eksplorasi Materi ${subjectName} Semester 1`, subtopics: ['Praktik dan latihan soal kontekstual'] },
    { id: 'gen-3', semester: 2, title: `Bab 3: Pendalaman Konsep dan Studi Kasus ${subjectName} Kelas ${grade}`, subtopics: ['Pengembangan keterampilan berpikir kritis'] },
    { id: 'gen-4', semester: 2, title: `Bab 4: Proyek Akhir dan Evaluasi Sumatif ${subjectName} (${fase})`, subtopics: ['Refleksi dan penilaian capaian pembelajaran'] }
  ];
}
