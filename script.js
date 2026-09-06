// ===== PARTICLES =====
const emojis = ['🌹', '💕', '✨', '🌸', '💖', '⭐', '💫', '🌺'];
const particleContainer = document.getElementById('particles');

function createParticle() {
  const p = document.createElement('span');
  p.className = 'particle';
  p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  p.style.animationDuration = (6 + Math.random() * 8) + 's';
  p.style.animationDelay = (Math.random() * 5) + 's';
  particleContainer.appendChild(p);
  setTimeout(() => p.remove(), 14000);
}
setInterval(createParticle, 600);

// ===== ENVELOPE OPEN =====
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const wrapper = document.getElementById('envelope-wrapper');
  const heroText = document.getElementById('hero-text');

  envelope.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
  envelope.style.transform = 'scale(0) rotate(20deg)';
  envelope.style.opacity = '0';

  setTimeout(() => {
    wrapper.style.display = 'none';
    heroText.classList.remove('hidden');
    heroText.style.animation = 'fadeInUp 1s ease both';
  }, 600);
}

// ===== SMOOTH SCROLL =====
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ===== POPUP =====
function showFinalMessage() {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById('popup').classList.remove('hidden');
}

function closeMessage() {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');
}

// ===== FORGIVE =====
function handleForgive() {
  closeMessage();
  document.getElementById('celebration').classList.remove('hidden');
  launchConfetti();
}

// ===== CONFETTI =====
const confettiColors = ['#e74c3c', '#f5c842', '#e91e8c', '#9b59b6', '#3498db', '#2ecc71', '#ff6b6b', '#ffd700'];

function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  for (let i = 0; i < 120; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.width = (6 + Math.random() * 10) + 'px';
    c.style.height = (6 + Math.random() * 10) + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.animationDuration = (2.5 + Math.random() * 3) + 's';
    c.style.animationDelay = (Math.random() * 2) + 's';
    container.appendChild(c);
  }
}

function closeCelebration() {
  document.getElementById('celebration').classList.add('hidden');
}

// ===== SCROLL REVEAL =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
    }
  });
}, observerOptions);

// Observe all animatable elements
const animatables = document.querySelectorAll('.card, .care-item, .promise-item, .love-letter');
animatables.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px) scale(0.95)';
  el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
  observer.observe(el);
});

// ===== HEART CLICK EFFECT =====
document.getElementById('bigHeart').addEventListener('click', function () {
  this.style.animation = 'none';
  this.style.transform = 'scale(1.5)';
  this.style.filter = 'drop-shadow(0 0 40px rgba(200,60,100,1))';
  setTimeout(() => {
    this.style.transform = '';
    this.style.filter = '';
    this.style.animation = 'heartbeat 1.2s ease-in-out infinite';
  }, 500);
  // Burst hearts
  for (let i = 0; i < 8; i++) {
    burstHeart(this);
  }
});

function burstHeart(origin) {
  const rect = origin.getBoundingClientRect();
  const h = document.createElement('span');
  h.textContent = '❤️';
  h.style.cssText = `
    position: fixed;
    left: ${rect.left + rect.width / 2}px;
    top: ${rect.top + rect.height / 2}px;
    font-size: ${1 + Math.random() * 1.5}rem;
    pointer-events: none;
    z-index: 9999;
    animation: none;
    transition: transform 1s ease, opacity 1s ease;
    opacity: 1;
  `;
  document.body.appendChild(h);
  const angle = Math.random() * 360;
  const dist = 80 + Math.random() * 120;
  const dx = Math.cos(angle * Math.PI / 180) * dist;
  const dy = Math.sin(angle * Math.PI / 180) * dist;
  requestAnimationFrame(() => {
    h.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
    h.style.opacity = '0';
  });
  setTimeout(() => h.remove(), 1000);
}
