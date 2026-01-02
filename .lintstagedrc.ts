export default {
    ".lintstagedrc.ts": ["bun run --bun prettier --write --ignore-path .gitignore"],
    "*.(json|md|yaml|yml)": ["bun run --bun prettier --write --ignore-path .gitignore"],
    "*.(js|mjs|ts)": ["bun run --bun prettier --write --ignore-path .gitignore", "bun run --bun eslint --fix"],
    "package.json": () => ["bun install", "git add bun.lock"],
};
