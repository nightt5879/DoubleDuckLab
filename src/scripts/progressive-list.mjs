const supportsObserver = 'IntersectionObserver' in window;

function toInt(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function dispatchRevealRefresh(nodes) {
  if (!nodes.length) {
    return;
  }
  window.dispatchEvent(
    new CustomEvent('reveal:refresh', {
      detail: { nodes },
    })
  );
}

function setupProgressiveList(list) {
  const items = Array.from(list.querySelectorAll(':scope > [data-progressive-item]'));
  const initialCount = toInt(list.getAttribute('data-initial-count'), 24);
  const batchSize = toInt(list.getAttribute('data-batch-size'), 12);
  const triggerDistance = toInt(list.getAttribute('data-trigger-distance'), 850);
  const remainingThreshold = toInt(list.getAttribute('data-remaining-threshold'), 12);
  const chunkSize = toInt(list.getAttribute('data-chunk-size'), 6);

  if (items.length <= initialCount) {
    return;
  }

  const reservoir = items.slice(initialCount);
  reservoir.forEach((node) => node.remove());

  let prepared = [];
  let isRendering = false;
  let forceMaterializeAfterRender = false;
  let rafId = 0;
  let tailObserver = null;
  const sentinel = document.createElement('div');
  sentinel.className = 'progressive-sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  list.after(sentinel);

  function prepareNextBatch() {
    if (prepared.length > 0 || reservoir.length === 0) {
      return;
    }
    prepared = reservoir.splice(0, Math.min(batchSize, reservoir.length));
  }

  function scheduleTailTrigger() {
    if (!supportsObserver) {
      return;
    }
    if (!tailObserver) {
      tailObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestLoad('tail');
            }
          });
        },
        {
          rootMargin: '0px 0px 20% 0px',
          threshold: 0.01,
        }
      );
    } else {
      tailObserver.disconnect();
    }

    const rendered = Array.from(list.querySelectorAll(':scope > [data-progressive-item]'));
    const triggerIndex = Math.max(0, rendered.length - remainingThreshold);
    const triggerNode = rendered[triggerIndex];
    if (triggerNode) {
      tailObserver.observe(triggerNode);
    }
  }

  function appendChunk(nodes, done) {
    const chunk = nodes.splice(0, chunkSize);
    if (!chunk.length) {
      done();
      return;
    }

    const frag = document.createDocumentFragment();
    chunk.forEach((node) => {
      node.classList.remove('is-visible');
      node.style.removeProperty('--reveal-delay');
      frag.appendChild(node);
    });
    list.appendChild(frag);
    dispatchRevealRefresh(chunk);

    rafId = window.requestAnimationFrame(() => appendChunk(nodes, done));
  }

  function renderPreparedBatch() {
    if (isRendering || prepared.length === 0) {
      return;
    }
    isRendering = true;
    const nodes = prepared.slice();
    prepared = [];

    appendChunk(nodes, () => {
      isRendering = false;
      rafId = 0;
      if (forceMaterializeAfterRender) {
        forceMaterializeAfterRender = false;
        materializeAll();
        return;
      }
      prepareNextBatch();
      scheduleTailTrigger();
    });
  }

  function requestLoad(_reason) {
    if (isRendering) {
      return;
    }
    if (prepared.length === 0) {
      prepareNextBatch();
    }
    renderPreparedBatch();
  }

  function materializeAll() {
    if (isRendering) {
      forceMaterializeAfterRender = true;
      return;
    }
    if (!prepared.length && !reservoir.length) {
      return;
    }

    if (tailObserver) {
      tailObserver.disconnect();
    }

    const nodes = [...prepared, ...reservoir];
    prepared = [];
    reservoir.length = 0;

    const frag = document.createDocumentFragment();
    nodes.forEach((node) => {
      node.classList.remove('is-visible');
      node.style.removeProperty('--reveal-delay');
      frag.appendChild(node);
    });
    list.appendChild(frag);
    dispatchRevealRefresh(nodes);
  }

  list.__progressiveListApi = {
    materializeAll,
  };

  prepareNextBatch();
  scheduleTailTrigger();

  if (supportsObserver) {
    const nearBottomObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestLoad('near-bottom');
          }
        });
      },
      {
        rootMargin: `0px 0px ${triggerDistance}px 0px`,
        threshold: 0.01,
      }
    );
    nearBottomObserver.observe(sentinel);
  } else {
    const onScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        const rect = sentinel.getBoundingClientRect();
        if (rect.top - window.innerHeight < triggerDistance) {
          requestLoad('scroll-fallback');
        }
        rafId = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

document.querySelectorAll('[data-progressive-list]').forEach((list) => {
  setupProgressiveList(list);
});
