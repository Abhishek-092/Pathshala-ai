# Pathshala AI Design System & Styling Specifications

This document outlines the visual brand tokens, design principles, and UI layout conventions adopted across the Pathshala AI Offline Operating System.

---

## 1. Brand & Style

This design system is built for a focused, high-engagement educational environment. The brand personality balances the warmth of mentorship with the rigor of formal scholarship. It evokes an emotional response of clarity, encouragement, and intellectual growth.

The design style follows a **Modern Corporate** aesthetic with **Minimalist** influences. It prioritizes content legibility and cognitive ease by utilizing expansive whitespace and a structured information hierarchy. Tactile elements are subtle, ensuring that the interface feels like a high-quality physical textbook translated into a digital medium.

---

## 2. Core Color Tokens

The palette is anchored by **Sunset Amber** (primary container/accent) to maintain energy and motivation, while **Ink Blue** (secondary) serves as the core color for typography and high-contrast UI elements to ensure AAA accessibility.

| Token | Light Value | Description |
|---|---|---|
| `primary` | `#6E4CE3` | Deep Purple primary brand accent |
| `primary-container` | `#ECE6FF` | Soft light purple accent tint |
| `secondary` | `#F2A33A` | Sunset Amber accent |
| `secondary-container` | `#FFE5B8` | Warm light amber accent tint |
| `background` | `#FFF8F1` | Ultra-light paper cream background to reduce eye strain |
| `surface` | `#FFFCF8` | Warm off-white for cards and interactive containers |
| `surface-container` | `#F8F0E6` | Muted cream border highlight |
| `on-background` | `#1E1B18` | Ink black typography |
| `on-surface` | `#231F1C` | Secondary slate font color |

---

## 3. Typography

The typography system pairs the editorial elegance of **Newsreader** for headings with the modern, functional legibility of **Manrope** for body content.

- **Headlines (Newsreader - Serif)**: Used for course titles, headers, and module metadata. The serif qualities provide a scholarly, authoritative feel while remaining contemporary.
- **Body (Manrope - Sans-Serif)**: A versatile sans-serif optimized for reading on digital screens. Line heights are generous (1.5x minimum) to prevent layout fatigue.

| Style | Font Family | Size | Weight | Line Height |
|---|---|---|---|---|
| **Display** | Newsreader | `48px` | `700` | `56px` |
| **Headline Large** | Newsreader | `32px` | `600` | `40px` |
| **Headline Medium**| Newsreader | `24px` | `600` | `32px` |
| **Body Large** | Manrope | `18px` | `400` | `28px` |
| **Body Medium** | Manrope | `16px` | `400` | `24px` |
| **Label Medium** | Manrope | `14px` | `500` | `20px` |

---

## 4. Shapes & Layout Spacing

- **Standard Elements (sm/md/lg)**: `8px` to `16px` corner radius for buttons, text inputs, and bento dashboard cards.
- **Elevation**: Tonal layers and 1px borders (`#F8F0E6`) are used to stack content elements, avoiding heavy drop shadows to sustain the "paper textbook" aesthetic.
- **Layout Margins**: 12-column grid structure with a `1280px` maximum desktop container layout constraint.
