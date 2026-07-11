/* ══════════════════════════════════════════════════════════
   Coabana — lógica del sitio
   ══════════════════════════════════════════════════════════ */

// Marca que hay JS: las animaciones de aparición solo se
// activan en este caso (sin JS, todo el contenido es visible)
document.documentElement.classList.add("js");

/* CONFIGURACIÓN ─────────────────────────────────────────────
   Formulario de contacto: crea un formulario gratuito en
   https://formspree.io, copia tu endpoint (algo como
   "https://formspree.io/f/abcdwxyz") y pégalo aquí.
   Mientras esté vacío, el formulario abrirá la aplicación de
   correo del visitante con el mensaje ya redactado.           */
const FORM_ENDPOINT = "https://formspree.io/f/xgojgbly";
const CONTACT_EMAIL = "roannylamaslopez@gmail.com";

/* ── Idioma ───────────────────────────────────────────── */
const LANG_KEY = "coabana-lang";

function detectLang() {
  const urlLang = new URLSearchParams(location.search).get("lang");
  if (urlLang && I18N[urlLang]) return urlLang;
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && I18N[saved]) return saved;
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}

let currentLang = detectLang();

function applyLang(lang) {
  const dict = I18N[lang];
  if (!dict) return;
  currentLang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* modo privado */ }

  document.documentElement.lang = lang;
  document.title = dict["meta.title"];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
  });

  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    const key = el.getAttribute("data-i18n-content");
    if (dict[key] !== undefined) el.setAttribute("content", dict[key]);
  });

  // El botón muestra el idioma al que se puede cambiar
  const toggle = document.getElementById("langToggle");
  toggle.textContent = lang === "es" ? "EN" : "ES";
  toggle.setAttribute(
    "aria-label",
    lang === "es" ? "Switch to English" : "Cambiar a español"
  );
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "es" ? "en" : "es");
});

applyLang(currentLang);

/* ── Tema claro / oscuro ──────────────────────────────── */
const THEME_KEY = "coabana-theme";

function detectTheme() {
  const urlTheme = new URLSearchParams(location.search).get("theme");
  if (urlTheme === "light" || urlTheme === "dark") return urlTheme;
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) { /* modo privado */ }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

let currentTheme = detectTheme();

function applyTheme(theme) {
  currentTheme = theme;
  if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
  else document.documentElement.removeAttribute("data-theme");
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* modo privado */ }

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.textContent = theme === "light" ? "☀️" : "🌙";

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f7f4ec" : "#07131d");
}

document.getElementById("themeToggle").addEventListener("click", () => {
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

applyTheme(currentTheme);

/* ── Navegación: fondo al hacer scroll ────────────────── */
const nav = document.getElementById("nav");

function onScrollNav() {
  nav.classList.toggle("scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", onScrollNav, { passive: true });
onScrollNav();

/* ── Menú móvil ───────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  })
);

/* ── Enlace activo según la sección visible ───────────── */
const sectionIds = ["services", "stack", "process", "about", "contact"];
const menuAnchors = Array.from(navLinks.querySelectorAll("a"));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      menuAnchors.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ── Animaciones de aparición ─────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ── Año del pie de página ────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();

/* ── Formulario de contacto ───────────────────────────── */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function setStatus(key, kind) {
  statusEl.textContent = I18N[currentLang][key] || "";
  statusEl.className = "form-status" + (kind ? ` ${kind}` : "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !email || !message) {
    setStatus("form.invalid", "err");
    return;
  }

  // Honeypot: si un bot lo rellenó, fingimos éxito y no hacemos nada
  if (form.elements._gotcha.value) {
    setStatus("form.ok", "ok");
    form.reset();
    return;
  }

  // Sin endpoint configurado: fallback a la app de correo del visitante
  if (!FORM_ENDPOINT) {
    const subject = encodeURIComponent(`[Coabana] Mensaje de ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    setStatus("form.mailto");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  setStatus("form.sending");

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setStatus("form.ok", "ok");
    form.reset();
  } catch (err) {
    setStatus("form.err", "err");
  }
});
