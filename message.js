// ============================================
// MESSAGE.JS - Typing Message Surprise
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
    } else {
        document.getElementById('next-btn').classList.remove('hidden');
    }
  }
  setTimeout(type, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts('floating-hearts', 25);
    setTimeout(startTyping, 500);
});
