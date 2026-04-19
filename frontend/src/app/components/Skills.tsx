import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { getSkills } from '../api/portfolio';

const DEFAULT_CATEGORIES = [
  { title: 'Frontend', gradient: 'from-blue-500 to-cyan-500', skills: [{ name: 'React', level: 90 }, { name: 'TypeScript', level: 85 }, { name: 'HTML/CSS', level: 95 }, { name: 'Tailwind CSS', level: 88 }, { name: 'Redux', level: 80 }] },
  { title: 'Backend', gradient: 'from-purple-500 to-pink-500', skills: [{ name: 'Node.js', level: 85 }, { name: 'Express.js', level: 88 }, { name: 'MongoDB', level: 82 }, { name: 'REST APIs', level: 90 }, { name: 'JWT Auth', level: 85 }] },
  { title: 'Tools & Others', gradient: 'from-orange-500 to-red-500', skills: [{ name: 'Git/GitHub', level: 88 }, { name: 'Docker', level: 75 }, { name: 'AWS', level: 70 }, { name: 'Postman', level: 90 }, { name: 'VS Code', level: 95 }] },
];

export function Skills() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    getSkills().then(r => { if (r.data.data?.length) setCategories(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-white relative overflow-hidden">
      <motion.div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity }} />
      <motion.div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl" animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, type: 'spring' }} className="inline-block mb-4">
            <Trophy className="h-8 w-8 text-purple-600 mx-auto" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-900 bg-clip-text text-transparent mb-4">Skills & Technologies</h2>
          <motion.div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, ci) => (
            <motion.div key={ci} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: ci * 0.15 }} whileHover={{ y: -10 }} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${cat.gradient} rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500`} />
              <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div className={`w-1 h-8 bg-gradient-to-b ${cat.gradient} rounded-full`} initial={{ height: 0 }} whileInView={{ height: 32 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.15 + 0.3 }} />
                  <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <div key={si}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-500 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: ci * 0.15 + si * 0.08, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${cat.gradient} rounded-full relative overflow-hidden`}>
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
