# 🛒 AuraStore — React 19 E-Commerce Accessibility Testbed

A realistic, full-featured **React 19** e-commerce application designed specifically for accessibility (a11y) testing. The entire application is architected into **3 focused components** packed with deliberate, real-world **WCAG 2.1 & 2.2 violations** (Level A & AA) across navigation, forms, modals, tables, and media for manual and automated testing.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Running on http://localhost:5173

# Build production bundle
npm run build
```

---

## 🧱 The 3 Components

1. **Header (`Header.jsx`)**:
   - Continuous auto-scrolling flash sale promotional ticker.
   - Brand logo and store search bar.
   - Category navigation with hover-only dropdown menu.
   - Wishlist & cart action buttons with dynamic badge counts.
   - User profile avatar.

2. **Product Detail Page (`ProductDetail.jsx`)**:
   - Breadcrumb navigation (`Home / Audio / Aura SoundMax Pro`).
   - High-resolution product photo gallery with clickable thumbnails.
   - Skipped heading hierarchy (`<h1>` to `<h4>`).
   - Raw unicode star ratings.
   - Stock availability status indicator.
   - Interactive color swatches & quantity counter steppers.
   - "Add to Cart" with floating toast confirmation.
   - "Write a Review" interactive modal dialog with form validation.
   - Tabbed sections: Overview, Technical Benchmark comparison matrix, and Verified Customer Reviews.

3. **Footer (`Footer.jsx`)**:
   - Newsletter subscription form.
   - Customer support, product category, and company link columns.
   - Social media icon links.
   - Region / currency hover-only selector.
   - Legal copyright notice.

---

## 🪲 Deliberate WCAG Violations Planted for Testing

- **WCAG 1.1.1 Non-text Content**:
  - Store logo uses generic `alt="image"`.
  - Main product photo uses `alt="image"`; thumbnail photos lack `alt` attributes completely.
  - Star ratings (`★★★★☆`) lack accessible text descriptions (`aria-label`).
  - Search, wishlist, cart, newsletter, and social buttons contain icons with no accessible names.
- **WCAG 1.3.1 Info & Relationships**:
  - Search, modal review, and newsletter `<input>` / `<textarea>` elements lack `<label>` tags (placeholder only).
  - Breadcrumbs constructed using unsemantic `<div>`s instead of `<nav aria-label="Breadcrumb">`.
  - Headings skip levels: `<h1>` Product Title jumps straight to `<h4>` Tagline.
  - Hardware specifications benchmark table constructed using nested `<div>`s instead of `<table>`, `<th>`, and `<td>`.
- **WCAG 1.4.1 Use of Color**:
  - Stock availability indicated solely by colored dots (`dot-green` / `dot-red`) with no text indicator.
  - Color swatches rely exclusively on visual color discs with no text labels or accessible names.
  - Form validation failure in review modal indicated solely by changing input border color to red.
- **WCAG 1.4.3 Contrast (Minimum)**:
  - Top promo ticker text: `#94a3b8` on `#fef08a` (~2.1:1 ratio, failing AA 4.5:1).
  - Footer newsletter description: `#64748b` on `#0f172a` (~3.2:1 ratio).
  - Footer copyright notice: `#475569` on `#0f172a` (~2.8:1 ratio).
- **WCAG 2.1.1 Keyboard Accessible**:
  - Navigation "Categories" dropdown only opens on mouse `:hover`; completely skipped by keyboard Tab.
  - Color swatches and quantity steppers implemented with `<div>` elements without keyboard event listeners (`Enter` / `Space`).
  - Tabs do not support arrow key navigation.
  - Review modal close icon cannot be operated with keyboard.
  - Region/currency selector in footer is hover-only.
- **WCAG 2.1.2 No Keyboard Trap**:
  - "Write a Customer Review" modal dialog does not trap focus (keyboard Tab key escapes into background page).
  - Pressing `Escape` does not close the modal dialog.
- **WCAG 2.2.2 Pause, Stop, Hide**:
  - Auto-moving promo ticker has no pause, stop, or hide control.
- **WCAG 2.4.1 Bypass Blocks**:
  - Skip link links to a broken or missing target.
- **WCAG 2.4.3 Focus Order**:
  - Inactive tab panels are hidden visually with `opacity: 0` without `display: none`, causing links inside inactive panels to be focused by keyboard Tab (ghost links).
- **WCAG 2.4.4 Link Purpose (In Context)**:
  - Repeated ambiguous links: "Learn More", "Click Here", "Download", "Details", "Privacy", "Terms", "Support".
- **WCAG 2.4.7 Focus Visible**:
  - Global CSS `*:focus { outline: none !important; }` removes visible keyboard focus indicators.
- **WCAG 3.3.1 Error Identification**:
  - Submitting empty review modal form triggers red borders with no textual error message or `aria-invalid="true"`.
- **WCAG 3.3.2 Labels or Instructions**:
  - Form fields lack persistent labels and explicit instructions.
- **WCAG 4.1.2 Name, Role, Value**:
  - User profile avatar is a `<div>` with `onClick` but lacks `role="button"` and `tabindex="0"`.
  - Color swatches lack `role="radio"` and `aria-checked`.
  - Steppers lack `role="button"`.
  - Tabs lack `role="tablist"`, `role="tab"`, `role="tabpanel"`, and `aria-selected`.
  - Review modal lacks `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
- **WCAG 4.1.3 Status Messages**:
  - Dynamic "Added to Cart!" notification appears visually but lacks `role="status"` or `aria-live="polite"`.

---

## 🧪 Testing Tools

- **Automated Scanners**:
  - [Axe DevTools](https://www.deque.com/axe/devtools/)
  - Google Chrome Lighthouse (Accessibility Audit)
  - WAVE Web Accessibility Evaluation Tool
- **Screen Readers**:
  - Apple VoiceOver (macOS / iOS)
  - NVDA / JAWS (Windows)
  - Google TalkBack (Android)
- **Manual Keyboard Audit**:
  - Test `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Esc` throughout the page.
