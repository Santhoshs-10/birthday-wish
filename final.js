// ============================================
// FINAL.JS - Fireworks Surprise Logic
// ============================================

function initFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  function Firework(x, y) {
    const colors = ['#ff80b5','#c77dff','#ffd700','#ff5e9b','#a855f7','#80d8ff','#f48fb1','#fff'];
    const color = colors[Math.floor(Math.random()*colors.length)];
    const count = Math.floor(Math.random()*60+60);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI*2/count)*i;
      const speed = Math.random()*4+1;
      particles.push({
        x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
        color, opacity: 1, size: Math.random()*3+1.5,
        decay: Math.random()*0.015+0.012 , gravity: 0.06
      });
    }
  }

  function launchRandom() {
    Firework(
      Math.random()*canvas.width*0.8+canvas.width*0.1,
      Math.random()*canvas.height*0.5+50
    );
  }

  function animate() {
    ctx.fillStyle = 'rgba(13,0,19,0.18)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles = particles.filter(p => p.opacity > 0);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.97; p.vy *= 0.97;
      p.vy += p.gravity;
      p.opacity -= p.decay;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();

  launchRandom();
  setInterval(launchRandom, 900);
}

function restartExperience() {
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    initFireworks();
});
