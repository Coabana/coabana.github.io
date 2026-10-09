# Coabana — the site

The public one-page site of **Coabana**, a data-engineering studio specialised in **Google Cloud**: what the brand is, the services it offers, the stack it builds with and how to get in touch. It is plain HTML, CSS and JavaScript with no framework and no build step, served by GitHub Pages at [`https://coabana.github.io/`](https://coabana.github.io/), in Spanish by default with English beside it.

[![CI](https://github.com/Coabana/coabana.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/Coabana/coabana.github.io/actions/workflows/ci.yml)
[![license](https://img.shields.io/badge/license-Apache--2.0-green)](LICENSE)

## What it does

- **Presents the studio** in one page of sections: the brand, the services, the stack, the method, the founder and contact.
- **Speaks two languages**: Spanish by default, English on demand, detected from the browser and switchable from the menu.
- **Follows the visitor's theme**: dark by default, light ("Caribbean by day") on demand, following the system until the visitor chooses.
- **Takes contact**: a form sent through Formspree, with a `mailto:` fallback.
- **Is found**: canonical and `hreflang` links, a social card, `robots.txt`, `sitemap.xml` and a Search Console verification.

## Quick start

```sh
python3 -m http.server 8000
# open http://localhost:8000/ — add ?lang=en or ?theme=light to force a language or a theme
```

## Structure

```
├── index.html          # The whole page (one page with sections)
├── 404.html            # The error page
├── css/style.css       # The styles (the Caribbean-tech theme, dark and light)
├── js/i18n.js          # ✏️ The site's TEXT in Spanish and English
├── js/main.js          # Language, menu, animations and the form
├── DESIGN.md           # 🎨 The design system's tokens and components
└── assets/             # Logo and favicon
```

## Editing the text

Every text lives in **`js/i18n.js`**, in two dictionaries (`es` and `en`) with the same keys. Change the key's value in both languages. The HTML carries the Spanish text as its default content (in case JavaScript does not load); when a change is large, update it in `index.html` too so the two stay aligned.

The language is detected automatically (browser → `es`/`en`), can be forced with `?lang=en` or `?lang=es` in the URL, and the visitor can switch it with the **EN/ES** button in the menu.

## Light and dark theme

The site starts from the visitor's system appearance (dark by default), can be forced with `?theme=light` or `?theme=dark` in the URL, and the visitor can switch it with the **🌙/☀️** button in the menu (the choice is remembered). The light theme is the "Caribbean by day" variant: the same palette on sand and paper. Both themes' colours are the CSS custom properties at the top of `css/style.css`. The whole system — tokens, components and states — is documented in [DESIGN.md](DESIGN.md), the canonical reference the CV site ([roanny/roanny.github.io](https://github.com/roanny/roanny.github.io)) mirrors; a token changed here is changed there too.

## Contact form

Connected to [Formspree](https://formspree.io) (project **Coabana** → form *Contacto sitio web*); the endpoint is the `FORM_ENDPOINT` constant in `js/main.js`. Submissions arrive by email. If the endpoint is ever emptied or fails, the form falls back to a `mailto:` with the message already written.

**Restrict to Domain** is set to `coabana.github.io` in the Coabana project, so Formspree accepts submissions only from this domain and its subdomains.

## Development

There is no build and nothing to install: edit, preview with `python3 -m http.server`, and update `sitemap.xml`'s `lastmod` when the page's content changes.

CI (`Validate`) checks that `index.html` and `404.html` are valid HTML (the W3C Nu checker), that the `es` and `en` dictionaries of `js/i18n.js` carry the same keys and cover every `data-i18n` key `index.html` names, that `sitemap.xml` is well-formed, that the fleet's shared blocks under `.claude/` are unchanged and, on pull requests, that every commit subject is at most 72 characters with no trailing period. Changes land on `main` by fast-forward once `Validate` is green.

## Deployment

GitHub Pages serves `main` from the root (**Settings → Pages → Deploy from a branch**, `main`, `/ (root)`), so every landing on `main` is published within minutes; `.nojekyll` makes Pages serve the files as they are. The repository is named `coabana.github.io`, so Pages publishes it at the root of the organisation's domain.

## Documentation

| File | What it holds |
|---|---|
| `DESIGN.md` | The design system: tokens, components and states, shared with the CV site |
| `.claude/CLAUDE.md` | How a Claude Code session works here |

## The solution

Coabana's product line is the Looker Developer Agent — `looker-agent`, `looker-mcp-server`, `coabana-mcp-toolbox`, `looker-agent-app` and `looker-agent-extension`, deployed for VECI by `looker-agent-deploy` and, as a multi-tenant SaaS, by `coabana-agent-platform` (which also composes `lookerctl`). This repository is the company's public face beside it: it names Google Cloud services, not those products, and ships nothing that runs beyond the page's own script.

## License

Apache-2.0 for the code — see [`LICENSE`](LICENSE). The Coabana name, logo and brand texts are not licensed.
