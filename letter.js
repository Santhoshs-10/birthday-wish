// ============================================
// LETTER.JS - Love Letter Surprise Logic
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

function initGSAP() {
  if (!window.gsap) return;
  
  gsap.from('#letter-card', {
    opacity: 0, 
    rotateY: -20, 
    y: 60, 
    duration: 1.1, 
    ease: 'back.out(1.4)'
  });
}

document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts('letter-hearts', 20);
    initGSAP();
});
