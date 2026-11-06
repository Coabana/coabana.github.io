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
/* Cada idioma tiene su página: / en español, /en/ en inglés
   (generada por tools/build_en.py). El idioma lo da la página;
   cambiarlo es ir a la otra. No se redirige por el idioma del
   navegador, para que los buscadores lean cada página tal cual. */
const LANG_KEY = "coabana-lang";
const PAGE_LANG = document.documentElement.lang === "en" ? "en" : "es";
const LANG_PATH = { es: "/", en: "/en/" };

function langUrl(lang) {
  const params = new URLSearchParams(location.search);
  params.delete("lang");
  const query = params.toString();
  return LANG_PATH[lang] + (query ? "?" + query : "") + location.hash;
}

function savedLang() {
  try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
}

// ?lang= (los enlaces de antes) manda a la página de ese idioma y queda
// como elección, para que la raíz no rebote a /en/; en la raíz, la
// elección guardada del visitante también manda
const urlLang = new URLSearchParams(location.search).get("lang");
if (I18N[urlLang]) {
  try { localStorage.setItem(LANG_KEY, urlLang); } catch (e) { /* modo privado */ }
}
const wantedLang = I18N[urlLang] ? urlLang : (PAGE_LANG === "es" && savedLang() === "en" ? "en" : null);
if (wantedLang && wantedLang !== PAGE_LANG) location.replace(langUrl(wantedLang));

let currentLang = PAGE_LANG;

// En la raíz, a quien tiene el navegador en otro idioma y no ha elegido
// se le ofrece la página en inglés con un aviso que puede cerrar; no se
// le redirige
const HINT_KEY = "coabana-lang-hint";
function offerEnglish() {
  if (PAGE_LANG !== "es" || savedLang()) return;
  if ((navigator.language || "es").toLowerCase().startsWith("es")) return;
  try { if (localStorage.getItem(HINT_KEY)) return; } catch (e) { return; }
  const hint = document.createElement("aside");
  hint.className = "lang-hint";
  hint.lang = "en";
  hint.setAttribute("aria-label", "Language");
  const link = document.createElement("a");
  link.href = langUrl("en");
  link.textContent = "This site is also in English →";
  link.addEventListener("click", () => {
    try { localStorage.setItem(LANG_KEY, "en"); } catch (e) { /* modo privado */ }
  });
  const close = document.createElement("button");
  close.type = "button";
  close.className = "lang-hint-close";
  close.setAttribute("aria-label", "Dismiss");
  close.textContent = "×";
  close.addEventListener("click", () => {
    try { localStorage.setItem(HINT_KEY, "dismissed"); } catch (e) { /* modo privado */ }
    hint.remove();
  });
  hint.append(link, close);
  document.body.append(hint);
}
if (!wantedLang || wantedLang === PAGE_LANG) offerEnglish();

function applyLang(lang) {
  const dict = I18N[lang];
  if (!dict) return;
  currentLang = lang;

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
  const next = currentLang === "es" ? "en" : "es";
  try { localStorage.setItem(LANG_KEY, next); } catch (e) { /* modo privado */ }
  location.href = langUrl(next);
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

  // El botón muestra el tema al que se puede cambiar (como el de idioma)
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.textContent = theme === "light" ? "🌙" : "☀️";
    const ariaKey = theme === "light" ? "nav.themeDark" : "nav.themeLight";
    themeBtn.setAttribute("data-i18n-aria-label", ariaKey);
    themeBtn.setAttribute("aria-label", I18N[currentLang][ariaKey]);
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f7f4ec" : "#07131d");
}

document.getElementById("themeToggle").addEventListener("click", () => {
  const next = currentTheme === "light" ? "dark" : "light";
  applyTheme(next);
  // Solo la elección manual se guarda; la detección automática no
  try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* modo privado */ }
});

applyTheme(currentTheme);

// Mientras no haya elección manual ni ?theme= en la URL,
// el tema sigue al sistema en vivo
if (window.matchMedia) {
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)");
  if (systemTheme.addEventListener) {
    systemTheme.addEventListener("change", (e) => {
      let manual = null;
      try { manual = localStorage.getItem(THEME_KEY); } catch (err) { /* modo privado */ }
      const urlTheme = new URLSearchParams(location.search).get("theme");
      if (!manual && !urlTheme) applyTheme(e.matches ? "light" : "dark");
    });
  }
}

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
const submitBtn = form.querySelector('button[type="submit"]');
const FIELDS = ["name", "email", "message"];

// El error de un campo se limpia en cuanto el visitante lo corrige
FIELDS.forEach((n) =>
  form.elements[n].addEventListener("input", () =>
    form.elements[n].removeAttribute("aria-invalid")
  )
);

function setStatus(key, kind) {
  statusEl.textContent = I18N[currentLang][key] || "";
  statusEl.className = "form-status" + (kind ? ` ${kind}` : "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const missing = FIELDS.filter((n) => !form.elements[n].value.trim());
  if (missing.length) {
    missing.forEach((n) => form.elements[n].setAttribute("aria-invalid", "true"));
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

  // Mientras se envía, el botón queda deshabilitado (evita el doble envío)
  setStatus("form.sending");
  submitBtn.disabled = true;

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
  } finally {
    submitBtn.disabled = false;
  }
});
