import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
function seen() {
  try {
    return sessionStorage.getItem('electronics.entrance') === '1';
  } catch {
    return true;
  }
}
export function Entrance() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => !seen());
  function dismiss() {
    setShow(false);
    try {
      sessionStorage.setItem('electronics.entrance', '1');
    } catch {
      /* Optional animation never depends on storage. */
    }
  }
  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(dismiss, 1800);
    return () => clearTimeout(timer);
  }, [reduced]);
  if (!show || reduced) return null;
  return (
    <div className="entrance" aria-label="פתיח החנות">
      <div className="entrance-art" aria-hidden="true">
        <i />
        <i />
        <i />
        <span />
      </div>
      <p>טכנולוגיה. עיצוב. חיים.</p>
      <button onClick={dismiss}>דילוג על הפתיח ←</button>
    </div>
  );
}
