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


const packSelect = document.querySelector('#lead-pack');
document.querySelectorAll('.price-card [data-pack]').forEach((link) => {
  link.addEventListener('click', () => {
    if (packSelect) packSelect.value = link.dataset.pack;
  });
});

const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  const whatsappMessage = leadForm.querySelector('input[name="text"]');
  const readField = (name) => leadForm.querySelector(`[data-field="${name}"]`);
  leadForm.addEventListener('submit', () => {
    const projectField = readField('project');
    const selectedPack = readField('pack');
    const details = readField('message').value.trim();
    const message = [
      'Bonjour Webora, je souhaite être mis(e) en relation avec un agent.',
      '',
      `Nom : ${readField('name').value.trim()}`,
      `Téléphone / WhatsApp : ${readField('phone').value.trim()}`,
      `Type de projet : ${projectField.options[projectField.selectedIndex].textContent.trim()}`,
      `Pack envisagé : ${selectedPack.options[selectedPack.selectedIndex].textContent.trim()}`,
      ...(details ? [`Précisions : ${details}`] : []),
    ];
    whatsappMessage.value = message.join('\n');
  });
}
