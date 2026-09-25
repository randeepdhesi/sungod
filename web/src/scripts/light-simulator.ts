export type OpacityKey = 'sheer' | 'light-filtering' | 'room-darkening' | 'blackout';

export interface OpacityConfig {
  key: OpacityKey;
  label: string;
  shortDesc: string;
  vlt: string;
  uvCut: string;
  privacy: string;
  idealFor: string;
  shadeAlpha: number; // 0 to 1
  roomFilter: string; // CSS filter for the room
  glowOpacity: number;
}

export const OPACITY_CONFIGS: Record<OpacityKey, OpacityConfig> = {
  sheer: {
    key: 'sheer',
    label: 'Sheer / Solar Screen',
    shortDesc: 'Crisp outdoor views with 95% UV glare protection.',
    vlt: '15% – 25% VLT',
    uvCut: '95% UV Rejection',
    privacy: 'Daytime view preserved',
    idealFor: 'Living rooms, kitchens & Burrard Inlet views',
    shadeAlpha: 0.28,
    roomFilter: 'brightness(1.08) contrast(0.96)',
    glowOpacity: 0.7
  },
  'light-filtering': {
    key: 'light-filtering',
    label: 'Light-Filtering',
    shortDesc: 'Diffused daylight with complete daytime privacy.',
    vlt: '8% – 12% VLT',
    uvCut: '98% UV Rejection',
    privacy: '100% Daytime Privacy',
    idealFor: 'Dining areas, home offices & street-facing windows',
    shadeAlpha: 0.62,
    roomFilter: 'brightness(0.92) contrast(1.02) sepia(0.08)',
    glowOpacity: 0.45
  },
  'room-darkening': {
    key: 'room-darkening',
    label: 'Room-Darkening',
    shortDesc: 'Deep light reduction for media rooms and midday naps.',
    vlt: '2% – 4% VLT',
    uvCut: '99% UV Rejection',
    privacy: 'Day & Night Privacy',
    idealFor: 'TV / media rooms, guest suites & reading dens',
    shadeAlpha: 0.88,
    roomFilter: 'brightness(0.65) contrast(1.1)',
    glowOpacity: 0.15
  },
  blackout: {
    key: 'blackout',
    label: 'Total Blackout',
    shortDesc: '100% light block for deep, restorative sleep.',
    vlt: '0% Light Bleed',
    uvCut: '100% UV & Heat Block',
    privacy: 'Total Sanctuary',
    idealFor: 'Primary bedrooms, nurseries & shift workers',
    shadeAlpha: 0.98,
    roomFilter: 'brightness(0.38) contrast(1.15)',
    glowOpacity: 0.02
  }
};

export function initLightSimulator(root: HTMLElement) {
  let currentKey: OpacityKey = 'light-filtering';

  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-sim-tab]');
  const shadeLayer = root.querySelector<HTMLElement>('[data-sim-shade]');
  const roomLayer = root.querySelector<HTMLElement>('[data-sim-room]');
  const glowLayer = root.querySelector<HTMLElement>('[data-sim-glow]');

  const labelEl = root.querySelector<HTMLElement>('[data-sim-label]');
  const descEl = root.querySelector<HTMLElement>('[data-sim-desc]');
  const vltEl = root.querySelector<HTMLElement>('[data-sim-vlt]');
  const uvEl = root.querySelector<HTMLElement>('[data-sim-uv]');
  const privacyEl = root.querySelector<HTMLElement>('[data-sim-privacy]');
  const roomUsageEl = root.querySelector<HTMLElement>('[data-sim-usage]');

  function update() {
    const config = OPACITY_CONFIGS[currentKey];

    // Buttons
    buttons.forEach((btn) => {
      const k = btn.getAttribute('data-sim-tab');
      const active = k === currentKey;
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('border-spice', active);
      btn.classList.toggle('bg-paper', active);
      btn.classList.toggle('text-graphite', active);
      btn.classList.toggle('border-line', !active);
      btn.classList.toggle('bg-lace/40', !active);
      btn.classList.toggle('text-mist', !active);
    });

    // Visual Layers
    if (shadeLayer) {
      shadeLayer.style.opacity = String(config.shadeAlpha);
    }
    if (roomLayer) {
      roomLayer.style.filter = config.roomFilter;
    }
    if (glowLayer) {
      glowLayer.style.opacity = String(config.glowOpacity);
    }

    // Text & Metrics
    if (labelEl) labelEl.textContent = config.label;
    if (descEl) descEl.textContent = config.shortDesc;
    if (vltEl) vltEl.textContent = config.vlt;
    if (uvEl) uvEl.textContent = config.uvCut;
    if (privacyEl) privacyEl.textContent = config.privacy;
    if (roomUsageEl) roomUsageEl.textContent = config.idealFor;
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.getAttribute('data-sim-tab') as OpacityKey;
      if (k && k in OPACITY_CONFIGS) {
        currentKey = k;
        update();
      }
    });
  });

  update();
}
