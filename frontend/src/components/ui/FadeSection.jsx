import { useEffect, useRef, useState } from 'react';

/**
 * Wraps a section so it fades in as it enters the viewport and fades
 * back out as it leaves, the "previous section dissolves, next one
 * appears" effect on modern marketing sites. Deliberately subtle:
 * a small vertical drift plus opacity, not a dramatic slide.
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
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </Tag>
  );
}
