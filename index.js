// ============================================
// INDEX.JS - Landing Page Logic
// ============================================

let isUnlocked = false;

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function unlockContent() {
  isUnlocked = true;
  const btn = document.getElementById('open-surprise-btn');
  if (btn) {
    btn.classList.remove('locked');
    btn.style.filter = "none";
  }
}

// Handle gated click
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('open-surprise-btn');
  if (btn) {
    // Start as locked if countdown hasn't ended
    btn.classList.add('locked');
    
    btn.addEventListener('click', (e) => {
      if (!isUnlocked) {
        e.preventDefault();
        showToast("Wait for countdown to end darling! ❤️");
      }
    });
  }
});

function updateCountdown() {
  const now = new Date();
  let target = new Date(CONFIG.birthdayDate);
  
  const endOfBirthday = new Date(target);
  endOfBirthday.setHours(23, 59, 59, 999);
  
  if (now > endOfBirthday) {
    target.setFullYear(target.getFullYear() + 1);
  }

  const diff = target - now;
  
  if (now >= target && now <= endOfBirthday) {
    unlockContent();
    const setZero = (id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    };
    setZero('cd-days');
    setZero('cd-hours');
    setZero('cd-mins');
    setZero('cd-secs');
    return;
  }

  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    const s = String(val).padStart(2, '0');
    if (el.textContent !== s) { 
      el.textContent = s; 
      el.classList.add('flip'); 
      setTimeout(() => el.classList.remove('flip'), 400); 
    }
  };
  setVal('cd-days', days);
  setVal('cd-hours', hours);
  setVal('cd-mins', mins);
  setVal('cd-secs', secs);
}

// Confetti init (Landing)
(function initConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COLORS = ['#ff80b5','#c77dff','#ffd700','#ff5e9b','#a855f7','#80d8ff','#f48fb1','#b39ddb'];
  const SHAPES = ['circle','square','triangle','star'];

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 2 + 1,
      size: Math.random() * 10 + 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 4,
      opacity: 1,
      life: Math.random() * 200 + 100,
    };
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    if (p.shape === 'circle') {
      ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill();
    } else if (p.shape === 'square') { ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    } else if (p.shape === 'triangle') {
      ctx.beginPath(); ctx.moveTo(0, -p.size / 2); ctx.lineTo(p.size / 2, p.size / 2); ctx.lineTo(-p.size / 2, p.size / 2); ctx.closePath(); ctx.fill();
    } else if (p.shape === 'star') { ctx.font = `${p.size}px serif`; ctx.fillText('✦', -p.size/2, p.size/2); }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (particles.length < 120 && Math.random() < 0.4) particles.push(createParticle());
    particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 30);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed; p.life--;
      p.opacity = Math.min(1, p.life / 40);
      drawParticle(p);
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

setInterval(updateCountdown, 1000);
updateCountdown();
