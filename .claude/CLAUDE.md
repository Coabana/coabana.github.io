@../AGENTS.md

# coabana-site — Claude Code

`AGENTS.md`, imported above, says what the site is, how it is previewed and checked, and the conventions a change respects; this file adds what holds only for a Claude Code session.

## Fleet

This session answers to `coabana-site`. The CV that mirrors `DESIGN.md` is the `roanny-site` session (checkout `roanny/`): a changed token is told to that session by message. The fleet's `release` shared block and `/release` do not apply here, since Pages serves `main`.

## Facts from other repositories

Before stating a fact about another repository, verify it with the `contract-checker` agent against that repository's files.

## Index

- `.claude/rules/git-hygiene.md` — linear history, landing is publishing, the 72-character subject, the commit author, no force push or remote-ref deletion, Dependabot, the round authorization (every session).
- `.claude/rules/rules-discipline.md` — what a rule file may hold (fleet shared block).
- `.claude/rules/markdown-docs.md` — the shape of the Markdown working documents (fleet shared block).
- No commands and no agents: `/release` does not apply (§ Fleet) and there is no code to review beyond the page's script.

`.claude/settings.json` is hand-written: `allow` holds the daily work (the git and `gh` reads, the branch push, `diff`, the local preview, the recoveries `git-hygiene.md` names), `deny` holds the fleet's groups A–C; there is no group D.
