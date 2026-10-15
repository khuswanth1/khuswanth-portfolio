import { useEffect, useRef } from 'react';

/**
 * AnimatedBackground — an interactive particle network fixed behind the whole page.
 *  - Three depth layers (far dots are small and dim, near ones larger and brighter), twinkling, some with a soft glow.
 *  - Dots link up when close; the cursor pulls nearby dots toward it and links to them.
 *  - Clicking sends out a shockwave that pushes dots away.
 *  - Light pulses travel along the links, the cursor leaves a fading trail, and clicks throw off sparks.
 *  - Occasional shooting stars, a gentle parallax while scrolling, and a speed-up when you scroll fast.
 * Decorative only: hidden from assistive tech, paused when the tab is hidden, lighter on small
 * screens, and drawn once (static, no motion) for visitors who prefer reduced motion.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const SHADES = [
      [147, 197, 253],
      [191, 219, 254],
      [96, 165, 250],
      [165, 180, 252],
    ];
    const LINK = 135;
    const CURSOR_LINK = 170;
    const pointer = { x: -9999, y: -9999 };
    let particles = [];
    let waves = [];
    let stars = [];
    let pulses = [];
    let sparks = [];
    let trail = [];
    let scrollVel = 0;
    let nextPulse = 600;
    let width = 0;
    let height = 0;
    let frame = 0;
    let scrollY = window.scrollY;
    let nextStar = 3000;

    // Pre-rendered soft glow, drawn under the brighter dots.
    const glow = document.createElement('canvas');
    glow.width = glow.height = 64;
    const g = glow.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(147, 197, 253, 0.55)');
    grad.addColorStop(1, 'rgba(147, 197, 253, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pulses = [];
      const count = Math.min(Math.round((width * height) / (width < 768 ? 17000 : 11500)), 130);
      particles = Array.from({ length: count }, (_, i) => {
        const z = [0.45, 0.7, 1][i % 3];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3 * z,
          vy: (Math.random() - 0.5) * 0.3 * z,
          r: (Math.random() * 1.3 + 0.7) * (0.6 + z * 0.6),
          z,
          phase: Math.random() * Math.PI * 2,
          rate: 0.0008 + Math.random() * 0.0016,
          glows: i % 7 === 0,
          c: SHADES[i % SHADES.length],
        };
      });
    };

    // Position on screen: wraps vertically so scrolling shifts each depth layer by a different amount.
    const screenY = (p) => (((p.y - scrollY * 0.12 * p.z) % height) + height) % height;

    const spawnStar = () => {
      const x = Math.random() * width * 0.8;
      const y = Math.random() * height * 0.4;
      stars.push({ x, y, vx: 6 + Math.random() * 4, vy: 3 + Math.random() * 2.5, life: 1 });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      const pos = particles.map((p) => ({ x: p.x, y: screenY(p) }));

      // Shockwaves
      for (const w of waves) {
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.35 * w.life})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const a = pos[i];

        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy + scrollVel * 0.12 * p.z;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          for (const w of waves) {
            const dx = a.x - w.x;
            const dy = a.y - w.y;
            const d = Math.hypot(dx, dy) || 1;
            if (Math.abs(d - w.r) < 30) {
              p.x += (dx / d) * 2.2 * w.life;
              p.y += (dy / d) * 2.2 * w.life;
            }
          }
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150) {
            const d = Math.sqrt(d2) || 1;
            // Pull in gently, push away when very close so dots orbit the cursor instead of piling up.
            const pull = d > 45 ? -0.35 : 0.9;
            p.x += (dx / d) * pull;
            p.y += (dy / d) * pull;
          }
        }

        const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(t * p.rate + p.phase);
        const alpha = (0.35 + 0.5 * p.z) * twinkle;

        if (p.glows) {
          const s = p.r * 12;
          ctx.globalAlpha = 0.7 * twinkle;
          ctx.drawImage(glow, a.x - s / 2, a.y - s / 2, s, s);
          ctx.globalAlpha = 1;
        }
        ctx.beginPath();
        ctx.arc(a.x, a.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, ${alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const b = pos[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.2 * (1 - Math.sqrt(d2) / LINK) * Math.min(p.z, particles[j].z + 0.2)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Links from the cursor to nearby dots
        const cdx = a.x - pointer.x;
        const cdy = a.y - pointer.y;
        const cd = Math.hypot(cdx, cdy);
        if (cd < CURSOR_LINK) {
          ctx.strokeStyle = `rgba(191, 219, 254, ${0.45 * (1 - cd / CURSOR_LINK)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      // Pulses of light travelling along links
      for (const u of pulses) {
        const a = pos[u.i];
        const b = pos[u.j];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * u.t;
        const y = a.y + (b.y - a.y) * u.t;
        const fade = Math.sin(u.t * Math.PI);
        ctx.globalAlpha = 0.9 * fade;
        ctx.drawImage(glow, x - 9, y - 9, 18, 18);
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(219, 234, 254, ${fade})`;
        ctx.fill();
      }

      // Sparks thrown off by clicks
      for (const k of sparks) {
        ctx.beginPath();
        ctx.arc(k.x, k.y, 1.3 * k.life + 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 219, 254, ${k.life})`;
        ctx.fill();
      }

      // Cursor trail
      for (let n = 1; n < trail.length; n++) {
        const t0 = trail[n - 1];
        const t1 = trail[n];
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.35 * t1.life})`;
        ctx.lineWidth = 2 * t1.life;
        ctx.beginPath();
        ctx.moveTo(t0.x, t0.y);
        ctx.lineTo(t1.x, t1.y);
        ctx.stroke();
      }

      // Shooting stars
      for (const s of stars) {
        const tail = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 16, s.y - s.vy * 16);
        tail.addColorStop(0, `rgba(219, 234, 254, ${0.9 * s.life})`);
        tail.addColorStop(1, 'rgba(147, 197, 253, 0)');
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 16, s.y - s.vy * 16);
        ctx.stroke();
      }
    };

    let last = 0;
    const loop = (t) => {
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;

      waves = waves.filter((w) => (w.life -= dt / 900) > 0);
      for (const w of waves) w.r += dt * 0.28;
      stars = stars.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= dt / 1100;
        return s.life > 0 && s.x < width + 60 && s.y < height + 60;
      });
      scrollVel *= 0.9;
      sparks = sparks.filter((k) => {
        k.x += k.vx;
        k.y += k.vy;
        k.vx *= 0.96;
        k.vy *= 0.96;
        return (k.life -= dt / 700) > 0;
      });
      trail = trail.filter((t) => (t.life -= dt / 450) > 0);
      pulses = pulses.filter((u) => (u.t += dt / 700) < 1);
      nextPulse -= dt;
      if (nextPulse <= 0 && particles.length) {
        const i = Math.floor(Math.random() * particles.length);
        const a = particles[i];
        const ay = screenY(a);
        const near = [];
        for (let j = 0; j < particles.length; j++) {
          if (j !== i && Math.hypot(a.x - particles[j].x, ay - screenY(particles[j])) < LINK) near.push(j);
        }
        if (near.length) pulses.push({ i, j: near[Math.floor(Math.random() * near.length)], t: 0 });
        nextPulse = 350 + Math.random() * 500;
      }
      nextStar -= dt;
      if (nextStar <= 0) {
        spawnStar();
        nextStar = 4000 + Math.random() * 5000;
      }

      draw(t);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!reduced && !frame) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMove = (e) => {
      if (!fine) return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!reduced) {
        trail.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (trail.length > 24) trail.shift();
      }
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e) => {
      if (reduced) return;
      waves.push({ x: e.clientX, y: e.clientY, r: 8, life: 1 });
      if (waves.length > 6) waves.shift();
      for (let n = 0; n < 10; n++) {
        const ang = (n / 10) * Math.PI * 2 + Math.random() * 0.4;
        const sp = 2 + Math.random() * 3;
        sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1 });
      }
    };
    const onScroll = () => {
      scrollVel = Math.max(-40, Math.min(40, scrollVel + (window.scrollY - scrollY)));
      scrollY = window.scrollY;
      if (reduced) draw(0);
    };
    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };

    resize();
    draw(0);
    start();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
