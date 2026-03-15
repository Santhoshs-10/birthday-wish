// ============================================
// CAKE.JS - Cake Surprise Logic
// ============================================

let candlesBlown = false;
let cakeCut = false;

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;
  const flames = document.querySelectorAll('.flame');
  const blowBtn = document.getElementById('blow-btn');
  const cutBtn = document.getElementById('cut-btn');

  blowBtn.disabled = true;
  blowBtn.textContent = '💨 Blowing…';

  flames.forEach((f, i) => {
    setTimeout(() => {
      f.classList.add('blown');
      const smoke = document.createElement('div');
      smoke.className = 'smoke-particle';
      smoke.style.position = 'absolute';
      const rect = f.getBoundingClientRect();
      const containerRect = f.parentElement.parentElement.getBoundingClientRect();
      smoke.style.left = (rect.left - containerRect.left) + 'px';
      smoke.style.top = (rect.top - containerRect.top) + 'px';
      f.parentElement.parentElement.appendChild(smoke);
      setTimeout(() => smoke.remove(), 1500);
    }, i * 160);
  });

  setTimeout(() => {
    blowBtn.textContent = '✅ Candles Blown!';
    cutBtn.classList.remove('hidden');
  }, 1200);
}

function cutCake() {
  if (cakeCut) return;
  cakeCut = true;
  const cake = document.getElementById('cake');
  const cutBtn = document.getElementById('cut-btn');
  const nextBtn = document.getElementById('next-msg-btn');
  const confettiCanvas = document.getElementById('cake-confetti');

  cutBtn.disabled = true;
  cutBtn.textContent = '🎉 Cutting...';
  cake.classList.add('cut');

  const cl = document.getElementById('cut-line');
  cl.style.background = 'rgba(255,255,255,0.8)';
  cl.style.boxShadow = '0 0 10px rgba(255,255,255,0.6)';

  if (window.gsap) {
    gsap.from(cl, { scaleY: 0, duration: 0.5, ease: 'power2.out' });
  }

  setTimeout(() => {
    confettiCanvas.classList.remove('hidden');
    startCakeConfetti(confettiCanvas);
    cutBtn.textContent = '🎂 Cake Cut!';
    nextBtn.classList.remove('hidden');
  }, 800);
}

function startCakeConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];
  const COLORS = ['#ff80b5','#c77dff','#ffd700','#ff5e9b','#a855f7','#80d8ff','#f48fb1'];

  for (let i = 0; i < 180; i++) {
    particles.push({
      x: Math.random() * canvas.width, y: -20,
      vx: (Math.random()-0.5)*6, vy: Math.random()*5+2,
      size: Math.random()*10+4,
      color: COLORS[Math.floor(Math.random()*COLORS.length)],
      rotation: Math.random()*360, rotSpeed: (Math.random()-0.5)*6,
      opacity: 1, life: 120+Math.random()*80
    });
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles = particles.filter(p => p.life > 0);
    if (!particles.length) { canvas.classList.add('hidden'); return; }
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed;
      p.vy += 0.05; p.life--;
      p.opacity = Math.min(1, p.life / 40);
      ctx.save(); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
      ctx.translate(p.x,p.y); ctx.rotate(p.rotation*Math.PI/180);
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
