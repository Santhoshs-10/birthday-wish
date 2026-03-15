/* =============================================
   BIRTHDAY SURPRISE - COMMON.JS
   Shared configuration and background music
   ============================================= */

const CONFIG = {
  // Set the birthday date/time (YYYY, MM-1, DD, HH, MM, SS)
  birthdayDate: new Date(2026, 2, 16, 0, 0, 0), // March 16, 2026

  // Birthday message to type
  birthdayMessage: `Happy Birthday! 🎉\n\nYou are the most special person in my life.\nEvery moment with you is a beautiful memory.\n\nMay your day be filled with happiness, love,\nand all the things that make you smile.\n\nYou deserve every joy in this world. ❤️🌸`,
};

// ============================================
// MUSIC TOGGLE (Preserved across pages)
// ============================================
let bgMusic;
let musicBtn;
let musicPlaying = false;

function initMusic() {
  bgMusic = document.getElementById('bg-music');
  musicBtn = document.getElementById('music-toggle');
  
  if (!bgMusic || !musicBtn) return;

  // Restore music state from localStorage if possible
  const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
  bgMusic.volume = 0.3;

  if (wasPlaying) {
    playMusic();
  }

  musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  // Try to play on first interaction if not already playing
  document.addEventListener('click', () => { 
    if (!musicPlaying) playMusic(); 
  }, { once: true });
}

function playMusic() {
  if (!bgMusic) return;
  bgMusic.play().then(() => {
    musicPlaying = true;
    musicBtn.textContent = '🎵';
    localStorage.setItem('musicPlaying', 'true');
  }).catch(() => {
    musicPlaying = false;
    musicBtn.textContent = '🔇';
  });
}

function pauseMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  musicPlaying = false;
  musicBtn.textContent = '🔇';
  localStorage.setItem('musicPlaying', 'false');
}

window.addEventListener('load', initMusic);
