# Design Specification: Remove Email Field

## 1. Overview
The goal of this task is to completely remove the "Email" field from the Pro Green Life application. This field was previously an optional input in the gift redemption form. The removal should be reflected in the customer-facing UI, the admin dashboard, the claims management interface, and the backend database model.

## 2. Objectives
- Remove the Email input field from the customer redemption flow.
- Remove the Email display and references from the Admin Dashboard and Claims management pages.
- Update the `Claim` model to remove the `email` field.
- Update API logic to stop handling the `email` field.

## 3. Detailed Design

### 3.1 Frontend Changes (Customer)
**File:** `src/app/redeem/page.tsx`
- **State Update:** Remove `email: ''` from the `customerInfo` object in the `useState` hook.
- **UI Update:** Remove the `<div className="space-y-3">...</div>` block containing the Email label and input field (lines 295-304 approx).
- **Submit Logic:** The spread operator `...customerInfo` in `handleSubmitClaim` will automatically stop sending `email` once it's removed from the state.

### 3.2 Frontend Changes (Admin)
**File:** `src/app/admin/claims/page.tsx`
- **Table/Export:** Update `exportToCSV` to remove 'Email' from the CSV structure (if present, though current code seems to skip it in CSV but has it in modal).
- **Details Modal:** Remove the "Email Address" section (lines 264-269 approx).

**File:** `src/app/admin/dashboard/page.tsx`
- **Recent Claims:** Remove the `{claim.email || claim.phone}` fallback display (line 113 approx), showing only the phone number.
- **Details Modal:** Remove the "Email Address" section (lines 187-191 approx).

### 3.3 Backend Changes
**File:** `src/models/Claim.ts`
- **Interface:** Remove `email?: string;` from `IClaim` interface.
- **Schema:** Remove the `email` field definition from `claimSchema`.

**File:** `src/app/api/claims/route.ts`
- **Destructuring:** Remove `email` from the destructured object in `POST` method (line 25 approx).
- **Instantiation:** Remove `email` from the `new Claim({...})` calls for both test mode and production mode.

## 4. Migration & Compatibility
- Since MongoDB is schemaless, existing records will still have the `email` field in the database, but the application will no longer read or display them.
- No database migration script is strictly required unless the user wants to purge old emails from the database. Based on the request "xóa ở cả admin luôn", simple removal from the model and UI is sufficient.

## 5. Verification Plan
- **Manual Test (Customer):** Open the redemption form at `/redeem`, proceed to step 3, and verify the Email field is gone. Submit a test claim and verify it works.
- **Manual Test (Admin):** Open `/admin/dashboard` and `/admin/claims`, verify the Email field is no longer visible in the lists or detail modals.
- **API Test:** Verify that submitting a claim without an email field results in a successful record in the database.
