/* ═══════════════════════════════════════════════════════════
   recon · landing · GSAP · v2 (parallax + phase transition)
   Easings follow Emil's playbook: strong custom curves, ≤300ms UI.
   ═══════════════════════════════════════════════════════════ */

(() => {
  const start = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      requestAnimationFrame(start);
      return;
    }
    init();
  };
  document.addEventListener('DOMContentLoaded', start);

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

  function init() {
    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('ready');

    heroSpotlight();
    parallax();
    heroTitleReveal();
    revealOnScroll();
    staggerGroups();
    counters();
    marquee();
    navBehavior();
    magneticButtons();
    productGlow();
    roadmapTabs();
    phaseToggle();
    terminalTypewriter();
    splitTitles();

    if (!reduceMotion) gsap.ticker.lagSmoothing(500, 16);
  }

  /* ─────── spotlight (mouse-follow) ─────── */
  function heroSpotlight() {
    if (reduceMotion) return;
    const el = document.querySelector('.spotlight');
    if (!el) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, top: 0, left: 0 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });
    xTo(window.innerWidth / 2); yTo(window.innerHeight / 3);
    window.addEventListener('pointermove', (e) => {
      xTo(e.clientX); yTo(e.clientY);
    }, { passive: true });
  }

  /* ─────── parallax (background layers, section numerals) ─────── */
  function parallax() {
    if (reduceMotion) return;
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax);
      if (!isFinite(speed) || speed <= 0) return;
      const trigger = el.closest('.section, .hero') || el.parentElement;
      gsap.to(el, {
        yPercent: -40 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4,
        },
      });
    });
  }

  /* ─────── hero title — defensive gsap.from() ───────
     gsap.from sets initial state and animates to natural CSS state.
     If the tween is interrupted, words fall back to visible. */
  function heroTitleReveal() {
    const scope = document.querySelector('.hero-phase.is-active') || document.querySelector('.hero');
    if (!scope) return;
    const words = scope.querySelectorAll('.hero-title .word');
    if (!words.length) return;
    gsap.from(words, {
      yPercent: 110,
      filter: 'blur(8px)',
      opacity: 0,
      duration: 0.95,
      ease: 'power4.out',
      stagger: 0.05,
      delay: 0.1,
    });
  }

  /* ─────── [data-reveal] scroll-triggered fade-up ─────── */
  function revealOnScroll() {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
  }

  /* ─────── grouped 50ms-stagger reveal (Emil-style) ─────── */
  function staggerGroups() {
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const items = Array.from(group.children);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 14 });
      gsap.to(items, {
        opacity: 1, y: 0,
        duration: 0.55,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        stagger: 0.05,
        scrollTrigger: { trigger: group, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
  }

  /* ─────── counter animation on scroll ─────── */
  function counters() {
    document.querySelectorAll('[data-counter]').forEach((node) => {
      const target = parseFloat(node.dataset.counter);
      const proxy = { v: 0 };
      ScrollTrigger.create({
        trigger: node,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(proxy, {
            v: target, duration: 1.4, ease: 'power3.out',
            onUpdate: () => { node.textContent = Math.round(proxy.v).toLocaleString(); },
          });
        },
      });
    });
  }

  /* ─────── marquee (gsap loop, slow on hover) ─────── */
  function marquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;
    track.innerHTML += track.innerHTML;
    const distance = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -distance, duration: 40, ease: 'none', repeat: -1,
    });
    track.parentElement.addEventListener('mouseenter', () => tween.timeScale(0.1));
    track.parentElement.addEventListener('mouseleave', () => tween.timeScale(1));
  }

  /* ─────── nav: compact on scroll + sliding indicator + scroll-spy ─────── */
  function navBehavior() {
    const nav = document.querySelector('.nav');
    const links = document.querySelectorAll('.nav-link[data-nav]');
    const indicator = document.querySelector('.nav-indicator');
    const linksList = document.querySelector('.nav-links');

    ScrollTrigger.create({
      start: 'top -40',
      onUpdate: (self) => nav.classList.toggle('compact', self.scroll() > 40),
    });

    const moveTo = (el) => {
      if (!el || !indicator || !linksList) return;
      const r = el.getBoundingClientRect();
      const parent = linksList.getBoundingClientRect();
      gsap.to(indicator, {
        x: r.left - parent.left,
        y: r.top - parent.top,
        width: r.width,
        height: r.height,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    };
    links.forEach((l) => l.addEventListener('pointerenter', () => moveTo(l)));
    linksList?.addEventListener('pointerleave', () => {
      gsap.to(indicator, { opacity: 0, duration: 0.3 });
    });

    const sectionIds = ['#why', '#products', '#how', '#roadmap'];
    sectionIds.forEach((id) => {
      const sec = document.querySelector(id);
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (!self.isActive) return;
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === id));
          const active = document.querySelector('.nav-link.is-active');
          if (active) moveTo(active);
        },
      });
    });
  }

  /* ─────── magnetic buttons ─────── */
  function magneticButtons() {
    if (reduceMotion) return;
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * 0.22); yTo(dy * 0.32);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  /* ─────── product card glow follows pointer ─────── */
  function productGlow() {
    document.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--gx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--gy', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* ─────── roadmap (product tabs + horizontal phase timeline) ─────── */
  function roadmapTabs() {
    const btns = document.querySelectorAll('.rt-btn');
    const indicator = document.querySelector('.rt-indicator');
    const panelGroups = document.querySelectorAll('[data-roadmap-panel]');
    const dots = document.querySelectorAll('.rm-dot');
    const progress = document.querySelector('.rm-progress');
    const timeline = document.querySelector('.rm-timeline');

    const placeIndicator = (btn) => {
      const tabsRect = btn.parentElement.getBoundingClientRect();
      const r = btn.getBoundingClientRect();
      gsap.to(indicator, {
        x: r.left - tabsRect.left,
        y: r.top - tabsRect.top,
        width: r.width,
        height: r.height,
        duration: 0.42,
        ease: 'power3.out',
      });
    };
    const initial = document.querySelector('.rt-btn.active');
    if (initial) requestAnimationFrame(() => placeIndicator(initial));

    // place progress fill based on active phase
    const updateProgress = () => {
      if (!progress || !dots.length || !timeline) return;
      const track = timeline.querySelector('.rm-track');
      if (!track) return;
      const activeIdx = parseInt(timeline.dataset.activePhase || '0', 10);
      const pct = dots.length > 1 ? activeIdx / (dots.length - 1) : 0;
      const width = pct * (track.clientWidth - 32);
      gsap.to(progress, { width, duration: 0.55, ease: 'power3.out' });
    };

    const activePhase = (idx) => {
      timeline.dataset.activePhase = idx;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      // update visible panel within active group
      const visibleGroup = document.querySelector('.rm-panels.active');
      if (visibleGroup) {
        const panels = visibleGroup.querySelectorAll('.rm-panel');
        panels.forEach((p, i) => p.classList.toggle('active', i === idx));
        const target = panels[idx];
        if (target) {
          gsap.fromTo(target, { opacity: 0, y: 10, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' });
        }
      }
      updateProgress();
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => activePhase(idx));
    });

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        placeIndicator(btn);

        const target = btn.dataset.roadmap;
        panelGroups.forEach((g) => {
          const isTarget = g.dataset.roadmapPanel === target;
          g.classList.toggle('active', isTarget);
          if (isTarget) {
            const visiblePanel = g.querySelector('.rm-panel.active');
            if (visiblePanel) {
              gsap.fromTo(visiblePanel, { opacity: 0, y: 10, filter: 'blur(4px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' });
            }
          }
        });
      });
    });

    window.addEventListener('resize', () => {
      const active = document.querySelector('.rt-btn.active');
      if (active) placeIndicator(active);
      updateProgress();
    });

    // initial progress on load
    requestAnimationFrame(updateProgress);
  }

  /* ─────── phase toggle (hero GTM ↔ PE transition) ─────── */
  function phaseToggle() {
    const btns = document.querySelectorAll('.pt-btn');
    const indicator = document.querySelector('.pt-indicator');
    const phases = document.querySelectorAll('.hero-phase');
    if (!btns.length || !indicator) return;

    const placeIndicator = (btn) => {
      const tabsRect = btn.parentElement.getBoundingClientRect();
      const r = btn.getBoundingClientRect();
      gsap.to(indicator, {
        x: r.left - tabsRect.left,
        y: r.top - tabsRect.top,
        width: r.width,
        height: r.height,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    const initial = document.querySelector('.pt-btn.active');
    if (initial) requestAnimationFrame(() => placeIndicator(initial));

    let currentPhase = 'gtm';
    let switching = false;

    const switchTo = (target) => {
      if (target === currentPhase || switching) return;
      switching = true;
      const incoming = document.querySelector(`[data-phase-panel="${target}"]`);
      const outgoing = document.querySelector(`[data-phase-panel="${currentPhase}"]`);

      // body data-phase drives accent color on indicator etc.
      document.body.dataset.phase = target;

      // outgoing: blur out
      gsap.to(outgoing, {
        opacity: 0,
        y: -8,
        filter: 'blur(6px)',
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => {
          outgoing.classList.remove('is-active');
          outgoing.setAttribute('aria-hidden', 'true');
        },
      });

      // incoming: blur in (slightly delayed)
      incoming.classList.add('is-active');
      incoming.setAttribute('aria-hidden', 'false');
      gsap.fromTo(incoming,
        { opacity: 0, y: 8, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.46,
          delay: 0.18,
          ease: 'power3.out',
        }
      );

      // animate the words inside the new phase
      const words = incoming.querySelectorAll('.hero-title .word');
      gsap.fromTo(words,
        { yPercent: 90, filter: 'blur(8px)', opacity: 0 },
        {
          yPercent: 0, filter: 'blur(0px)', opacity: 1,
          duration: 0.7, ease: 'power4.out', stagger: 0.04,
          delay: 0.22,
          onComplete: () => { switching = false; },
        }
      );

      currentPhase = target;
    };

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        placeIndicator(btn);
        switchTo(btn.dataset.phaseBtn);
      });
    });

    window.addEventListener('resize', () => {
      const active = document.querySelector('.pt-btn.active');
      if (active) placeIndicator(active);
    });
  }

  /* ─────── terminal typewriter ─────── */
  function terminalTypewriter() {
    const body = document.getElementById('terminal-body');
    if (!body) return;
    const cmds = body.querySelectorAll('.cmd');
    const outs = body.querySelectorAll('.t-line.out');
    cmds.forEach((c) => { c.dataset.text = c.dataset.typed; c.textContent = ''; });
    outs.forEach((o) => gsap.set(o, { opacity: 0, height: 0, overflow: 'hidden' }));
    const lines = Array.from(body.children);

    const playLine = (line) => new Promise((resolve) => {
      if (line.classList.contains('out')) {
        gsap.to(line, { opacity: 1, height: 'auto', duration: 0.25, onComplete: resolve });
      } else {
        const cmd = line.querySelector('.cmd');
        if (!cmd) return resolve();
        line.classList.add('is-typing');
        const text = cmd.dataset.text || '';
        const proxy = { i: 0 };
        gsap.to(proxy, {
          i: text.length,
          duration: Math.max(0.5, text.length * 0.025),
          ease: 'none',
          onUpdate: () => { cmd.textContent = text.slice(0, Math.floor(proxy.i)); },
          onComplete: () => {
            cmd.textContent = text;
            line.classList.remove('is-typing');
            resolve();
          },
        });
      }
    });

    let started = false;
    ScrollTrigger.create({
      trigger: body,
      start: 'top 80%',
      once: true,
      onEnter: async () => {
        if (started) return;
        started = true;
        for (const line of lines) {
          await playLine(line);
          await new Promise((r) => setTimeout(r, 200));
        }
      },
    });
  }

  /* ─────── section title split-word reveal ─────── */
  function splitTitles() {
    document.querySelectorAll('[data-split]').forEach((title) => {
      const html = title.innerHTML;
      const wrapped = html.replace(/(<[^>]+>)|([^<\s]+)/g, (m, tag, word) => {
        if (tag) return tag;
        return `<span class="sw"><span class="swi">${word}</span></span>`;
      });
      title.innerHTML = wrapped;
      const inners = title.querySelectorAll('.swi');
      gsap.set(title.querySelectorAll('.sw'), {
        display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.06em',
      });
      gsap.set(inners, { display: 'inline-block', yPercent: 110, opacity: 0 });
      gsap.to(inners, {
        yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.04,
        scrollTrigger: { trigger: title, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
  }
})();
