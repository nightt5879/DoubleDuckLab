function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const key = 'lab-theme';
  const isZh = root.lang?.startsWith('zh');

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

  applyTheme(preferred);

  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem(key, next);
    applyTheme(next);
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

initThemeToggle();
initMembersFilter();
