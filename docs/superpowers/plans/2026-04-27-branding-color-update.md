# Branding Color Update Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the application's primary and secondary color palette to align with the new "Pro Green Life" branding image.

**Architecture:** We will define CSS variables in the `:root` of `globals.css` and map them to Tailwind's `@theme`. Then, we will refactor existing UI utility classes to use these variables, ensuring a centralized color management system.

**Tech Stack:** Next.js 15, Tailwind CSS v4, PostCSS.

---

## Chunk 1: Define Color Tokens

### Task 1: Update globals.css Root & Theme
**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add new color tokens to :root and @theme**
  
```css
@theme {
  --font-sans: 'Inter', 'Montserrat', system-ui, sans-serif;
  --color-brand-primary: #004d3d;
  --color-brand-primary-hover: #00362b;
  --color-brand-accent: #15803d;
  --color-brand-accent-soft: #f0fdf4;
}

:root {
  /* ... existing ... */
  --primary: var(--color-brand-primary);
  --primary-hover: var(--color-brand-primary-hover);
  --accent: var(--color-brand-accent);
  --accent-soft: var(--color-brand-accent-soft);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: define new branding color tokens in globals.css"
```

## Chunk 2: Refactor UI Components

### Task 2: Update Button Styles
**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update .btn-primary to use tokens**

```css
.btn-primary {
  background-color: var(--primary);
  /* ... */
}
.btn-primary:hover {
  background-color: var(--primary-hover);
}
```

- [ ] **Step 2: Update .btn-secondary hover state**

```css
.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update button components with new branding colors"
```

### Task 3: Update Badges and Inputs
**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update .badge-green to use tokens**

```css
.badge-green {
  background-color: var(--accent-soft);
  color: var(--accent);
  border: 1px solid rgba(21, 128, 61, 0.1);
}
```

- [ ] **Step 2: Update .input-field focus state**

```css
.input-field:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.1);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update badge and input focus states with branding colors"
```

## Chunk 3: Verification

### Task 4: Visual Verification
**Files:**
- Manual Check: `src/app/page.tsx`

- [ ] **Step 1: Run the dev server and verify the homepage**
  Run: `npm run dev`
  Check: Ensure headings are Dark Green and buttons are the new brand colors.

- [ ] **Step 2: Final Commit**

```bash
git commit --allow-empty -m "chore: branding color update complete and verified"
```
