/* =============================================
   BIRTHDAY SURPRISE WEBSITE - SCRIPT.JS
   All interactive animations, confetti,
   fireworks, typing, gallery, cake, gift etc.
   ============================================= */

// ============================================
// CONFIGURATION — CUSTOMIZE HERE
// ============================================
const CONFIG = {
  // Set the birthday date/time (YYYY, MM-1, DD, HH, MM, SS)
  birthdayDate: new Date(2026, 2, 16, 0, 0, 0), // March 16, 2026
  

  // Birthday message to type
  birthdayMessage: `Happy Birthday! 🎉\n\nYou are the most special person in my life.\nEvery moment with you is a beautiful memory.\n\nMay your day be filled with happiness, love,\nand all the things that make you smile.\n\nYou deserve every joy in this world. ❤️🌸`,

};

// ============================================
// MUSIC TOGGLE
// ============================================
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let musicPlaying = false;

function tryAutoplay() {
  bgMusic.volume = 0.3;
  bgMusic.play().then(() => {
    musicPlaying = true;
    musicBtn.textContent = '🎵';
  }).catch(() => {
    musicPlaying = false;
    musicBtn.textContent = '🔇';
  });
}

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.textContent = '🔇';
  } else {
    bgMusic.play();
    musicPlaying = true;
    musicBtn.textContent = '🎵';
  }
});

document.addEventListener('click', () => { if (!musicPlaying) tryAutoplay(); }, { once: true });
window.addEventListener('load', () => tryAutoplay());

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
  const now = new Date();
  let target = new Date(CONFIG.birthdayDate);
  
  // If the birthday date is in the past, move to next year
  // But ONLY if it's not currently the birthday day!
  // We check if 'now' is later than the end of the birthday day.
  const endOfBirthday = new Date(target);
  endOfBirthday.setHours(23, 59, 59, 999);
  
  if (now > endOfBirthday) {
    target.setFullYear(target.getFullYear() + 1);
  }

  const diff = target - now;
  
  // If it's currently the birthday (now is between target and endOfBirthday)
  if (now >= target && now <= endOfBirthday) {
    // Birthday is active! We can show all zeros or a special message
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

  // Otherwise, standard countdown math
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    const s = String(val).padStart(2, '0');
    if (el.textContent !== s) { el.textContent = s; el.classList.add('flip'); setTimeout(() => el.classList.remove('flip'), 400); }
  };
  setVal('cd-days', days);
  setVal('cd-hours', hours);
  setVal('cd-mins', mins);
  setVal('cd-secs', secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================
// CONFETTI (LANDING)
// ============================================
(function initConfetti() {
  const canvas = document.getElementById('confetti-canvas');
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
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'square') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    } else if (p.shape === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.lineTo(p.size / 2, p.size / 2);
      ctx.lineTo(-p.size / 2, p.size / 2);
      ctx.closePath(); ctx.fill();
    } else if (p.shape === 'star') {
      ctx.font = `${p.size}px serif`;
      ctx.fillText('✦', -p.size/2, p.size/2);
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (particles.length < 120 && Math.random() < 0.4) particles.push(createParticle());
    particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 30);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.life--;
      p.opacity = Math.min(1, p.life / 40);
      drawParticle(p);
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================
// GIFT BOX OPEN
// ============================================
let giftOpened = false;

function openGift() {
  if (giftOpened) return;
  giftOpened = true;
  const giftBox = document.getElementById('gift-box');
  const hint = document.getElementById('click-hint');
  const msg = document.getElementById('gift-message');

  giftBox.classList.add('opened');
  hint.style.display = 'none';
  createSparkles();

  // GSAP bounce then show message
  if (window.gsap) {
    gsap.from(giftBox, { scale: 1.3, duration: 0.5, ease: 'back.out(2)' });
  }

  setTimeout(() => {
    msg.classList.remove('hidden');
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

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `@keyframes sparkleAnim {
  0%{opacity:1;transform:translate(-50%,-50%) scale(0)}
  50%{opacity:1;transform:translate(calc(-50% + ${randomInt(-60,60)}px), calc(-50% + ${randomInt(-80,-20)}px)) scale(1.5)}
  100%{opacity:0;transform:translate(calc(-50% + ${randomInt(-80,80)}px), calc(-50% + ${randomInt(-120,-40)}px)) scale(0)}
}`;
document.head.appendChild(sparkleStyle);

function randomInt(a, b) { return Math.floor(Math.random() * (b - a) + a); }

function spawnGiftParticles() {
  const canvas = document.getElementById('confetti-canvas');
  // reuse main confetti burst logic
  burstConfetti(canvas, canvas.width / 2, canvas.height / 2);
}

// ============================================
// CAKE SECTION
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
      // smoke puff
      const smoke = document.createElement('div');
      smoke.className = 'smoke-particle';
      smoke.style.left = f.parentElement.offsetLeft + 'px';
      f.parentElement.parentElement.appendChild(smoke);
      smoke.style.position = 'absolute';
      smoke.style.left = (f.getBoundingClientRect().left - f.parentElement.parentElement.getBoundingClientRect().left) + 'px';
      smoke.style.top = (f.getBoundingClientRect().top - f.parentElement.parentElement.getBoundingClientRect().top) + 'px';
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

  // Reveal cut line
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

// ============================================
// FLOATING HEARTS
// ============================================
function createFloatingHearts(containerId, count = 20) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const emojis = ['❤️','💕','💖','💗','💓','🌸','✨','💝'];

  setInterval(() => {
    if (document.querySelectorAll(`#${containerId} .heart-item`).length > count) return;
    const h = document.createElement('div');
    h.className = 'heart-item';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.cssText = `left:${Math.random()*100}%;bottom:-30px;animation-duration:${Math.random()*4+4}s;animation-delay:${Math.random()*2}s;font-size:${Math.random()*1.5+0.8}rem;`;
    container.appendChild(h);
    setTimeout(() => h.remove(), 8000);
  }, 400);
}

// ============================================
// TYPING MESSAGE
// ============================================
let typingDone = false;

function startTyping() {
  if (typingDone) return;
  typingDone = true;

  const el = document.getElementById('typed-message');
  const text = CONFIG.birthdayMessage;
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  el.appendChild(cursor);

  let i = 0;
  function type() {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(type, text[i] === '\n' ? 300 : Math.random() * 50 + 25);
    }
  }
  setTimeout(type, 600);
}



// ============================================
// FIREWORKS
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

  // launch fireworks continuously
  launchRandom();
  setInterval(launchRandom, 900);
  setTimeout(() => setInterval(launchRandom, 1400), 900);
}

// Burst confetti at coordinate
function burstConfetti(canvas, cx, cy) {
  const ctx = canvas.getContext('2d');
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
    burst.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.vy+=p.gravity; p.opacity-=0.018;
      ctx.save(); ctx.globalAlpha=Math.max(0,p.opacity); ctx.fillStyle=p.color;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.size/2,0,Math.PI*2); ctx.fill(); ctx.restore();
    });
    if (burst.some(p=>p.opacity>0)) requestAnimationFrame(draw);
  }
  draw();
}

// ============================================
// SCROLL REVEAL OBSERVER
// ============================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
}

// Trigger typing when message section is in view
function observeMessageSection() {
  const section = document.getElementById('message-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) startTyping(); });
  }, { threshold: 0.3 });
  observer.observe(section);
}

// Trigger fireworks when final section is in view
function observeFinalSection() {
  const section = document.getElementById('final-section');
  let started = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) { started = true; initFireworks(); }
    });
  }, { threshold: 0.2 });
  observer.observe(section);
}

// ============================================
// GSAP HERO ANIMATIONS
// ============================================
function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Stagger animate section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0, y: 50, duration: 0.8, ease: 'power2.out'
    });
  });

  // Letter card
  gsap.from('#letter-card', {
    scrollTrigger: { trigger: '#letter-card', start: 'top 80%' },
    opacity: 0, rotateY: -20, y: 60, duration: 1.1, ease: 'back.out(1.4)'
  });
}

// ============================================
// RESTART
// ============================================
function restartExperience() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts('floating-hearts', 25);
  createFloatingHearts('letter-hearts', 20);
  initScrollReveal();
  observeMessageSection();
  observeFinalSection();
  initGSAP();

  // Add reveal class to letter card
  const lc = document.getElementById('letter-card');
  if (lc) lc.classList.add('reveal');
});
