# coabana-site

The public one-page site of Coabana, a data-engineering studio on Google Cloud: what the brand is, its services, its stack and a contact form, served at `https://coabana.github.io/` from the repository `Coabana/coabana.github.io` (checkout folder `coabana/`). It is not a product and nothing consumes it; its content names Google Cloud services only, and the day it names a Coabana product, that claim is verified against the product's own repository. The Search Console verification file `googlede4b53d1c977dbfc.html` is never renamed or removed. Every landing on `main` is published within minutes, so nothing lands that has not been previewed.

## The tree

- `index.html` — the whole page, sections in order, with the Spanish text as the no-JavaScript default; every translatable node carries `data-i18n` (or `data-i18n-content`, `-placeholder`, `-aria-label`) naming a key.
- `js/i18n.js` — the text: the `I18N` object with the `es` and `en` dictionaries, the same keys in both.
- `js/main.js` — language (URL `?lang=`, then the saved choice, then the browser), theme (URL `?theme=`, then the saved choice, then the system), menu, reveal animations and the contact form (`FORM_ENDPOINT`, Formspree; a `mailto:` fallback).
- `css/style.css` — the styles; the design tokens of both themes are the custom properties at its top.
- `DESIGN.md` — the canonical design system: tokens, components and states. It is the design-token source that `roanny/roanny.github.io` (the operator's CV) mirrors by hand in the `<style>` of its `index.html`; a token changed here is reported to that repository, never edited there from here.
- `404.html`, `robots.txt`, `sitemap.xml`, `og-image.jpg`, `assets/`, the verification file above, and `.nojekyll` (Pages serves the files as they are).

## Previewing and checking

There is no build and nothing to install. Edit a text in both dictionaries of `js/i18n.js`, and in `index.html` too when the Spanish default changes. Preview with `python3 -m http.server 8000` and open `http://localhost:8000/` with `?lang=en`, `?lang=es`, `?theme=light` and `?theme=dark`. Update `sitemap.xml`'s `lastmod` when the page's content changes.

CI (`Validate`, `.github/workflows/ci.yml`) runs the checks; the HTML one runs locally, with Java, as `pip install html5validator==0.4.2 && html5validator --files index.html 404.html`. It refuses invalid HTML in `index.html` or `404.html` (the W3C Nu checker); `es` and `en` dictionaries with different keys, or a `data-i18n` key `index.html` names that they lack; a malformed `sitemap.xml`; a changed shared block under `.claude/`; on pull requests, a commit subject over 72 characters or with a trailing period; and on pull requests and pushes, a commit author other than the one below.

## Conventions

- **Language.** The content — the page, `404.html` and both dictionaries — is Spanish by default with English beside it, for its audience; the working documents — README, `DESIGN.md`, this file, the rules, code comments and commit subjects — are English.
- **Commits.** The whole subject line at most 72 characters, no trailing period. Authored as `Roanny Lamas <roannylamaslopez@gmail.com>`, set in this checkout's local git config (`git config user.email`; check it before the first commit in a fresh clone), because the operator's global config carries the employer's address for the client repositories.
- **Landing.** Work on a branch, open a pull request, and land it on `main` by fast-forward (`git push origin <branch>:main`) once `Validate` is green on its head. No merge commits, no force push, no remote-ref deletion.
- **Serving.** GitHub Pages deploys `main` from the root ("Deploy from a branch"): there is no release and no tag. Formspree's project settings (the form, Restrict to Domain) live outside the repository and are the operator's.

## Where the rules live

- `.claude/rules/git-hygiene.md` — the landing, commit and authorization rules in full.
- `.claude/rules/markdown-docs.md` and `.claude/rules/rules-discipline.md` — the shape of the working documents and of a rule file.
- `.claude/CLAUDE.md` — the rest of the repository's instructions and their index.

As a site it carries no `docs/specs/` and no `CONTRIBUTING.md`.
