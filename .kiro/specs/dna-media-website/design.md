# DNA Media Website - Design Specification

## Design Philosophy

DNA Media's website embodies premium video production excellence through:
- **Cinematic Experience**: Video-first design with immersive hero sections
- **Minimalist Elegance**: Clean layouts that let content breathe
- **Smooth Interactions**: 60fps GSAP animations throughout
- **Bilingual Excellence**: Seamless English/Arabic experience with proper RTL support
- **Professional Polish**: Enterprise-grade UI that builds trust

## Visual Identity

### Color Palette

**Primary Colors**:
- Primary Blue: `#0ea5e9` (rgb(14, 165, 233))
- Primary Dark: `#0369a1` (rgb(3, 105, 161))
- Primary Light: `#f0f9ff` (rgb(240, 249, 255))

**Neutral Colors**:
- Black: `#000000`
- Dark Gray: `#1f2937`
- Medium Gray: `#6b7280`
- Light Gray: `#f3f4f6`
- White: `#ffffff`

**Semantic Colors**:
- Success: `#10b981` (green)
- Error: `#ef4444` (red)
- Warning: `#f59e0b` (amber)
- Info: `#3b82f6` (blue)

### Typography

**English Font**: Inter (Google Fonts)
- Headings: 700 (Bold)
- Body: 400 (Regular)
- Emphasis: 600 (Semi-Bold)

**Arabic Font**: Cairo (Google Fonts)
- Headings: 700 (Bold)
- Body: 400 (Regular)
- Emphasis: 600 (Semi-Bold)

**Type Scale**:
- H1: 3.75rem (60px) / 4rem (64px) on desktop
- H2: 3rem (48px)
- H3: 2.25rem (36px)
- H4: 1.875rem (30px)
- H5: 1.5rem (24px)
- H6: 1.25rem (20px)
- Body Large: 1.125rem (18px)
- Body: 1rem (16px)
- Body Small: 0.875rem (14px)
- Caption: 0.75rem (12px)

**Line Heights**:
- Headings: 1.2
- Body: 1.6
- Captions: 1.4

### Spacing System

Based on 4px base unit:
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)
- 4xl: 6rem (96px)

### Border Radius

- Small: 0.375rem (6px) - buttons, inputs
- Medium: 0.5rem (8px) - cards
- Large: 0.75rem (12px) - modals
- Full: 9999px - pills, avatars

### Shadows

- Small: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- Medium: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- Large: `0 10px 15px -3px rgb(0 0 0 / 0.1)`
- XL: `0 20px 25px -5px rgb(0 0 0 / 0.1)`

## Layout System

### Grid System

**Desktop (1280px+)**:
- Container: 1280px max-width
- Columns: 12
- Gutter: 32px
- Margin: 64px

**Tablet (768px - 1279px)**:
- Container: 100% with padding
- Columns: 8
- Gutter: 24px
- Margin: 32px

**Mobile (< 768px)**:
- Container: 100% with padding
- Columns: 4
- Gutter: 16px
- Margin: 16px

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

## Component Design

### Buttons

**Primary Button**:
- Background: Primary Blue (#0ea5e9)
- Text: White
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Darken 10%
- Active: Darken 15%
- Transition: 200ms ease

**Secondary Button**:
- Background: Transparent
- Border: 2px solid Primary Blue
- Text: Primary Blue
- Padding: 10px 22px (accounting for border)
- Hover: Background Primary Blue, Text White

**Ghost Button**:
- Background: Transparent
- Text: Current color
- Padding: 12px 24px
- Hover: Background rgba(0,0,0,0.05)

### Form Inputs

**Text Input**:
- Height: 48px
- Padding: 12px 16px
- Border: 1px solid #d1d5db
- Border Radius: 8px
- Focus: 2px ring Primary Blue
- Error: Border red, ring red

**Textarea**:
- Min Height: 120px
- Padding: 12px 16px
- Resize: vertical

**Labels**:
- Font Size: 14px
- Font Weight: 500
- Margin Bottom: 8px
- Color: #374151

### Cards

**Standard Card**:
- Background: White
- Border Radius: 12px
- Padding: 24px
- Shadow: Medium
- Hover: Shadow Large + Lift 4px

**Portfolio Card**:
- Aspect Ratio: 4:3
- Border Radius: 12px
- Overflow: hidden
- Hover: Image scale 1.1, Overlay fade in

**Blog Card**:
- Image Aspect Ratio: 16:9
- Content Padding: 20px
- Border Radius: 12px
- Shadow: Small
- Hover: Shadow Medium

### Navigation

**Desktop Header**:
- Height: 80px
- Background: Transparent (scrolled: White with shadow)
- Logo: Left aligned
- Nav Items: Center
- Language Switcher: Right
- Sticky: Yes

**Mobile Header**:
- Height: 64px
- Hamburger Menu: Right
- Logo: Left
- Mobile Menu: Full screen overlay

**Footer**:
- Background: Dark Gray (#1f2937)
- Text: Light Gray
- Padding: 64px 0
- Sections: Logo, Links, Contact, Social

## Page Layouts

### Homepage

**Hero Section**:
- Height: 100vh
- Background: Video (Vimeo)
- Overlay: rgba(0,0,0,0.4)
- Content: Centered
- Heading: H1, White, Bold
- Subheading: Body Large, White
- CTA: Primary Button

**Services Section**:
- Background: Light Gray
- Grid: 3 columns (desktop), 1 column (mobile)
- Card Style: White background, icon top, text below
- Spacing: 48px between cards

**Featured Portfolio**:
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Hover Effect: Image scale + overlay
- Spacing: 32px gap

**Client Logos**:
- Background: White
- Carousel: Auto-scroll
- Logo Size: Max 200px width
- Grayscale: Yes, Color on hover

### About Page

**Hero**:
- Height: 60vh
- Background: Image or gradient
- Heading: Centered

**Story Section**:
- Layout: 2 columns (text + image)
- Max Width: 1200px
- Spacing: 64px vertical

**Team Grid**:
- Grid: 4 columns (desktop), 2 (tablet), 1 (mobile)
- Card: Photo (circle), Name, Position, Bio
- Hover: Lift effect

**Timeline**:
- Layout: Vertical line with alternating items
- Mobile: Single column, left aligned
- Animation: Scroll reveal

### Portfolio Page

**Filter Bar**:
- Position: Sticky top
- Background: White
- Buttons: Pill style
- Active: Primary Blue background

**Portfolio Grid**:
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Masonry: Optional
- Spacing: 24px gap

**Video Modal**:
- Background: rgba(0,0,0,0.9)
- Video: 16:9 aspect ratio, max 1200px width
- Close Button: Top right, white
- Click Outside: Close modal

### Blog Page

**Blog Listing**:
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Card: Featured image, title, excerpt, date, category
- Pagination: Bottom, numbered

**Blog Post**:
- Max Width: 800px
- Typography: @tailwindcss/typography
- Featured Image: Full width, 16:9
- Meta: Author, date, category, reading time
- Social Share: Sticky sidebar (desktop), bottom (mobile)
- Related Posts: 3 columns at bottom

### Contact Page

**Layout**: 2 columns (desktop), 1 column (mobile)

**Left Column - Form**:
- Fields: Name, Email, Phone, Message
- Validation: Real-time
- Submit: Primary button, full width
- Success: Toast notification

**Right Column - Info**:
- Contact details
- Google Maps embed (400px height)
- Social links

## Animation Guidelines

### Timing Functions

- **Ease Out**: Default for entrances (`cubic-bezier(0.16, 1, 0.3, 1)`)
- **Ease In**: Exits (`cubic-bezier(0.7, 0, 0.84, 0)`)
- **Ease In Out**: Interactions (`cubic-bezier(0.65, 0, 0.35, 1)`)

### Duration

- **Fast**: 200ms - Hover states, button clicks
- **Medium**: 400ms - Fade in/out, slide animations
- **Slow**: 800ms - Page transitions, complex animations

### Animation Patterns

**Fade In Up**:
```
Initial: opacity 0, translateY 40px
Final: opacity 1, translateY 0
Duration: 600ms
Easing: Ease Out
```

**Stagger**:
```
Delay: 100ms between items
Max Items: 12 (then instant)
```

**Parallax**:
```
Speed: 0.5x scroll speed
Range: -30% to 30%
```

**Hover Scale**:
```
Scale: 1.05
Duration: 300ms
Easing: Ease Out
```

### Scroll Animations

- **Trigger Point**: 80% viewport (element enters)
- **Scrub**: Smooth scrolling for parallax
- **Markers**: Disabled in production
- **Reduced Motion**: Instant state changes

## Responsive Design

### Mobile First Approach

Start with mobile design, enhance for larger screens.

### Key Breakpoints

**Mobile (< 768px)**:
- Single column layouts
- Stacked navigation
- Full-width images
- Touch-friendly tap targets (44x44px minimum)
- Larger font sizes for readability

**Tablet (768px - 1023px)**:
- 2 column grids
- Condensed navigation
- Optimized image sizes

**Desktop (1024px+)**:
- Multi-column layouts
- Hover effects enabled
- Larger hero sections
- Side-by-side content

### Touch Targets

- Minimum: 44x44px
- Spacing: 8px between targets
- Buttons: 48px height minimum

## RTL (Arabic) Design Considerations

### Layout Mirroring

- Text alignment: Right
- Navigation: Right to left
- Icons: Mirrored (arrows, chevrons)
- Margins/Padding: Flipped (margin-left becomes margin-right)

### Typography

- Font: Cairo (optimized for Arabic)
- Line Height: 1.8 (slightly taller for Arabic)
- Letter Spacing: Normal (no tracking)

### Animations

- Direction: Reversed for directional animations
- Parallax: Inverted
- Slide animations: Right to left instead of left to right

### Testing

- Test all layouts in RTL mode
- Verify icon directions
- Check text overflow
- Validate form layouts

## Accessibility Design

### Color Contrast

- Normal Text: 4.5:1 minimum
- Large Text (18px+): 3:1 minimum
- UI Components: 3:1 minimum

### Focus States

- Visible: 2px solid ring
- Color: Primary Blue
- Offset: 2px
- Never remove: outline

### Interactive Elements

- Clear hover states
- Disabled states: 50% opacity
- Loading states: Spinner or skeleton
- Error states: Red border + icon + message

### Content

- Alt text: Required for all images
- Heading hierarchy: Logical (no skipping)
- Link text: Descriptive (no "click here")
- Form labels: Always visible

## Performance Design

### Image Optimization

- Format: WebP with fallback
- Lazy Loading: Below fold
- Responsive: Multiple sizes
- Compression: 80-90% quality

### Video Strategy

- Hero: Autoplay, muted, loop
- Portfolio: Click to play
- Poster Images: Always provided
- Lazy Loading: IntersectionObserver

### Font Loading

- Display: Swap
- Preload: Critical fonts only
- Subset: Latin + Arabic only

### Critical CSS

- Inline: Above-the-fold styles
- Defer: Non-critical CSS
- Purge: Unused Tailwind classes

## Design Tokens (Tailwind Config)

```javascript
// tailwind.config.ts
{
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
    },
  },
  fontFamily: {
    sans: ['var(--font-inter)', 'sans-serif'],
    arabic: ['var(--font-cairo)', 'sans-serif'],
  },
  spacing: {
    // 4px base unit
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
}
```

## Design Checklist

Before implementation:
- [ ] All colors meet WCAG AA contrast ratios
- [ ] Typography scale is consistent
- [ ] Spacing follows 4px grid
- [ ] Components have hover/focus/active states
- [ ] Mobile layouts designed first
- [ ] RTL layouts considered
- [ ] Animations respect reduced motion
- [ ] Touch targets are 44x44px minimum
- [ ] Images have proper aspect ratios
- [ ] Loading states designed for all async actions

## Design Resources

- **Figma File**: [Link to design file if available]
- **Style Guide**: This document
- **Component Library**: Tailwind CSS + Custom components
- **Icons**: Heroicons or custom SVG
- **Images**: Client-provided + Stock (Unsplash)
- **Videos**: Client-provided (Vimeo Pro)

---

**Design Status**: ✅ Complete - Ready for Implementation
