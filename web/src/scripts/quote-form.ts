import { animate } from 'motion';
import { EMAIL_RE, PHONE_RE, POSTAL_RE, normalizePostal } from '../lib/format';

type FieldName = 'name' | 'email' | 'phone' | 'postal' | 'interest' | 'windows';

const FIELDS: FieldName[] = ['name', 'email', 'phone', 'postal', 'interest', 'windows'];

const MESSAGES: Record<FieldName, string> = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email.',
  phone: 'Please enter a valid phone number.',
  postal: 'Please enter a valid postal code (e.g. V6B 1A1).',
  interest: 'Please select a product.',
  windows: 'Please enter a number between 1 and 200.'
};

const isValid = (name: FieldName, value: string): boolean => {
  switch (name) {
    case 'name':
      return value.length > 1;
    case 'email':
      return EMAIL_RE.test(value);
    case 'phone':
      return PHONE_RE.test(value);
    case 'postal':
      return POSTAL_RE.test(value);
    case 'interest':
      return value !== '';
    case 'windows': {
      if (value === '') return true; // optional
      const n = Number(value);
      return Number.isInteger(n) && n >= 1 && n <= 200;
    }
  }
};

/**
 * Mock submission for the draft.
 * FOLLOW-UP: POST FormData to a Cloudflare Pages Function (functions/api/quote.ts) or Formspree.
 */
const submitQuote = (_data: FormData) =>
  new Promise<{ ok: true }>((resolve) => setTimeout(() => resolve({ ok: true }), 600));

function init(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('[data-quote-form]');
  const fieldsWrap = root.querySelector<HTMLElement>('[data-quote-fields]');
  const success = root.querySelector<HTMLElement>('[data-quote-success]');
  const button = root.querySelector<HTMLButtonElement>('[data-submit]');
  const label = root.querySelector<HTMLElement>('[data-submit-label]');
  const check = root.querySelector<SVGSVGElement>('[data-submit-check]');
  const checkPath = root.querySelector<SVGPathElement>('[data-check-path]');
  if (!form || !fieldsWrap || !success || !button || !label || !check || !checkPath) return;

  const control = (name: FieldName) =>
    form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;

  // Preselect product and prefill details from URL parameters (e.g. from the pricing estimator)
  const params = new URLSearchParams(window.location.search);
  const requestedProduct = params.get('product');
  const requestedWindows = params.get('windows');
  const requestedNotes = params.get('notes');

  const interest = control('interest') as HTMLSelectElement | null;
  if (requestedProduct && interest && Array.from(interest.options).some((o) => o.value === requestedProduct)) {
    interest.value = requestedProduct;
  }

  const windowsEl = control('windows') as HTMLInputElement | null;
  if (requestedWindows && windowsEl && !windowsEl.value) {
    windowsEl.value = requestedWindows;
  }

  const notesEl = form.elements.namedItem('notes') as HTMLTextAreaElement | null;
  if (requestedNotes && notesEl && !notesEl.value) {
    notesEl.value = requestedNotes;
  }

  let attempted = false;

  const validate = (name: FieldName): boolean => {
    const el = control(name);
    if (!el) return true;
    const ok = isValid(name, el.value.trim());
    const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (ok) el.removeAttribute('aria-invalid');
    else el.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = ok ? '' : MESSAGES[name];
      error.hidden = ok;
    }
    return ok;
  };

  FIELDS.forEach((name) => {
    const el = control(name);
    el?.addEventListener('blur', () => {
      if (name === 'postal' && el.value) el.value = normalizePostal(el.value);
      if (attempted) validate(name);
    });
    el?.addEventListener('change', () => attempted && validate(name));
  });

  const playSuccess = async () => {
    const width = button.offsetWidth;
    await Promise.all([
      animate(label, { opacity: 0 }, { duration: 0.15 }),
      animate(
        button,
        { width: [`${width}px`, '56px'], borderRadius: ['2px', '28px'] },
        { duration: 0.3, ease: [0.65, 0, 0.35, 1] }
      )
    ]);
    check.style.opacity = '1';
    await animate(checkPath, { strokeDashoffset: [1, 0] }, { duration: 0.35, ease: 'easeOut' });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    attempted = true;

    const postal = control('postal');
    if (postal?.value) postal.value = normalizePostal(postal.value);

    const results = FIELDS.map((name) => ({ name, ok: validate(name) }));
    const firstInvalid = results.find((r) => !r.ok);
    if (firstInvalid) {
      control(firstInvalid.name)?.focus();
      return;
    }

    const data = new FormData(form);
    if (String(data.get('company') ?? '') !== '') return; // honeypot tripped

    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    await Promise.all([submitQuote(data), playSuccess()]);

    await animate(fieldsWrap, { opacity: 0, y: -8 }, { duration: 0.35 });
    form.hidden = true;
    success.hidden = false;
    animate(success, { opacity: [0, 1], y: [12, 0] }, { duration: 0.5, ease: 'easeOut' });
    success.focus();
  });
}

document.querySelectorAll<HTMLElement>('[data-quote-root]').forEach(init);
