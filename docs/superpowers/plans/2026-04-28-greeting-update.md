# Landing Page Greeting Update Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the landing page hero section with a new greeting and remove self-praising badges.

**Architecture:** Modify the hero section in `src/app/page.tsx` to update the heading text/styling and delete the badge component block.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, Lucide React icons.

---

## Chunk 1: Hero Section Content Update

### Task 1: Update Greeting Text and Style
**Files:**
- Modify: `src/app/page.tsx:89-98`

- [ ] **Step 1: Replace greeting text and adjust font size**
  Change lines 89-98 to:
  ```tsx
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0e2114] leading-[1.2] tracking-tight"
  >
    Chào mừng bạn tới chương trình <br /> Tặng quà tri ân khách hàng <br />
    <span className="text-[#3a6934] relative">
      của Pro Green Life
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -bottom-1 left-0 h-1 bg-[#3a6934]/20 rounded-full"
      />
    </span>
  </motion.h1>
  ```

- [ ] **Step 2: Commit greeting change**
  ```bash
  git add src/app/page.tsx
  git commit -m "feat: update hero greeting text and font size"
  ```

### Task 2: Remove Trust Badges
**Files:**
- Modify: `src/app/page.tsx:133-160`

- [ ] **Step 1: Delete the badges section**
  Remove the entire `div` block from line 133 to 160 (Trust Indicators).

- [ ] **Step 2: Commit badge removal**
  ```bash
  git add src/app/page.tsx
  git commit -m "feat: remove self-praising trust badges"
  ```

## Chunk 2: Verification

### Task 3: Visual and Functional Verification
- [ ] **Step 1: Run dev server**
  Ensure `npm run dev` is running.
- [ ] **Step 2: Verify visual appearance**
  Check the landing page in the browser to ensure the text fits well and the badges are gone.
- [ ] **Step 3: Verify button functionality**
  Click "Nhận quà tại đây" and ensure it still links to `/redeem`.
- [ ] **Step 4: Final verification check**
  Run `npx playwright test` if any tests exist, or manually confirm.
