import { useState, useEffect } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? 'hidden' : ''}`}>
      <div className="loader-logo">Welcome to my Portfolio</div>
      <div className="loader-bar"><div className="loader-bar-fill" /></div>
    </div>
  );
}
