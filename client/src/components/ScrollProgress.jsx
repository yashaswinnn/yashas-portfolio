import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollProgress() {
  const barRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (barRef.current) barRef.current.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  if (location.pathname !== '/') return null;

  return <div id="scroll-progress" ref={barRef} />;
}