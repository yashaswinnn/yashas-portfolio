import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const glowPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;

    const onMove = e => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const animate = () => {
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;
      glow.style.left = glowPos.current.x + 'px';
      glow.style.top = glowPos.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', () => { cursor.style.transform = 'translate(-50%,-50%) scale(0.7)'; });
    document.addEventListener('mouseup', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });

    const addHover = () => {
      document.querySelectorAll('a, button, .feature-card, .service-card, .gallery-item, .p-row').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.width = '24px'; cursor.style.height = '24px'; cursor.style.background = 'rgba(168,85,247,0.6)'; });
        el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; cursor.style.background = '#a855f7'; });
      });
    };
    setTimeout(addHover, 500);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-glow" ref={glowRef} />
    </>
  );
}
