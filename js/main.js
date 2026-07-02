/* ================================================
   EDUARDO FROIS · PORTFÓLIO — main.js
   ================================================
   1. Nav scroll + mobile
   2. Typewriter no hero
   3. Scroll reveal
   4. Active link
   ================================================ */

/* ── 1. NAV ── */
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

const overlay = document.createElement('div');
overlay.classList.add('nav__overlay');
document.body.appendChild(overlay);

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });
nav.classList.toggle('scrolled', window.scrollY > 60);

function openMenu() {
  navToggle.classList.add('open');
  navLinks.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  navToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
overlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

/* ── 2. TYPEWRITER ── */
const roleEl  = document.getElementById('roleText');
const phrases = [
  'Estudante de Eng. de Software',
  'Desenvolvedor Front-end',
  'Desenvolvedor Web Freelance',
  'Entusiasta de IoT & Arduino',
];

let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;
let pause       = false;

function type() {
  if (!roleEl) return;

  const current = phrases[phraseIndex];

  if (!deleting) {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      pause = true;
      setTimeout(() => { pause = false; deleting = true; }, 2200);
    }
  } else {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  if (!pause) {
    setTimeout(type, deleting ? 45 : 80);
  }
}

setTimeout(type, 600);

/* ── 3. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 4. ACTIVE LINK ── */
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav__links a[href^="#"]');

sections.forEach(section => {
  new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    }),
    { threshold: 0.4 }
  ).observe(section);
});
