const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));

function showNode(el) {
  const delay = Number(el.getAttribute('data-reveal-delay') || '0');
  el.style.setProperty('--reveal-delay', `${delay}ms`);
  el.classList.add('is-visible');
}

if (revealNodes.length > 0) {
  if (reduceMotion || !('IntersectionObserver' in window)) {
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
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.16,
      }
    );

    revealNodes.forEach((el) => observer.observe(el));
  }
}
