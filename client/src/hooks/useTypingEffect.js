import { useEffect, useRef } from 'react';

export function useTypingEffect(sentence, elementId, cursorSelector, speed = 55) {
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById(elementId);
    const cursor = document.querySelector(cursorSelector);
    if (!el) return;

    el.textContent = '';
    indexRef.current = 0;

    function type() {
      if (indexRef.current < sentence.length) {
        el.textContent += sentence.charAt(indexRef.current);
        indexRef.current++;
        timerRef.current = setTimeout(type, speed);
      } else {
        if (cursor) cursor.style.display = 'none';
      }
    }

    timerRef.current = setTimeout(type, 800);
    return () => clearTimeout(timerRef.current);
  }, [sentence, elementId, cursorSelector, speed]);
}
