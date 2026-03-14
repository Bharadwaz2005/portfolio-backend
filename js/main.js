// ===== DOM UTILITIES =====
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  const loader = $('#page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
  initReveal();
  initSkillBars();
});

// ===== NAVBAR SCROLL =====
(function initNavbar() {
  const navbar = $('#main-navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== HAMBURGER =====
(function initHamburger() {
  const btn = $('#hamburger-btn');
  const mobileNav = $('#mobile-nav');
  if (!btn || !mobileNav) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ===== SCROLL REVEAL =====
function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
}

// ===== SKILL BARS =====
function initSkillBars() {
  const bars = $$('.skill-bar-fill');
  if (!bars.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => obs.observe(bar));
}

// ===== ACTIVE NAV LINK =====
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ===== TOAST =====
function showToast(message, isSuccess = true) {
  let toast = $('#toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${isSuccess ? '✓' : '✗'}</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== CONTACT FORM — RAILWAY BACKEND =====
(function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    btn.disabled = true;

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject?.value?.trim() || 'Portfolio Contact',
      message: form.message.value.trim()
    };

    try {
      const res = await fetch('https://portfolio-backend-production-fc70.up.railway.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {
        showToast('Message sent successfully! I\'ll get back to you soon.', true);
        form.reset();
      } else {
        showToast(result.message || 'Failed to send. Please try again.', false);
      }
    } catch (err) {
      showToast('Connection error. Please try again.', false);
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
})();

// ===== SMOOTH SCROLL =====
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = $(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== TYPEWRITER (hero) =====
(function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;
  const texts = ['Full Stack Developer', 'Web App Builder', 'Problem Solver', 'CSE Student'];
  let i = 0, j = 0, deleting = false;
  const type = () => {
    const current = texts[i];
    el.textContent = deleting ? current.slice(0, j--) : current.slice(0, j++);
    if (!deleting && j > current.length) { deleting = true; setTimeout(type, 1400); return; }
    if (deleting && j < 0) { deleting = false; i = (i + 1) % texts.length; j = 0; setTimeout(type, 400); return; }
    setTimeout(type, deleting ? 55 : 90);
  };
  type();
})();