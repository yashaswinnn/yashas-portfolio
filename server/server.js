require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// RATE LIMITERS
// ========================
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many messages, please try again later.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Too many login attempts, please try again later.' }
});

// ========================
// MIDDLEWARE
// ========================
app.use(cors({
  origin: function(origin, callback) {
    const allowed = [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
    ];
    if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());

// ========================
// MODELS
// ========================
const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  image:       { type: String, default: '' },
  tags:        [String],
  link:        { type: String, default: '' },
  featured:    { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read:      { type: Boolean, default: false }
});

const AboutSchema = new mongoose.Schema({
  name:     String,
  badge:    String,
  title1:   String,
  title2:   String,
  subtitle: String,
  bio:      String,
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
  password: { type: String, required: true }
});

const ResumeSchema = new mongoose.Schema({
  url: String
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
const Contact = mongoose.model('Contact', ContactSchema);
const About   = mongoose.model('About', AboutSchema);
const Admin   = mongoose.model('Admin', AdminSchema);
const Resume  = mongoose.model('Resume', ResumeSchema);

// ========================
// SEED FUNCTIONS
// ========================
async function seedAdmin() {
  const count = await Admin.countDocuments();
  if (count > 1) {
    await Admin.deleteMany({});
    console.log('🧹 Cleared duplicate admins');
  }
  const existing = await Admin.findOne();
  if (existing) { console.log('✅ Admin already exists'); return; }
  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  await Admin.create({ password: hashed });
  console.log('✅ Admin password seeded');
}

async function seedRealProjects() {
  try {
    const count = await Project.countDocuments();
    console.log(`📦 Projects in database: ${count}`);
    if (count === 0) {
      await Project.insertMany([
        {
          title: 'Diabetic Retinopathy Detection System',
          description: 'A hybrid DenseNet201 + ResNet50 deep learning model to classify retinal fundus images into 5 DR stages with confidence scoring.',
          image: '/project1.png',
          tags: ['Streamlit', 'TensorFlow', 'CNN'],
          link: '/diabetic',
          featured: true
        },
        {
          title: 'AI-Based Resume Builder',
          description: 'Intelligent resume generation system using OpenAI API and NLP with ATS optimization, resume scoring out of 100, and PDF export.',
          image: '/project2.png',
          tags: ['Streamlit', 'Python', 'Parsing'],
          link: '/airesume',
          featured: true
        },
        {
          title: 'TypFlux – Modern Typing Speed Test Platform',
          description: 'Modern typing speed test platform with Dark, Matrix, and Cyber themes — built for speed, accuracy, and style.',
          image: '/project3.png',
          tags: ['Tailwind', 'JavaScript', 'React'],
          link: 'https://typflux.vercel.app/',
          featured: true
        }
      ]);
      console.log('✅ Real projects seeded successfully');
    } else {
      console.log(`⏭ Skipping seed, ${count} projects exist`);
    }
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
}

// ========================
// MONGODB CONNECTION
// ========================
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    try { await seedAdmin(); } catch(e) { console.error('seedAdmin error:', e.message); }
    try { await seedRealProjects(); } catch(e) { console.error('seedProjects error:', e.message); }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ========================
// AUTH MIDDLEWARE
// ========================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// ========================
// HEALTH CHECK
// ========================
app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'ok', timestamp: new Date().toISOString() });
});

// ========================
// PROJECTS ROUTES
// ========================
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: projects, count: projects.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/projects', authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: false });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========================
// CONTACT / MESSAGES ROUTES
// ========================
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/messages/:id', authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/messages', authMiddleware, async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ success: true, message: 'All cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/messages/:id/read', authMiddleware, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json({ success: true, data: msg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========================
// ABOUT ROUTES
// ========================
app.get('/api/about', async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/about', authMiddleware, async (req, res) => {
  try {
    await About.deleteMany({});
    const about = new About(req.body);
    await about.save();
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========================
// ADMIN ROUTES
// ========================
app.post('/api/admin/login', loginLimiter, async (req, res) => {
  try {
    const { password } = req.body;
    const admin = await Admin.findOne();
    if (!admin) return res.status(401).json({ success: false, error: 'Admin not found' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ success: false, error: 'Wrong password' });
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findOne();
    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) return res.status(401).json({ success: false, error: 'Current password wrong' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.updateOne({}, { password: hashed });
    res.json({ success: true, message: 'Password updated!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// RESUME ROUTES
// ========================
app.get('/api/resume', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/resume', authMiddleware, async (req, res) => {
  try {
    const { url } = req.body;
    await Resume.deleteMany({});
    const resume = await Resume.create({ url });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/resume/upload', authMiddleware, async (req, res) => {
  try {
    const { base64, filename } = req.body;
    if (!base64) return res.status(400).json({ success: false, error: 'No file data' });
    await Resume.deleteMany({});
    const resume = await Resume.create({ url: base64 });
    res.json({ success: true, data: { url: base64, filename } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📁 Projects API: http://localhost:${PORT}/api/projects`);
});