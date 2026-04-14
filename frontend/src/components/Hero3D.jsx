import { useRef, useState, useEffect } from 'react';

/* ─── Interactive Parallax Fashion Hero ─── */
/* Instead of a 3D model, uses a real fashion photo with
   CSS 3D perspective transforms that react to cursor/touch,
   creating a premium parallax tilt effect used by high-end fashion sites */

function usePointer() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        setPointer({ x, y });
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);
  return pointer;
}

export default function Hero3D() {
  const pointer = usePointer();
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Smoothed values for animation
  const smoothed = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const animate = () => {
      smoothed.current.x += (pointer.x - smoothed.current.x) * 0.08;
      smoothed.current.y += (pointer.y - smoothed.current.y) * 0.08;

      if (containerRef.current) {
        const rotateY = smoothed.current.x * 12;
        const rotateX = -smoothed.current.y * 8;
        const translateX = smoothed.current.x * 20;
        const translateY = -smoothed.current.y * 15;

        containerRef.current.style.transform =
          `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateX(${translateX}px) translateY(${translateY}px)`;

        // Parallax layers
        const layers = containerRef.current.querySelectorAll('.parallax-layer');
        layers.forEach((layer, i) => {
          const depth = (i + 1) * 0.5;
          const lx = smoothed.current.x * 15 * depth;
          const ly = -smoothed.current.y * 10 * depth;
          layer.style.transform = `translate(${lx}px, ${ly}px)`;
        });
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [pointer]);

  return (
    <div className="hero3d-canvas-wrap">
      {/* Decorative elements that move with parallax */}
      <div className="hero3d-scene">
        {/* Background geometric accents */}
        <div className="parallax-layer hero3d-accent hero3d-accent--1" />
        <div className="parallax-layer hero3d-accent hero3d-accent--2" />
        <div className="parallax-layer hero3d-accent hero3d-accent--3" />

        {/* Main fashion model image */}
        <div
          ref={containerRef}
          className={`hero3d-model ${loaded ? 'loaded' : ''}`}
        >
          <img
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=900&fit=crop&q=90"
            alt="AMHAN Fashion Model"
            className="hero3d-model-img"
            onLoad={() => setLoaded(true)}
            draggable={false}
          />
          {/* Shadow beneath */}
          <div className="hero3d-model-shadow" />
        </div>

        {/* Floating fashion elements */}
        <div className="parallax-layer hero3d-float hero3d-float--1">
          <div className="hero3d-tag">NEW SEASON</div>
        </div>
        <div className="parallax-layer hero3d-float hero3d-float--2">
          <div className="hero3d-tag hero3d-tag--outline">PREMIUM</div>
        </div>
        <div className="parallax-layer hero3d-float hero3d-float--3">
          <div className="hero3d-ring" />
        </div>
        <div className="parallax-layer hero3d-float hero3d-float--4">
          <div className="hero3d-ring hero3d-ring--sm" />
        </div>
      </div>
    </div>
  );
}
