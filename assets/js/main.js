// ============================================
// Joelle Mahfouz — Portfolio interactions
// ============================================

document.getElementById('year').textContent = new Date().getFullYear();

/* Scroll progress bar */
const progressBar = document.getElementById('progressBar');
function updateProgress() {
  const scrolled = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
}
document.addEventListener('scroll', updateProgress, { passive: true });

/* Nav scroll shrink + mobile toggle */
const nav = document.getElementById('nav');
document.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 40 ? '12px 6vw' : '20px 6vw';
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* Cursor glow */
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

/* Hero parallax "4D" depth layers — mouse + scroll driven */
const heroScene = document.getElementById('heroScene');
const layers = document.querySelectorAll('.hero__layer');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  layers.forEach(layer => {
    const depth = parseFloat(layer.dataset.depth);
    layer.style.transform = `translate3d(${x * depth * 80}px, ${y * depth * 80}px, 0)`;
  });
});
document.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroScene) heroScene.style.transform = `translateY(${scrollY * 0.3}px) rotateX(${scrollY * 0.01}deg)`;
}, { passive: true });

/* Tilt effect on photo frame + portfolio cards */
function addTilt(el, intensity = 10) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'rotateY(0) rotateX(0)';
  });
}
const tiltPhoto = document.getElementById('tiltPhoto');
if (tiltPhoto) addTilt(tiltPhoto, 12);
document.querySelectorAll('.p-card').forEach(card => addTilt(card, 6));

/* Gyroscope-based tilt for touch devices — there's no mouse to drive
   the parallax/tilt above, so on phones/tablets we use the device's
   orientation sensor instead: tilting the phone moves the hero
   background layers and the photo frame in real 3D. */
function initGyroTilt() {
  if (!window.matchMedia('(hover: none)').matches) return;
  if (typeof DeviceOrientationEvent === 'undefined') return;

  function handleOrientation(e) {
    if (e.gamma === null || e.beta === null) return;
    document.body.classList.add('gyro-active');
    const x = Math.max(-1, Math.min(1, e.gamma / 45));
    const y = Math.max(-1, Math.min(1, (e.beta - 40) / 45));
    layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth);
      layer.style.transform = `translate3d(${x * depth * 60}px, ${y * depth * 60}px, 0)`;
    });
    if (tiltPhoto) {
      tiltPhoto.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    }
  }

  function start() {
    window.addEventListener('deviceorientation', handleOrientation);
  }

  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    const enableOnce = () => {
      DeviceOrientationEvent.requestPermission().then(state => {
        if (state === 'granted') start();
      }).catch(() => {});
      window.removeEventListener('touchend', enableOnce);
    };
    window.addEventListener('touchend', enableOnce, { once: true });
  } else {
    start();
  }
}
initGyroTilt();

/* Typewriter effect for role line */
const roles = [
  'Hotel Management Professional',
  'Journalist',
  'Storyteller',
  'Guest Experience Specialist'
];
const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

/* Scroll reveal via IntersectionObserver */
const revealEls = document.querySelectorAll('.reveal, .reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* Animated stat counters */
const statEls = document.querySelectorAll('.stat__num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statEls.forEach(el => statObserver.observe(el));

/* Skill bars fill on scroll */
const skillBars = document.querySelectorAll('.skill-bar[data-w], .skill-bar > span[data-w]');
document.querySelectorAll('.skill-bar').forEach(bar => {
  const span = bar.querySelector('span[data-w]');
  if (span) bar.style.setProperty('--target', span.dataset.w + '%');
});
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-bar').forEach(bar => barObserver.observe(bar));

/* Experience tabs */
const tabButtons = document.querySelectorAll('.tab-btn');
const timelines = {
  hotel: document.getElementById('timeline-hotel'),
  journalism: document.getElementById('timeline-journalism'),
};
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    Object.entries(timelines).forEach(([key, el]) => {
      el.hidden = key !== btn.dataset.tab;
    });
    // re-trigger reveal animation for newly shown items
    const activeTimeline = timelines[btn.dataset.tab];
    activeTimeline.querySelectorAll('.reveal-up').forEach(item => {
      item.classList.remove('in');
      requestAnimationFrame(() => {
        revealObserver.observe(item);
      });
    });
  });
});
