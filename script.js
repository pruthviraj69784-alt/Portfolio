// Video-Inspired "RAJ" Intro Overlay Logic (Red Wine & Black Edition)
const introScreen = document.getElementById('intro-screen');
const introSkipBtn = document.querySelector('.intro-skip-btn');

function dismissIntro() {
  if (!introScreen || introScreen.classList.contains('hide')) return;
  introScreen.classList.add('hide');
  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 800);
}

if (introScreen) {
  // Auto-dismiss smoothly after the 2.4-second animation sequence
  const introTimer = setTimeout(dismissIntro, 2400);

  if (introSkipBtn) {
    introSkipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearTimeout(introTimer);
      dismissIntro();
    });
  }

  // Click anywhere to dismiss early
  introScreen.addEventListener('click', () => {
    clearTimeout(introTimer);
    dismissIntro();
  });

  // Replay trigger: clicking the top "P.R" navbar brand logo
  const brandLogo = document.querySelector('.brand');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      if (window.scrollY < 120) {
        e.preventDefault();
        introScreen.style.display = 'flex';
        void introScreen.offsetWidth;
        introScreen.classList.remove('hide');
        setTimeout(dismissIntro, 2400);
      }
    });
  }
}

// Navigation Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Interactive 3D Parallax Tilt for Hero Smartphone
const heroVisual = document.querySelector('.hero-visual');
const phoneDevice = document.getElementById('hero-phone');

if (heroVisual && phoneDevice) {
  heroVisual.addEventListener('mousemove', (e) => {
    // Only tilt on desktop / non-touch screens
    if (window.innerWidth <= 800) return;
    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Constrained subtle 3D tilt
    const rotateX = -(y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 12;

    phoneDevice.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  heroVisual.addEventListener('mouseleave', () => {
    phoneDevice.style.transform = '';
  });
}

// Active Navigation on Scroll (ScrollSpy)
const sections = document.querySelectorAll('main section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute('id');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksItems.forEach((link) => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// Interactive Mouse Spotlight on Cards
document.querySelectorAll('.service-card, .project, .value-card, .approach-card, .skill-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Toast Notice Helper
function showToast(message, duration = 3000) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// Copy to Clipboard for Email
const copyEmailBtn = document.querySelector('.btn-copy-email');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = 'pruthviraj69784@gmail.com';
    const statusText = copyEmailBtn.querySelector('.copy-status');

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      copyEmailBtn.classList.add('copied');
      if (statusText) statusText.textContent = 'Copied!';
      showToast('Email address copied to clipboard!');

      setTimeout(() => {
        copyEmailBtn.classList.remove('copied');
        if (statusText) statusText.textContent = 'Copy';
      }, 2200);
    } catch (err) {
      console.error('Copy failed:', err);
      showToast('Could not copy automatically. Email: ' + email);
    }
  });
}

// Back to Top Button Control
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });
}

// Resume Download Friendly Guard
const resumeBtn = document.getElementById('resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    if (window.location.protocol.startsWith('http')) {
      fetch('resume.pdf', { method: 'HEAD' })
        .then((res) => {
          if (!res.ok) {
            e.preventDefault();
            showToast('Reminder: Please add resume.pdf to the portfolio folder.');
          }
        })
        .catch(() => { });
    }
  });
}

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.project, .skill-card, .event, .education-card').forEach((el) => {
  if (!el.classList.contains('reveal')) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  }
});
