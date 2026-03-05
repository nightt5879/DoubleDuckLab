const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsObserver = 'IntersectionObserver' in window;
const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
const delayMap = new WeakMap();
const visibleQueue = new Set();
let rafId = 0;

function resolveDelay(el) {
  const directDelay = Number(el.getAttribute('data-reveal-delay') || '0');
  if (Number.isFinite(directDelay) && directDelay > 0) {
    return directDelay;
  }

  const orderAttr = el.getAttribute('data-reveal-order');
  if (orderAttr !== null) {
    const order = Number(orderAttr);
    if (Number.isFinite(order)) {
      return order * 80;
    }
  }

  const group = el.closest('[data-reveal-group]');
  if (group) {
    const siblings = Array.from(group.querySelectorAll('[data-reveal]'));
    const index = siblings.indexOf(el);
    const groupStep = Number(group.getAttribute('data-reveal-step') || '80');
    const step = Number.isFinite(groupStep) && groupStep > 0 ? groupStep : 80;
    const effectiveStep = siblings.length > 24 ? Math.min(step, 40) : step;
    if (index >= 0) {
      return index * effectiveStep;
    }
  }

  return 0;
}

function computeDelays() {
  revealNodes.forEach((el) => {
    delayMap.set(el, resolveDelay(el));
  });
}

function showNode(el) {
  if (el.classList.contains('is-visible')) {
    return;
  }
  const delay = delayMap.get(el) ?? 0;
  el.style.setProperty('--reveal-delay', `${delay}ms`);
  el.classList.add('is-visible');
}

function flushVisibleQueue() {
  visibleQueue.forEach((el) => showNode(el));
  visibleQueue.clear();
  rafId = 0;
}

function enqueueVisible(el) {
  visibleQueue.add(el);
  if (!rafId) {
    rafId = window.requestAnimationFrame(flushVisibleQueue);
  }
}

if (revealNodes.length > 0) {
  computeDelays();

  if (reduceMotion || !supportsObserver) {
    revealNodes.forEach((el) => {
      el.style.setProperty('--reveal-delay', '0ms');
      el.classList.add('is-visible');
    });
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          enqueueVisible(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        // Pre-reveal a bit earlier to avoid visible "pop-in" while scrolling.
        rootMargin: '0px 0px 22% 0px',
        threshold: 0.01,
      }
    );

    revealNodes.forEach((el) => observer.observe(el));
  }
}
