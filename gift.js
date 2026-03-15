// ============================================
// GIFT.JS - Gift Surprise Logic
// ============================================

let giftOpened = false;

function openGift() {
  if (giftOpened) return;
  giftOpened = true;
  const giftBox = document.getElementById('gift-box');
  const hint = document.getElementById('click-hint');
  const msg = document.getElementById('gift-message');
  const nextBtn = document.getElementById('next-btn');

  giftBox.classList.add('opened');
  hint.style.display = 'none';
  createSparkles();

  if (window.gsap) {
    gsap.from(giftBox, { scale: 1.3, duration: 0.5, ease: 'back.out(2)' });
  }

  setTimeout(() => {
    msg.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    spawnGiftParticles();
  }, 900);
}

function createSparkles() {
  const container = document.getElementById('gift-sparkles');
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle-particle';
    s.style.cssText = `
      left: ${50 + (Math.random()-0.5)*100}%;
      top: ${50 + (Math.random()-0.5)*100}%;
      transform: translate(-50%,-50%);
      background: ${['#ffd700','#ff80b5','#c77dff','#fff'][Math.floor(Math.random()*4)]};
      width: ${Math.random()*12+5}px;
      height: ${Math.random()*12+5}px;
      animation: sparkleAnim ${Math.random()*0.8+0.4}s ease forwards;
    `;
    container.appendChild(s);
    setTimeout(() => s.remove(), 1500);
  }
}

function spawnGiftParticles() {
  const canvas = document.getElementById('confetti-canvas');
  burstConfetti(canvas, canvas.width / 2, canvas.height / 2);
}

function burstConfetti(canvas, cx, cy) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const COLORS = ['#ff80b5','#c77dff','#ffd700','#ff5e9b','#fff'];
  const burst = [];
  for (let i = 0; i < 80; i++) {
    const angle = Math.random()*Math.PI*2;
    const speed = Math.random()*6+2;
    burst.push({
      x: cx, y: cy,
      vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
      color: COLORS[Math.floor(Math.random()*COLORS.length)],
      size: Math.random()*8+3, opacity: 1, gravity: 0.15
    });
  }
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    burst.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=p.gravity; p.opacity-=0.018;
      ctx.save(); ctx.globalAlpha=Math.max(0,p.opacity); ctx.fillStyle=p.color;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size/2,0,Math.PI*2); ctx.fill(); ctx.restore();
    });
    if (burst.some(p=>p.opacity>0)) requestAnimationFrame(draw);
  }
  draw();
}

// Sparkle animation styles
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `@keyframes sparkleAnim {
  0%{opacity:1;transform:translate(-50%,-50%) scale(0)}
  50%{opacity:1;transform:translate(calc(-50% + ${(Math.random()-0.5)*120}px), calc(-50% + ${(Math.random()-0.5)*120}px)) scale(1.5)}
  100%{opacity:0;transform:translate(calc(-50% + ${(Math.random()-0.5)*160}px), calc(-50% + ${(Math.random()-0.5)*160}px)) scale(0)}
}`;
document.head.appendChild(sparkleStyle);
