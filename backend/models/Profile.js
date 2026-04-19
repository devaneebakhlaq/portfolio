const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name:        { type: String, required: true, default: 'John Doe' },
  title:       { type: String, default: 'MERN Stack Developer' },
  bio:         { type: String, default: 'I build modern, scalable web apps using the MERN stack.' },
  bioExtended: { type: String, default: 'With over 3 years of experience in web development, I specialize in building full-stack applications. My goal is to create applications that provide exceptional user experiences.' },
  yearsExp:    { type: Number, default: 3 },
  projectsCount: { type: Number, default: 50 },
  clients:     { type: Number, default: 100 },
  heroImage:   { type: String, default: 'https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?w=800' },
  aboutImage:  { type: String, default: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800' },
  github:      { type: String, default: 'https://github.com' },
  linkedin:    { type: String, default: 'https://linkedin.com' },
  twitter:     { type: String, default: 'https://twitter.com' },
  email:       { type: String, default: 'john@example.com' },
  phone:       { type: String, default: '+1 (555) 123-4567' },
  whatsapp:    { type: String, default: 'https://wa.me/15551234567' },
  location:    { type: String, default: 'San Francisco, CA' },
  resumeUrl:   { type: String, default: '#' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
