# Homely Trail

A premium, minimalist single-page homestay booking site.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion 11 · lucide-react

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview
```

## Design tokens

| Token | Value | Usage |
|---|---|---|
| `cream` | `#FAF6EC` | Page background |
| `sand` | `#F3E9CF` | Beige panels, badges |
| `accent` | `#E07B1A` | CTAs, highlights, first word of headings |
| `ink` | `#1A1A1A` | Text, dark buttons, footer |
| Serif | Playfair Display | Headlines, prices, quotes |
| Sans | Inter | Body, UI labels |
| Radius | `28 / 32 / 40px`, pills `full` | Cards, panels, chips |
| Shadows | `soft`, `lift`, `glass` | Resting, hover, floating glass |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` | All motion |
| Heading style | `[Accent word] [Dark word]` | e.g. **Pick** Your Stay |

## Structure

```
src/
├── App.jsx                  # Section order + MotionConfig (reduced-motion aware)
├── main.jsx
├── index.css                # Tailwind layers, .glass utility, focus rings
├── data.js                  # All placeholder content + Unsplash ids
├── lib/utils.js             # EASE, unsplash(), formatINR(), cx()
└── components/
    ├── ui.jsx               # Img, FadeUp, Eyebrow, Heading, Stars, DragRail, arrows
    ├── Navbar.jsx           # 1. Sticky blur nav + mobile menu
    ├── Hero.jsx             # 2. Headline, cutout image, glass search, logos
    ├── TrustStrip.jsx       # 3. Platform rating cards
    ├── Locations.jsx        # 4. Staggered pill chips
    ├── PropertyCarousel.jsx # 5. Draggable property cards
    ├── CategoryCards.jsx    # 6. Horizontal scroll + parallax
    ├── ValueProps.jsx       # 7. Beige panels with tilted images
    ├── Showcase.jsx         # 8. Fullscreen crossfade + framed photo
    ├── About.jsx            # 9. Overlapping photos
    ├── Stories.jsx          # 10. Review slider
    └── Footer.jsx           # 11. Newsletter, links, socials
```

## Notes

- **Images** load from Unsplash with `loading="lazy"`, `decoding="async"` and
  `sizes`; the hero image is eager with high priority.
- **Motion** respects `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`
  plus a CSS fallback.
- **Drag rails** use native horizontal scrolling (keyboard accessible) with a
  pointer-drag layer added on top; pointer capture only engages after a 6px
  threshold so card clicks and wishlist buttons still work.
- **Accessibility**: skip link, visible focus rings, labelled icon buttons,
  `aria-pressed` wishlist state, `role="tablist"` on the room switcher.
