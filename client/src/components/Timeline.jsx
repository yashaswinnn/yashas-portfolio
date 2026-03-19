const timelineData = [
  { year: '2023', icon: '🎓', title: 'Started AI & ML Degree', desc: 'Began my journey into software development, learning core programming fundamentals, data structures, and algorithms.', tags: [] },
  { year: '2024', icon: '🤖', title: 'Built AI-Based Resume Builder', desc: 'Created an intelligent resume generation system using OpenAI API and NLP — with ATS optimization, resume scoring out of 100, and PDF export.', tags: ['OpenAI','Python','Streamlit'] },
  { year: '2025', icon: '👁️', title: 'Built Diabetic Retinopathy Detection System', desc: 'Developed a hybrid DenseNet201 + ResNet50 deep learning model to classify retinal fundus images into 5 DR stages with confidence scoring.', tags: ['Python','TensorFlow','OpenCV'] },
  { year: '2026', icon: '⌨️', title: 'Launched TypFlux — Typing Speed Platform', desc: 'Designed and launched a modern typing speed test platform with Dark, Matrix, and Cyber themes — built for speed, accuracy, and style.', tags: ['React','JavaScript','Tailwind'] },
  { year: 'Now', icon: '🚀', title: 'Open to Opportunities', desc: 'Final year AI & ML student actively building full-stack and AI-powered projects. Currently pursuing an internship to apply my skills in real-world environments.', tags: ['MERN Stack','AI/ML','Open to Work'], active: true },
];

export default function Timeline() {
  return (
    <section id="timeline" style={{ padding: '80px 24px 100px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <span className="section-label reveal">My Journey</span>
        <h2 className="section-title reveal reveal-delay-1">How I got <span className="grad-text">here</span></h2>

        <div style={{ position: 'relative', marginTop: '60px' }}>

          {/* Center vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--purple), rgba(124,58,237,0.1))',
            transform: 'translateX(-50%)',
          }} />

          {timelineData.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="reveal" style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                alignItems: 'flex-start',
                marginBottom: '48px',
                position: 'relative',
                transitionDelay: `${i * 0.1}s`,
              }}>
                {/* Card */}
                <div style={{
                  width: '44%',
                  background: item.active ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${item.active ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.18)'}`,
                  borderRadius: '16px',
                  padding: '24px 28px',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'left',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}>
                  {/* Arrow pointing to center */}
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    [isLeft ? 'right' : 'left']: '-10px',
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    [isLeft ? 'borderLeft' : 'borderRight']: `10px solid ${item.active ? 'rgba(168,85,247,0.4)' : 'rgba(124,58,237,0.18)'}`,
                  }} />

                  {/* Year */}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '10px',
                    background: item.year === 'Now'
                      ? 'linear-gradient(135deg, var(--purple-bright), var(--cyan))'
                      : 'none',
                    WebkitBackgroundClip: item.year === 'Now' ? 'text' : 'unset',
                    WebkitTextFillColor: item.year === 'Now' ? 'transparent' : 'unset',
                    color: item.year === 'Now' ? 'transparent' : 'var(--purple-bright)',
                  }}>{item.year}</div>

                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{item.icon}</div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: 'var(--white)',
                  }}>{item.title}</h4>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    marginBottom: item.tags.length ? '14px' : 0,
                  }}>{item.desc}</p>
                  {item.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {item.tags.map(t => (
                        <span key={t} style={{
                          padding: '3px 12px',
                          background: 'rgba(124,58,237,0.12)',
                          border: '1px solid rgba(124,58,237,0.25)',
                          borderRadius: '100px',
                          fontSize: '0.72rem',
                          fontWeight: 500,
                          color: 'var(--purple-bright)',
                        }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '20px',
                  transform: 'translateX(-50%)',
                  width: item.active ? '18px' : '14px',
                  height: item.active ? '18px' : '14px',
                  borderRadius: '50%',
                  background: item.active ? 'var(--purple-bright)' : 'var(--purple)',
                  border: '2px solid var(--bg)',
                  boxShadow: item.active
                    ? '0 0 20px rgba(168,85,247,0.8)'
                    : '0 0 12px rgba(124,58,237,0.6)',
                  zIndex: 1,
                  animation: item.active ? 'pulse 2s infinite' : 'none',
                }} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .tl-mobile-fix { flex-direction: column !important; padding-left: 48px !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}