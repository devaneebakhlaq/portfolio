import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getProjects } from '../api/portfolio';

const DEFAULT_PROJECTS = [
  { title: 'E-Commerce Platform', description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.', image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?w=800', tags: ['React','Node.js','MongoDB','Express','Stripe'], github: 'https://github.com', live: 'https://example.com', gradient: 'from-blue-500 to-cyan-500' },
  { title: 'Task Management App', description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.', image: 'https://images.unsplash.com/photo-1651055693398-0d66969cf759?w=800', tags: ['React','Redux','Socket.io','MongoDB'], github: 'https://github.com', live: 'https://example.com', gradient: 'from-purple-500 to-pink-500' },
  { title: 'Social Media Dashboard', description: 'A modern social media dashboard with user profiles, posts, comments, likes, and real-time notifications.', image: 'https://images.unsplash.com/photo-1675352161865-27816c76141a?w=800', tags: ['React','Node.js','MongoDB','JWT','WebSocket'], github: 'https://github.com', live: 'https://example.com', gradient: 'from-orange-500 to-red-500' },
];

export function Projects() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    getProjects().then(r => { if (r.data.data?.length) setProjects(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden">
      <motion.div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} />
      <motion.div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} transition={{ duration: 18, repeat: Infinity }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <motion.div initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }} className="inline-block mb-4">
            <Folder className="h-8 w-8 text-pink-600 mx-auto" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-pink-800 to-purple-900 bg-clip-text text-transparent mb-4">Featured Projects</h2>
          <motion.div className="w-20 h-1 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto mb-4" initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          <p className="text-gray-600 max-w-2xl mx-auto">Here are some of my recent projects that showcase my skills in full-stack development</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -10 }} className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />
              <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border-2 border-transparent group-hover:border-gray-100">
                <div className="relative overflow-hidden">
                  <ImageWithFallback src={project.image} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`} />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full hover:bg-gray-100 transition-all shadow-xl" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Github className="h-6 w-6 text-gray-900" />
                    </motion.a>
                    <motion.a href={project.live} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full hover:bg-gray-100 transition-all shadow-xl" whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                      <ExternalLink className="h-6 w-6 text-gray-900" />
                    </motion.a>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, ti) => (
                      <motion.div key={ti} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + ti * 0.05 }}>
                        <Badge variant="secondary" className="hover:bg-gray-200 transition-colors">{tag}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="text-center mt-12">
          <Button size="lg" variant="outline" className="group border-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300">
            View All Projects
            <motion.span className="ml-2 inline-block" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
