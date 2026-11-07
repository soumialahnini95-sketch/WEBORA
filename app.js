document.documentElement.classList.add('js-ready');

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function closeMobileMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  mobileMenu.hidden = true;
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    mobileMenu.hidden = !willOpen;
  });
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });
}

const revealTargets = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });
  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const serviceCards = document.querySelectorAll('.price-card');

if (finePointer.matches && serviceCards.length) {
  const resetTilt = (card) => {
    card.classList.remove('is-tilting');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
    card.style.removeProperty('--spotlight-x');
    card.style.removeProperty('--spotlight-y');
  };

  serviceCards.forEach((card) => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    card.addEventListener('pointerenter', () => {
      if (!reducedMotion.matches) card.classList.add('is-tilting');
    });

    card.addEventListener('pointermove', (event) => {
      if (reducedMotion.matches) {
        resetTilt(card);
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const bounds = card.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;

        const x = Math.max(0, Math.min(1, (pointerX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (pointerY - bounds.top) / bounds.height));
        const rotateX = (0.5 - y) * 10;
        const rotateY = (x - 0.5) * 10;
        card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
        card.style.setProperty('--spotlight-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--spotlight-y', `${(y * 100).toFixed(1)}%`);
      });
    });

    card.addEventListener('pointerleave', () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      resetTilt(card);
    });
  });

  const disableTiltForReducedMotion = (event) => {
    if (event.matches) serviceCards.forEach(resetTilt);
  };
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', disableTiltForReducedMotion);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(disableTiltForReducedMotion);
  }
}
