# Design Spec: Pro Green Life Branding Color Update

## 1. Overview
**Goal:** Update the application's primary and secondary color palette to align with the new "Pro Green Life" branding image.
**Target Aesthetic:** "Premium Professional" – a high-end, organic, and trustworthy feel.

## 2. Color System (Tokens)
We will implement the following CSS variables in `:root` and map them to Tailwind's theme:

| Token Name | Hex Value | Usage |
| :--- | :--- | :--- |
| `--color-primary` | `#004d3d` | Headings, Primary Buttons, Main Brand Accents |
| `--color-primary-hover` | `#00362b` | Interaction states for primary elements |
| `--color-accent` | `#15803d` | Secondary buttons, Success states, Icons, Selection borders |
| `--color-accent-soft` | `#f0fdf4` | Soft backgrounds, Badge tints, Card hover effects |
| `--color-text-main` | `#1a202c` | Main body text |

## 3. UI Component Changes

### 3.1 Buttons
- **`.btn-primary`**: 
  - Background: `var(--color-primary)`
  - Hover: `var(--color-primary-hover)`
  - Shadow: Updated to match the deeper green tone.
- **`.btn-secondary`**:
  - Hover text and border: `var(--color-accent)`

### 3.2 Badges & Indicators
- **`.badge-green`**:
  - Background: `var(--color-accent-soft)`
  - Text: `var(--color-accent)`
  - Border: `1px solid rgba(21, 128, 61, 0.1)`

### 3.3 Inputs & Forms
- **`.input-field:focus`**:
  - Border Color: `var(--color-accent)`
  - Shadow: Subtle glow using `var(--color-accent)` with low opacity.

### 3.4 Page Layout
- **Headings (h1, h2, h3)**: Default to `var(--color-primary)`.
- **Sidebar Links**: Active states will use `var(--color-primary)`.

## 4. Implementation Plan (Summary)
1.  Update `src/app/globals.css` with the new `:root` variables and `@theme` definitions.
2.  Refactor existing utility classes (`.btn-primary`, etc.) to use these variables instead of hardcoded hex values.
3.  Verify the changes across the main landing page and admin dashboard.

## 5. Success Criteria
- The visual identity feels cohesive and matches the provided branding image.
- All "action" elements (buttons, links) are easily identifiable.
- Contrast ratios meet accessibility standards for text legibility.
