import { useEffect, useRef, useState } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';


export default function Hero() {
  const canvasRef = useRef(null);
  const [about, setAbout] = useState(null);

  

  useEffect(() => {
    const BASE = process.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${BASE}/api/about`)
      .then(r => r.json())
      .then(data => { if (data.data) setAbout(data.data); })
      .catch(() => {});
  }, []);

  const sentence = about?.subtitle || "I design and develop scalable web applications... AI-powered tools, and automation systems using modern technologies like React, Node.js, and OpenAI APIs.";

  useTypingEffect(sentence, 'typed-text', '.typed-cursor');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const NODES = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    let animId;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      NODES.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = NODES[i].x - NODES[j].x, dy = NODES[i].y - NODES[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(NODES[i].x, NODES[i].y);
            ctx.lineTo(NODES[j].x, NODES[j].y);
            ctx.stroke();
          }
        }
      }
      NODES.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168,85,247,0.6)';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 24px 60px' }}>
      <div className="hero-bg" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="sweep" />
        <canvas ref={canvasRef} id="neural-canvas" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
      </div>
      <div className="hero-inner" style={{ position: 'relative', zIndex: 2, maxWidth: '860px' }}>
        <div className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--purple-bright)', marginBottom: '32px', animation: 'fadeUp 0.8s 0.2s both' }}>
          <span className="badge-dot" style={{ width: '6px', height: '6px', background: 'var(--purple-bright)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          <span className="badge-text">{about?.badge || 'FULL STACK DEVELOPER | AI ENTHUSIAST'}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.03em', marginBottom: '28px', animation: 'fadeUp 0.8s 0.35s both' }}>
          <span className="hero-title-1">{about?.title1 || 'Building Websites.'}</span><br />
          <span className="anim-grad hero-title-2">{about?.title2 || 'Redefining the Future.'}</span>
        </h1>
        <p className="hero-sub" style={{ fontSize: '1.125rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 48px', fontWeight: 300, animation: 'fadeUp 0.8s 0.5s both' }}>
          <span id="typed-text"></span><span className="typed-cursor">|</span>
        </p>
        <div className="hero-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 0.8s 0.65s both' }}>
          
<a href="#contact" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.92a16 16 0 006.07 6.07l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
            Contact Us
          </a>
          <a href="#gallery" className="btn-ghost">
            View Portfolio
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line" />
      </div>

      <style>{`
        .orb { position:absolute; border-radius:50%; filter:blur(80px); }
        .orb-1 { width:600px;height:600px; background:radial-gradient(circle,rgba(124,58,237,0.25),transparent 70%); top:-150px;left:50%; transform:translateX(-50%); animation:orbFloat 8s ease-in-out infinite; }
        .orb-2 { width:400px;height:400px; background:radial-gradient(circle,rgba(59,130,246,0.15),transparent 70%); bottom:0;right:-100px; animation:orbFloat2 8s ease-in-out infinite; animation-delay:-3s; }
        .orb-3 { width:300px;height:300px; background:radial-gradient(circle,rgba(6,182,212,0.12),transparent 70%); bottom:100px;left:-50px; animation:orbFloat2 8s ease-in-out infinite; animation-delay:-6s; }
        .sweep { position:absolute;inset:0; background:linear-gradient(105deg,transparent 40%,rgba(168,85,247,0.04) 50%,transparent 60%); animation:sweep 6s ease-in-out infinite; }
        @keyframes orbFloat { 0%,100%{transform:translateY(0) translateX(-50%)} 50%{transform:translateY(-30px) translateX(-50%)} }
        @keyframes orbFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
      `}</style>
    </section>
  );
}
