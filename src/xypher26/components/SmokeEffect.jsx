import { useEffect, useRef } from "react";

const SmokeEffect = ({ density = 60 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    
    resize();
    window.addEventListener("resize", resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const spawn = () => {
      const maxLife = 200 + Math.random() * 150;
      particles.push({
        x: Math.random() * w(),
        y: h() + 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(0.5 + Math.random() * 1.5),
        radius: 60 + Math.random() * 100,
        opacity: 0,
        life: 0,
        maxLife
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      if (particles.length < density && Math.random() < 0.5) spawn();
      if (particles.length < density && Math.random() < 0.3) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.08;
        const progress = p.life / p.maxLife;
        
        // High-end atmospheric opacity
        p.opacity = progress < 0.2 ? (progress / 0.2) * 0.18 : 0.18 * (1 - (progress - 0.2) / 0.8);
        p.radius += 0.8;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(201, 162, 39, ${p.opacity})`);
        grad.addColorStop(0.4, `rgba(180, 140, 30, ${p.opacity * 0.6})`);
        grad.addColorStop(0.8, `rgba(100, 80, 20, ${p.opacity * 0.2})`);
        grad.addColorStop(1, `rgba(40, 30, 10, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[10]"
    />
  );
};

export default SmokeEffect;