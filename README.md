# 🤖 AI Code Review Assistant — Demo Repository

> **⚠️ WARNING: This repository contains intentionally buggy code.**
> It is designed solely to test and demonstrate an AI Code Review system.
> **Do NOT use any of this code in production.**

---

## 📋 Purpose

This repository simulates a small Node.js backend project that contains realistic coding mistakes across multiple categories:

- 🔐 **Security Vulnerabilities** — SQL injection, hardcoded credentials, use of `eval()`
- ⚡ **Performance Problems** — O(n²) algorithms, inefficient string concatenation
- 🐛 **Logic Bugs** — Missing `await`, broken promise chains, undefined variable access
- 🧹 **Code Quality Issues** — Use of `var`, loose equality (`==`), silent error swallowing

The AI Code Review Assistant analyzes pull requests against this repository and posts detailed feedback comments automatically.

---

## 📁 File Overview

| File | Intentional Issues |
|------|-------------------|
| `login.js` | Hardcoded credentials, loose equality (`==`), accessing property of `undefined`, weak token |
| `api.js` | Missing `await`, broken `.then()` chain, no error handling, Promise anti-pattern |
| `database.js` | SQL injection (3 queries), hardcoded DB password, password field returned to client |
| `utils.js` | O(n²) duplicate detection, `eval()` usage, array mutation, `var` scope leaks |

---

## 🚀 Setup (for demo purposes only)

```bash
npm install
node index.js
```

**Dependencies:**
- `node-fetch`
- `mysql2`

---

## 🔀 How to Create a Pull Request with an Additional Bug

Follow these steps to create a `buggy-update` branch with one new bug added, so the AI Code Review system has code changes to analyze.

### Step 1 — Clone the repository

```bash
git clone https://github.com/ashxlight/test.git
cd test
```

### Step 2 — Create and switch to the `buggy-update` branch

```bash
git checkout -b buggy-update
```

### Step 3 — Add a new bug to `utils.js`

Open `utils.js` and add the following intentionally buggy function at the bottom (before `module.exports`):

```js
// BUG: parseInt without radix — can cause unexpected octal parsing
function parseUserAge(ageString) {
  return parseInt(ageString); // BUG: Missing radix argument (should be parseInt(ageString, 10))
}
```

Then add `parseUserAge` to the `module.exports` object:

```js
module.exports = {
  findDuplicates,
  processItems,
  flattenArray,
  buildCsvRow,
  sortUsers,
  calculateExpression,
  parseUserAge, // ← add this line
};
```

### Step 4 — Stage and commit the change

```bash
git add utils.js
git commit -m "feat: add age parsing utility"
```

### Step 5 — Push the branch to GitHub

```bash
git push origin buggy-update
```

### Step 6 — Open a Pull Request

1. Go to **https://github.com/ashxlight/test**
2. Click **"Compare & pull request"** for the `buggy-update` branch
3. Set the base branch to `main`
4. Title: `feat: add age parsing utility`
5. Click **"Create pull request"**

The AI Code Review Assistant will now automatically analyze the diff and post a review comment listing all detected issues in `utils.js`.

---

## 🧪 Expected AI Review Output

When reviewing the PR above, a well-configured AI Code Review Assistant should detect:

- `parseInt` without radix (logic bug)
- Existing issues in `utils.js` context (O(n²), `eval`, `var` usage)
- Potentially flag `calculateExpression` using `eval()` as a critical security issue

---

## 📄 License

MIT — for educational/testing purposes only.
