import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../utils/emailjs';

export default function About() {
  const [bio, setBio] = useState("I'm YASHASWIN, a Full Stack Developer focused on building scalable, AI-powered applications using the MERN stack. I believe technology should solve real problems by combining performance, usability, and intelligent automation.");
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/about`)
      .then(r => r.json())
      .then(json => { if (json.success && json.data?.bio) setBio(json.data.bio); })
      .catch(() => {});

    fetch(`${BACKEND_URL}/api/resume`)
      .then(r => r.json())
      .then(json => { if (json.success && json.data?.url) setResumeUrl(json.data.url); })
      .catch(() => {});
  }, []);

  return (
    <section id="about" style={{ padding: '10px 24px', background: 'linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)' }}>
      <div className="about-inner" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <span className="section-label reveal">ABOUT ME</span>
        <h2 className="section-title reveal reveal-delay-1">Built on Innovation,<br /><span className="grad-text">Clean Code</span>, and Real-World Impact.</h2>
        <p className="section-body reveal reveal-delay-2">{bio}</p>
        <a href={resumeUrl} target="_blank" rel="noreferrer" download className="btn-primary reveal reveal-delay-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Resume
        </a>
        <div className="reveal reveal-delay-4" style={{ marginTop:'40px', display:'flex', justifyContent:'center' }}>
  <div style={{ position:'relative', display:'inline-block' }}>
    {/* Glow ring */}
    <div style={{
      position:'absolute', inset:'-8px',
      borderRadius:'50%',
      background:'conic-gradient(from 0deg, #7c3aed, #06b6d4, #a855f7, #7c3aed)',
      animation:'spin-slow 4s linear infinite',
      zIndex:0,
    }}/>
    {/* White mask ring */}
    <div style={{
      position:'absolute', inset:'-2px',
      borderRadius:'50%',
      background:'rgba(3,3,8,0.85)',
      zIndex:1,
    }}/>
    <img 
      src="/profile.png" 
      alt="Yashaswin" 
      style={{ 
        position:'relative',
        zIndex:2,
        width:'260px', 
        height:'260px', 
        objectFit:'cover',
        borderRadius:'50%',
        animation:'float 3s ease-in-out infinite',
        display:'block',
      }} 
    />
    {/* Glow shadow */}
    <div style={{
      position:'absolute', bottom:'-20px', left:'50%',
      transform:'translateX(-50%)',
      width:'160px', height:'20px',
      background:'radial-gradient(ellipse,rgba(124,58,237,0.4),transparent 70%)',
      borderRadius:'50%',
      animation:'shadow-float 3s ease-in-out infinite',
      zIndex:0,
    }}/>
  </div>
</div>

<style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-16px); }
  }
  @keyframes shadow-float {
    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.4; }
    50% { transform: translateX(-50%) scale(0.75); opacity: 0.2; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}</style>
      </div>
      <div className="divider" />
    </section>
  );
}