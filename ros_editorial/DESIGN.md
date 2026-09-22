---
name: Rosé Editorial
colors:
  surface: '#fff8f8'
  surface-dim: '#e5d6db'
  surface-bright: '#fff8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0f4'
  surface-container: '#f9eaef'
  surface-container-high: '#f3e4e9'
  surface-container-highest: '#eddfe3'
  on-surface: '#211a1d'
  on-surface-variant: '#514349'
  inverse-surface: '#362e32'
  inverse-on-surface: '#fcedf1'
  outline: '#84737a'
  outline-variant: '#d6c1c9'
  surface-tint: '#8f4570'
  primary: '#8f4570'
  on-primary: '#ffffff'
  primary-container: '#ffa4d4'
  on-primary-container: '#7c355f'
  inverse-primary: '#ffafd8'
  secondary: '#785466'
  on-secondary: '#ffffff'
  secondary-container: '#ffd0e5'
  on-secondary-container: '#7b5668'
  tertiary: '#3b6927'
  on-tertiary: '#ffffff'
  tertiary-container: '#9ace7f'
  on-tertiary-container: '#2b5818'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e9'
  primary-fixed-dim: '#ffafd8'
  on-primary-fixed: '#3c0029'
  on-primary-fixed-variant: '#732d57'
  secondary-fixed: '#ffd8e9'
  secondary-fixed-dim: '#e8bacf'
  on-secondary-fixed: '#2e1222'
  on-secondary-fixed-variant: '#5e3d4e'
  tertiary-fixed: '#bcf19f'
  tertiary-fixed-dim: '#a0d585'
  on-tertiary-fixed: '#062100'
  on-tertiary-fixed-variant: '#245110'
  background: '#fff8f8'
  on-background: '#211a1d'
  surface-variant: '#eddfe3'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system embodies a sophisticated, high-end editorial aesthetic tailored for skincare, wellness, and luxury lifestyle platforms. It prioritizes a serene and tactile digital experience that mimics the feel of premium print journalism. 

The style is a blend of **Minimalism** and **Tonal Layering**, shifting from a monochromatic pink to a more nuanced, earthy palette with botanical accents. By balancing muted mauve tones with organic greens, the UI evokes feelings of calm, natural vitality, and modern elegance. The target audience values curation, quality, and a "less is more" philosophy.

## Colors

The palette has evolved from a simple monochrome to a sophisticated "Fidelity" scheme that pairs dusty rose tones with botanical greens.

- **Background & Neutrals:** The foundation uses `#7F7478` as a base for neutral tones, resulting in a slightly warmer, more taupe-leaning gray scale for backgrounds and surfaces.
- **Primary Actions:** A muted plum-rose (`#AC5D89`) is used for primary buttons and critical interactive elements, providing a clear but soft focal point.
- **Secondary Tones:** A desaturated mauve (`#936C7F`) provides subtle differentiation for secondary UI elements.
- **Accents:** A soft, sage-like green (`#9ACE7F`) acts as the tertiary accent, introducing a "wellness" and "natural" feel to the editorial layout.

## Typography

This design system utilizes **Plus Jakarta Sans** exclusively to achieve a modern, clean, yet approachable feel. The typography follows an editorial hierarchy:

- **Display & Headlines:** Heavy weights with tight letter-spacing for a bold, confident look. Large headers should use the "Display" style to anchor the page.
- **Body Text:** Generous line heights (1.6) are applied to ensure readability and maintain a spacious, breathable layout.
- **Labels:** Uppercase styling with increased letter-spacing is used for overlines (e.g., "CASE STUDY • 2026") and small metadata to provide structural clarity without visual weight.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid** for desktop to mimic a magazine spread, transitioning to a fluid model for mobile.

- **Grid:** A 12-column grid is used for desktop with a 24px gutter. Content should be centered with wide 64px margins to emphasize the premium nature of the brand.
- **Rhythm:** An 8px base unit drives all padding and margin decisions. 
- **Mobile:** On mobile, margins reduce to 20px, and the grid collapses to a single column. Vertical spacing between sections should be generous (80px+) to maintain the "airy" editorial feel.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and soft, ambient shadows that now utilize a more neutral-warm tint.

- **Layers:** Surfaces use layered containers to create a "lifted" effect against the background.
- **Shadows:** Use extremely diffused shadows with a subtle taupe tint. This creates a soft "glow" that feels organic rather than digital.
- **Interaction:** On hover, elements should slightly lift (move -2px Y-axis) and the shadow should slightly expand to provide tactile feedback.

## Shapes

The shape language has been refined to be **Softer** and more precise, moving away from heavy rounding to a more professional, subtle corner radius.

- **Standard Radius:** 0.25rem (4px) for buttons and input fields to maintain a crisp editorial look.
- **Large Radius:** 0.5rem (8px) for primary content cards and images to create a gentle frame.
- **Pill Shapes:** Used sparingly for tags and chips to provide visual variety against the clean, structural grid.

## Components

### Buttons
- **Primary:** Solid `#AC5D89` (Plum-Rose) with white text. High-contrast, 4px rounded-md.
- **Secondary:** Outlined with a 1px border of `#936C7F`. Text matches the border color.
- **Ghost:** No background or border. Uses `#AC5D89` text with a small arrow icon for "Editorial" navigation (e.g., "VIEW CASE STUDY →").

### Cards
- Surface-colored background, 8px border-radius, and the soft ambient shadow defined in Elevation. 
- Content inside cards should have generous internal padding (min 32px).

### Input Fields
- Background should be a light neutral-warm shade or white. 
- 1px border of `#936C7F` on focus. No harsh black borders.

### Chips/Tags
- Small, pill-shaped elements using the tertiary green (`#9ACE7F`) at low opacity for background and dark green text. Used for categories or wellness metadata.

### Lists
- Separated by thin, low-opacity lines (`rgba(127, 116, 120, 0.1)`) rather than solid dividers.