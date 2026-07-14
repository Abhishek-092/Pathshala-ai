# Pathshala AI Design System & Styling Specifications

This document outlines the visual brand tokens, design principles, and UI layout conventions adopted across the Pathshala AI Offline Operating System.

---

## 1. Cinematic Onboarding Page Redesign

### Aesthetic Vision
The onboarding screen is designed like the opening sequence of a cinematic film. Instead of a standard SaaS/product landing page, the interface is almost invisible, letting the looping animated backdrop carry the emotion, curiosity, and focus.

- **Background Asset**: A fullscreen hardware-accelerated animated GIF (`/onboarding.gif`) with low opacity (`opacity-40`) to blend with the dark backdrop.
- **Header Alignment**: A full-width (`w-full px-10`) transparent header containing the logo text `Pathshala AI` and low-opacity navigation tabs (`Courses`, `Tutor`, `Practice`, `Profile`) aligned directly to the top edge (0px top offset) to match exactly the height of the shell navbar on internal pages.
- **Cinematic Text Placement**:
  - Main hero text positioned using relative viewport heights at `top-[18vh]` to start in the upper-middle region.
  - Slogan: *"Curate your library. Download once. Learn anywhere."*
  - Subtext: *"The next chapter is always within reach."*
- **Call to Action**: A minimalist button `[ Begin Journey ]` with subtle white borders positioned exactly at `top-[64vh]` (14% below the vertical center).

---

## 2. Core Brand Tokens

### Color Palette (Google Stitch Alignment)
- **Primary Accent**: `#3525cd` (Indigo Blue - representing intelligence and focus)
- **Secondary Accent**: `#00668a` (Deep Cyan - representing clarity and calm)
- **Background (Light)**: `#f8f9ff` (Soft Blue-White)
- **Background (Dark)**: `#090d16` (Deep Obsidian)
- **Surface**: `#ffffff` (Pure White)

### Typography
- **Headings & Logo**: `Outfit` (Geometric, clean, modern)
- **Body & Captions**: `Inter` (Highly legible sans-serif)

### Elevations & Shapes
- **Bento & Subject Cards**: `24px` roundness (`rounded-[24px]` or `rounded-[32px]`)
- **Interactive Buttons / Inputs**: `12px` or `16px` roundness (`rounded-xl` / `rounded-2xl`)
- **Shadows**: Soft, low-intensity elevation shadows (`shadow-sm` / `shadow-md` with low alpha levels)
