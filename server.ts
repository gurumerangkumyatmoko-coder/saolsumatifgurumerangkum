import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '20mb' }));

// Shared Gemini client utility on the server with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Map of all 12 authentic realistic educational photograph assets
const REALISTIC_PHOTO_MAP: Record<string, string> = {
  foto_ekosistem_sawah: '/src/assets/images/ricefield_ecosystem_1791028919414.jpg',
  rantai_makanan: '/src/assets/images/ricefield_ecosystem_1791028919414.jpg',
  foto_daur_air: '/src/assets/images/water_cycle_nature_1791028933204.jpg',
  siklus_air: '/src/assets/images/water_cycle_nature_1791028933204.jpg',
  foto_fotosintesis_daun: '/src/assets/images/plant_photosynthesis_1791028945936.jpg',
  bagian_tumbuhan_fotosintesis: '/src/assets/images/plant_photosynthesis_1791028945936.jpg',
  foto_gotong_royong: '/src/assets/images/gotong_royong_students_1791028957062.jpg',
  gotong_royong_sekolah: '/src/assets/images/gotong_royong_students_1791028957062.jpg',
  foto_garuda_pancasila: '/src/assets/images/garuda_pancasila_shield_1791028968634.jpg',
  simbol_pancasila_garuda: '/src/assets/images/garuda_pancasila_shield_1791028968634.jpg',
  foto_tata_surya: '/src/assets/images/solar_system_planets_1791029284562.jpg',
  tata_surya_planet: '/src/assets/images/solar_system_planets_1791029284562.jpg',
  foto_organ_pencernaan: '/src/assets/images/human_digestive_system_1791029302972.jpg',
  organ_pencernaan_manusia: '/src/assets/images/human_digestive_system_1791029302972.jpg',
  foto_daur_hidup_kupu: '/src/assets/images/butterfly_life_cycle_1791029316778.jpg',
  metamorfosis_kupu: '/src/assets/images/butterfly_life_cycle_1791029316778.jpg',
  foto_kutub_magnet: '/src/assets/images/magnet_poles_science_1791029331460.jpg',
  kutub_magnet: '/src/assets/images/magnet_poles_science_1791029331460.jpg',
  foto_rumah_adat: '/src/assets/images/rumah_adat_nusantara_1791029345299.jpg',
  rumah_adat_nusantara: '/src/assets/images/rumah_adat_nusantara_1791029345299.jpg',
  foto_bangun_ruang: '/src/assets/images/geometric_shapes_math_1791029359029.jpg',
  bangun_ruang_geometri: '/src/assets/images/geometric_shapes_math_1791029359029.jpg',
  foto_musyawarah_kelas: '/src/assets/images/musyawarah_kelas_1791029374020.jpg',
  musyawarah_demokrasi: '/src/assets/images/musyawarah_kelas_1791029374020.jpg',
};

// Response schema for structured questions
const examResponseSchema = {
  type: Type.OBJECT,
  properties: {
    materiPokokDisusun: {
      type: Type.STRING,
      description: 'Materi pokok lengkap',
    },
    questions: {
      type: Type.ARRAY,
      description: 'Daftar semua butir soal terurut nomor 1 hingga akhir',
      items: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.STRING,
            description: 'pilihan_ganda | pilihan_ganda_kompleks | pilihan_ganda_kategori | isian | uraian',
          },
          question: {
            type: Type.STRING,
            description: 'Teks soal atau stimulus pertanyaan',
          },
          score: {
            type: Type.INTEGER,
            description: 'Bobot nilai skor butir soal (misal 10 atau 15 atau 20)',
          },
          explanation: {
            type: Type.STRING,
            description: 'Penjelasan/pembahasan lengkap kunci jawaban',
          },
          hasImage: {
            type: Type.BOOLEAN,
            description: 'Apakah soal ini menggunakan stimulus foto realistis',
          },
          imageKey: {
            type: Type.STRING,
            description: 'ID dari library foto realistis jika ada',
          },
          imageCaption: {
            type: Type.STRING,
            description: 'Judul/keterangan gambar di bawah gambar yang menyebutkan Foto Realistis',
          },
          // For PG
          options: {
            type: Type.ARRAY,
            description: 'Pilihan jawaban untuk pilihan ganda biasa',
            items: {
              type: Type.OBJECT,
              properties: {
                key: { type: Type.STRING },
                text: { type: Type.STRING },
              },
              required: ['key', 'text'],
            },
          },
          correctAnswer: {
            type: Type.STRING,
            description: 'Jawaban benar untuk PG (A/B/C/D), Isian, atau Uraian',
          },
          // For PG Kompleks
          complexOptions: {
            type: Type.ARRAY,
            description: 'Tepat 3 pilihan jawaban untuk pilihan ganda kompleks',
            items: {
              type: Type.OBJECT,
              properties: {
                key: { type: Type.STRING },
                text: { type: Type.STRING },
                isCorrect: { type: Type.BOOLEAN },
              },
              required: ['key', 'text', 'isCorrect'],
            },
          },
          instruction: {
            type: Type.STRING,
            description: 'Instruksi pengerjaan soal',
          },
          // For PGK Kategori
          statements: {
            type: Type.ARRAY,
            description: 'Tepat 3 deskripsi/pernyataan dengan jawaban Benar atau Salah',
            items: {
              type: Type.OBJECT,
              properties: {
                statement: { type: Type.STRING },
                correctAnswer: { type: Type.STRING, description: 'Benar atau Salah' },
              },
              required: ['statement', 'correctAnswer'],
            },
          },
          // For Uraian
          rubricGuidelines: {
            type: Type.ARRAY,
            description: 'Kriteria rubrik penilaian per poin uraian',
            items: { type: Type.STRING },
          },
        },
        required: ['type', 'question', 'score', 'explanation'],
      },
    },
  },
  required: ['questions'],
};

// Helper sleep function for backoff
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fallback curriculum builder if external AI model service has temporary 503 high-demand outage
function buildFallbackCurriculumExam(params: any): { materiPokokDisusun: string; questions: any[] } {
  const { kelas = 4, mataPelajaran = 'IPAS', materiPokok = '', jumlahSoal = {} } = params;
  const numPG = Number(jumlahSoal.pilihanGanda || 2);
  const numPGK = Number(jumlahSoal.pilihanGandaKompleks || 2);
  const numKategori = Number(jumlahSoal.pilihanGandaKategori || 1);
  const numIsian = Number(jumlahSoal.isian || 2);
  const numUraian = Number(jumlahSoal.uraian || 1);

  const isMath = /matematika/i.test(mataPelajaran);
  const isPancasila = /pancasila/i.test(mataPelajaran);
  const isIndo = /indonesia/i.test(mataPelajaran);

  const fallbackQuestions: any[] = [];
  let counter = 1;

  // 1. Pilihan Ganda
  for (let i = 0; i < numPG; i++) {
    const isImageQ = i === 0;
    if (isMath) {
      fallbackQuestions.push({
        type: 'pilihan_ganda',
        question: isImageQ
          ? 'Perhatikan foto realistis aneka model bangun ruang geometri di meja kelas berikut!\nBangun ruang yang memiliki tepat 6 sisi bujur sangkar (persegi) yang sama besar dan 12 rusuk sama panjang adalah ....'
          : `Hasil perhitungan dari operasi pecahan dan bilangan dasar pada materi kelas ${kelas} SD adalah ....`,
        hasImage: isImageQ,
        imageKey: isImageQ ? 'foto_bangun_ruang' : undefined,
        imageCaption: isImageQ ? 'Gambar 1. Foto Realistis Model Geometri Bangun Ruang 3D' : undefined,
        options: [
          { key: 'A', text: isImageQ ? 'Kubus' : '15' },
          { key: 'B', text: isImageQ ? 'Balok' : '20' },
          { key: 'C', text: isImageQ ? 'Tabung' : '25' },
          ...(kelas >= 4 ? [{ key: 'D', text: isImageQ ? 'Kerucut' : '30' }] : []),
        ],
        correctAnswer: 'A',
        score: 10,
        explanation: isImageQ
          ? 'Kubus memiliki 6 sisi berbentuk persegi kongruen, 12 rusuk sama panjang, dan 8 titik sudut.'
          : 'Pilihan A merupakan jawaban yang paling tepat berdasarkan kaidah hitung dasar.',
      });
    } else if (isPancasila) {
      fallbackQuestions.push({
        type: 'pilihan_ganda',
        question: isImageQ
          ? 'Perhatikan foto realistis perisai lambang negara Garuda Pancasila berikut!\nSimbol sila kelima "Keadilan Sosial bagi Seluruh Rakyat Indonesia" yang melambangkan kebutuhan dasar sandang dan pangan adalah ....'
          : 'Perilaku menghormati dan menghargai teman yang memiliki perbedaan suku atau agama merupakan wujud nyata pengamalan nilai Pancasila sila ke- ....',
        hasImage: isImageQ,
        imageKey: isImageQ ? 'foto_garuda_pancasila' : undefined,
        imageCaption: isImageQ ? 'Gambar 1. Foto Realistis Perisai 5 Sila Lambang Garuda Pancasila' : undefined,
        options: [
          { key: 'A', text: isImageQ ? 'Padi dan Kapas' : 'Sila ke-1' },
          { key: 'B', text: isImageQ ? 'Kepala Banteng' : 'Sila ke-2' },
          { key: 'C', text: isImageQ ? 'Pohon Beringin' : 'Sila ke-3' },
          ...(kelas >= 4 ? [{ key: 'D', text: isImageQ ? 'Rantai Emas' : 'Sila ke-5' }] : []),
        ],
        correctAnswer: 'A',
        score: 10,
        explanation: isImageQ
          ? 'Padi dan Kapas melambangkan sandang dan pangan yang menjadi kebutuhan pokok kemakmuran rakyat.'
          : 'Pengamalan nilai kemanusiaan dan persatuan saling melengkapi dalam bingkai kebhinnekaan.',
      });
    } else {
      // IPAS / General Science
      fallbackQuestions.push({
        type: 'pilihan_ganda',
        question: isImageQ
          ? 'Perhatikan foto realistis ekosistem sawah alami di bawah ini!\nDalam tatanan rantai makanan alami di sawah tersebut, organisme yang berperan sebagai produsen utama penghasil makanan bagi konsumen adalah ....'
          : `Peristiwa alam dan sifat benda dalam kehidupan sehari-hari anak kelas ${kelas} SD yang berkaitan erat dengan lingkungan adalah ....`,
        hasImage: isImageQ,
        imageKey: isImageQ ? 'foto_ekosistem_sawah' : undefined,
        imageCaption: isImageQ ? 'Gambar 1. Foto Realistis Ekosistem Sawah Alami (Padi dan Fauna Sawah)' : undefined,
        options: [
          { key: 'A', text: isImageQ ? 'Tanaman Padi hijau' : 'Mencairnya es batu karena menyerap panas' },
          { key: 'B', text: isImageQ ? 'Belalang pemakan daun' : 'Menguapnya air saat dibekukan di lemari es' },
          { key: 'C', text: isImageQ ? 'Katak pemangsa serangga' : 'Membeku saat air mendidih di atas kompor' },
          ...(kelas >= 4 ? [{ key: 'D', text: isImageQ ? 'Ular sawah' : 'Mengembun karena udara kering terik' }] : []),
        ],
        correctAnswer: 'A',
        score: 10,
        explanation: isImageQ
          ? 'Tanaman padi berperan sebagai produsen autotrof yang melakukan fotosintesis menghasilkan biomassa.'
          : 'Pilihan A tepat menggambarkan perubahan wujud zat akibat kenaikan suhu.',
      });
    }
  }

  // 2. Pilihan Ganda Kompleks (PGK: 3 pilihan jawaban, >1 benar)
  for (let i = 0; i < numPGK; i++) {
    const isImageQ = i === 0;
    if (isPancasila) {
      fallbackQuestions.push({
        type: 'pilihan_ganda_kompleks',
        question: isImageQ
          ? 'Perhatikan foto realistis kegiatan gotong royong siswa SD berikut! Manakah perilaku terpuji yang mencerminkan semangat gotong royong di lingkungan sekolah?\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)'
          : 'Sikap yang mencerminkan nilai musyawarah untuk mufakat di sekolah antara lain ....',
        instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
        hasImage: isImageQ,
        imageKey: isImageQ ? 'foto_gotong_royong' : undefined,
        imageCaption: isImageQ ? 'Gambar 2. Foto Realistis Siswa SD Bergotong Royong Membersihkan Sekolah' : undefined,
        complexOptions: [
          { key: 'A', text: 'Bekerja sama menyapu halaman dan merawat tanaman sekolah', isCorrect: true },
          { key: 'B', text: 'Memilah sampah organik dan anorganik pada tempat sampah', isCorrect: true },
          { key: 'C', text: 'Duduk berdiam diri menunggu pekerjaan diselesaikan teman lain', isCorrect: false },
        ],
        score: 15,
        explanation: 'Gotong royong melibatkan kebersamaan aktif, kepedulian sosial, dan tanggung jawab merawat lingkungan.',
      });
    } else {
      fallbackQuestions.push({
        type: 'pilihan_ganda_kompleks',
        question: isImageQ
          ? 'Perhatikan foto makro daun hijau terpapar sinar matahari berikut! Tumbuhan hijau melakukan fotosintesis untuk menghasilkan zat makanan. Komponen utama yang dibutuhkan daun adalah:\n(Pilihlah lebih dari satu jawaban yang benar dengan memberi tanda centang [✓]!)'
          : 'Tindakan manusia yang dapat menjaga kelestarian ekosistem dan keanekaragaman hayati antara lain ....',
        instruction: 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
        hasImage: isImageQ,
        imageKey: isImageQ ? 'foto_fotosintesis_daun' : undefined,
        imageCaption: isImageQ ? 'Gambar 2. Foto Realistis Daun Hijau Terpapar Sinar Matahari (Klorofil)' : undefined,
        complexOptions: [
          { key: 'A', text: 'Cahaya matahari dan zat klorofil pada daun', isCorrect: true },
          { key: 'B', text: 'Air (H₂O) dan gas karbon dioksida (CO₂)', isCorrect: true },
          { key: 'C', text: 'Bahan kimia pestisida dalam jumlah berlebihan', isCorrect: false },
        ],
        score: 15,
        explanation: 'Bahan baku fotosintesis adalah air dan karbon dioksida dengan energi cahaya yang diserap klorofil.',
      });
    }
  }

  // 3. Pilihan Ganda Kompleks Kategori (Benar/Salah: 3 deskripsi)
  for (let i = 0; i < numKategori; i++) {
    const isImageQ = true;
    fallbackQuestions.push({
      type: 'pilihan_ganda_kategori',
      question: 'Perhatikan foto realistis siklus air di alam pegunungan berikut! Tentukan Benar atau Salah pada setiap pernyataan mengenai tahapan siklus air di bawah ini!',
      instruction: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
      hasImage: isImageQ,
      imageKey: 'foto_daur_air',
      imageCaption: 'Gambar 3. Foto Realistis Daur Air di Alam (Penguapan Danau & Awan Hujan)',
      statements: [
        {
          statement: 'Evaporasi adalah proses perubahan air dari danau/sungai menjadi uap air akibat panas matahari.',
          correctAnswer: 'Benar',
        },
        {
          statement: 'Kondensasi adalah proses jatuhnya air dari langit langsung membasahi tanah pertanian.',
          correctAnswer: 'Salah',
        },
        {
          statement: 'Infiltrasi adalah meresapnya air hujan ke dalam lapisan tanah menjadi sumber mata air alami.',
          correctAnswer: 'Benar',
        },
      ],
      score: 20,
      explanation: 'Pernyataan 1 Benar (evaporasi = penguapan). Pernyataan 2 Salah (jatuhnya air adalah presipitasi). Pernyataan 3 Benar (infiltrasi = peresapan).',
    });
  }

  // 4. Isian Singkat
  for (let i = 0; i < numIsian; i++) {
    if (isMath) {
      fallbackQuestions.push({
        type: 'isian',
        question: `Hasil dari perhitungan luas persegi panjang dengan panjang 12 cm dan lebar 6 cm adalah ... cm².`,
        correctAnswer: '72',
        score: 15,
        explanation: 'Luas persegi panjang = panjang × lebar = 12 × 6 = 72 cm².',
      });
    } else if (isPancasila) {
      fallbackQuestions.push({
        type: 'isian',
        question: `Semboyan persatuan bangsa Indonesia yang tertera pada pita lambang burung Garuda Pancasila adalah ....`,
        correctAnswer: 'Bhinneka Tunggal Ika',
        score: 15,
        explanation: 'Bhinneka Tunggal Ika bermakna berbeda-beda tetapi tetap satu jua.',
      });
    } else {
      fallbackQuestions.push({
        type: 'isian',
        question: `Zat hijau daun pada tumbuhan yang berfungsi menyerap radiasi energi cahaya matahari dinamakan ....`,
        correctAnswer: 'Klorofil',
        score: 15,
        explanation: 'Klorofil merupakan pigmen hijau daun esensial fotosintesis.',
      });
    }
  }

  // 5. Uraian
  for (let i = 0; i < numUraian; i++) {
    if (isMath) {
      fallbackQuestions.push({
        type: 'uraian',
        question: 'Sebuah taman sekolah berbentuk persegi panjang dengan panjang 15 meter dan lebar 8 meter. Di sekeliling taman akan dipasangi pagar kawat. Hitunglah keliling taman tersebut dan luas seluruh area taman! (Tuliskan langkah-langkah pengerjaannya secara rinci!)',
        correctAnswer: 'Langkah pengerjaan:\n1. Keliling = 2 × (panjang + lebar) = 2 × (15 m + 8 m) = 2 × 23 m = 46 meter.\n2. Luas = panjang × lebar = 15 m × 8 m = 120 m².',
        rubricGuidelines: [
          'Perhitungan keliling taman benar beserta satuannya (skor 10)',
          'Perhitungan luas taman benar beserta satuan m² (skor 10)',
        ],
        score: 20,
        explanation: 'Keliling = 2(p+l) = 46 m. Luas = p×l = 120 m².',
      });
    } else if (isPancasila) {
      fallbackQuestions.push({
        type: 'uraian',
        question: 'Jelaskan mengapa sikap musyawarah sangat penting dilakukan ketika menghadapi perbedaan pendapat dalam mengambil keputusan bersama di sekolah! Berikan 2 contoh konkretnya!',
        correctAnswer: 'Musyawarah penting karena menghargai hak berpendapat setiap siswa, mencegah perselisihan, dan menghasilkan kesepakatan terbaik yang adil. Contoh:\n1. Musyawarah pembagian jadwal piket kebersihan kelas secara adil.\n2. Musyawarah pemilihan ketua kelas dan pengurus kelompok belajar.',
        rubricGuidelines: [
          'Menjelaskan alasan pentingnya musyawarah dengan runtut (skor 10)',
          'Memberikan 2 contoh konkret kehidupan sekolah yang tepat (skor 10)',
        ],
        score: 20,
        explanation: 'Musyawarah mencerminkan pengamalan sila ke-4 demi kerukunan bersama.',
      });
    } else {
      fallbackQuestions.push({
        type: 'uraian',
        question: 'Jelaskan secara ringkas proses fotosintesis pada tumbuhan hijau, dan sebutkan 2 manfaat utama hasil fotosintesis bagi kelangsungan hidup manusia dan hewan!',
        correctAnswer: 'Proses fotosintesis: Tumbuhan menyerap air (H₂O) dari tanah dan karbon dioksida (CO₂) dari udara, lalu dengan bantuan cahaya matahari dan klorofil diubah menjadi energi.\nManfaat hasil fotosintesis:\n1. Gas Oksigen (O₂): Digunakan seluruh makhluk hidup untuk bernapas.\n2. Glukosa/Karbohidrat: Menjadi sumber makanan pokok (buah, umbi, biji) bagi hewan dan manusia.',
        rubricGuidelines: [
          'Menjelaskan proses fotosintesis dan bahan bakunya (skor 10)',
          'Menyebutkan 2 manfaat hasil fotosintesis (oksigen dan makanan) dengan tepat (skor 10)',
        ],
        score: 20,
        explanation: 'Fotosintesis menghasilkan oksigen untuk respirasi dan cadangan makanan.',
      });
    }
  }

  return {
    materiPokokDisusun: materiPokok || `${mataPelajaran} Kelas ${kelas} SD - Kurikulum Merdeka`,
    questions: fallbackQuestions,
  };
}

// API endpoint to generate exam questions with model fallback & 503 resilience
app.post('/api/generate-exam', async (req, res) => {
  try {
    const {
      kelas = 4,
      mataPelajaran = 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
      jenisAsesmen = 'Asesmen Sumatif Lingkup Materi',
      materiPokok = '',
      capaianPembelajaran = '',
      tingkatKesulitan = 'Sedang',
      jumlahSoal = {
        pilihanGanda: 2,
        pilihanGandaKompleks: 2,
        pilihanGandaKategori: 1,
        isian: 2,
        uraian: 1,
      },
      sertakanGambar = true,
    } = req.body;

    const systemInstruction = `
Anda adalah seorang Ahli Pengembang Kurikulum Sekolah Dasar (SD) dan Penyusun Soal Asesmen Sumatif Berstandar Kurikulum Merdeka (Kemendikbudristek RI).
Tugas Anda adalah menyusun naskah soal asesmen sumatif SD yang bermutu tinggi, mendidik, kontekstual, berbasis literasi/numerasi, dan disesuaikan dengan tingkat usia serta kognitif peserta didik SD.

ATURAN STRUKTUR SOAL YANG SANGAT KETAT:
1. Pilihan Ganda (PG):
   - Kelas 1-3 SD: 3 pilihan jawaban (A, B, C).
   - Kelas 4-6 SD: 4 pilihan jawaban (A, B, C, D).
   - Tentukan tepat 1 jawaban benar (correctAnswer) dan penjelasan kunci.
2. Pilihan Ganda Kompleks (PGK Multijawaban):
   - Setiap soal WAJIB memiliki tepat 3 pilihan jawaban (A, B, C).
   - Kemungkinan lebih dari 1 pilihan jawaban benar (bisa 2 atau 3 benar).
   - Berikan instruksi: "Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)".
   - Pada tiap opsi berikan properti isCorrect (true/false).
3. Pilihan Ganda Kompleks Kategori (Tabel Benar / Salah):
   - Berikan sebuah stimulus teks atau situasi yang relevan.
   - Setiap soal WAJIB memiliki tepat 3 deskripsi/pernyataan yang harus dijawab.
   - Setiap pernyataan memiliki correctAnswer bernilai "Benar" atau "Salah".
4. Isian Singkat:
   - Kalimat pertanyaan yang diakhiri dengan titik-titik (....).
   - Jawaban ringkas, jelas, dan pasti.
5. Uraian / Essay:
   - Pertanyaan tingkat pemahaman mendalam, penjelasan proses, atau pemecahan masalah.
   - Sertakan kunci jawaban lengkap dan panduan rubrik penskoran (rubricGuidelines).

PANDUAN STIMULUS GAMBAR REALISTIS:
Bapak/Ibu Guru menghendaki gambar stimulus pada soal adalah FOTO REALISTIS (bukan kartun anak-anak, bukan clipart sederhana). Jika sertakanGambar bernilai true, gunakan salah satu ID FOTO REALISTIS berikut yang paling sesuai dengan topik soal:
- 'foto_ekosistem_sawah' : Foto Asli Realistis Ekosistem Sawah Alami (Padi, Belalang, Katak, Rantai Makanan)
- 'foto_daur_air' : Foto Asli Realistis Daur Air di Alam (Danau, Uap Air, Awan Hujan Pegunungan)
- 'foto_fotosintesis_daun' : Foto Asli Realistis Makro Daun Hijau Segar, Klorofil & Sinar Mentari
- 'foto_gotong_royong' : Foto Asli Realistis Siswa SD Bergotong Royong & Kerja Bakti Nyata
- 'foto_garuda_pancasila' : Foto Asli Realistis Perisai 5 Sila Lambang Garuda Pancasila
- 'foto_tata_surya' : Foto Asli Realistis Tata Surya, Matahari, dan Planet-planet Mengitari Orbit
- 'foto_organ_pencernaan' : Foto 3D Anatomi Realistis Sistem Organ Pencernaan Manusia Lengkap
- 'foto_daur_hidup_kupu' : Foto Asli Realistis Metamorfosis Siklus Hidup Kupu-kupu (Telur, Ulat, Kepompong, Kupu Dewasa)
- 'foto_kutub_magnet' : Foto Asli Realistis Percobaan Serbuk Besi & Garis Medan Kutub Magnet Batang
- 'foto_rumah_adat' : Foto Asli Realistis Rumah Adat Tradisional Minangkabau Rumah Gadang Nusantara
- 'foto_bangun_ruang' : Foto Asli Realistis Model Geometri Bangun Ruang Kubus, Tabung, Kerucut, Balok di Meja
- 'foto_musyawarah_kelas' : Foto Asli Realistis Siswa SD Bermusyawarah dan Mengacungkan Tangan di Kelas Demokrasi

Jika butir soal diberi gambar, set hasImage = true, imageKey = salah satu ID di atas, dan buat imageCaption yang diawali dengan "Gambar X. Foto Realistis ...".
Pastikan redaksi bahasa Indonesia santun, baku (sesuai EYD/PUEBI), mudah dipahami oleh anak SD kelas ${kelas}.
`;

    const userPrompt = `
Susunlah soal asesmen sumatif SD dengan data berikut:
- Jenjang: Sekolah Dasar (SD)
- Kelas: ${kelas} SD
- Mata Pelajaran: ${mataPelajaran}
- Jenis Asesmen: ${jenisAsesmen}
- Materi Pokok / Topik: ${materiPokok || 'Materi inti Kurikulum Merdeka semester ini'}
- Capaian / Tujuan Pembelajaran: ${capaianPembelajaran || 'Sesuai Capaian Pembelajaran Kurikulum Merdeka'}
- Tingkat Kognitif / Kesulitan: ${tingkatKesulitan}
- Sertakan Stimulus Gambar yang Relevan: ${sertakanGambar ? 'Ya (Gunakan FOTO REALISTIS)' : 'Tidak'}

Jumlah butir soal yang harus dibuat:
1. Pilihan Ganda: ${jumlahSoal.pilihanGanda} butir
2. Pilihan Ganda Kompleks (3 opsi, kemungkinan >1 benar): ${jumlahSoal.pilihanGandaKompleks} butir
3. Pilihan Ganda Kompleks Kategori (Benar/Salah, 3 deskripsi): ${jumlahSoal.pilihanGandaKategori} butir
4. Isian Singkat: ${jumlahSoal.isian} butir
5. Uraian: ${jumlahSoal.uraian} butir

Berikan seluruh naskah soal beserta kunci jawaban, penjelasan, dan skor dalam format JSON terstruktur.
`;

    // Multi-tier model fallback: gemini-3.8-flash -> gemini-flash-latest -> gemini-3.1-flash-lite
    const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    let parsedData: any = null;
    let modelUsed = '';
    let lastError: any = null;

    if (process.env.GEMINI_API_KEY) {
      for (const modelName of candidateModels) {
        let attempts = 0;
        const maxAttemptsForModel = 2;

        while (attempts < maxAttemptsForModel) {
          attempts++;
          try {
            console.log(`Attempting generateContent with model: ${modelName} (attempt ${attempts})`);
            const response = await ai.models.generateContent({
              model: modelName,
              contents: userPrompt,
              config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: examResponseSchema as any,
              },
            });

            const text = response.text || '{}';
            parsedData = JSON.parse(text);
            if (parsedData && Array.isArray(parsedData.questions) && parsedData.questions.length > 0) {
              modelUsed = modelName;
              break;
            }
          } catch (err: any) {
            lastError = err;
            const errStr = String(err?.message || err);
            console.warn(`Model ${modelName} attempt ${attempts} error:`, errStr);

            // If 503 (high demand) or 429 (rate limit), pause briefly before retry
            if (errStr.includes('503') || errStr.includes('UNAVAILABLE') || errStr.includes('high demand') || errStr.includes('429')) {
              await sleep(1200);
            } else {
              // Non-transient error for this model, try next model
              break;
            }
          }
        }

        if (parsedData && Array.isArray(parsedData.questions) && parsedData.questions.length > 0) {
          break;
        }
      }
    }

    // If all models failed or no API key, use curriculum fallback so the user is never blocked
    let isBackup = false;
    if (!parsedData || !Array.isArray(parsedData.questions) || parsedData.questions.length === 0) {
      console.warn('Using authentic curriculum generator fallback due to API high demand / unavailable:', lastError?.message);
      parsedData = buildFallbackCurriculumExam(req.body);
      isBackup = true;
    }

    // Normalize question numbers, formats, and link realistic photo assets
    let questionCounter = 1;
    const formattedQuestions = (parsedData.questions || []).map((q: any) => {
      const id = `q-gen-${Date.now()}-${questionCounter}`;
      const num = questionCounter++;

      // Resolve realistic photo URL from catalog or auto-match
      let resolvedPhotoUrl = q.imageKey ? REALISTIC_PHOTO_MAP[q.imageKey] : undefined;
      let finalImageKey = q.imageKey;

      if (q.hasImage && !resolvedPhotoUrl) {
        // Auto-match subject to best realistic photo
        if (/matematika/i.test(mataPelajaran)) {
          finalImageKey = 'foto_bangun_ruang';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_bangun_ruang;
        } else if (/pancasila/i.test(mataPelajaran)) {
          finalImageKey = 'foto_garuda_pancasila';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_garuda_pancasila;
        } else if (/daur|siklus|air/i.test(q.question)) {
          finalImageKey = 'foto_daur_air';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_daur_air;
        } else if (/fotosintesis|tumbuhan|klorofil/i.test(q.question)) {
          finalImageKey = 'foto_fotosintesis_daun';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_fotosintesis_daun;
        } else if (/planet|tata surya|matahari/i.test(q.question)) {
          finalImageKey = 'foto_tata_surya';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_tata_surya;
        } else if (/pencernaan|lambung|usus/i.test(q.question)) {
          finalImageKey = 'foto_organ_pencernaan';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_organ_pencernaan;
        } else if (/kupu|metamorfosis/i.test(q.question)) {
          finalImageKey = 'foto_daur_hidup_kupu';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_daur_hidup_kupu;
        } else if (/magnet/i.test(q.question)) {
          finalImageKey = 'foto_kutub_magnet';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_kutub_magnet;
        } else {
          finalImageKey = 'foto_ekosistem_sawah';
          resolvedPhotoUrl = REALISTIC_PHOTO_MAP.foto_ekosistem_sawah;
        }
      }

      if (q.type === 'pilihan_ganda') {
        const optionCount = kelas <= 3 ? 3 : 4;
        const rawOptions = (q.options || []).slice(0, optionCount);
        while (rawOptions.length < optionCount) {
          const idx = rawOptions.length;
          rawOptions.push({
            key: String.fromCharCode(65 + idx),
            text: `Pilihan ${String.fromCharCode(65 + idx)}`,
          });
        }

        return {
          id,
          number: num,
          type: 'pilihan_ganda',
          question: q.question,
          options: rawOptions,
          correctAnswer: q.correctAnswer || 'A',
          score: q.score || 10,
          explanation: q.explanation || '',
          hasImage: !!q.hasImage,
          imageKey: finalImageKey || undefined,
          imageUrl: resolvedPhotoUrl,
          imageCaption: q.imageCaption || (q.hasImage ? 'Gambar Foto Realistis Stimulus Pembelajaran' : undefined),
        };
      } else if (q.type === 'pilihan_ganda_kompleks') {
        const rawOptions = q.complexOptions || q.options || [];
        const normalizedOpts = rawOptions.slice(0, 3).map((opt: any, idx: number) => ({
          key: opt.key || String.fromCharCode(65 + idx),
          text: opt.text || '',
          isCorrect: typeof opt.isCorrect === 'boolean' ? opt.isCorrect : idx < 2,
        }));
        // Ensure strictly 3 options as requested
        while (normalizedOpts.length < 3) {
          const idx = normalizedOpts.length;
          normalizedOpts.push({
            key: String.fromCharCode(65 + idx),
            text: `Pilihan ${String.fromCharCode(65 + idx)}`,
            isCorrect: false,
          });
        }

        return {
          id,
          number: num,
          type: 'pilihan_ganda_kompleks',
          question: q.question,
          instruction: q.instruction || 'Pilihlah lebih dari satu jawaban yang benar! (Beri tanda centang ✓)',
          options: normalizedOpts,
          score: q.score || 15,
          explanation: q.explanation || '',
          hasImage: !!q.hasImage,
          imageKey: finalImageKey || undefined,
          imageUrl: resolvedPhotoUrl,
          imageCaption: q.imageCaption || (q.hasImage ? 'Gambar Foto Realistis Stimulus Pembelajaran' : undefined),
        };
      } else if (q.type === 'pilihan_ganda_kategori') {
        const rawStatements = q.statements || [];
        const normalizedStatements = rawStatements.slice(0, 3).map((st: any) => ({
          statement: st.statement || 'Pernyataan materi',
          correctAnswer: (st.correctAnswer === 'Benar' ? 'Benar' : 'Salah') as 'Benar' | 'Salah',
        }));
        // Ensure strictly 3 statements as requested
        while (normalizedStatements.length < 3) {
          normalizedStatements.push({
            statement: `Pernyataan topik materi nomor ${normalizedStatements.length + 1}`,
            correctAnswer: 'Benar',
          });
        }

        return {
          id,
          number: num,
          type: 'pilihan_ganda_kategori',
          question: q.question,
          instruction: q.instruction || 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
          statements: normalizedStatements,
          score: q.score || 20,
          explanation: q.explanation || '',
          hasImage: !!q.hasImage,
          imageKey: finalImageKey || undefined,
          imageUrl: resolvedPhotoUrl,
          imageCaption: q.imageCaption || (q.hasImage ? 'Gambar Foto Realistis Stimulus Pembelajaran' : undefined),
        };
      } else if (q.type === 'isian') {
        return {
          id,
          number: num,
          type: 'isian',
          question: q.question,
          correctAnswer: q.correctAnswer || '',
          score: q.score || 15,
          explanation: q.explanation || '',
          hasImage: !!q.hasImage,
          imageKey: finalImageKey || undefined,
          imageUrl: resolvedPhotoUrl,
          imageCaption: q.imageCaption || (q.hasImage ? 'Gambar Foto Realistis Stimulus Pembelajaran' : undefined),
        };
      } else {
        // uraian
        return {
          id,
          number: num,
          type: 'uraian',
          question: q.question,
          correctAnswer: q.correctAnswer || '',
          rubricGuidelines: q.rubricGuidelines || [
            'Penjelasan konsep tepat dan terstruktur (skor maks)',
            'Penjelasan konsep kurang lengkap (skor separuh)',
          ],
          score: q.score || 20,
          explanation: q.explanation || '',
          hasImage: !!q.hasImage,
          imageKey: finalImageKey || undefined,
          imageUrl: resolvedPhotoUrl,
          imageCaption: q.imageCaption || (q.hasImage ? 'Gambar Foto Realistis Stimulus Pembelajaran' : undefined),
        };
      }
    });

    res.json({
      success: true,
      materiPokokDisusun: parsedData.materiPokokDisusun || materiPokok,
      questions: formattedQuestions,
      modelUsed: modelUsed || 'curriculum-engine',
      isBackup,
    });
  } catch (error: any) {
    console.error('Unhandled error in /api/generate-exam:', error);
    // Even if an unexpected error occurs, provide backup curriculum questions rather than 500 error
    const backupData = buildFallbackCurriculumExam(req.body);
    let counter = 1;
    const fallbackQuestions = backupData.questions.map((q: any) => ({
      ...q,
      id: `q-fallback-${Date.now()}-${counter}`,
      number: counter++,
      imageUrl: q.imageKey ? REALISTIC_PHOTO_MAP[q.imageKey] : undefined,
    }));

    res.json({
      success: true,
      materiPokokDisusun: backupData.materiPokokDisusun,
      questions: fallbackQuestions,
      modelUsed: 'curriculum-fallback',
      isBackup: true,
      notice: 'Soal disusun menggunakan basis data kurikulum standar karena server AI eksternal sedang sibuk.',
    });
  }
});

// Vite middleware & Express Server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
