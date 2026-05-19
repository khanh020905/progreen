# Mobile-Only Gift Box Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a beautiful mobile-only animated gift box with a pulse text below the main white form card to balance the layout and fill empty space on mobile screens.

**Architecture:** Create an animated layout section using Framer Motion (`motion.div` and `motion.p`) that renders only on mobile viewports using the Tailwind `md:hidden` responsive utility.

**Tech Stack:** Next.js, React, Tailwind CSS, Framer Motion, Lucide icons.

---

## Chunk 1: Test & Implementation

### Task 1: Add Test for Mobile-Only Gift Box

**Files:**
- Modify: `src/__tests__/redeem.test.tsx`

- [ ] **Step 1: Write the failing test**

  Modify `src/__tests__/redeem.test.tsx` to add a new test that checks if the new gift box text `"Phần quà hấp dẫn đang chờ bạn!"` exists on the Redeem page.

  Add the following test block inside the `describe('Redeem Page')` block:
  ```typescript
  it('should render the mobile-only gift box illustration and description text', () => {
    render(<RedeemPage />);
    const descriptionText = screen.getByText(/Phần quà hấp dẫn đang chờ bạn!/i);
    expect(descriptionText).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run test to verify it fails**

  Run: `npm run test`
  Expected: FAIL with "Unable to find an element with text: /Phần quà hấp dẫn đang chờ bạn!/i"

- [ ] **Step 3: Commit the failing test**

  ```bash
  git add src/__tests__/redeem.test.tsx
  git commit -m "test: add failing test for mobile gift box"
  ```

### Task 2: Implement the Mobile-Only Gift Box

**Files:**
- Modify: `src/app/redeem/page.tsx:409-415`

- [ ] **Step 1: Add the mobile-only gift box section below the white card**

  Open `src/app/redeem/page.tsx`, search for the closing tag of the white card container (around line 410, right before the closing tag of the inner content container). 
  
  Insert the following block:
  ```tsx
  {/* Mobile-Only Gift Box Illustration */}
  <div className="md:hidden flex flex-col items-center justify-center mt-8 pb-10">
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative w-40 h-40 drop-shadow-[0_20px_35px_rgba(45,90,39,0.15)]"
    >
      <Image
        src="/faq-gift.png"
        alt="Hộp quà may mắn"
        fill
        className="object-contain"
        priority
      />
    </motion.div>
    <motion.p
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d5a27] mt-3 text-center"
    >
      Phần quà hấp dẫn đang chờ bạn!
    </motion.p>
  </div>
  ```

- [ ] **Step 2: Run tests to verify they pass**

  Run: `npm run test`
  Expected: PASS

- [ ] **Step 3: Verify style & responsiveness locally**

  Run: `npm run build`
  Expected: The build passes cleanly with no compilation or TypeScript errors.

- [ ] **Step 4: Commit the final changes**

  ```bash
  git add src/app/redeem/page.tsx
  git commit -m "feat: add animated mobile-only gift box to redeem page"
  ```
