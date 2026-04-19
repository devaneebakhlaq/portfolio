const Message  = require('../models/Message');
const nodemailer = require('nodemailer');

// Helper: send email notification (optional)
const sendEmailNotification = async (msg) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return; // skip if not configured
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Message from ${msg.name}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${msg.name}</p>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Message:</strong></p>
        <p>${msg.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Received at ${new Date().toLocaleString()}</small>
      `,
    });
    console.log('📧 Email notification sent');
  } catch (err) {
    console.warn('Email notification failed:', err.message);
  }
};

// POST /api/contact — public
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'All fields are required' });
    if (message.length > 2000)
      return res.status(400).json({ success: false, message: 'Message too long (max 2000 chars)' });

    const msg = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ip: req.ip,
    });

    // Fire-and-forget email
    sendEmailNotification(msg);

    res.status(201).json({ success: true, message: 'Message sent successfully! I will get back to you soon.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contact/messages — admin
exports.getMessages = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip  = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find().sort('-createdAt').skip(skip).limit(limit),
      Message.countDocuments(),
    ]);
    const unread = await Message.countDocuments({ isRead: false });

    res.json({ success: true, data: messages, total, unread, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/contact/messages/:id/read — admin
exports.markRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/contact/messages/:id — admin
exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
