function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const key = 'lab-theme';
  const isZh = root.lang?.startsWith('zh');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const preferred = (() => {
    const saved = localStorage.getItem(key);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  })();

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      const nextLabel = theme === 'dark'
        ? (isZh ? '浅色' : 'Light')
        : (isZh ? '深色' : 'Dark');
      const icon = theme === 'dark' ? '☼' : '☾';
      toggle.textContent = `${icon} ${nextLabel}`;
      toggle.setAttribute('aria-label', theme === 'dark'
        ? (isZh ? '切换到浅色模式' : 'Switch to light mode')
        : (isZh ? '切换到深色模式' : 'Switch to dark mode'));
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }

  function getRippleCenter(event) {
    if (event && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
      return { x: event.clientX, y: event.clientY };
    }
    if (toggle) {
      const rect = toggle.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: window.innerWidth / 2, y: 0 };
  }

  function getRippleRadius(x, y) {
    const dx = Math.max(x, window.innerWidth - x);
    const dy = Math.max(y, window.innerHeight - y);
    return Math.hypot(dx, dy);
  }

  applyTheme(preferred);

  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', (event) => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const supportsInkTransition = typeof document.startViewTransition === 'function';

    if (!supportsInkTransition || reduceMotion) {
      localStorage.setItem(key, next);
      applyTheme(next);
      return;
    }

    const { x, y } = getRippleCenter(event);
    const radius = getRippleRadius(x, y);
    root.style.setProperty('--theme-x', `${x}px`);
    root.style.setProperty('--theme-y', `${y}px`);
    root.style.setProperty('--theme-r', `${radius}px`);
    root.setAttribute('data-theme-transition', 'ink');

    const transition = document.startViewTransition(() => {
      localStorage.setItem(key, next);
      applyTheme(next);
    });

    transition.finished.finally(() => {
      root.removeAttribute('data-theme-transition');
      root.style.removeProperty('--theme-x');
      root.style.removeProperty('--theme-y');
      root.style.removeProperty('--theme-r');
    });
  });
}

function initMembersFilter() {
  const roots = Array.from(document.querySelectorAll('[data-members-filter-root]'));
  if (!roots.length) {
    return;
  }

  roots.forEach((root) => {
    const input = root.querySelector('[data-member-search]');
    const cards = Array.from(root.querySelectorAll('[data-member-card]'));
    const roleButtons = Array.from(root.querySelectorAll('[data-role-filter]'));
    const emptyState = root.querySelector('[data-empty-state]');

    if (!input || !cards.length) {
      return;
    }

    let activeRole = '__all';

    function setActiveButton(roleValue) {
      roleButtons.forEach((btn) => {
        const isActive = btn.getAttribute('data-role-filter') === roleValue;
        btn.classList.toggle('is-selected', isActive);
      });
    }

    function applyFilter() {
      const q = input.value.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach((card) => {
        const role = (card.getAttribute('data-role') || '').toLowerCase();
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const area = (card.getAttribute('data-area') || '').toLowerCase();
        const text = `${name} ${area} ${role}`;

        const roleMatch = activeRole === '__all' || role === activeRole;
        const queryMatch = !q || text.includes(q);
        const shouldShow = roleMatch && queryMatch;

        if (shouldShow) {
          if (card.classList.contains('is-filter-hidden')) {
            card.classList.remove('is-filter-hidden');
            card.classList.add('is-filter-visible');
            window.setTimeout(() => card.classList.remove('is-filter-visible'), 420);
          }
          visibleCount += 1;
        } else {
          card.classList.add('is-filter-hidden');
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    }

    roleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeRole = btn.getAttribute('data-role-filter') || '__all';
        setActiveButton(activeRole);
        applyFilter();
      });
    });

    input.addEventListener('input', applyFilter);

    setActiveButton(activeRole);
    applyFilter();
  });
}

function initCopyButtons() {
  const buttons = Array.from(document.querySelectorAll('[data-copy-target], [data-copy-text]'));
  if (!buttons.length) {
    return;
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const explicit = btn.getAttribute('data-copy-text');
      const targetId = btn.getAttribute('data-copy-target');
      const targetText = targetId ? (document.getElementById(targetId)?.textContent || '') : '';
      const text = (explicit || targetText || '').trim();

      if (!text) {
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        const normal = btn.getAttribute('data-copy-label') || btn.textContent || 'Copy';
        const success = btn.getAttribute('data-copy-success') || 'Copied';
        btn.textContent = success;
        window.setTimeout(() => {
          btn.textContent = normal;
        }, 1200);
      } catch (_err) {
        // Swallow clipboard failures quietly in static preview mode.
      }
    });
  });
}

function initListSearch() {
  const roots = Array.from(document.querySelectorAll('[data-list-filter-root]'));
  if (!roots.length) {
    return;
  }

  roots.forEach((root) => {
    const input = root.querySelector('[data-list-search]');
    const cards = Array.from(root.querySelectorAll('[data-list-card]'));
    const emptyState = root.querySelector('[data-empty-state]');
    const listEl = root.querySelector('[data-progressive-list]');
    const progressiveApi = listEl?.__progressiveListApi;
    let materialized = false;

    if (!input || !cards.length) {
      return;
    }

    function applyFilter() {
      const q = input.value.trim().toLowerCase();
      const allCards = Array.from(root.querySelectorAll('[data-list-card]'));
      let visibleCount = 0;

      allCards.forEach((card) => {
        const text = (card.getAttribute('data-search-text') || '').toLowerCase();
        const shouldShow = !q || text.includes(q);
        card.classList.toggle('is-filter-hidden', !shouldShow);
        if (shouldShow) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    }

    input.addEventListener('input', () => {
      const hasQuery = input.value.trim().length > 0;
      if (hasQuery && progressiveApi && !materialized) {
        progressiveApi.materializeAll();
        materialized = true;
      }
      applyFilter();
    });

    applyFilter();
  });
}

function initListScrollMemory() {
  const listPaths = new Set(['/projects', '/en/projects', '/papers', '/en/papers', '/news', '/en/news']);
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  if (!listPaths.has(currentPath)) {
    return;
  }

  const posKey = `scroll:${currentPath}`;
  const flagKey = `restore:${currentPath}`;

  function restoreScroll(tries = 0) {
    if (sessionStorage.getItem(flagKey) !== '1') {
      return;
    }

    const saved = Number(sessionStorage.getItem(posKey) || '0');
    const rootList = document.querySelector('[data-progressive-list]');
    const api = rootList?.__progressiveListApi;

    if (api && typeof api.materializeAll === 'function') {
      api.materializeAll();
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.scrollTo(0, Number.isFinite(saved) ? saved : 0);
          sessionStorage.removeItem(flagKey);
        });
      });
      return;
    }

    if (tries < 8) {
      window.setTimeout(() => restoreScroll(tries + 1), 60);
      return;
    }

    window.scrollTo(0, Number.isFinite(saved) ? saved : 0);
    sessionStorage.removeItem(flagKey);
  }

  restoreScroll();

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-remember-scroll-target]');
    if (!link) {
      return;
    }
    sessionStorage.setItem(posKey, String(window.scrollY || 0));
    sessionStorage.setItem(flagKey, '1');
  });
}

initThemeToggle();
initMembersFilter();
initCopyButtons();
initListSearch();
initListScrollMemory();
