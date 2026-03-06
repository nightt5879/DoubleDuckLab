let cleanupNavbarScroll = null;

function initNavbarScroll() {
  cleanupNavbarScroll?.();

  const header = document.querySelector('.site-header');
  if (!header) {
    cleanupNavbarScroll = null;
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sync = () => {
    const scrolled = window.scrollY > 8;
    header.classList.toggle('is-scrolled', scrolled);
  };

  sync();
  window.addEventListener('scroll', sync, { passive: true });

  if (reduceMotion) {
    header.style.transitionDuration = '1ms';
  }

  cleanupNavbarScroll = () => {
    window.removeEventListener('scroll', sync);
  };
}

initNavbarScroll();
document.addEventListener('astro:page-load', initNavbarScroll);
