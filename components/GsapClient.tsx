'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EASE_OUT_HARD = 'cubic-bezier(0.23, 1, 0.32, 1)';

export default function GsapClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('ready');

    /* ─── spotlight follow ─── */
    let spotlightCleanup: (() => void) | undefined;
    {
      const el = document.querySelector('.spotlight') as HTMLElement | null;
      if (el && !reduceMotion) {
        gsap.set(el, { xPercent: -50, yPercent: -50, top: 0, left: 0 });
        const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });
        xTo(window.innerWidth / 2);
        yTo(window.innerHeight / 3);
        const onMove = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        spotlightCleanup = () => window.removeEventListener('pointermove', onMove);
      }
    }

    /* ─── parallax ─── */
    if (!reduceMotion) {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '');
        if (!isFinite(speed) || speed <= 0) return;
        const trigger = (el.closest('.section, .hero') as HTMLElement) || el.parentElement;
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

    /* ─── hero title reveal ─── */
    {
      const scope =
        document.querySelector('.hero-phase.is-active') ||
        document.querySelector('.hero');
      if (scope) {
        const words = scope.querySelectorAll('.hero-title .word');
        if (words.length) {
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
      }
    }

    /* ─── data-reveal scroll fades ─── */
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });

    /* ─── data-stagger groups ─── */
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
      const items = Array.from(group.children) as HTMLElement[];
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 14 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: EASE_OUT_HARD,
        stagger: 0.05,
        scrollTrigger: { trigger: group, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    /* ─── number counters ─── */
    document.querySelectorAll<HTMLElement>('[data-counter]').forEach((node) => {
      const target = parseFloat(node.dataset.counter || '0');
      const proxy = { v: 0 };
      ScrollTrigger.create({
        trigger: node,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(proxy, {
            v: target,
            duration: 1.4,
            ease: 'power3.out',
            onUpdate: () => {
              node.textContent = Math.round(proxy.v).toLocaleString();
            },
          });
        },
      });
    });

    /* ─── marquee ─── */
    let marqueeTween: gsap.core.Tween | undefined;
    {
      const track = document.querySelector('.marquee-track') as HTMLElement | null;
      if (track) {
        track.innerHTML += track.innerHTML;
        const distance = track.scrollWidth / 2;
        marqueeTween = gsap.to(track, {
          x: -distance,
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
        const parent = track.parentElement;
        if (parent) {
          parent.addEventListener('mouseenter', () => marqueeTween?.timeScale(0.1));
          parent.addEventListener('mouseleave', () => marqueeTween?.timeScale(1));
        }
      }
    }

    /* ─── nav: compact + sliding indicator + scroll-spy ─── */
    {
      const nav = document.querySelector('.nav') as HTMLElement | null;
      const links = document.querySelectorAll<HTMLAnchorElement>('.nav-link[data-nav]');
      const indicator = document.querySelector('.nav-indicator') as HTMLElement | null;
      const linksList = document.querySelector('.nav-links') as HTMLElement | null;

      if (nav) {
        ScrollTrigger.create({
          start: 'top -40',
          onUpdate: (self) => nav.classList.toggle('compact', self.scroll() > 40),
        });
      }

      const moveTo = (el: HTMLElement) => {
        if (!indicator || !linksList) return;
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
        if (indicator) gsap.to(indicator, { opacity: 0, duration: 0.3 });
      });

      // scroll spy on in-page sections (only on pages with hash links)
      ['#why', '#products', '#how', '#roadmap', '#approach', '#engagement', '#contact'].forEach(
        (id) => {
          const sec = document.querySelector(id);
          if (!sec) return;
          ScrollTrigger.create({
            trigger: sec,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (!self.isActive) return;
              links.forEach((l) =>
                l.classList.toggle('is-active', l.getAttribute('href') === id)
              );
              const active = document.querySelector('.nav-link.is-active') as HTMLElement | null;
              if (active) moveTo(active);
            },
          });
        }
      );
    }

    /* ─── magnetic buttons ─── */
    if (!reduceMotion) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          xTo(dx * 0.22);
          yTo(dy * 0.32);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
      });
    }

    /* ─── product card hover-glow follow ─── */
    document.querySelectorAll<HTMLElement>('.product-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--gx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--gy', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });

    /* ─── roadmap tabs + horizontal phase timeline ─── */
    {
      const btns = document.querySelectorAll<HTMLButtonElement>('.rt-btn');
      const indicator = document.querySelector('.rt-indicator') as HTMLElement | null;
      const panelGroups = document.querySelectorAll<HTMLElement>('[data-roadmap-panel]');
      const dots = document.querySelectorAll<HTMLButtonElement>('.rm-dot');
      const progress = document.querySelector('.rm-progress') as HTMLElement | null;
      const timeline = document.querySelector('.rm-timeline') as HTMLElement | null;

      const placeRtIndicator = (btn: HTMLElement) => {
        if (!indicator || !btn.parentElement) return;
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

      const initial = document.querySelector('.rt-btn.active') as HTMLElement | null;
      if (initial) requestAnimationFrame(() => placeRtIndicator(initial));

      const updateProgress = () => {
        if (!progress || !dots.length || !timeline) return;
        const track = timeline.querySelector('.rm-track') as HTMLElement | null;
        if (!track) return;
        const activeIdx = parseInt(timeline.dataset.activePhase || '0', 10);
        const pct = dots.length > 1 ? activeIdx / (dots.length - 1) : 0;
        const width = pct * (track.clientWidth - 32);
        gsap.to(progress, { width, duration: 0.55, ease: 'power3.out' });
      };

      const activatePhase = (idx: number) => {
        if (!timeline) return;
        timeline.dataset.activePhase = String(idx);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        const visibleGroup = document.querySelector('.rm-panels.active');
        if (visibleGroup) {
          const panels = visibleGroup.querySelectorAll<HTMLElement>('.rm-panel');
          panels.forEach((p, i) => p.classList.toggle('active', i === idx));
          const target = panels[idx];
          if (target) {
            gsap.fromTo(
              target,
              { opacity: 0, y: 10, filter: 'blur(4px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }
            );
          }
        }
        updateProgress();
      };

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => activatePhase(idx));
      });

      btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          btns.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          placeRtIndicator(btn);

          const target = btn.dataset.roadmap;
          panelGroups.forEach((g) => {
            const isTarget = g.dataset.roadmapPanel === target;
            g.classList.toggle('active', isTarget);
            if (isTarget) {
              const visiblePanel = g.querySelector('.rm-panel.active') as HTMLElement | null;
              if (visiblePanel) {
                gsap.fromTo(
                  visiblePanel,
                  { opacity: 0, y: 10, filter: 'blur(4px)' },
                  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }
                );
              }
            }
          });
        });
      });

      const onResize = () => {
        const active = document.querySelector('.rt-btn.active') as HTMLElement | null;
        if (active) placeRtIndicator(active);
        updateProgress();
      };
      window.addEventListener('resize', onResize);
      requestAnimationFrame(updateProgress);
    }

    /* ─── terminal typewriter ─── */
    {
      const body = document.getElementById('terminal-body');
      if (body) {
        const cmds = body.querySelectorAll<HTMLElement>('.cmd');
        const outs = body.querySelectorAll<HTMLElement>('.t-line.out');
        cmds.forEach((c) => {
          c.dataset.text = c.dataset.typed;
          c.textContent = '';
        });
        outs.forEach((o) => gsap.set(o, { opacity: 0, height: 0, overflow: 'hidden' }));
        const lines = Array.from(body.children) as HTMLElement[];

        const playLine = (line: HTMLElement) =>
          new Promise<void>((resolve) => {
            if (line.classList.contains('out')) {
              gsap.to(line, { opacity: 1, height: 'auto', duration: 0.25, onComplete: () => resolve() });
            } else {
              const cmd = line.querySelector('.cmd') as HTMLElement | null;
              if (!cmd) return resolve();
              line.classList.add('is-typing');
              const text = cmd.dataset.text || '';
              const proxy = { i: 0 };
              gsap.to(proxy, {
                i: text.length,
                duration: Math.max(0.5, text.length * 0.025),
                ease: 'none',
                onUpdate: () => {
                  cmd.textContent = text.slice(0, Math.floor(proxy.i));
                },
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
    }

    /* ─── section title split-word reveal ─── */
    document.querySelectorAll<HTMLElement>('[data-split]').forEach((title) => {
      const html = title.innerHTML;
      const wrapped = html.replace(/(<[^>]+>)|([^<\s]+)/g, (m, tag, word) => {
        if (tag) return tag;
        return `<span class="sw"><span class="swi">${word}</span></span>`;
      });
      title.innerHTML = wrapped;
      const inners = title.querySelectorAll('.swi');
      gsap.set(title.querySelectorAll('.sw'), {
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        paddingBottom: '0.06em',
      });
      gsap.set(inners, { display: 'inline-block', yPercent: 110, opacity: 0 });
      gsap.to(inners, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: { trigger: title, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    if (!reduceMotion) gsap.ticker.lagSmoothing(500, 16);

    return () => {
      // tear down ScrollTriggers and tweens for clean re-init on route change
      ScrollTrigger.getAll().forEach((t) => t.kill());
      marqueeTween?.kill();
      spotlightCleanup?.();
    };
  }, [pathname]);

  return null;
}
