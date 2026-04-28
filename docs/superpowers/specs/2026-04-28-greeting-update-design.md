# Design Spec: Pro Green Life Landing Page Greeting Update

## Overview
Update the landing page greeting text to be more welcoming and less self-praising by removing certain badges that make customers uncomfortable.

## Requirements
- Replace the current hero heading with: "Chào mừng bạn tới chương trình Tặng quà tri ân khách hàng của Pro Green Life".
- Keep the "Nhận quà tại đây" button.
- Remove the "Chính hãng" (Verified), "Dễ dàng nhận" (Simple), and "98% Hài lòng" (Trustworthy) badges.
- Ensure the layout remains elegant and balanced on both mobile and desktop.

## Proposed Changes

### Frontend (src/app/page.tsx)
- **Hero Heading**:
    - Current:
      ```tsx
      Mỗi lần quét mã <br /> là một trải nghiệm <br /> xứng đáng.
      ```
    - New:
      ```tsx
      Chào mừng bạn tới chương trình <br /> Tặng quà tri ân khách hàng <br /> của Pro Green Life
      ```
    - Adjust font size from `text-3xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]` to something more compact like `text-2xl sm:text-4xl lg:text-5xl` to accommodate the longer text.
- **Badges Section**:
    - Remove the entire `div` containing the `ShieldCheck`, `RotateCcw`, and `Star` badges (lines 133-160).
- **Button Section**:
    - Maintain the current styling and link for the "Nhận quà tại đây" button.

## Verification Plan
1. **Visual Check**: Open the local development server and verify:
    - The new greeting text is correctly displayed.
    - The font size looks balanced and readable.
    - The badges are gone.
    - The overall layout (especially on mobile) is clean and centered.
2. **Link Check**: Click the "Nhận quà tại đây" button to ensure it still navigates to `/redeem`.
