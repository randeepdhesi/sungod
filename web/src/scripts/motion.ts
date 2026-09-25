import { animate, inView, scroll, stagger } from 'motion';

const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const;

/** Headlines authored as <span class="line"><span>…</span></span> wipe up from a clipped baseline. */
function initLineMask() {
  document.querySelectorAll<HTMLElement>('[data-line-mask]').forEach((el) => {
    inView(
      el,
      () => {
        animate(
          el.querySelectorAll('.line > span'),
          { y: ['110%', '0%'] },
          { delay: stagger(0.09), duration: 0.7, ease: EASE_OUT_SOFT }
        );
      },
      { amount: 0.3 }
    );
  });
}

/** Lateral entrance for images: data-slide="right" | "left". */
function initSlide() {
  document.querySelectorAll<HTMLElement>('[data-slide]').forEach((el) => {
    const from = el.dataset.slide === 'left' ? '-8%' : '8%';
    inView(
      el,
      () => {
        animate(el, { opacity: [0, 1], x: [from, '0%'] }, { duration: 0.8, ease: EASE_OUT_SOFT });
      },
      { amount: 0.2 }
    );
  });
}

/** Fade-up once when entering the viewport; stagger via data-reveal-delay (seconds). */
function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], y: [40, 0] },
          { duration: 0.6, delay: Number(el.dataset.revealDelay ?? 0), ease: 'easeOut' }
        );
      },
      { amount: 0.15 }
    );
  });
}

/** Scroll-scrubbed stroke draw for paths marked data-draw (pathLength="1"). */
function initDraw() {
  document.querySelectorAll<SVGPathElement>('path[data-draw]').forEach((path) => {
    const target = path.closest('section') ?? path;
    scroll(animate(path, { strokeDashoffset: [1, 0] }, { ease: 'linear' }), {
      target,
      offset: ['start 75%', 'end 65%']
    });
  });
}

function revealAll() {
  document.documentElement.classList.remove('js');
}

try {
  initLineMask();
  initSlide();
  initReveal();
  initDraw();
} catch (err) {
  // Never leave content hidden if animation setup fails.
  console.error(err);
  revealAll();
}
