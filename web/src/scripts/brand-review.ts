export function initBrandReview(root: HTMLElement) {
  let activeConcept = localStorage.getItem('sungod_active_logo') || 'B';
  if (!['A', 'B', 'C'].includes(activeConcept)) activeConcept = 'B';

  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-brand-select]');
  const conceptViews = root.querySelectorAll<HTMLElement>('[data-concept-view]');
  const mockupsA = root.querySelectorAll<HTMLElement>('[data-mockup-a]');
  const mockupsB = root.querySelectorAll<HTMLElement>('[data-mockup-b]');
  const mockupsC = root.querySelectorAll<HTMLElement>('[data-mockup-c]');

  const activeLetterEl = root.querySelector<HTMLElement>('[data-active-letter]');
  const activeNameEl = root.querySelector<HTMLElement>('[data-active-name]');
  const feedbackInput = root.querySelector<HTMLTextAreaElement>('[data-feedback-text]');
  const copyBtn = root.querySelector<HTMLButtonElement>('[data-copy-feedback]');
  const copyStatus = root.querySelector<HTMLElement>('[data-copy-status]');
  const applySiteBtn = root.querySelector<HTMLButtonElement>('[data-apply-site-logo]');

  const conceptNames: Record<string, string> = {
    A: 'Solstice',
    B: 'Slatted Sun',
    C: 'Fine-line Radiant'
  };

  function update() {
    // Update active tab buttons
    buttons.forEach((btn) => {
      const c = btn.getAttribute('data-brand-select');
      const active = c === activeConcept;
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('border-spice', active);
      btn.classList.toggle('bg-paper', active);
      btn.classList.toggle('text-graphite', active);
      btn.classList.toggle('border-line', !active);
      btn.classList.toggle('bg-lace/50', !active);
      btn.classList.toggle('text-mist', !active);
    });

    // Update concept presentation view
    conceptViews.forEach((view) => {
      const c = view.getAttribute('data-concept-view');
      view.hidden = c !== activeConcept;
    });

    // Update mockup views
    mockupsA.forEach((el) => (el.hidden = activeConcept !== 'A'));
    mockupsB.forEach((el) => (el.hidden = activeConcept !== 'B'));
    mockupsC.forEach((el) => (el.hidden = activeConcept !== 'C'));

    // Update text
    const name = conceptNames[activeConcept] || 'Slatted Sun';
    if (activeLetterEl) activeLetterEl.textContent = activeConcept;
    if (activeNameEl) activeNameEl.textContent = name;

    if (feedbackInput) {
      feedbackInput.value = `Hi Randeep, I reviewed the 3 Sungod brand directions. I like Concept ${activeConcept} (${name}) best for the website and vehicle decals. Let's move forward with this direction!`;
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const c = btn.getAttribute('data-brand-select');
      if (c && ['A', 'B', 'C'].includes(c)) {
        activeConcept = c;
        localStorage.setItem('sungod_active_logo', c);
        window.dispatchEvent(new CustomEvent('sungod-brand-changed', { detail: { choice: c } }));
        update();
      }
    });
  });

  applySiteBtn?.addEventListener('click', () => {
    localStorage.setItem('sungod_active_logo', activeConcept);
    window.dispatchEvent(new CustomEvent('sungod-brand-changed', { detail: { choice: activeConcept } }));
    if (copyStatus) {
      copyStatus.hidden = false;
      copyStatus.textContent = `Concept ${activeConcept} activated across the entire site header!`;
      setTimeout(() => {
        copyStatus.hidden = true;
      }, 3500);
    }
  });

  copyBtn?.addEventListener('click', async () => {
    if (!feedbackInput) return;
    try {
      await navigator.clipboard.writeText(feedbackInput.value);
      if (copyStatus) {
        copyStatus.hidden = false;
        copyStatus.textContent = 'Feedback copied to clipboard!';
        setTimeout(() => {
          copyStatus.hidden = true;
        }, 3000);
      }
    } catch {
      feedbackInput.select();
    }
  });

  update();
}
