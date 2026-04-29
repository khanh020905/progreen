# Remove Email Field Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely remove the email field from the customer redemption form, admin dashboard, and backend database model to simplify data collection.

**Architecture:** Update the Mongoose schema, API request handling, and React components to eliminate references to the `email` field while ensuring existing logic for phone numbers and addresses remains intact.

**Tech Stack:** Next.js (App Router), MongoDB/Mongoose, Tailwind CSS, Lucide Icons.

---

## Chunk 1: Backend Updates

### Task 1: Update Claim Model
**Files:**
- Modify: `src/models/Claim.ts`

- [ ] **Step 1: Remove email from IClaim interface**
- [ ] **Step 2: Remove email from claimSchema**
- [ ] **Step 3: Commit changes**

### Task 2: Update Claims API
**Files:**
- Modify: `src/app/api/claims/route.ts`

- [ ] **Step 1: Remove email from POST request destructuring**
- [ ] **Step 2: Remove email from new Claim instance creation (Test Mode)**
- [ ] **Step 3: Remove email from new Claim instance creation (Production Mode)**
- [ ] **Step 4: Commit changes**

---

## Chunk 2: Frontend Updates

### Task 3: Update Customer Redemption Form
**Files:**
- Modify: `src/app/redeem/page.tsx`

- [ ] **Step 1: Remove email from customerInfo initial state**
- [ ] **Step 2: Remove email input JSX block from Step 3**
- [ ] **Step 3: Commit changes**

### Task 4: Update Admin Claims Management
**Files:**
- Modify: `src/app/admin/claims/page.tsx`

- [ ] **Step 1: Remove Email Address display from Details Modal**
- [ ] **Step 2: Verify CSV export doesn't include email (already checked, it doesn't)**
- [ ] **Step 3: Commit changes**

### Task 5: Update Admin Dashboard
**Files:**
- Modify: `src/app/admin/dashboard/page.tsx`

- [ ] **Step 1: Remove email fallback display in recent claims list**
- [ ] **Step 2: Remove Email Address display from Details Modal**
- [ ] **Step 3: Commit changes**

---

## Chunk 3: Verification

### Task 6: Manual Verification
- [ ] **Step 1: Restart dev server and verify no build errors**
- [ ] **Step 2: Test customer redemption flow (Step 3 should have no email field)**
- [ ] **Step 3: Test admin claims detail view (should have no email field)**
- [ ] **Step 4: Test admin dashboard detail view (should have no email field)**
- [ ] **Step 5: Final Commit**
