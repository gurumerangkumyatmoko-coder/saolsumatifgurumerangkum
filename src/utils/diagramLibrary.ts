export interface DiagramItem {
  id: string;
  name: string;
  subject: string;
  category: string;
  description: string;
  svg?: string;
  imageUrl?: string;
  isRealisticPhoto?: boolean;
}

export const DIAGRAM_LIBRARY: DiagramItem[] = [
  // Realistic Educational Photography Assets
  {
    id: 'foto_ekosistem_sawah',
    name: 'Foto Realistis: Ekosistem Sawah Alami',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Foto Realistis Ekosistem',
    description: 'Foto alam realistis hamparan padi sawah hijau dengan belalang di batang padi dan genangan air irigasi habitat katak.',
    imageUrl: '/src/assets/images/ricefield_ecosystem_1791028919414.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_daur_air',
    name: 'Foto Realistis: Siklus & Penguapan Air di Alam',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Foto Realistis Geografi',
    description: 'Fotografi alam pemandangan danau tenang di pegunungan dengan proses evaporasi uap air, kondensasi awan tebal, dan hujan rintik di kejauhan.',
    imageUrl: '/src/assets/images/water_cycle_nature_1791028933204.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_fotosintesis_daun',
    name: 'Foto Realistis: Daun Hijau & Klorofil Fotosintesis',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Foto Realistis Biologi',
    description: 'Foto makro close-up daun tumbuhan hijau segar tembus sinar matahari, memperlihatkan tekstur tulang daun, klorofil, dan butiran embun.',
    imageUrl: '/src/assets/images/plant_photosynthesis_1791028945936.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_gotong_royong',
    name: 'Foto Realistis: Gotong Royong Siswa di Sekolah',
    subject: 'Pendidikan Pancasila',
    category: 'Foto Realistis Karakter',
    description: 'Foto nyata siswa-siswi SD berseragam sekolah bekerja sama membersihkan lingkungan sekolah, menanam bibit pohon, dan menyapu halaman.',
    imageUrl: '/src/assets/images/gotong_royong_students_1791028957062.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_garuda_pancasila',
    name: 'Foto Realistis: Perisai 5 Sila Garuda Pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'Foto Realistis Nasionalisme',
    description: 'Foto detail perisai lambang Garuda Pancasila dengan kelima simbol sila (Bintang, Rantai, Pohon Beringin, Kepala Banteng, Padi dan Kapas).',
    imageUrl: '/src/assets/images/garuda_pancasila_shield_1791028968634.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_tata_surya',
    name: 'Foto Realistis: Planet & Orbit Tata Surya',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Foto Realistis Astronomi',
    description: 'Foto realistis sistem tata surya dengan Matahari, Merkurius, Venus, Bumi, Bulan, Mars, Jupiter, Saturnus, dan garis lintasan orbit.',
    imageUrl: '/src/assets/images/solar_system_planets_1791029284562.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_organ_pencernaan',
    name: 'Foto Realistis: Organ Pencernaan Manusia 3D',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Foto Realistis Anatomi',
    description: 'Model 3D anatomi realistis sistem pencernaan manusia: kerongkongan, lambung, hati, pankreas, usus halus, dan usus besar.',
    imageUrl: '/src/assets/images/human_digestive_system_1791029302972.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_daur_hidup_kupu',
    name: 'Foto Realistis: Metamorfosis Kupu-kupu',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Foto Realistis Biologi',
    description: 'Foto makro realistis 4 fase daur hidup kupu-kupu: telur pada daun, ulat (larva), kepompong (pupa), dan kupu-kupu dewasa.',
    imageUrl: '/src/assets/images/butterfly_life_cycle_1791029316778.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_kutub_magnet',
    name: 'Foto Realistis: Medan & Gaya Kutub Magnet',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Foto Realistis Fisika',
    description: 'Foto eksperimen laboratorium magnet batang dengan kutub Utara (Merah) dan Selatan (Biru) beserta pola sebaran serbuk besi.',
    imageUrl: '/src/assets/images/magnet_poles_science_1791029331460.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_rumah_adat',
    name: 'Foto Realistis: Rumah Adat Gadang Minangkabau',
    subject: 'Pendidikan Pancasila / Seni Budaya',
    category: 'Foto Realistis Budaya',
    description: 'Foto arsitektur otentik Rumah Adat Gadang Minangkabau di Sumatera Barat dengan atap gonjong tanduk kerbau berukir kayu.',
    imageUrl: '/src/assets/images/rumah_adat_nusantara_1791029345299.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_bangun_ruang',
    name: 'Foto Realistis: Model Bangun Ruang Geometri',
    subject: 'Matematika',
    category: 'Foto Realistis Geometri',
    description: 'Foto nyata peraga bangun ruang 3D: kubus, balok, kerucut, tabung, dan bola di atas meja kelas dengan penggaris kayu.',
    imageUrl: '/src/assets/images/geometric_shapes_math_1791029359029.jpg',
    isRealisticPhoto: true
  },
  {
    id: 'foto_musyawarah_kelas',
    name: 'Foto Realistis: Musyawarah & Demokrasi Siswa SD',
    subject: 'Pendidikan Pancasila',
    category: 'Foto Realistis Kewarganegaraan',
    description: 'Foto nyata suasana musyawarah mufakat di dalam kelas SD saat pemilihan ketua kelas dengan siswa tertib mengacungkan jari.',
    imageUrl: '/src/assets/images/musyawarah_kelas_1791029374020.jpg',
    isRealisticPhoto: true
  },

  // Educational Vector Diagrams
  {
    id: 'rantai_makanan',
    name: 'Diagram Rantai Makanan Sawah',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Diagram Sains',
    description: 'Skema aliran energi dari Padi (Produsen) -> Belalang (Konsumen I) -> Katak (Konsumen II) -> Ular (Konsumen III) -> Elang (Pengurai).',
    svg: `<svg width="500" height="200" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="500" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="250" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">Skema Rantai Makanan Ekosistem Sawah</text>
      
      <!-- Padi -->
      <g transform="translate(15, 45)">
        <rect width="80" height="85" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5" rx="6"/>
        <circle cx="40" cy="35" r="20" fill="#a7f3d0"/>
        <text x="40" y="42" text-anchor="middle" font-size="20">🌾</text>
        <text x="40" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#065f46">Padi</text>
        <text x="40" y="82" text-anchor="middle" font-size="9" fill="#047857">(Produsen)</text>
      </g>
      
      <!-- Arrow 1 -->
      <path d="M 100 88 L 112 88" stroke="#0284c7" stroke-width="2.5" fill="none"/>
      <polygon points="117,88 110,84 110,92" fill="#0284c7"/>
      
      <!-- Belalang -->
      <g transform="translate(118, 45)">
        <rect width="80" height="85" fill="#fefce8" stroke="#eab308" stroke-width="1.5" rx="6"/>
        <circle cx="40" cy="35" r="20" fill="#fef08a"/>
        <text x="40" y="42" text-anchor="middle" font-size="20">🦗</text>
        <text x="40" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#854d0e">Belalang</text>
        <text x="40" y="82" text-anchor="middle" font-size="9" fill="#713f12">(Konsumen I)</text>
      </g>
      
      <!-- Arrow 2 -->
      <path d="M 203 88 L 215 88" stroke="#0284c7" stroke-width="2.5" fill="none"/>
      <polygon points="220,88 213,84 213,92" fill="#0284c7"/>
      
      <!-- Katak -->
      <g transform="translate(221, 45)">
        <rect width="80" height="85" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" rx="6"/>
        <circle cx="40" cy="35" r="20" fill="#bbf7d0"/>
        <text x="40" y="42" text-anchor="middle" font-size="20">🐸</text>
        <text x="40" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">Katak</text>
        <text x="40" y="82" text-anchor="middle" font-size="9" fill="#14532d">(Konsumen II)</text>
      </g>
      
      <!-- Arrow 3 -->
      <path d="M 306 88 L 318 88" stroke="#0284c7" stroke-width="2.5" fill="none"/>
      <polygon points="323,88 316,84 316,92" fill="#0284c7"/>

      <!-- Ular -->
      <g transform="translate(324, 45)">
        <rect width="80" height="85" fill="#fff7ed" stroke="#f97316" stroke-width="1.5" rx="6"/>
        <circle cx="40" cy="35" r="20" fill="#ffedd5"/>
        <text x="40" y="42" text-anchor="middle" font-size="20">🐍</text>
        <text x="40" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#9a3412">Ular</text>
        <text x="40" y="82" text-anchor="middle" font-size="9" fill="#7c2d12">(Konsumen III)</text>
      </g>

      <!-- Arrow 4 -->
      <path d="M 409 88 L 421 88" stroke="#0284c7" stroke-width="2.5" fill="none"/>
      <polygon points="426,88 419,84 419,92" fill="#0284c7"/>

      <!-- Elang -->
      <g transform="translate(427, 45)">
        <rect width="65" height="85" fill="#faf5ff" stroke="#a855f7" stroke-width="1.5" rx="6"/>
        <circle cx="32" cy="35" r="18" fill="#f3e8ff"/>
        <text x="32" y="42" text-anchor="middle" font-size="18">🦅</text>
        <text x="32" y="70" text-anchor="middle" font-size="11" font-weight="bold" fill="#6b21a8">Elang</text>
        <text x="32" y="82" text-anchor="middle" font-size="9" fill="#581c87">(Puncak)</text>
      </g>
      <text x="250" y="165" text-anchor="middle" font-size="11" fill="#475569">Aliran energi: Produsen diserap konsumen primer hingga konsumen puncak</text>
    </svg>`
  },
  {
    id: 'siklus_air',
    name: 'Diagram Siklus Air',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Diagram Sains',
    description: 'Tahapan siklus air: Evaporasi, Kondensasi, Presipitasi (Hujan), dan Infiltrasi.',
    svg: `<svg width="500" height="240" viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="500" height="240" fill="#f0f9ff" rx="8" stroke="#bae6fd" stroke-width="1.5"/>
      <text x="250" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0369a1">Diagram Siklus Air di Bumi</text>
      
      <!-- Sun -->
      <circle cx="430" cy="55" r="24" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
      <text x="430" y="95" text-anchor="middle" font-size="10" font-weight="bold" fill="#b45309">Matahari</text>
      
      <!-- Mountain & Ground -->
      <path d="M 0 170 Q 70 90 140 170 L 220 180 L 500 180 L 500 240 L 0 240 Z" fill="#86efac"/>
      <path d="M 40 170 L 90 110 L 140 170 Z" fill="#bbf7d0"/>
      
      <!-- Ocean / Water body -->
      <path d="M 280 180 Q 380 170 500 180 L 500 240 L 280 240 Z" fill="#38bdf8"/>
      <text x="390" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#0c4a6e">Lautan / Danau</text>
      
      <!-- Clouds -->
      <g transform="translate(180, 40)">
        <ellipse cx="40" cy="25" rx="35" ry="18" fill="#e2e8f0"/>
        <ellipse cx="70" cy="20" rx="30" ry="20" fill="#cbd5e1"/>
        <ellipse cx="95" cy="26" rx="25" ry="16" fill="#e2e8f0"/>
        <text x="65" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">(2) Kondensasi</text>
      </g>
      
      <!-- Evaporation Arrows -->
      <path d="M 370 160 Q 375 125 360 95" stroke="#0284c7" stroke-width="2" stroke-dasharray="4" fill="none"/>
      <path d="M 400 160 Q 405 125 390 95" stroke="#0284c7" stroke-width="2" stroke-dasharray="4" fill="none"/>
      <text x="415" y="135" text-anchor="start" font-size="10" font-weight="bold" fill="#0284c7">(1) Evaporasi</text>
      
      <!-- Rain / Precipitation -->
      <line x1="200" y1="90" x2="190" y2="135" stroke="#0284c7" stroke-width="2" stroke-dasharray="2 3"/>
      <line x1="220" y1="90" x2="210" y2="135" stroke="#0284c7" stroke-width="2" stroke-dasharray="2 3"/>
      <line x1="240" y1="90" x2="230" y2="135" stroke="#0284c7" stroke-width="2" stroke-dasharray="2 3"/>
      <text x="160" y="120" text-anchor="end" font-size="10" font-weight="bold" fill="#0369a1">(3) Presipitasi (Hujan)</text>
      
      <!-- Infiltration Arrow -->
      <path d="M 120 185 Q 170 205 280 200" stroke="#065f46" stroke-width="2" stroke-dasharray="3" fill="none"/>
      <text x="180" y="215" text-anchor="middle" font-size="10" font-weight="bold" fill="#065f46">(4) Infiltrasi &amp; Aliran</text>
    </svg>`
  },
  {
    id: 'bagian_tumbuhan_fotosintesis',
    name: 'Diagram Bagian Tumbuhan & Fotosintesis',
    subject: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    category: 'Diagram Sains',
    description: 'Struktur tumbuhan (Akar, Batang, Daun) dan proses fotosintesis mengubah CO2 + Air menjadi Karbohidrat + O2.',
    svg: `<svg width="500" height="240" viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="500" height="240" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="250" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">Bagian Tumbuhan dan Proses Fotosintesis</text>
      
      <!-- Ground line -->
      <line x1="40" y1="180" x2="260" y2="180" stroke="#78350f" stroke-width="3"/>
      <text x="50" y="198" font-size="10" fill="#78350f">Permukaan Tanah</text>
      
      <!-- Roots -->
      <path d="M 150 180 Q 140 210 110 225 M 150 180 Q 155 215 160 230 M 150 180 Q 170 205 195 220" stroke="#92400e" stroke-width="2.5" fill="none"/>
      <text x="80" y="215" font-size="10" font-weight="bold" fill="#78350f">[A] Akar: Serap air &amp; mineral</text>
      
      <!-- Stem -->
      <rect x="144" y="80" width="12" height="100" fill="#65a30d" rx="3"/>
      <text x="60" y="130" font-size="10" font-weight="bold" fill="#3f6212">[B] Batang: Penopang &amp; pengangkut</text>
      <line x1="125" y1="127" x2="142" y2="127" stroke="#65a30d" stroke-width="1.5"/>
      
      <!-- Leaves -->
      <path d="M 150 110 Q 200 90 220 120 Q 180 135 150 115" fill="#22c55e" stroke="#16a34a"/>
      <path d="M 150 130 Q 90 115 80 145 Q 120 160 150 135" fill="#22c55e" stroke="#16a34a"/>
      <text x="180" y="85" font-size="10" font-weight="bold" fill="#15803d">[C] Daun: Tempat fotosintesis</text>
      
      <!-- Flower / Fruit -->
      <circle cx="150" cy="65" r="14" fill="#fb7185"/>
      <circle cx="150" cy="65" r="5" fill="#fde047"/>
      <text x="150" y="45" text-anchor="middle" font-size="10" font-weight="bold" fill="#be123c">[D] Bunga: Perkembangbiakan</text>
      
      <!-- Chemical box -->
      <rect x="290" y="55" width="195" height="150" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" rx="6"/>
      <text x="387" y="78" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">Persamaan Fotosintesis</text>
      <text x="305" y="105" font-size="10" fill="#14532d">• Karbon dioksida (CO₂)</text>
      <text x="305" y="123" font-size="10" fill="#14532d">• Air (H₂O) dari tanah</text>
      <text x="305" y="141" font-size="10" fill="#b45309">• Bantuan Energi Cahaya Matahari</text>
      <text x="305" y="159" font-size="10" fill="#15803d">• Klorofil (zat hijau daun)</text>
      <line x1="305" y1="168" x2="470" y2="168" stroke="#86efac"/>
      <text x="387" y="185" text-anchor="middle" font-size="10" font-weight="bold" fill="#166534">Hasil: Oksigen (O₂) + Glukosa</text>
    </svg>`
  },
  {
    id: 'pecahan_kue_lingkaran',
    name: 'Diagram Pecahan Lingkaran (3/8)',
    subject: 'Matematika',
    category: 'Diagram Matematika',
    description: 'Lingkaran terbagi 8 juring sama besar dengan 3 juring diarsir mewakili pecahan 3/8.',
    svg: `<svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="400" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="200" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">Model Pecahan Juring Lingkaran</text>
      
      <!-- Circle with 8 slices, 3 shaded -->
      <g transform="translate(100, 110)">
        <circle cx="0" cy="0" r="65" fill="#f1f5f9" stroke="#334155" stroke-width="2"/>
        
        <!-- Shaded slices 1, 2, 3 (each 45 deg) -->
        <path d="M 0 0 L 65 0 A 65 65 0 0 1 45.96 45.96 Z" fill="#38bdf8"/>
        <path d="M 0 0 L 45.96 45.96 A 65 65 0 0 1 0 65 Z" fill="#38bdf8"/>
        <path d="M 0 0 L 0 65 A 65 65 0 0 1 -45.96 45.96 Z" fill="#38bdf8"/>
        
        <!-- Radial dividing lines -->
        <line x1="-65" y1="0" x2="65" y2="0" stroke="#334155" stroke-width="1.5"/>
        <line x1="0" y1="-65" x2="0" y2="65" stroke="#334155" stroke-width="1.5"/>
        <line x1="-45.96" y1="-45.96" x2="45.96" y2="45.96" stroke="#334155" stroke-width="1.5"/>
        <line x1="-45.96" y1="45.96" x2="45.96" y2="-45.96" stroke="#334155" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="3" fill="#0f172a"/>
      </g>
      
      <!-- Info box on right -->
      <rect x="200" y="55" width="180" height="110" fill="#f0f9ff" stroke="#7dd3fc" stroke-width="1.5" rx="6"/>
      <text x="290" y="80" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">Keterangan:</text>
      <text x="215" y="105" font-size="11" fill="#0c4a6e">• Total bagian sama besar: 8</text>
      <text x="215" y="125" font-size="11" fill="#0284c7">• Bagian yang diarsir (biru): 3</text>
      <text x="290" y="152" text-anchor="middle" font-size="14" font-weight="bold" fill="#0369a1">Nilai = 3/8</text>
    </svg>`
  },
  {
    id: 'bangun_datar_gabungan',
    name: 'Diagram Bangun Datar Gabungan',
    subject: 'Matematika',
    category: 'Diagram Matematika',
    description: 'Bangun datar gabungan dengan ukuran sisi panjang 12 cm, lebar 8 cm, dan alas segitiga 6 cm serta tinggi 8 cm.',
    svg: `<svg width="450" height="210" viewBox="0 0 450 210" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="450" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="225" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">Bangun Datar Gabungan I dan II</text>
      
      <!-- Rectangle (I) -->
      <rect x="70" y="60" width="160" height="100" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
      <text x="150" y="115" text-anchor="middle" font-size="14" font-weight="bold" fill="#9a3412">Bangun I</text>
      
      <!-- Triangle (II) attached to right -->
      <polygon points="230,60 320,160 230,160" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
      <text x="255" y="130" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">II</text>
      
      <!-- Dimension labels -->
      <text x="150" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">12 cm</text>
      <text x="45" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">8 cm</text>
      <text x="275" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">6 cm</text>
      <line x1="70" y1="168" x2="320" y2="168" stroke="#64748b" stroke-width="1" stroke-dasharray="3"/>
      <text x="375" y="105" text-anchor="middle" font-size="11" fill="#475569">Tinggi = 8 cm</text>
      <text x="375" y="125" text-anchor="middle" font-size="11" fill="#475569">Alas = 6 cm</text>
    </svg>`
  },
  {
    id: 'diagram_batang_ekskul',
    name: 'Diagram Batang Kegiatan Ekstrakurikuler',
    subject: 'Matematika',
    category: 'Diagram Matematika',
    description: 'Diagram batang siswa mengikuti kegiatan Pramuka (30), Futsal (45), Tari (25), dan Robotik (20).',
    svg: `<svg width="460" height="220" viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="460" height="220" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="230" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">Data Siswa Mengikuti Ekstrakurikuler SD</text>
      
      <!-- Y-Axis Grid & labels -->
      <line x1="70" y1="160" x2="410" y2="160" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="70" y1="50" x2="70" y2="160" stroke="#94a3b8" stroke-width="1.5"/>
      
      <text x="60" y="164" text-anchor="end" font-size="10" fill="#64748b">0</text>
      <line x1="68" y1="135" x2="410" y2="135" stroke="#e2e8f0" stroke-width="1"/>
      <text x="60" y="139" text-anchor="end" font-size="10" fill="#64748b">10</text>
      <line x1="68" y1="110" x2="410" y2="110" stroke="#e2e8f0" stroke-width="1"/>
      <text x="60" y="114" text-anchor="end" font-size="10" fill="#64748b">20</text>
      <line x1="68" y1="85" x2="410" y2="85" stroke="#e2e8f0" stroke-width="1"/>
      <text x="60" y="89" text-anchor="end" font-size="10" fill="#64748b">30</text>
      <line x1="68" y1="60" x2="410" y2="60" stroke="#e2e8f0" stroke-width="1"/>
      <text x="60" y="64" text-anchor="end" font-size="10" fill="#64748b">40</text>
      
      <!-- Bar 1: Pramuka (30) -->
      <rect x="95" y="85" width="45" height="75" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5" rx="3"/>
      <text x="117" y="78" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">30</text>
      <text x="117" y="180" text-anchor="middle" font-size="11" fill="#1e293b">Pramuka</text>
      
      <!-- Bar 2: Futsal (45) -->
      <rect x="175" y="48" width="45" height="112" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3"/>
      <text x="197" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#15803d">45</text>
      <text x="197" y="180" text-anchor="middle" font-size="11" fill="#1e293b">Futsal</text>
      
      <!-- Bar 3: Seni Tari (25) -->
      <rect x="255" y="98" width="45" height="62" fill="#fb923c" stroke="#ea580c" stroke-width="1.5" rx="3"/>
      <text x="277" y="92" text-anchor="middle" font-size="11" font-weight="bold" fill="#c2410c">25</text>
      <text x="277" y="180" text-anchor="middle" font-size="11" fill="#1e293b">Seni Tari</text>
      
      <!-- Bar 4: Robotik (20) -->
      <rect x="335" y="110" width="45" height="50" fill="#c084fc" stroke="#9333ea" stroke-width="1.5" rx="3"/>
      <text x="357" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#7e22ce">20</text>
      <text x="357" y="180" text-anchor="middle" font-size="11" fill="#1e293b">Robotik</text>
      
      <text x="230" y="205" text-anchor="middle" font-size="10" fill="#64748b">Sumbu mendatar: Nama Ekskul | Sumbu tegak: Banyak Siswa (Orang)</text>
    </svg>`
  },
  {
    id: 'jam_analog_0730',
    name: 'Diagram Jam Analog (07.30)',
    subject: 'Matematika',
    category: 'Diagram Matematika',
    description: 'Jam dinding analog menunjukkan jarum pendek di antara angka 7 dan 8, serta jarum panjang di angka 6.',
    svg: `<svg width="350" height="200" viewBox="0 0 350 200" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="350" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="175" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">Pengukuran Waktu (Jam Dinding)</text>
      
      <!-- Clock face -->
      <circle cx="110" cy="110" r="70" fill="#ffffff" stroke="#0284c7" stroke-width="4"/>
      <circle cx="110" cy="110" r="4" fill="#0f172a"/>
      
      <!-- Clock numbers -->
      <text x="110" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">12</text>
      <text x="165" y="114" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">3</text>
      <text x="110" y="168" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">6</text>
      <text x="55" y="114" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">9</text>
      
      <text x="138" y="68" text-anchor="middle" font-size="9" fill="#64748b">1</text>
      <text x="158" y="88" text-anchor="middle" font-size="9" fill="#64748b">2</text>
      <text x="158" y="140" text-anchor="middle" font-size="9" fill="#64748b">4</text>
      <text x="138" y="160" text-anchor="middle" font-size="9" fill="#64748b">5</text>
      <text x="82" y="160" text-anchor="middle" font-size="9" fill="#64748b">7</text>
      <text x="62" y="140" text-anchor="middle" font-size="9" fill="#64748b">8</text>
      <text x="62" y="88" text-anchor="middle" font-size="9" fill="#64748b">10</text>
      <text x="82" y="68" text-anchor="middle" font-size="9" fill="#64748b">11</text>
      
      <!-- Hour hand pointing around 7.5 -->
      <line x1="110" y1="110" x2="80" y2="135" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
      
      <!-- Minute hand pointing at 6 -->
      <line x1="110" y1="110" x2="110" y2="158" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
      
      <!-- Explanation box -->
      <rect x="200" y="60" width="135" height="100" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" rx="6"/>
      <text x="267" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">Waktu Ditunjukkan:</text>
      <text x="267" y="115" text-anchor="middle" font-size="16" font-weight="bold" fill="#047857">07.30</text>
      <text x="267" y="140" text-anchor="middle" font-size="10" fill="#15803d">Pukul tujuh lebih tiga puluh menit</text>
    </svg>`
  },
  {
    id: 'denah_sekolah',
    name: 'Diagram Denah Ruang Sekolah',
    subject: 'Bahasa Indonesia',
    category: 'Diagram Umum',
    description: 'Denah lokasi ruangan sekolah: Ruang Guru, Kelas 1-6, Perpustakaan, Laboratorium, dan Lapangan Upacara dengan penunjuk arah mata angin.',
    svg: `<svg width="460" height="210" viewBox="0 0 460 210" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
      <rect width="460" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="230" y="24" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">Denah Gedung SD Negeri Nusantara</text>
      
      <!-- Compass Rose -->
      <g transform="translate(415, 60)">
        <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#94a3b8"/>
        <polygon points="0,-18 5,0 -5,0" fill="#ef4444"/>
        <polygon points="0,18 5,0 -5,0" fill="#64748b"/>
        <text x="0" y="-22" text-anchor="middle" font-size="9" font-weight="bold" fill="#ef4444">U</text>
        <text x="0" y="28" text-anchor="middle" font-size="8" fill="#64748b">S</text>
        <text x="24" y="3" text-anchor="middle" font-size="8" fill="#64748b">T</text>
        <text x="-24" y="3" text-anchor="middle" font-size="8" fill="#64748b">B</text>
      </g>
      
      <!-- Rooms (Top row) -->
      <rect x="30" y="45" width="80" height="40" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" rx="3"/>
      <text x="70" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#0369a1">Ruang Guru</text>
      
      <rect x="120" y="45" width="70" height="40" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" rx="3"/>
      <text x="155" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#b45309">UKS</text>
      
      <rect x="200" y="45" width="90" height="40" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="3"/>
      <text x="245" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">Perpustakaan</text>
      
      <rect x="300" y="45" width="80" height="40" fill="#f3e8ff" stroke="#9333ea" stroke-width="1.5" rx="3"/>
      <text x="340" y="70" text-anchor="middle" font-size="10" font-weight="bold" fill="#7e22ce">Lab Komputer</text>
      
      <!-- Middle: Lapangan -->
      <rect x="70" y="100" width="220" height="50" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4" rx="4"/>
      <text x="180" y="130" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155">LAPANGAN UPACARA</text>
      
      <!-- Bottom: Kelas -->
      <rect x="30" y="160" width="105" height="35" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" rx="3"/>
      <text x="82" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c">Ruang Kelas I &amp; II</text>
      
      <rect x="145" y="160" width="115" height="35" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" rx="3"/>
      <text x="202" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c">Ruang Kelas III &amp; IV</text>
      
      <rect x="270" y="160" width="110" height="35" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5" rx="3"/>
      <text x="325" y="182" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c">Ruang Kelas V &amp; VI</text>
      
      <rect x="395" y="160" width="55" height="35" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5" rx="3"/>
      <text x="422" y="182" text-anchor="middle" font-size="9" font-weight="bold" fill="#854d0e">Kantin</text>
    </svg>`
  }
];

export function getDiagramById(id: string): DiagramItem | undefined {
  return DIAGRAM_LIBRARY.find((d) => d.id === id);
}

/**
 * Loads an image from a URL and converts it to a PNG base64 Data URL.
 */
export async function convertImageUrlToDataUrl(
  imageUrl: string,
  width = 600,
  height = 450
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';

    const timeout = setTimeout(() => {
      resolve(createFallbackImage(width, height, 'Foto Stimulus Soal'));
    }, 2500);

    img.onload = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(createFallbackImage(width, height, 'Foto Stimulus Soal'));
          return;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      } catch {
        resolve(createFallbackImage(width, height, 'Foto Stimulus Soal'));
      }
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(createFallbackImage(width, height, 'Foto Stimulus Soal'));
    };

    img.src = imageUrl;
  });
}

/**
 * Creates an elegant educational placeholder card on canvas if SVG decoding fails.
 */
function createFallbackImage(width: number, height: number, title: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return 'data:image/png;base64,';

  // Background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Inner box
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(20, 20, width - 40, height - 40);

  // Text title
  ctx.fillStyle = '#0369a1';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`[ ILUSTRASI STIMULUS: ${title.toUpperCase()} ]`, width / 2, height / 2 - 10);

  ctx.fillStyle = '#475569';
  ctx.font = 'italic 13px Arial, sans-serif';
  ctx.fillText('Naskah Asesmen Sumatif Sekolah Dasar', width / 2, height / 2 + 18);

  return canvas.toDataURL('image/png', 0.95);
}

/**
 * Converts an SVG string to a PNG base64 Data URL using a temporary canvas.
 * Fully resilient with sanitization, dimensions injection, and fallback.
 */
export async function convertSvgToPngDataUrl(
  svgString: string,
  width = 600,
  height = 300,
  fallbackTitle = 'Ilustrasi Stimulus Soal'
): Promise<string> {
  return new Promise((resolve) => {
    try {
      let cleanSvg = (svgString || '').trim();

      // Ensure xmlns namespace exists
      if (!cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
        cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // Ensure explicit width and height attributes exist on the root <svg>
      const hasWidth = /<svg[^>]*\bwidth=["']/.test(cleanSvg);
      const hasHeight = /<svg[^>]*\bheight=["']/.test(cleanSvg);

      if (!hasWidth || !hasHeight) {
        const viewBoxMatch = cleanSvg.match(/viewBox=["']\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*["']/);
        const vbW = viewBoxMatch ? viewBoxMatch[3] : String(width);
        const vbH = viewBoxMatch ? viewBoxMatch[4] : String(height);
        cleanSvg = cleanSvg.replace('<svg', `<svg width="${vbW}" height="${vbH}"`);
      }

      const img = new Image();
      let resolved = false;

      // Timeout safeguard (1.5 seconds)
      const timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(createFallbackImage(width, height, fallbackTitle));
        }
      }, 1500);

      img.onload = () => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutId);

        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(createFallbackImage(width, height, fallbackTitle));
            return;
          }

          // Crisp white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png', 0.95);
          resolve(dataUrl);
        } catch {
          resolve(createFallbackImage(width, height, fallbackTitle));
        }
      };

      img.onerror = () => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutId);
        // Fallback to elegant educational canvas banner so export never fails
        resolve(createFallbackImage(width, height, fallbackTitle));
      };

      // Try UTF-8 Data URI first (works reliably across iframes without blob revocations)
      try {
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cleanSvg)}`;
      } catch {
        try {
          const blob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
          const URL = window.URL || window.webkitURL || window;
          img.src = URL.createObjectURL(blob);
        } catch {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeoutId);
            resolve(createFallbackImage(width, height, fallbackTitle));
          }
        }
      }
    } catch {
      resolve(createFallbackImage(width, height, fallbackTitle));
    }
  });
}
