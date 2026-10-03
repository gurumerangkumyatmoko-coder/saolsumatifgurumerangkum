export type SDGrade = 1 | 2 | 3 | 4 | 5 | 6;

export type Semester = '1 (Ganjil)' | '2 (Genap)';

export type SubjectName =
  | 'Pendidikan Pancasila'
  | 'Bahasa Indonesia'
  | 'Matematika'
  | 'IPAS (Ilmu Pengetahuan Alam dan Sosial)'
  | 'Pendidikan Agama Islam dan Budi Pekerti'
  | 'Bahasa Inggris'
  | 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)'
  | 'Seni Rupa'
  | 'Seni Musik'
  | 'Seni Teater'
  | 'Seni Tari'
  | 'Bahasa Daerah / Muatan Lokal'
  | 'Koding dan Kecerdasan Digital'
  | 'Lainnya';

export type AssessmentType =
  | 'Asesmen Sumatif Lingkup Materi'
  | 'Asesmen Sumatif Tengah Semester (STS)'
  | 'Asesmen Sumatif Akhir Semester (SAS)'
  | 'Asesmen Sumatif Akhir Tahun (SAT)'
  | 'Ujian Sekolah / Asesmen Akhir Jenjang SD';

export interface ExamHeader {
  dinasPendidikan: string;
  namaSekolah: string;
  alamatSekolah: string;
  jenisAsesmen: AssessmentType;
  mataPelajaran: SubjectName | string;
  kelas: SDGrade;
  fase: 'Fase A' | 'Fase B' | 'Fase C';
  semester: Semester;
  tahunPelajaran: string;
  alokasiWaktu: string;
  tanggalPelaksanaan: string;
  namaPenyusun: string;
  nipPenyusun: string;
  materiPokok: string;
  petunjukUmum: string[];
}

export type QuestionType =
  | 'pilihan_ganda'
  | 'pilihan_ganda_kompleks'
  | 'pilihan_ganda_kategori'
  | 'isian'
  | 'uraian';

export interface BaseQuestion {
  id: string;
  number: number;
  type: QuestionType;
  question: string;
  score: number;
  explanation: string;
  hasImage?: boolean;
  imageKey?: string; // key from diagram library or 'custom'
  imageDataUrl?: string; // base64 or inline SVG
  imageUrl?: string; // realistic photo asset URL
  imageCaption?: string;
}

export interface MultipleChoiceOption {
  key: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'pilihan_ganda';
  options: MultipleChoiceOption[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
}

export interface ComplexChoiceOption {
  key: string; // 'A', 'B', 'C'
  text: string;
  isCorrect: boolean;
}

export interface ComplexMultipleChoiceQuestion extends BaseQuestion {
  type: 'pilihan_ganda_kompleks';
  instruction?: string;
  options: ComplexChoiceOption[]; // exactly 3 options as required
}

export interface CategoryStatement {
  statement: string;
  correctAnswer: 'Benar' | 'Salah';
}

export interface CategoryComplexQuestion extends BaseQuestion {
  type: 'pilihan_ganda_kategori';
  instruction?: string;
  statements: CategoryStatement[]; // exactly 3 statements as required
}

export interface FillInTheBlankQuestion extends BaseQuestion {
  type: 'isian';
  correctAnswer: string;
}

export interface EssayQuestion extends BaseQuestion {
  type: 'uraian';
  correctAnswer: string;
  rubricGuidelines?: string[];
}

export type AnyQuestion =
  | MultipleChoiceQuestion
  | ComplexMultipleChoiceQuestion
  | CategoryComplexQuestion
  | FillInTheBlankQuestion
  | EssayQuestion;

export interface ExamPackage {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  header: ExamHeader;
  questions: AnyQuestion[];
}

export interface GenerateExamRequest {
  kelas: SDGrade;
  mataPelajaran: string;
  jenisAsesmen: AssessmentType;
  materiPokok: string;
  capaianPembelajaran?: string;
  tingkatKesulitan: 'Mudah' | 'Sedang' | 'HOTS / Analisis Kognitif';
  jumlahSoal: {
    pilihanGanda: number;
    pilihanGandaKompleks: number;
    pilihanGandaKategori: number;
    isian: number;
    uraian: number;
  };
  sertakanGambar: boolean;
}
