export interface EstimateState {
  product: 'motorized-roller-shades' | 'motorized-dual-shades' | 'motorized-honeycomb-shades' | 'phantom-door-screens';
  width: number;
  height: number;
  count: number;
  power: 'battery' | 'hardwired';
  control: 'remote' | 'app' | 'wall';
}

export interface EstimateResult {
  lowTotal: number;
  highTotal: number;
  avgLowPerWindow: number;
  avgHighPerWindow: number;
  discountPercent: number;
  discountSaved: number;
  summaryNotes: string;
}

const PRODUCT_RATES = {
  'motorized-roller-shades': {
    name: 'Motorized Roller Shades',
    baseFab: 320,
    areaRate: 0.038, // per sq in
    motor: 140,
    install: 65,
    highMultiplier: 1.18
  },
  'motorized-dual-shades': {
    name: 'Motorized Dual Shades',
    baseFab: 390,
    areaRate: 0.052,
    motor: 140,
    install: 65,
    highMultiplier: 1.22
  },
  'motorized-honeycomb-shades': {
    name: 'Motorized Honeycomb Shades',
    baseFab: 360,
    areaRate: 0.046,
    motor: 140,
    install: 65,
    highMultiplier: 1.2
  },
  'phantom-door-screens': {
    name: 'Phantom Retractable Door Screens',
    baseFab: 460,
    areaRate: 0.02,
    motor: 0,
    install: 85,
    highMultiplier: 1.15
  }
};

export function calculateEstimate(state: EstimateState): EstimateResult {
  const isPhantom = state.product === 'phantom-door-screens';
  const sqInches = state.width * state.height;

  let unitLow = 0;
  let unitHigh = 0;

  if (isPhantom) {
    if (state.width > 42) {
      // Oversized / Double French door screen
      unitLow = 980;
      unitHigh = 1250;
    } else {
      // Standard single door screen
      unitLow = 520;
      unitHigh = 640;
    }
  } else {
    const rate = PRODUCT_RATES[state.product];
    const fabricCost = rate.baseFab + sqInches * rate.areaRate;
    const motorCost = rate.motor;
    const installCost = rate.install;
    const powerExtra = state.power === 'hardwired' ? 75 : 0;

    unitLow = Math.round((fabricCost + motorCost + installCost + powerExtra) / 5) * 5;
    unitHigh = Math.round((unitLow * rate.highMultiplier) / 5) * 5;
  }

  const rawSubtotalLow = unitLow * state.count;
  const rawSubtotalHigh = unitHigh * state.count;

  // Quantity volume incentive
  let discountPercent = 0;
  if (!isPhantom) {
    if (state.count >= 8) discountPercent = 10;
    else if (state.count >= 4) discountPercent = 5;
  }

  const discountMultiplier = 1 - discountPercent / 100;
  const discountedLow = Math.round(rawSubtotalLow * discountMultiplier);
  const discountedHigh = Math.round(rawSubtotalHigh * discountMultiplier);
  const discountSaved = rawSubtotalLow - discountedLow;

  // Extra control gear
  let controlAddon = 0;
  if (!isPhantom) {
    if (state.control === 'app') controlAddon = 195; // Smart Hub / Bridge
    else if (state.control === 'wall') controlAddon = 85 * Math.min(state.count, 4); // Wall keypad per room
  }

  const lowTotal = discountedLow + controlAddon;
  const highTotal = discountedHigh + controlAddon;

  const avgLowPerWindow = Math.round(lowTotal / state.count);
  const avgHighPerWindow = Math.round(highTotal / state.count);

  const productName = PRODUCT_RATES[state.product].name;
  const powerLabel = isPhantom ? 'Manual Retractable' : state.power === 'hardwired' ? 'Hardwired (12V/24V)' : 'Rechargeable Li-ion Battery';
  const controlLabel = isPhantom
    ? 'Standard Handle Latch'
    : state.control === 'app'
      ? 'Smart App & Hub (Automation)'
      : state.control === 'wall'
        ? 'Wireless Wall Keypad'
        : 'Multi-Channel Handheld Remote';

  const summaryNotes = `Ballpark Estimate: $${lowTotal.toLocaleString()} – $${highTotal.toLocaleString()} CAD.
Product: ${productName} (${state.count} ${state.count === 1 ? 'window/door' : 'windows/doors'}).
Approx. Dimensions: ${state.width}"W × ${state.height}"H.
Power Drive: ${powerLabel}.
Control System: ${controlLabel}.
(Generated from online estimate calculator)`;

  return {
    lowTotal,
    highTotal,
    avgLowPerWindow,
    avgHighPerWindow,
    discountPercent,
    discountSaved,
    summaryNotes
  };
}

export function initEstimateCalculator(root: HTMLElement) {
  const state: EstimateState = {
    product: 'motorized-roller-shades',
    width: 36,
    height: 60,
    count: 3,
    power: 'battery',
    control: 'remote'
  };

  // Elements
  const productButtons = root.querySelectorAll<HTMLButtonElement>('[data-calc-product]');
  const widthInput = root.querySelector<HTMLInputElement>('[data-calc-width]');
  const heightInput = root.querySelector<HTMLInputElement>('[data-calc-height]');
  const widthDisplay = root.querySelector<HTMLElement>('[data-calc-width-val]');
  const heightDisplay = root.querySelector<HTMLElement>('[data-calc-height-val]');
  const presetButtons = root.querySelectorAll<HTMLButtonElement>('[data-calc-preset]');

  const countDisplay = root.querySelector<HTMLElement>('[data-calc-count-val]');
  const countMinus = root.querySelector<HTMLButtonElement>('[data-calc-count-minus]');
  const countPlus = root.querySelector<HTMLButtonElement>('[data-calc-count-plus]');

  const powerButtons = root.querySelectorAll<HTMLButtonElement>('[data-calc-power]');
  const controlButtons = root.querySelectorAll<HTMLButtonElement>('[data-calc-control]');
  const shadeOnlyOptions = root.querySelectorAll<HTMLElement>('[data-shade-only]');

  const totalRangeEl = root.querySelector<HTMLElement>('[data-calc-total-range]');
  const avgPerWindowEl = root.querySelector<HTMLElement>('[data-calc-avg-unit]');
  const discountBadgeEl = root.querySelector<HTMLElement>('[data-calc-discount-badge]');
  const quoteCtaBtn = root.querySelector<HTMLAnchorElement>('[data-calc-quote-link]');

  function updateUI() {
    const isPhantom = state.product === 'phantom-door-screens';

    // Show/hide motor & power for Phantom
    shadeOnlyOptions.forEach((el) => {
      el.style.display = isPhantom ? 'none' : '';
    });

    // Update product active state
    productButtons.forEach((btn) => {
      const p = btn.getAttribute('data-calc-product');
      const isActive = p === state.product;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('border-spice', isActive);
      btn.classList.toggle('bg-paper', isActive);
      btn.classList.toggle('border-line', !isActive);
      btn.classList.toggle('bg-lace/60', !isActive);
    });

    // Update power buttons
    powerButtons.forEach((btn) => {
      const val = btn.getAttribute('data-calc-power');
      const isActive = val === state.power;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('border-spice', isActive);
      btn.classList.toggle('bg-paper', isActive);
      btn.classList.toggle('border-line', !isActive);
    });

    // Update control buttons
    controlButtons.forEach((btn) => {
      const val = btn.getAttribute('data-calc-control');
      const isActive = val === state.control;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('border-spice', isActive);
      btn.classList.toggle('bg-paper', isActive);
      btn.classList.toggle('border-line', !isActive);
    });

    // Inputs
    if (widthInput) widthInput.value = String(state.width);
    if (heightInput) heightInput.value = String(state.height);
    if (widthDisplay) widthDisplay.textContent = `${state.width}"`;
    if (heightDisplay) heightDisplay.textContent = `${state.height}"`;
    if (countDisplay) countDisplay.textContent = String(state.count);

    // Calculate
    const res = calculateEstimate(state);

    if (totalRangeEl) {
      totalRangeEl.textContent = `$${res.lowTotal.toLocaleString()} – $${res.highTotal.toLocaleString()} CAD`;
    }

    if (avgPerWindowEl) {
      const unitWord = isPhantom ? 'screen' : 'window';
      avgPerWindowEl.textContent = `~$${res.avgLowPerWindow.toLocaleString()} – $${res.avgHighPerWindow.toLocaleString()} per ${unitWord} installed`;
    }

    if (discountBadgeEl) {
      if (res.discountPercent > 0) {
        discountBadgeEl.hidden = false;
        discountBadgeEl.textContent = `Includes ${res.discountPercent}% whole-room incentive (Save ~$${res.discountSaved})`;
      } else {
        discountBadgeEl.hidden = true;
      }
    }

    if (quoteCtaBtn) {
      const params = new URLSearchParams({
        product: state.product,
        windows: String(state.count),
        notes: res.summaryNotes
      });
      quoteCtaBtn.href = `/quote?${params.toString()}`;
    }
  }

  // Event bindings
  productButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = btn.getAttribute('data-calc-product') as EstimateState['product'];
      if (p) {
        state.product = p;
        if (p === 'phantom-door-screens' && state.width < 32) {
          state.width = 36;
          state.height = 80;
        }
        updateUI();
      }
    });
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const w = Number(btn.getAttribute('data-preset-w'));
      const h = Number(btn.getAttribute('data-preset-h'));
      if (w && h) {
        state.width = w;
        state.height = h;
        updateUI();
      }
    });
  });

  widthInput?.addEventListener('input', (e) => {
    state.width = Number((e.target as HTMLInputElement).value);
    updateUI();
  });

  heightInput?.addEventListener('input', (e) => {
    state.height = Number((e.target as HTMLInputElement).value);
    updateUI();
  });

  countMinus?.addEventListener('click', () => {
    if (state.count > 1) {
      state.count--;
      updateUI();
    }
  });

  countPlus?.addEventListener('click', () => {
    if (state.count < 30) {
      state.count++;
      updateUI();
    }
  });

  powerButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = btn.getAttribute('data-calc-power') as EstimateState['power'];
      if (p) {
        state.power = p;
        updateUI();
      }
    });
  });

  controlButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const c = btn.getAttribute('data-calc-control') as EstimateState['control'];
      if (c) {
        state.control = c;
        updateUI();
      }
    });
  });

  // Check URL params for initial state if present
  const urlParams = new URLSearchParams(window.location.search);
  const pParam = urlParams.get('product') as EstimateState['product'] | null;
  if (pParam && pParam in PRODUCT_RATES) {
    state.product = pParam;
  }

  updateUI();
}
