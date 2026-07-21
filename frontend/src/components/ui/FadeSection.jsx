import { useEffect, useRef, useState } from 'react';

/**
 * Wraps a section so it fades AND blurs in as it enters the viewport,
 * and blurs back out as it leaves -- a soft, hazy "emerging from
 * clouds" dissolve, not just a flat opacity fade. Still deliberately
 * smooth rather than jarring: blur and opacity ease together over
 * 900ms, with a touch more vertical drift than a plain fade needs to
 * sell the depth.
 *
 * Uses IntersectionObserver (not a scroll listener doing position
 * math every frame) so it stays smooth and cheap.
 */
export default function FadeSection({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ filter: visible ? 'blur(0px)' : 'blur(14px)' }}
    >
      {children}
    </Tag>
  );
}
