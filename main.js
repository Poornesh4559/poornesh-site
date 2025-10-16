// Loading Screen
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 2200);
  });

  // Particle System
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 80;
  const colors = ['#00fff7', '#ff00ea', '#39ff14'];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = 0.15 * (1 - dist / 120);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Carousel
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const slides = track.children;
  let currentSlide = 0;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(n) {
    currentSlide = n;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  setInterval(nextSlide, 4000);

  // Scroll-in animation for cards
  function revealCardsOnScroll() {
    const cards = document.querySelectorAll('.card');
    const trigger = window.innerHeight * 0.85;
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < trigger && !card.classList.contains('visible')) {
        card.classList.add('visible');
        
        // Animate timeline items
        if (card.id === 'experience-card') {
          const items = card.querySelectorAll('.timeline-item');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('animate');
            }, i * 200);
          });
        }
        
        // Animate skill bars
        if (card.id === 'skills-card') {
          const skills = card.querySelectorAll('.skill-item');
          skills.forEach((skill, i) => {
            setTimeout(() => {
              skill.classList.add('animate');
            }, i * 100);
          });
        }
      }
    });
  }

  window.addEventListener('scroll', revealCardsOnScroll);
  window.addEventListener('resize', revealCardsOnScroll);
  
  // Initial check after loading
  setTimeout(() => {
    revealCardsOnScroll();
  }, 2300);

  // Name glitch effect
  const glitch = document.querySelector('.glitch');
  if (glitch) {
    let flickerTimeouts = [];
    
    function flicker() {
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
      sequence.forEach(([opacity, color, duration]) => {
        flickerTimeouts.push(setTimeout(() => {
          glitch.style.opacity = opacity;
          glitch.style.color = color;
          glitch.style.textShadow = color === '#ff00ea'
            ? '0 0 16px #ff00ea, 2px 0 2px #fff, -2px 0 2px #fff, 0 0 32px #fff'
            : '0 0 8px #00fff7, 2px 0 2px #ff00ea, -2px 0 2px #39ff14, 0 0 16px #fff';
        }, t));
        t += duration;
      });
      
      flickerTimeouts.push(setTimeout(() => {
        glitch.style.opacity = 1;
        glitch.style.color = '#00fff7';
        glitch.style.textShadow = '0 0 8px #00fff7, 2px 0 2px #ff00ea, -2px 0 2px #39ff14, 0 0 16px #fff';
      }, t));
    }
    
    setInterval(() => {
      flickerTimeouts.forEach(clearTimeout);
      flickerTimeouts = [];
      flicker();
    }, 1000);
    
    glitch.style.opacity = 1;
    glitch.style.color = '#00fff7';
  }

  // Scanline flicker
  const scanlines = document.querySelector('.scanlines');
  if (scanlines) {
    setInterval(() => {
      scanlines.style.opacity = 0.9 + Math.random() * 0.1;
    }, 120);
  }