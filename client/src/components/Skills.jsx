import { useEffect, useRef } from 'react';

const SKILL_CATS = [
  { cc: '#6366f1', icon: '🎨', name: 'Frontend', tags: ['React','JavaScript','HTML5','Tailwind'] },
  { cc: '#10b981', icon: '⚙️', name: 'Backend',  tags: ['Node.js','Express','Python','Flask'] },
  { cc: '#f59e0b', icon: '🗄️', name: 'Database', tags: ['MongoDB','MySQL','Mongoose'] },
  { cc: '#ef4444', icon: '🤖', name: 'AI / ML',  tags: ['TensorFlow','OpenAI','CNN','Streamlit'] },
  { cc: '#22d3ee', icon: '☁️', name: 'DevOps',   tags: ['Git','Docker','Vercel','AWS'] },
  { cc: '#a855f7', icon: '📚', name: 'Learning', tags: ['Next.js','TypeScript','Azure'] },
];

const SKILLS = [
  { label:'React',      img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { label:'Node.js',    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { label:'Python',     img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { label:'MongoDB',    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { label:'JavaScript', img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { label:'TensorFlow', img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { label:'Express',    img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert:true },
  { label:'Git',        img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { label:'MySQL',      img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { label:'Flask',      img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', invert:true },
  { label:'HTML5',      img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { label:'CSS3',       img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { label:'Tailwind',   img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { label:'Docker',     img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { label:'AWS',        img:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', invert:true },
  { label:'OpenAI',     emoji:'🤖' },
];

export default function Skills() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const CX = W/2, CY = H/2, RADIUS = 185;

    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = SKILLS.map((skill, i) => {
      const y = 1 - (i / (SKILLS.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const p = { ...skill, ox: Math.cos(theta)*r, oy: y, oz: Math.sin(theta)*r, sx:0, sy:0, z:0, scale:1, sr:22, imgEl:null, loaded:false };
      if (skill.img) {
        const img = new Image(); img.crossOrigin = 'anonymous';
        img.onload = () => { p.imgEl = img; p.loaded = true; };
        img.src = skill.img;
      } else { p.loaded = true; }
      return p;
    });

    let rotX=0.3, rotY=0, velY=0.004;
    let isDragging=false, lastMX=0, lastMY=0, hovered=-1;
    let animId;

    const onDown = e => { isDragging=true; lastMX=e.clientX; lastMY=e.clientY;velY=0; };
    const onMove = e => {
      if (isDragging) {
        rotY += (e.clientX-lastMX)*0.005; rotX += (e.clientY-lastMY)*0.005;
        velY=(e.clientX-lastMX)*0.008; 
        lastMX=e.clientX; lastMY=e.clientY;
      }
      const rect=canvas.getBoundingClientRect();
      const mx=(e.clientX-rect.left)*(W/rect.width), my=(e.clientY-rect.top)*(H/rect.height);
      hovered=-1;
      points.forEach((p,i)=>{ if(Math.hypot(mx-p.sx,my-p.sy)<p.sr) hovered=i; });
      canvas.style.cursor = hovered>=0?'pointer':'grab';
    };
    const onUp = () => isDragging=false;

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    function rotate(ox,oy,oz) {
      const x1=ox*Math.cos(rotY)+oz*Math.sin(rotY), z1=-ox*Math.sin(rotY)+oz*Math.cos(rotY);
      const y2=oy*Math.cos(rotX)-z1*Math.sin(rotX), z2=oy*Math.sin(rotX)+z1*Math.cos(rotX);
      return {x:x1,y:y2,z:z2};
    }

    function roundRect(c,x,y,w,h,r){
      c.beginPath(); c.moveTo(x+r,y); c.lineTo(x+w-r,y); c.quadraticCurveTo(x+w,y,x+w,y+r);
      c.lineTo(x+w,y+h-r); c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
      c.lineTo(x+r,y+h); c.quadraticCurveTo(x,y+h,x,y+h-r);
      c.lineTo(x,y+r); c.quadraticCurveTo(x,y,x+r,y); c.closePath();
    }

    function draw() {
      ctx.clearRect(0,0,W,H);
      if (!isDragging) {
        rotY += velY; velY = velY*0.998 + 0.004*(velY===0?1:0);
        if (velY===0) velY=0.004;
        rotX *= 0.99;
        rotX = Math.max(-0.7, Math.min(0.7, rotX));
      }
      ctx.beginPath(); ctx.arc(CX,CY,RADIUS,0,Math.PI*2);
      ctx.strokeStyle='rgba(124,58,237,0.05)'; ctx.lineWidth=1; ctx.stroke();

      points.forEach(p => {
        const r=rotate(p.ox,p.oy,p.oz);
        p.x=r.x; p.y=r.y; p.z=r.z;
        const fov=600, s=fov/(fov+r.z*RADIUS);
        p.sx=CX+r.x*RADIUS*s; p.sy=CY+r.y*RADIUS*s; p.scale=s; p.sr=22*s;
      });

      const sorted=[...points].sort((a,b)=>a.z-b.z);
      sorted.forEach(p => sorted.forEach(q => {
        if(p===q) return;
        const d=Math.hypot(p.ox-q.ox,p.oy-q.oy,p.oz-q.oz);
        if(d<0.6){
          const a=(1-d/0.6)*0.07*((p.z+q.z)/2+1.5)/3;
          ctx.beginPath(); ctx.moveTo(p.sx,p.sy); ctx.lineTo(q.sx,q.sy);
          ctx.strokeStyle=`rgba(124,58,237,${a})`; ctx.lineWidth=0.7; ctx.stroke();
        }
      }));

      sorted.forEach(p => {
        const depth=(p.z+1)/2;
        const size=Math.max(24,48*p.scale);
        const isHov=points.indexOf(p)===hovered;
        ctx.save(); ctx.translate(p.sx,p.sy);
        ctx.globalAlpha=Math.max(0.2, depth*0.85+0.15);

        if(depth>0.55||isHov){
          const ga=isHov?0.45:(depth-0.55)*0.7;
          const g=ctx.createRadialGradient(0,0,size*0.2,0,0,size*1.3);
          g.addColorStop(0,`rgba(124,58,237,${ga*0.35})`); g.addColorStop(1,'transparent');
          ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,size*1.3,0,Math.PI*2); ctx.fill();
        }

        const bh=size*0.58;
        ctx.fillStyle=`rgba(6,6,15,${0.7+depth*0.3})`;
        ctx.strokeStyle=isHov?'rgba(168,85,247,0.95)':`rgba(124,58,237,${0.15+depth*0.5})`;
        ctx.lineWidth=isHov?1.5:0.8;
        roundRect(ctx,-bh,-bh,bh*2,bh*2,7); ctx.fill(); ctx.stroke();

        if(p.loaded){
          const is=bh*1.15;
          if(p.imgEl){
            if(p.invert) ctx.filter='invert(1) opacity(0.9)';
            ctx.drawImage(p.imgEl,-is/2,-is/2,is,is);
            ctx.filter='none';
          } else if(p.emoji){
            ctx.font=`${is*0.9}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
            ctx.fillText(p.emoji,0,1);
          }
        }

        if(isHov){
          ctx.globalAlpha=1; ctx.filter='none';
          ctx.font='600 10px monospace'; ctx.textAlign='center'; ctx.textBaseline='top';
          const lw=ctx.measureText(p.label).width+16;
          ctx.fillStyle='rgba(6,6,15,0.95)';
          roundRect(ctx,-lw/2,bh+6,lw,17,4); ctx.fill();
          ctx.strokeStyle='rgba(124,58,237,0.6)'; ctx.lineWidth=1; ctx.stroke();
          ctx.fillStyle='#a855f7'; ctx.fillText(p.label,0,bh+10);
        }
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="skills" style={{ padding:'100px 24px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(124,58,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.03) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none' }} />
      <div style={{ maxWidth:'1200px',margin:'0 auto',position:'relative',zIndex:1 }}>
        <div style={{ textAlign:'center',marginBottom:'70px' }}>
          <span className="section-label reveal">Technical Skills</span>
          <h2 className="section-title reveal reveal-delay-1">Technologies I <span className="grad-text">work with</span></h2>
        </div>
        <div className="skills-split">
          <div className="sphere-wrap reveal">
            <canvas ref={canvasRef} id="skills-sphere" width="420" height="420" />
          </div>
          <div className="sk-cards-grid reveal reveal-delay-1">
            {SKILL_CATS.map(cat => (
              <div className="sk-cat" key={cat.name} style={{'--cc': cat.cc}}>
                <div className="sk-cat-head"><span>{cat.icon}</span><span className="sk-cat-name">{cat.name}</span></div>
                <div className="sk-tags">{cat.tags.map(t => <span key={t} className="sk-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}