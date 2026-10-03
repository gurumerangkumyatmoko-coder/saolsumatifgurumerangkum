import React from 'react';
import {
  Building2,
  ListOrdered,
  FileSearch,
  KeyRound,
  FileCheck2,
  Sparkles,
  PackageCheck
} from 'lucide-react';
import { ExamPackage } from '../types/exam';

interface TabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  exam: ExamPackage;
}

export const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab, exam }) => {
  const tabs = [
    {
      id: 'header',
      label: 'Identitas & Kop',
      icon: Building2,
      badge: null,
      desc: 'Sekolah, Guru, Mapel, Kelas'
    },
    {
      id: 'ai',
      label: 'Generator Cerdas AI',
      icon: Sparkles,
      badge: 'Gemini',
      highlight: true,
      desc: 'Susun otomatis sesuai materi'
    },
    {
      id: 'editor',
      label: 'Butir Soal & Gambar',
      icon: ListOrdered,
      badge: `${exam.questions.length} Soal`,
      desc: 'Kelola 5 tipe soal & stimulus visual'
    },
    {
      id: 'preview',
      label: 'Pratinjau Kertas A4',
      icon: FileSearch,
      badge: null,
      desc: 'Tampilan fotokopi naskah ujian'
    },
    {
      id: 'keys',
      label: 'Kunci & Pedoman Nilai',
      icon: KeyRound,
      badge: `${exam.questions.reduce((a, b) => a + b.score, 0)} Poin`,
      desc: 'Kunci jawaban & rubrik penskoran'
    },
    {
      id: 'ljk',
      label: 'Lembar Jawab (LJK)',
      icon: FileCheck2,
      badge: null,
      desc: 'Lembar jawaban siswa siap cetak'
    },
    {
      id: 'all',
      label: 'Paket Lengkap (Cetak Semua)',
      icon: PackageCheck,
      badge: 'Cetak/PDF',
      desc: 'Naskah Soal + Kunci + LJK'
    }
  ];

  return (
    <div className="bg-slate-50 border-b border-slate-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-blue-600'
                      : tab.highlight
                      ? 'text-indigo-500'
                      : 'text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      tab.highlight
                        ? 'bg-indigo-100 text-indigo-700'
                        : isActive
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
