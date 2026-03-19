# Yashas Portfolio — React

Full-stack portfolio website rebuilt in React using Vite/CRA architecture.

## Tech Stack
- React 18 + React Router v6
- @emailjs/browser for contact form
- Same Node.js backend (https://yashas-backend.vercel.app)

## Structure
```
src/
├── components/    # Reusable UI components
│   ├── Loader.jsx
│   ├── Cursor.jsx
│   ├── ScrollProgress.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Timeline.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── pages/         # Route pages
│   ├── Home.jsx
│   ├── Diabetic.jsx
│   └── AIResume.jsx
├── hooks/         # Custom hooks
│   ├── useScrollReveal.js
│   └── useTypingEffect.js
├── utils/         # Config / helpers
│   └── emailjs.js
├── styles/        # Global CSS
│   └── globals.css
├── App.jsx
└── index.js

public/            # Static assets
├── project1-5.png
├── resume.pdf
└── index.html
```

## Setup
```bash
npm install
npm start
```

## Deploy (Vercel)
```bash
npm run build
vercel deploy
```

## Backend
Same backend as before: https://yashas-backend.vercel.app
Update BACKEND_URL in src/utils/emailjs.js if needed.

## Routes
- `/`           → Home (all sections)
- `/diabetic`   → Diabetic Retinopathy project page
- `/airesume`   → AI Resume Builder project page
