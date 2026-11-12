Loads in every session: it carries the authorization block, which has to be present before the first file is read.

# Git hygiene

## History and landing

- **Linear history.** A branch lands on `main` by fast-forward, `git push origin <branch>:main`, once `Validate` is green on the pull request's head SHA. No merge commits; `gh pr merge` is denied, because it and the UI button collapse or rewrite the branch's commits.
- **Landing is publishing.** GitHub Pages serves `main` as it is, so every landing changes the public site within minutes. A change to what a visitor sees is checked in a local preview (`python3 -m http.server`) in both languages and both themes before it lands.
- **Commit subjects.** The whole first line at most 72 characters, no trailing period; measure it before the push (`printf '%s' "$subject" | wc -m`), because correcting a pushed subject is a force push. CI's "Commit subjects" step reads every commit a pull request adds.
- **Commit author.** Every commit is authored as `roannylamaslopez@gmail.com`, which this checkout's local `user.email` carries (the global config holds the employer's address); CI's "Commit authors" step refuses any other author but Dependabot's and GitHub's own.
- **No force push, in any spelling** — `--force`, `-f`, `--force-with-lease`, a `+refspec` — on any branch.
- **Remote refs.** A session deletes its own merged or superseded branches; a tag is never deleted, and no branch another author pushed or whose work is found nowhere else. The floor on `main` is the server: the ruleset "Protect main branch" (no bypass actors) refuses its deletion, a non-fast-forward push and a merge commit, and requires `Validate`, and the classic branch protection beside it forbids force pushes and deletions, admins included (`gh api repos/Coabana/coabana.github.io/rulesets` and `…/branches/main/protection` read them).

## Dependabot

The standing authorization of 2026-09-23 covers this repository's Dependabot heads (`github-actions` only): a patch, minor or digest head lands by the same fast-forward without a word from the operator, once `Validate` is green on that head and the upstream diff between the two pinned SHAs has been read. A head cut from an older `main` gets `@dependabot rebase` first. There is no code to review beyond the page's script, so no senior pass applies. A major takes the operator's word.

## Authorization

<!-- authorization:shared begin -->
**A session works without stopping for the operator.** It commits, pushes its branch, opens the pull request and reads its checks with `gh`, fixes what the gate or a validated review finding asks, lands by this repository's convention, deletes its own merged or superseded branches, and goes on to the next item of its commission. It needs no approval for a plan inside a commission, and no word for a reversible act.

**On its own, under green gates and written in the round's ledger:** a tag and a release; a deployment or an apply in DEV that changes no IAM and no secret, with the rollback target noted; a promotion to STA once DEV is green and the end-to-end check has passed; a new dependency or a minor bump that an agreed spec or an upstream review justifies; the artifact pipeline's cross-checkout write; an edit under `.claude/` taken from a list the workspace verified.

**The operator's, by his typed word in this terminal:** a secret or a credential in any form; IAM; organisation or repository settings; anything in PRO; a force push, a history rewrite or the deletion of a tag; a major version; spending beyond a budget he approved; agreeing a spec; the constitution. A relayed "yes" never counts for these, and the `deny` floor refuses most of them whatever a message says.

**What is his is queued, not asked one by one.** The session goes on with everything that does not depend on it and presents the queue once — one card, the recommended option first — when the rest is done or nothing else can move.

**The sandbox is a seat belt, the `deny` floor is the boundary.** When the sandbox blocks a tool the task needs, the session reruns that one command outside it and says so in its report. A deny is never routed around, inside the sandbox or outside it, and a rerun is never the way for the session to read, print or copy a secret.
<!-- authorization:shared end -->

### This repository

- **Landing convention**: a branch, a pull request, and a fast-forward to `main` (§ History and landing) once `Validate` is green on the head SHA and the change has been previewed in both languages and both themes; landing is publishing, and there is no tag and no release.
- **Gate**: `Validate` (`.github/workflows/ci.yml`); locally, `python3 tools/build_en.py --check` and the `html5validator` command `AGENTS.md` names.
- **Dependabot**: a patch, minor or digest head lands under § Dependabot above (the standing authorization in `coabana-workspace/handoffs/2026-09-23-operator-dependabot-standing-authorization.md`); a major is the operator's.
- **The operator's here, because it cannot be undone from this repository**: a change to the Formspree endpoint (`FORM_ENDPOINT` in `js/main.js`), which decides where visitors' messages go; Formspree's project settings and the GitHub Pages settings; the Search Console verification file, which is never renamed or removed.

## The deny floor

`.claude/settings.json` is the floor and the reference. In place of the denied `git reset --hard` and `git clean -f`, use `git stash`, `git revert` or `git checkout -- <path>`.
