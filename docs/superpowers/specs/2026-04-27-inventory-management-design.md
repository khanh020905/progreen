# Design Doc: Inventory & Product Management System

This document outlines the implementation of an inventory tracking system for the Pro Green Life rewards platform. It includes admin management, automatic stock deduction, and user-facing stock indicators.

## 1. Data Model Changes

### Reward Model (`src/models/Reward.ts`)
- **`stock`**: `Number`, default: `0`. Represents current inventory.
- **`stockHistory`**: `Array` of objects:
  - `date`: `Date`
  - `change`: `Number` (e.g., +10 or -1)
  - `reason`: `String` (e.g., "Manual Update", "Claim Confirmed")
  - `type`: `String` (enum: `'manual'`, `'automatic'`)

## 2. API Logic

### Claim Confirmation (`src/app/api/claims/[id]/route.ts`)
- **Logic**: When a `PUT` request updates status to `'Confirmed'`:
  1. Fetch the claim to get `rewardId`.
  2. If `rewardId` exists, find the `Reward`.
  3. Decrement `stock` by 1.
  4. Push to `stockHistory`: `{ date: now, change: -1, reason: "Claim Confirmed (Ref: ${claim.claimReference})", type: "automatic" }`.
  5. Save Reward.

### Stock Management API (`src/app/api/rewards/[id]/stock/route.ts`)
- **Logic**: A new `POST` endpoint for admins to update stock manually.
  - Payload: `{ quantity: number, reason: string }`
  - Updates `stock` and appends to `stockHistory`.

## 3. Admin UI ("Setting Product")

### Sidebar (`src/components/layout/AdminLayout.tsx`)
- Rename `"Settings"` to `"Setting Product"`.

### Product Settings Page (`src/app/admin/settings/page.tsx`)
- **List View**: A table/grid showing:
  - Product Name & Image.
  - Current Stock (with an editable input).
  - "Save" button for each row.
  - "View History" button.
- **History Drawer**: A side-panel showing the `stockHistory` timeline for a specific product.

## 4. User Experience (`src/app/redeem/page.tsx`)

### Reward Selection Card
- **Stock Label**: Display "Còn lại: X" in the card header or footer.
- **Out of Stock State**:
  - If `reward.stock <= 0`:
    - Apply `grayscale` filter to the image.
    - Show an "HẾT HÀNG" (Out of Stock) overlay or badge.
    - Disable the "Chọn" (Select) button and change text to "Tạm hết hàng".
- **T-Shirt Carousel**:
  - Implement a manual swipeable carousel for products with multiple variations (detected by name matching or an image array).
  - Use `framer-motion` for smooth swipe transitions.

## 5. Success Criteria
- [ ] Admins can update stock and see history logs.
- [ ] Confirming a claim automatically reduces stock and logs the reason.
- [ ] Users see real-time stock levels.
- [ ] Users cannot select out-of-stock items.
- [ ] Velosar T-shirts feature a swipeable carousel.
