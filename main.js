// Scroll-in animation for cards
function revealCardsOnScroll() {
  const cards = document.querySelectorAll('.card');
  const trigger = window.innerHeight * 0.92;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < trigger) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealCardsOnScroll);
window.addEventListener('resize', revealCardsOnScroll);
document.addEventListener('DOMContentLoaded', () => {
  revealCardsOnScroll();

  // Card glitch effect on hover (glitch only for 1s)
  document.querySelectorAll('.card').forEach(card => {
    let glitchTimeout;
    card.addEventListener('mouseenter', () => {
      card.classList.add('glitch-effect');
      if (glitchTimeout) clearTimeout(glitchTimeout);
      glitchTimeout = setTimeout(() => {
        card.classList.remove('glitch-effect');
      }, 1000);
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('glitch-effect');
      if (glitchTimeout) clearTimeout(glitchTimeout);
    });
  });

  // Custom glitch/flicker for the name
  const glitch = document.querySelector('.glitch');
  if (glitch) {
    // Remove CSS animation for .glitch
    glitch.style.animation = 'none';
    let flickerTimeouts = [];
    function flicker() {
      // Flicker sequence: array of [opacity, color, duration]
      const sequence = [
        [0.3, '#ff00ea', 60],
        [0.7, '#ff00ea', 40],
        [0.2, '#ff00ea', 40],
        [1, '#ff00ea', 60],
        [0.5, '#00fff7', 40],
        [1, '#00fff7', 60],
        [0.4, '#ff00ea', 40],
        [1, '#ff00ea', 80],
        [1, '#00fff7', 100],
      ];
      let t = 0;
      sequence.forEach(([opacity, color, duration], i) => {
        flickerTimeouts.push(setTimeout(() => {
          glitch.style.opacity = opacity;
          glitch.style.color = color;
          glitch.style.textShadow =
            color === '#ff00ea'
              ? '0 0 16px #ff00ea, 2px 0 2px #fff, -2px 0 2px #fff, 0 0 32px #fff'
              : '0 0 8px #00fff7, 2px 0 2px #ff00ea, -2px 0 2px #39ff14, 0 0 16px #fff';
        }, t));
        t += duration;
      });
      // Restore to normal after flicker
      flickerTimeouts.push(setTimeout(() => {
        glitch.style.opacity = 1;
        glitch.style.color = '#00fff7';
        glitch.style.textShadow = '0 0 8px #00fff7, 2px 0 2px #ff00ea, -2px 0 2px #39ff14, 0 0 16px #fff';
      }, t));
    }
    // Start flicker every 1 second
    setInterval(() => {
      // Clear any pending timeouts
      flickerTimeouts.forEach(clearTimeout);
      flickerTimeouts = [];
      flicker();
    }, 1000);
    // Initial state
    glitch.style.opacity = 1;
    glitch.style.color = '#00fff7';
    glitch.style.textShadow = '0 0 8px #00fff7, 2px 0 2px #ff00ea, -2px 0 2px #39ff14, 0 0 16px #fff';
  }
});

// Subtle scanline flicker effect
const scanlines = document.querySelector('.scanlines');
if (scanlines) {
  setInterval(() => {
    scanlines.style.opacity = 0.9 + Math.random() * 0.1;
  }, 120);
} 