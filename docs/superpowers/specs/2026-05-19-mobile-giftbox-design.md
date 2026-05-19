# Spec: Mobile-Only Animated Gift Box Section

## 1. Context & Purpose
In the redeem voucher interface (`/redeem`), mobile users see a large empty white space under the main card container (specifically under the "Quay lại" / "Go back" button) because of the `min-h-screen` container height. To improve mobile aesthetics and complete the visual balance of the page, the client requested adding a decorative gift box illustration under the main card for mobile viewports only, as well as fixing any visual emptiness.

## 2. Design Details
- **Target Viewport**: Mobile devices (`max-width: 767px` / Tailwind `md` breakpoint hidden state: `md:hidden`).
- **Asset**: `/faq-gift.png` (a beautiful high-quality 3D gift box with floating premium elements).
- **Animation**: Smooth infinite floating/breathing animation using `framer-motion` (translating Y-axis smoothly between `0px` and `-10px` over `3s`).
- **Typography**: A small tracking-wide, bold, uppercase accent text below the gift box: `PHẦN QUÀ HẤP DẪN ĐANG CHỜ BẠN!` with a pulsing visual animation.
- **Spacing**: Margins of `mt-8` and bottom padding of `pb-10` to avoid bottom border clipping.

## 3. Component & Structure
The section will be appended directly below the white card component inside `/src/app/redeem/page.tsx`:

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

## 4. Verification & Testing
- Validate layout responsiveness:
  - Mobile (viewport `< 768px`): Gift box is visible, floating, centered.
  - Tablet & Desktop (viewport `>= 768px`): Gift box is completely hidden.
- Verify Next.js build passes.
