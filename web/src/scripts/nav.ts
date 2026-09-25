const LG_BREAKPOINT = 1024;

function initScrollState(header: HTMLElement) {
  let ticking = false;
  const update = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

function initProductsMenu(header: HTMLElement) {
  const button = header.querySelector<HTMLButtonElement>('[data-products-toggle]');
  const panel = button && document.getElementById(button.getAttribute('aria-controls') ?? '');
  if (!button || !panel) return;

  const setOpen = (open: boolean) => {
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };

  button.addEventListener('click', () => setOpen(panel.hidden !== false));

  document.addEventListener('click', (e) => {
    const t = e.target as Node;
    if (!panel.hidden && !button.contains(t) && !panel.contains(t)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      button.focus();
    }
  });

  panel.addEventListener('focusout', (e) => {
    const next = e.relatedTarget as Node | null;
    if (next && !panel.contains(next) && next !== button) setOpen(false);
  });
}

function initMobileMenu(header: HTMLElement) {
  const button = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.getElementById('mobile-nav');
  const label = button?.querySelector<HTMLElement>('[data-menu-label]');
  if (!button || !panel) return;

  const outside = [document.getElementById('main'), document.querySelector<HTMLElement>('[data-site-footer]')];

  const setOpen = (open: boolean) => {
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (label) label.textContent = open ? 'Close' : 'Menu';
    outside.forEach((el) => {
      if (el) el.inert = open;
    });
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) panel.querySelector<HTMLElement>('a')?.focus();
  };

  button.addEventListener('click', () => setOpen(panel.hidden !== false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      button.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= LG_BREAKPOINT && !panel.hidden) setOpen(false);
  });
}

const header = document.querySelector<HTMLElement>('[data-site-header]');
if (header) {
  initScrollState(header);
  initProductsMenu(header);
  initMobileMenu(header);
}
