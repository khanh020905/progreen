# Inventory & Product Management Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a comprehensive inventory management system for rewards, featuring automatic stock deduction upon claim confirmation, manual stock adjustments with history tracking, and a swipeable carousel for T-shirt variations.

**Architecture:** Extend the `Reward` model with `stock` and `stockHistory` fields. Implement a dedicated admin settings page for stock management and update the claim processing API to trigger inventory events. Enhance the frontend with inventory indicators and a `framer-motion` carousel.

**Tech Stack:** Next.js (App Router), MongoDB/Mongoose, Framer Motion, Tailwind CSS, Lucide React.

---

### Task 1: Database & Model Update

**Files:**
- Modify: `src/models/Reward.ts`

- [ ] **Step 1: Add stock and stockHistory to Reward model**
- [ ] **Step 2: Commit model changes**

### Task 2: API for Manual Stock Update

**Files:**
- Create: `src/app/api/rewards/[id]/stock/route.ts`

- [ ] **Step 1: Implement the stock update endpoint**
- [ ] **Step 2: Commit API changes**

### Task 3: Sidebar & Admin Navigation

**Files:**
- Modify: `src/components/layout/AdminLayout.tsx`

- [ ] **Step 1: Rename Settings to Setting Product**
- [ ] **Step 2: Commit sidebar changes**

### Task 4: Product Settings Page UI

**Files:**
- Create: `src/app/admin/settings/page.tsx`

- [ ] **Step 1: Implement the Product Management dashboard**
- [ ] **Step 2: Implement History Drawer/Modal**
- [ ] **Step 3: Commit UI changes**

### Task 5: Automatic Stock Deduction

**Files:**
- Modify: `src/app/api/claims/[id]/route.ts`

- [ ] **Step 1: Add deduction logic to status update**
- [ ] **Step 2: Commit logic changes**

### Task 6: User UI - Reward Selection Enhancements

**Files:**
- Modify: `src/app/redeem/page.tsx`

- [ ] **Step 1: Show stock indicators in cards**
- [ ] **Step 2: Implement Out of Stock state**
- [ ] **Step 3: Implement Swipeable Carousel for T-shirts**
- [ ] **Step 4: Commit frontend changes**
