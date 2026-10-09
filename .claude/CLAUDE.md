# coabana-site

The public one-page site of Coabana, a data-engineering studio on Google Cloud: what the brand is, its services, its stack and a contact form. It is served at `https://coabana.github.io/` from the repository `Coabana/coabana.github.io`; the checkout folder is `coabana/`. It is not a product and nothing consumes it. Its content names Google Cloud services only, no fleet product; the day it names one, that claim maps to the product's repository the way the deck's do, verified with the `contract-checker` agent.

## The tree

- `index.html` — the whole page, sections in order, with the Spanish text as the no-JavaScript default; every translatable node carries `data-i18n` (or `data-i18n-content`, `-placeholder`, `-aria-label`) naming a key.
- `js/i18n.js` — the text: the `I18N` object with the `es` and `en` dictionaries, the same keys in both.
- `js/main.js` — language (URL `?lang=`, then the saved choice, then the browser), theme (URL `?theme=`, then the saved choice, then the system), menu, reveal animations and the contact form (`FORM_ENDPOINT`, Formspree; a `mailto:` fallback).
- `css/style.css` — the styles; the design tokens of both themes are the custom properties at its top.
- `DESIGN.md` — the canonical design system: tokens, components and states.
- `404.html`, `robots.txt`, `sitemap.xml`, `og-image.jpg`, `assets/`, the Search Console verification file `googlede4b53d1c977dbfc.html` (never renamed or removed), and `.nojekyll` (Pages serves the files as they are).

## Editing and previewing

There is no build. Edit a text in both dictionaries of `js/i18n.js`, and in `index.html` too when the Spanish default changes. Preview with `python3 -m http.server 8000` and open `http://localhost:8000/` with `?lang=en`, `?lang=es`, `?theme=light` and `?theme=dark`. Update `sitemap.xml`'s `lastmod` when the page's content changes.

## Serving

GitHub Pages deploys `main` from the root ("Deploy from a branch"), so landing on `main` is publishing; there is no release, no tag and no `/release` (the fleet's `release` shared block does not apply). Formspree's project settings (the endpoint's form, Restrict to Domain) live outside the repository and are the operator's.

## The one coupling

`DESIGN.md` here is the design-token source that `roanny-site` (`roanny/roanny.github.io`, checkout `roanny/`, the operator's CV) mirrors by hand in the `<style>` of its `index.html`. A token changed here is told to that session; this repository never edits that one.

## Language

The content — the page, `404.html` and both dictionaries — is Spanish by default with English beside it, for its audience; the working documents — README, `DESIGN.md`, this file, rules, code comments from now on and commit subjects — are English.

## Git identity

Commits are authored as the operator's global git config has it, `Roanny Lamas <roanny.lamaslopez@viajeseci.es>`.

## Index

- `.claude/rules/git-hygiene.md` — linear history, landing is publishing, the 72-character subject, no force push or remote-ref deletion, Dependabot, the round authorization (every session).
- `.claude/rules/rules-discipline.md` — what a rule file may hold (fleet shared block).
- `.claude/rules/markdown-docs.md` — the shape of the Markdown working documents (fleet shared block).
- No commands and no agents: there is no release and no code to review beyond the page's script.

`.claude/settings.json` is hand-written: `allow` holds the daily work (the git and `gh` reads, the branch push, `diff`, the local preview, the recoveries `git-hygiene.md` names), `deny` holds the fleet's groups A–C; there is no group D.
