import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Briefcase, Mail, FileText, Code2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getProfile } from '../api/portfolio';

interface Profile { name: string; title: string; bio: string; yearsExp: number; projects: number; github: string; fiverr: string; email: string; heroImage: string; }

const DEFAULT: Profile = { name: 'Aneeb Akhlaq', title: 'MERN Stack Developer', bio: "I build modern, scalable web applications using MongoDB, Express.js, React, and Node.js. Passionate about creating seamless user experiences and robust backend solutions.", yearsExp: 3, projects: 50, github: 'https://github.com', fiverr: 'https://www.fiverr.com/sellers/aneeb_akhlaq/edit', email: 'mailto:malikaneeb1403@gmail.com', heroImage: 'https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?w=800' };

export function Hero() {
  const [profile, setProfile] = useState<Profile>(DEFAULT);

  useEffect(() => {
    getProfile().then(r => setProfile({ ...DEFAULT, ...r.data.data })).catch(() => {});
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div className="absolute inset-0 opacity-30"
          animate={{ background: ['radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)', 'radial-gradient(circle at 80% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)', 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
      <motion.div className="absolute top-20 left-10 text-blue-400/20" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        <Code2 size={60} />
      </motion.div>
      <motion.div className="absolute bottom-20 right-20 text-purple-400/20" animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        <Sparkles size={50} />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-700">
                Welcome to my portfolio
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
            <motion.h2 className="text-2xl sm:text-3xl text-gray-700 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              {profile.title}
            </motion.h2>
            <motion.p className="text-lg text-gray-600 mb-8 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              {profile.bio}
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <Button onClick={() => scrollTo('projects')} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                View My Work
              </Button>
              <Button onClick={() => scrollTo('contact')} variant="outline" size="lg" className="border-2 hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
                Get In Touch
              </Button>
            </motion.div>
            <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              {[
                { icon: Github,    href: profile.github, color: 'hover:bg-gray-700 hover:text-white' },
                { icon: Briefcase, href: profile.fiverr, color: 'hover:bg-green-600 hover:text-white' },
                { icon: Mail,      href: profile.email,  color: 'hover:bg-red-500 hover:text-white' },
                { icon: FileText,  href: '#',            color: 'hover:bg-teal-600 hover:text-white' },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-white border-2 border-gray-200 transition-all duration-300 ${s.color} shadow-md hover:shadow-lg hover:-translate-y-1`}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <s.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback src={profile.heroImage} alt="Developer workspace" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
              className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-xl p-4 border-2 border-blue-100">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{profile.yearsExp}+</p>
                <p className="text-sm text-gray-600">Years Exp</p>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}
              className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-xl p-4 border-2 border-purple-100">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{profile.projects}+</p>
                <p className="text-sm text-gray-600">Projects</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
