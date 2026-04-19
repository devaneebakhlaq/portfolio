import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { sendMessage } from '../api/portfolio';

export function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg]   = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrMsg(err.response?.data?.message || 'Failed to send. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    { icon: Mail,          title: 'Email',     value: 'malikaneeb1403@gmail.com',    href: 'mailto:malikaneeb1403@gmail.com',      gradient: 'from-blue-500 to-cyan-500' },
    { icon: Phone,         title: 'Phone',     value: '+92 331 6619837',     href: 'tel:+923316619837',             gradient: 'from-purple-500 to-pink-500' },
    { icon: MessageCircle, title: 'WhatsApp',  value: '+92 331 6619837',     href: 'https://wa.me/923316619837',    gradient: 'from-green-500 to-emerald-500' },
    { icon: MapPin,        title: 'Location',  value: 'Faisalabad, Pakistan',   href: '#',                            gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-gray-50 relative overflow-hidden">
      <motion.div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 18, repeat: Infinity }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <motion.div initial={{ scale: 0, rotate: 45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }} className="inline-block mb-4">
            <Send className="h-8 w-8 text-blue-600 mx-auto" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent mb-4">Get In Touch</h2>
          <motion.div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4" initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          <p className="text-gray-600 max-w-2xl mx-auto">Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ x: 10 }} className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${info.gradient} rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300`} />
                <Card className="relative hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div className={`p-3 bg-gradient-to-br ${info.gradient} rounded-lg shadow-lg`} whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <info.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                        <a href={info.href} className="text-gray-600 hover:text-blue-600 transition-colors">{info.value}</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
            <Card className="relative">
              <CardContent className="p-6 sm:p-8">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent! 🎉</h3>
                    <p className="text-gray-600">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm">{errMsg}</span>
                      </motion.div>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <Input id="name" type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="focus:ring-2 focus:ring-blue-500 transition-all" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <Input id="email" type="email" placeholder="example@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="focus:ring-2 focus:ring-blue-500 transition-all" required />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <Textarea id="message" placeholder="Tell me about your project..." rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="focus:ring-2 focus:ring-blue-500 transition-all" required />
                    </div>
                    <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2"><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Sending...</span>
                      ) : (
                        <span className="flex items-center gap-2">Send Message <Send className="h-4 w-4" /></span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
