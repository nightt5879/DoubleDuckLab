const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supportsObserver = 'IntersectionObserver' in window;
const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));

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
    if (index >= 0) {
      return index * 80;
    }
  }

  return 0;
}

function showNode(el) {
  const delay = resolveDelay(el);
  el.style.setProperty('--reveal-delay', `${delay}ms`);
  el.classList.add('is-visible');
}

if (revealNodes.length > 0) {
  if (reduceMotion || !supportsObserver) {
    revealNodes.forEach(showNode);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          showNode(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      }
    );

    revealNodes.forEach((el) => observer.observe(el));
  }
}
