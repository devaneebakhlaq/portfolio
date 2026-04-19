/**
 * seed.js — Run once to populate the database with default data
 * Usage: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Profile  = require('./models/Profile');
const Project  = require('./models/Project');
const Skill    = require('./models/Skill');
const Admin    = require('./models/Admin');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';

const defaultProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration using Stripe.',
    image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?w=800',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'from-blue-500 to-cyan-500',
    featured: true,
    order: 1,
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: 'https://images.unsplash.com/photo-1651055693398-0d66969cf759?w=800',
    tags: ['React', 'Redux', 'Socket.io', 'MongoDB', 'Express'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'from-purple-500 to-pink-500',
    featured: true,
    order: 2,
  },
  {
    title: 'Social Media Dashboard',
    description: 'A modern social media dashboard with user profiles, posts, comments, likes, and real-time notifications using WebSocket.',
    image: 'https://images.unsplash.com/photo-1675352161865-27816c76141a?w=800',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT', 'WebSocket'],
    github: 'https://github.com',
    live: 'https://example.com',
    gradient: 'from-orange-500 to-red-500',
    featured: true,
    order: 3,
  },
];

const defaultSkills = [
  {
    title: 'Frontend',
    gradient: 'from-blue-500 to-cyan-500',
    order: 1,
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Redux', level: 80 },
    ],
  },
  {
    title: 'Backend',
    gradient: 'from-purple-500 to-pink-500',
    order: 2,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'REST APIs', level: 90 },
      { name: 'JWT Auth', level: 85 },
    ],
  },
  {
    title: 'Tools & Others',
    gradient: 'from-orange-500 to-red-500',
    order: 3,
    skills: [
      { name: 'Git/GitHub', level: 88 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Postman', level: 90 },
      { name: 'VS Code', level: 95 },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Profile.deleteMany(),
      Project.deleteMany(),
      Skill.deleteMany(),
    ]);

    // Seed profile
    await Profile.create({
      name: 'John Doe',
      title: 'MERN Stack Developer',
      bio: 'I build modern, scalable web applications using MongoDB, Express.js, React, and Node.js. Passionate about creating seamless user experiences and robust backend solutions.',
      bioExtended: 'With over 3 years of experience in web development, I specialize in building full-stack applications using the MERN stack. My journey in software development has taught me the importance of writing clean, efficient code and creating user-centric solutions.',
      yearsExp: 3,
      projectsCount: 50,
      clients: 100,
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      whatsapp: 'https://wa.me/15551234567',
      location: 'San Francisco, CA',
    });
    console.log('✅ Profile seeded');

    // Seed projects
    await Project.insertMany(defaultProjects);
    console.log('✅ Projects seeded (3)');

    // Seed skills
    await Skill.insertMany(defaultSkills);
    console.log('✅ Skills seeded (3 categories)');

    // Create admin user (only if none exists)
    const adminEmail    = process.env.ADMIN_EMAIL    || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const existing = await Admin.findOne({ email: adminEmail });
    if (!existing) {
      await Admin.create({ email: adminEmail, password: adminPassword });
      console.log(`✅ Admin created — email: ${adminEmail} | password: ${adminPassword}`);
    } else {
      console.log('ℹ️  Admin already exists, skipping');
    }

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
