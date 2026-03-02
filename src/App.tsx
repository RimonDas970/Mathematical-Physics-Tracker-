import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, GraduationCap, Trophy } from 'lucide-react';

interface Lecture {
  id: number;
  title: string;
  completed: boolean;
}

export default function App() {
  const [lectures, setLectures] = useState<Lecture[]>(() => {
    const saved = localStorage.getItem('mp-lectures');
    if (saved) return JSON.parse(saved);
    return Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      title: `MP Lecture ${i + 1}`,
      completed: false,
    }));
  });

  useEffect(() => {
    localStorage.setItem('mp-lectures', JSON.stringify(lectures));
  }, [lectures]);

  const toggleLecture = (id: number) => {
    setLectures(prev => prev.map(l => 
      l.id === id ? { ...l, completed: !l.completed } : l
    ));
  };

  const completedCount = lectures.filter(l => l.completed).length;
  const progress = Math.round((completedCount / lectures.length) * 100);

  return (
    <div className="min-h-screen bg-[#050505] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Mathematical Physics
              </h1>
              <p className="text-[#A0A0A0] font-medium">Lecture Progress Tracker</p>
            </div>
            <div className="p-3 bg-neon-green rounded-2xl shadow-[0_0_20px_rgba(0,255,0,0.3)]">
              <GraduationCap className="w-6 h-6 text-black" />
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-[#111111] border border-[#222222] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/5 blur-[80px] rounded-full" />
            
            <div className="flex items-end justify-between mb-4 relative z-10">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#666666]">
                  Course Completion
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold tabular-nums text-neon-green drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">
                    {progress}%
                  </span>
                  <span className="text-[#A0A0A0] font-medium">
                    ({completedCount} / {lectures.length})
                  </span>
                </div>
              </div>
              {progress === 100 && (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="bg-neon-green p-2 rounded-full shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                >
                  <Trophy className="w-6 h-6 text-black" />
                </motion.div>
              )}
            </div>
            
            <div className="relative h-2 w-full bg-[#222222] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 h-full bg-neon-green shadow-[0_0_15px_rgba(0,255,0,0.5)] rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Lecture List */}
        <main className="grid gap-3">
          {lectures.map((lecture) => (
            <motion.button
              key={lecture.id}
              onClick={() => toggleLecture(lecture.id)}
              whileHover={{ x: 6, backgroundColor: lecture.completed ? '#0F0F0F' : '#1A1A1A' }}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 text-left group ${
                lecture.completed 
                  ? 'bg-[#0A0A0A] border-transparent' 
                  : 'bg-[#111111] border-[#222222] hover:border-neon-green/50 shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`transition-all duration-300 ${
                  lecture.completed ? 'text-[#333333]' : 'text-neon-green'
                }`}>
                  {lecture.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                <span className={`text-lg font-medium transition-all duration-300 ${
                  lecture.completed 
                    ? 'text-[#444444] line-through decoration-1' 
                    : 'text-[#EEEEEE] group-hover:text-white'
                }`}>
                  {lecture.title}
                </span>
              </div>
              
              <div className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                lecture.completed ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 text-neon-green'
              }`}>
                Complete
              </div>
            </motion.button>
          ))}
        </main>

        {/* Footer */}
        <footer className="mt-20 pb-12 text-center">
          <div className="h-px w-12 bg-[#222222] mx-auto mb-8" />
          <p className="text-xs text-[#444444] font-bold uppercase tracking-[0.3em]">
            Stay consistent • Master the physics
          </p>
        </footer>
      </div>
    </div>
  );
}
