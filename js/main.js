'use strict';

/* =====================================================
   TRADUÇÕES (i18n)
   ===================================================== */
const translations = {
  pt: {
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato'
    },
    hero: {
      cta1: 'Ver Projetos',
      cta2: 'Sobre mim',
      roles: ['Engenheiro de Dados Júnior', 'Analista de Dados', 'Construtor de Pipelines']
    },
    about: {
      label: '01/',
      title: 'Sobre mim',
      skillsLabel: 'Stack',
      bio: 'Estudante de Engenharia de Dados pela UFV, apaixonado por construir pipelines robustos e extrair valor de dados em escala. Trabalho com Python, SQL e ferramentas modernas do ecossistema de dados para transformar dados brutos em insights acionáveis.'
    },
    projects: {
      label: '02/',
      title: 'Projetos',
      p1: {
        title: 'Pipeline de Ingestão de Dados',
        desc: 'Pipeline batch para ingestão e transformação de dados de e-commerce usando Python, Airflow e AWS S3.',
        type: 'Engenharia de Dados'
      },
      p2: {
        title: 'Dashboard de Análise de Vendas',
        desc: 'Dashboard interativo com KPIs de vendas e análise de churn usando SQL e Power BI.',
        type: 'Análise de Dados'
      },
      p3: {
        title: 'Data Lakehouse com Spark',
        desc: 'Arquitetura de lakehouse com processamento distribuído, Delta Lake e Databricks.',
        type: 'Engenharia de Dados'
      }
    },
    contact: {
      label: '03/',
      headline: 'Vamos construir algo juntos?'
    },
    footer: {
      rights: '© 2025 Victor F. Oliveira'
    }
  },

  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      cta1: 'See Projects',
      cta2: 'About me',
      roles: ['Junior Data Engineer', 'Data Analyst', 'Pipeline Builder']
    },
    about: {
      label: '01/',
      title: 'About me',
      skillsLabel: 'Stack',
      bio: 'Data Engineering student at UFV, passionate about building robust pipelines and extracting value from data at scale. I work with Python, SQL, and modern data ecosystem tools to transform raw data into actionable insights.'
    },
    projects: {
      label: '02/',
      title: 'Projects',
      p1: {
        title: 'Data Ingestion Pipeline',
        desc: 'Batch pipeline for ingestion and transformation of e-commerce data using Python, Airflow, and AWS S3.',
        type: 'Data Engineering'
      },
      p2: {
        title: 'Sales Analysis Dashboard',
        desc: 'Interactive dashboard with sales KPIs and churn analysis using SQL and Power BI.',
        type: 'Data Analysis'
      },
      p3: {
        title: 'Data Lakehouse with Spark',
        desc: 'Lakehouse architecture with distributed processing, Delta Lake, and Databricks.',
        type: 'Data Engineering'
      }
    },
    contact: {
      label: '03/',
      headline: "Let's build something together?"
    },
    footer: {
      rights: '© 2025 Victor F. Oliveira'
    }
  }
};

/* Lê valor aninhado via chave pontilhada: "projects.p1.title" */
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

/* =====================================================
   ESTADO GLOBAL
   ===================================================== */
let currentLang = 'pt';
let twTimeout = null;
let twIndex = 0;
let twCharIndex = 0;
let twDeleting = false;

/* =====================================================
   I18N — APLICAR IDIOMA
   ===================================================== */
function setLang(lang) {
  if (!translations[lang]) return;

  const prev = currentLang;
  currentLang = lang;

  /* Persiste */
  try { localStorage.setItem('vfo-lang', lang); } catch (_) {}

  /* Atualiza atributo HTML */
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  /* Fade out */
  document.body.classList.add('lang-transition');
  document.body.classList.remove('lang-visible');

  setTimeout(() => {
    /* Atualiza todos [data-i18n] */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(translations[lang], key);
      if (value !== null && typeof value === 'string') {
        el.textContent = value;
      }
    });

    /* Atualiza botão de toggle (mostra idioma oposto) */
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = lang === 'pt' ? 'EN' : 'PT';

    /* Reinicia typewriter no idioma correto */
    restartTypewriter();

    /* Fade in */
    document.body.classList.remove('lang-transition');
    document.body.classList.add('lang-visible');

    setTimeout(() => document.body.classList.remove('lang-visible'), 300);
  }, 150);
}

function detectInitialLang() {
  try {
    const saved = localStorage.getItem('vfo-lang');
    if (saved && translations[saved]) return saved;
  } catch (_) {}

  const browser = navigator.language || 'pt';
  return browser.toLowerCase().startsWith('en') ? 'en' : 'pt';
}

/* =====================================================
   TYPEWRITER
   ===================================================== */
const TYPING_SPEED  = 75;
const ERASING_SPEED = 40;
const PAUSE_AFTER   = 1800;

function typeNext() {
  const roles = translations[currentLang].hero.roles;
  const tw = document.getElementById('typewriter');
  if (!tw) return;

  const current = roles[twIndex % roles.length];

  if (!twDeleting) {
    tw.textContent = current.slice(0, twCharIndex + 1);
    twCharIndex++;
    if (twCharIndex === current.length) {
      twDeleting = true;
      twTimeout = setTimeout(typeNext, PAUSE_AFTER);
      return;
    }
    twTimeout = setTimeout(typeNext, TYPING_SPEED);
  } else {
    tw.textContent = current.slice(0, twCharIndex - 1);
    twCharIndex--;
    if (twCharIndex === 0) {
      twDeleting = false;
      twIndex++;
      twTimeout = setTimeout(typeNext, 300);
      return;
    }
    twTimeout = setTimeout(typeNext, ERASING_SPEED);
  }
}

function restartTypewriter() {
  clearTimeout(twTimeout);
  twIndex = 0;
  twCharIndex = 0;
  twDeleting = false;
  const tw = document.getElementById('typewriter');
  if (tw) tw.textContent = '';
  twTimeout = setTimeout(typeNext, 500);
}

/* =====================================================
   CURSOR DOT + RING
   ===================================================== */
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  /* Metade das dimensões para centralizar no ponteiro */
  const DOT_OFF  = 3;   /* 6px / 2 */
  const RING_OFF = 16;  /* 32px / 2 */

  let rafId;

  document.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
      dot.style.transform  = `translate3d(${e.clientX - DOT_OFF}px,  ${e.clientY - DOT_OFF}px,  0)`;
      ring.style.transform = `translate3d(${e.clientX - RING_OFF}px, ${e.clientY - RING_OFF}px, 0)`;
    });
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cancelAnimationFrame(rafId);
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* =====================================================
   MATRIX RAIN
   ===================================================== */
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>|{}[];:';
  const FS = 13;
  let cols, drops, speeds;

  function resize() {
    canvas.width  = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    cols   = Math.floor(canvas.width / FS);
    drops  = Array.from({ length: cols }, () => -Math.random() * (canvas.height / FS));
    speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.6);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  let last = 0;
  const TICK = 45;

  function draw(ts) {
    if (ts - last >= TICK) {
      last = ts;

      ctx.fillStyle = 'rgba(5, 10, 5, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FS}px 'Space Mono', monospace`;

      for (let i = 0; i < cols; i++) {
        if (drops[i] < 0) { drops[i] += speeds[i]; continue; }

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = Math.random() > 0.3 ? '#39ff14' : '#00ff88';
        ctx.fillText(char, i * FS, Math.floor(drops[i]) * FS);

        drops[i] += speeds[i];

        if (drops[i] * FS > canvas.height && Math.random() > 0.975) {
          drops[i] = -Math.random() * 30;
        }
      }
    }
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

/* =====================================================
   NAVBAR — EFEITO SCROLL
   ===================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =====================================================
   HAMBURGER MENU
   ===================================================== */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  /* Fecha ao clicar em link */
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });
}

/* =====================================================
   BOTÕES MAGNÉTICOS
   ===================================================== */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* =====================================================
   SCROLL REVEAL (IntersectionObserver)
   ===================================================== */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* =====================================================
   NAVEGAÇÃO SUAVE (mobile close)
   ===================================================== */
function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      const sectionId = href.slice(1);
      const route = SECTION_TO_ROUTE[sectionId] || sectionId;
      history.replaceState(null, '', '#' + route);
    });
  });
}

/* =====================================================
   TOGGLE DE IDIOMA
   ===================================================== */
function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = currentLang === 'pt' ? 'en' : 'pt';
    setLang(next);
  });
}

/* =====================================================
   HASH ROUTING
   ===================================================== */
const ROUTE_TO_SECTION = {
  portfolio: 'hero',
  about:    'about',
  projects: 'projects',
  contact:  'contact'
};

const SECTION_TO_ROUTE = {
  hero:     'portfolio',
  about:    'about',
  projects: 'projects',
  contact:  'contact'
};

function initRouter() {
  const hash = location.hash.replace('#', '');
  const sectionId = ROUTE_TO_SECTION[hash] || 'hero';

  if (hash && ROUTE_TO_SECTION[hash]) {
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView();
    }, 80);
  } else {
    history.replaceState(null, '', '#portfolio');
  }
}

function updateRoute() {
  const sections = ['hero', 'about', 'projects', 'contact'];
  let current = 'portfolio';

  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (rect.top <= window.innerHeight * 0.4) {
        current = SECTION_TO_ROUTE[id];
      }
    }
  }

  if (location.hash !== '#' + current) {
    history.replaceState(null, '', '#' + current);
  }
}

/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initCursor();
  initMatrix();
  initNavbar();
  initHamburger();
  initMagnetic();
  initReveal();
  initSmoothNav();
  initLangToggle();
  window.addEventListener('scroll', updateRoute, { passive: true });

  /* Aplica idioma inicial (sem animação de fade) */
  const initLang = detectInitialLang();
  currentLang = initLang;
  document.documentElement.lang = initLang === 'pt' ? 'pt-BR' : 'en';

  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = initLang === 'pt' ? 'EN' : 'PT';

  /* Se idioma for EN, aplica as traduções */
  if (initLang === 'en') {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(translations['en'], key);
      if (value !== null && typeof value === 'string') {
        el.textContent = value;
      }
    });
  }

  /* Inicia typewriter */
  twTimeout = setTimeout(typeNext, 800);
});
