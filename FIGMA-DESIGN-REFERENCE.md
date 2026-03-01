# DNA Studio - Figma Design Reference


This document provides comprehensive design specifications extracted from the Figma file for implementation.

---

## Design System Overview

### Color Palette

- **Black/100**: `#000000` - Primary background
- **White/100**: `#FFFFFF` - Primary text and UI elements
- **White/50**: `rgba(255, 255, 255, 0.5)` - Secondary/disabled states

### Typography

#### Font Families
- **Degular Bold** - Headings and emphasis
- **IBM Plex Sans Regular** - Body text

#### English Typography Scale

| Style | Font | Size | Weight | Line Height | Letter Spacing |
|-------|------|------|--------|-------------|----------------|
| H1 | Degular Bold | 80px | 700 | 1.0 | 0 |
| H2 | Degular Bold | 64px | 700 | 1.0 | 0 |
| H3 | Degular Bold | 48px | 700 | 1.0 | 0 |
| H4 | Degular Bold | 32px | 700 | 1.0 | 0 |
| H5 | Degular Bold | 24px | 700 | 1.2 | 0 |
| H6 | Degular Bold | 20px | 700 | 1.2 | 0 |
| H7 | Degular Bold | 16px | 700 | 1.2 | 0 |
| Body 24 | IBM Plex Sans | 24px | 400 | 1.4 | 0 |
| Body 20 | IBM Plex Sans | 20px | 400 | 1.4 | 0 |
| Body 18 | IBM Plex Sans | 18px | 400 | 1.4 | 0 |
| Body 16 Medium | IBM Plex Sans | 16px | 500 | 1.4 | 0 |
| Body 16 Regular | IBM Plex Sans | 16px | 400 | 1.4 | 0 |
| Body 14 | IBM Plex Sans | 14px | 400 | 1.4 | 0 |

#### Arabic Typography Scale
Same sizes as English but with appropriate Arabic font rendering.

### Spacing System

- **Container padding**: 48px (desktop), 16px (mobile)
- **Section gaps**: 48px, 32px, 16px
- **Component gaps**: 32px, 24px, 16px, 11px, 8px

### Layout

- **Desktop width**: 1920px
- **Mobile width**: 393px
- **Content max-width**: 1824px (with 48px padding on each side)

---

## Page Specifications

### 1. HOME PAGE (English)
**Node ID**: `1-3553`

#### Layout Structure
```
- Header (fixed, 120px height)
- Hero Section (1080px height)
- Tagline Section
- Featured Work Section (920px height)
- About Section
- CTA Section (1080px height)
- Footer (574px height)
```

#### Detailed Specifications

**Header Component**
- Height: 120px
- Background: Black with bottom border `rgba(255,255,255,0.5)`
- Padding: 0 48px
- Logo: 97px × 23px (left aligned)
- Language Switcher: Right aligned
  - Font: Degular Bold, 24px
  - Active: White (#FFFFFF)
  - Inactive: White 50% opacity
  - Separator: Vertical line
- Menu Icon: 40px × 24px (hamburger)

**Hero Section**
- Height: 1080px
- Background: Full-width image with gradient overlay
  - Gradient: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)`
- Headline: "WE BREAK THE NORMS"
  - Font: Degular Bold, 80px
  - Color: White
  - Position: Centered, 920px from top
  - Transform: uppercase

**Tagline Section**
- Position: 1330px from top
- Width: 902px
- Text: "One Frame at a Time. Your Full-Fledged Creative and Production Partner."
  - Font: Degular Bold, 80px
  - Color: White
  - Line height: 1.0
  - Transform: uppercase
  - Text align: justify

**View All Works Button**
- Position: 1900px from top, centered
- Text: "View all works"
  - Font: Degular Bold, 24px
  - Color: White
  - Transform: uppercase

**Featured Work Section**
- Position: 1985px from top
- Size: 1824px × 920px
- Background: Video/image with overlay
- Elements:
  - Project number: "01" (top-left, 32px from edges)
  - Service type: "SERVICE" (top-right)
  - Project title: "PROJECT TITLE" (bottom-left)
  - Sound toggle: "SOUND OFF" (bottom-right)
  - Font: Degular Bold, 32px, White, uppercase

**About Section**
- Label: "DNA STUDIO"
  - Position: 3155px from top, 48px from left
  - Font: IBM Plex Sans Regular, 20px
  
- Heading: "Breaking Norms, Setting Standards: Where Creativity Meets Excellence"
  - Position: 3155px from top, 504px from left (25% + 24px)
  - Width: 1368px
  - Font: Degular Bold, 80px
  - Color: White
  - Transform: uppercase
  
- Image: 1368px × 618px
  - Position: 3459px from top
  
- Body Text:
  - Position: 4141px from top
  - Width: 1368px
  - Height: 341px
  - Font: Degular Bold, 40px
  - Line height: 1.2
  - Color: White
  - Transform: uppercase

**CTA Section**
- Position: 4732px from top
- Size: 1824px × 1080px
- Background: Full-width image
- Headline: "LET'S CREATE TOGETHER"
  - Position: 888px from top, 32px from left
  - Width: 581px
  - Font: Degular Bold, 80px
  - Color: White
  - Transform: uppercase
- Button: White circular button with arrow icon
  - Size: 72px × 72px
  - Position: 968px from top, 536px from left
  - Border radius: 11.816px
- Circular masked image: 500px × 500px (centered)

**Footer (Short Desktop)**
- Height: 574px
- Background: Black
- Padding: 48px
- Layout: 3 columns with top border

Column 1 - OFFICE:
- Title: Degular Bold, 24px
- Content: IBM Plex Sans, 16px, line-height 1.4
- Border-top: 1px solid rgba(255,255,255,0.5)
- Padding: 32px 0

Column 2 - MAIL US:
- Same styling as Column 1

Column 3 - FOLLOW US:
- Same styling as Column 1

Bottom text:
- Left: "© DNA - All rights reserved"
- Right: "GENERAL TERMS"
- Font: Degular Bold, 16px, uppercase
- Position: 263px from top

Background decoration: Large decorative image/pattern

---

### 2. HOME PAGE (Arabic)
**Node ID**: `1-3580`

Same layout as English version with RTL (right-to-left) adjustments:
- Text alignment: Right-aligned
- Layout direction: RTL
- All positioning mirrored
- Arabic typography applied

---

### 3. TEAM/ABOUT PAGE (English)
**Node ID**: `1-3609`

#### Sections

**Hero Section**
- Full-width image: 1824px × 864px
- Overlay text animation:
  - "Welcome to DNA Studio"
  - "we inspire, amaze, and break the norms."
  - "We thrive on limitless creativity."
  - "From script writing to wrap moment."
- Font: Degular Bold, 80px
- Position: Centered with 183px left padding

**Vision Section**
- Label: "Our vision" (48px from left, 2396px from top)
- Body text: 1363px width
  - Font: IBM Plex Sans, 20px
  - Line height: 1.4
- Image: 1363px × 618px
- Extended description below image

**Timeline Section**
- Height: 1024px
- Horizontal timeline with progress bar
- Award entries with photos:
  - 2019: Award winning Production House
  - 2021: Creative Production House (multiple awards)
  - 2023: DNA studio - Ministry of Media Award
  - 2024: DNA studio - Vega Awards, Viddy Awards

Each entry:
- Photo: Various sizes (672px × 770px, 789px × 421px)
- Year: Degular Bold, 53px
- Title: 28px
- Description: 28px

**Team Story Section**
- Heading: "DNA STORY"
- Body text: 1130px width
- Font: IBM Plex Sans, 20px

**Team Members Grid**
- 4 columns
- Each card: 586px × 668px
- Photo: 586px × 550px
- Name: Degular Bold, 44px
- Title: 34px
- Gap: 618px between cards

**Partners Section**
- Heading: "We are trusted by worldwide partners and collaborators"
- Logo grid: 9 logos, 184px × 64px each
- Spacing: 270.75px between logos

---

### 4. WORKS/PORTFOLIO PAGE (English)
**Node ID**: `1-1792`

#### Layout

**Hero Text**
- "At DNA, we embody the essence of the art gene"
- Position: 299px from left, 240px from top
- Width: 1322px
- Font: Degular Bold, 80px

**Portfolio Grid**
- Container: 1824px width, 48px padding
- Grid: 2 columns
- Card size: 896px × 896px
- Gap: 928px horizontal, 928px vertical
- Total: 8 project cards

**Project Card Specifications**
- Size: 896px × 896px
- Background: Project image/video
- Hover state: Shows overlay with details
- Elements:
  - Project number (top-left)
  - Project title (bottom-left)
  - Service type (top-right)
  - Font: Degular Bold, 32px, White

---

### 5. BLOG LISTING PAGE (English)
**Node ID**: `1-2166`

#### Header Section
- Hero image: 1824px × 1026.54px
- Positioned 200px from top

#### Filter Bar
- Position: 1327px from top
- Height: 64px
- Components:
  - Genre dropdown (163px width)
  - Topic dropdown (155px width)
  - Sort by dropdown (174px width)
  - Search input (896px width)
- Font: Degular Bold, 29px
- Icons: 24px × 24px

#### Blog Grid
- Container: 1824px width
- Grid: 2 columns
- Card size: 896px × 896px
- Gap: 928px between cards
- Total: 6 cards visible

**Blog Card**
- Image: 896px × 896px (top portion)
- Title area below image
- Hover state available

#### Pagination
- Position: Bottom of grid
- Components:
  - Previous arrow (58.33px × 58.33px)
  - Page numbers (1, 2, 3)
  - Next arrow (58.33px × 58.33px)
- Font: Degular Bold, 77px for numbers
- Gap: 90.33px between elements

---

### 6. BLOG POST PAGE (English)
**Node ID**: `1-2256`

#### Layout Structure

**Hero Image**
- Size: 1824px × 1026.54px
- Position: 200px from top, 48px from left

**Progress Bar**
- Width: 361px, Height: 8px
- Position: 76px from top
- Filled portion: 20px width (indicates reading progress)

**Table of Contents Sidebar**
- Width: 794px
- Position: 1327px from top, 48px from left
- Background: Contained box
- Sections:
  - Reading progress: "15% of article read"
  - Progress bar visualization
  - Content links:
    - "Foreword"
    - "AI and Machine Learning in Video Production"
    - "Virtual and Augmented Reality"
    - "4K and Beyond: The Resolution Race"
- Font: IBM Plex Sans, 16px
- Line height: 32px

**Article Content**
- Width: 966px
- Position: 906px from left (next to TOC)
- Intro paragraph: 136px height
- Main heading: "The Future of Video Production"
  - Font: Degular Bold, 53px
  - Margin-bottom: 117px

**Content Sections**
- Featured image: 966px × 472px
- Section headings: Degular Bold, 32px
- Body text: IBM Plex Sans, 16px
- Line height: 1.4
- Spacing between sections: 64-90px

**Related Articles**
- Position: 3217px from top
- Heading: "Related articles"
  - Font: Degular Bold, 80px
- Grid: 2 columns
- Card size: 896px × 896px
- Gap: 928px

---

### 7. CONTACT PAGE (LET'S WORK)
**Node ID**: `1-1576`

#### Layout

**Header Tabs**
- Height: 112px
- 2 tabs: 960px each
- Selected state styling
- Position: 120px from top

**Contact Information Section**
- Width: 1824px
- Position: 232px from top
- 3 columns layout

**Column 1 - OFFICE**
- Title: "OFFICE"
  - Font: Degular Bold, 24px
- Address:
  - "Jax District, J015 RDDA24700"
  - "Al Diriyah, Riyadh"
  - "Saudi Arabia"
- Font: IBM Plex Sans, 16px

**Column 2 - MAIL US**
- Title: "MAIL US"
- Emails:
  - "Info@dnamedia.tv"
  - "Jobs@dnamedia.tv"

**Column 3 - FOLLOW US**
- Title: "FOLLOW US"
- Social links:
  - Instagram
  - X
  - TikTok
  - Linkedin
  - Vimeo

**Contact Form**
- Width: 1920px
- Fields:
  - Name input
  - Email input
  - Services dropdown (with pills for selection)
  - Message textarea
  - Submit button
- Input height: 92-97px
- Font: IBM Plex Sans, 16px
- Button: 64px height, centered text

---

### 8. PROJECT DETAIL MODAL
**Node ID**: `1-1818` (and variants)

#### Layout
- Overlay: Full screen
- Content width: 1920px
- Background: Semi-transparent black

**Project Info Grid**
- Position: 976px from top
- Width: 1824px
- Height: 72px
- 3 columns layout

Column 1:
- Client name
- Agency name

Column 2:
- Director name
- DOP name

Column 3:
- Executive producer name
- Industry name

Each row:
- Label: Left aligned
- Separator line: 136px width
- Value: Right aligned
- Font: IBM Plex Sans, 20px
- Row height: 20px
- Gap between rows: 52px

**Project Title**
- Position: 658px from top, 48px from left
- Font: Degular Bold, 240px (very large)
- Width: 419px

**Project Description**
- Width: 455px
- Font: IBM Plex Sans, 16px
- Line height: 1.4

**Media Gallery**
- Multiple image frames
- Sizes vary: 1134px × 638px, 526px × 296px, 435px × 245px
- Positioned throughout the modal

**CTA Section**
- "LET'S CREATE TOGETHER"
- Arrow button
- "or move to the next work" link

---

## Component Library

### Header Component
**Variants**: Default, Menu Open (English/Arabic)

**Desktop** (1920px × 120px):
- Logo: 97px × 23px
- Language switcher: 2 options with separator
- Menu icon: 40px × 24px
- Border-bottom: 1px solid rgba(255,255,255,0.5)

**Mobile** (393px × 72px):
- Logo: 84.35px × 20px
- Language indicator: 62px × 32px
- Burger menu: 40px × 40px

### Footer Component
**Variants**: Full, Short (Desktop/Mobile, English/Arabic)

**Full Footer Desktop** (1920px × 918px):
- 3 columns
- Newsletter signup
- Social links
- Company info
- Bottom bar with copyright

**Short Footer Desktop** (1920px × 574px):
- 3 columns: Office, Mail Us, Follow Us
- Bottom text: Copyright and terms
- Background decoration

**Mobile Footer** (393px × 954px):
- Stacked layout
- Same content as desktop
- Adjusted spacing

### Tab Component
**Variants**: Selected/Unselected, Desktop/Mobile, English/Arabic

**Desktop** (960px × 112px):
- Font: Degular Bold, 80px
- Selected: White text
- Unselected: White 50% opacity
- Bottom border on selected

**Mobile** (204px × 104px):
- Font: Degular Bold, 32px
- Same color states

### Language Switcher
**Variants**: Selected/Unselected

- Font: Degular Bold, 24px (desktop), 29px (mobile)
- Selected: White (#FFFFFF)
- Unselected: rgba(255,255,255,0.5)
- Separator: Vertical line, 23px height

### Pills/Tags Component
**Variants**: Selected/Unselected, Desktop/Mobile

**Desktop** (310px × 48px):
- Font: Degular Bold, 24px
- Selected: White background, black text
- Unselected: Transparent background, white text
- Border-radius: 24px

**Mobile** (261px × 48px):
- Same styling, adjusted width

### Input Component
**Variants**: Placeholder, Active, Filled (Desktop/Mobile)

**Desktop** (410px × 97px):
- Font: IBM Plex Sans, 16px
- Border: 1px solid rgba(255,255,255,0.5)
- Padding: 24px
- Border-radius: 8px

**Mobile** (313px × 92px):
- Same styling, adjusted dimensions

### Card Components

**Project Card** (896px × 896px):
- Image/video background
- Overlay on hover
- Text elements positioned at corners
- Font: Degular Bold, 32px

**Blog Card** (896px × 896px):
- Image: Top portion
- Title area: Bottom
- Hover state with overlay
- Font: Degular Bold, 32px (title)

**Featured Work Card** (1824px × 920px):
- Large format
- Video background
- Corner text elements
- Sound toggle
- Project number

### Button Components

**Primary CTA**:
- Size: 72px × 72px (circular)
- Background: White
- Icon: Arrow (rotated 45°)
- Border-radius: 11.816px

**Text Button**:
- Font: Degular Bold, 24px
- Color: White
- Transform: uppercase
- No background

**Submit Button** (313px × 64px):
- Background: White
- Text: Black, centered
- Font: Degular Bold, 24px
- Border-radius: 8px

---

## Responsive Breakpoints

### Desktop
- Width: 1920px
- Container: 1824px (48px padding each side)
- Typography: Full scale

### Mobile
- Width: 393px
- Container: 361px (16px padding each side)
- Typography: Scaled down appropriately
- Layout: Single column, stacked

---

## Animation & Interaction Notes

### Hero Section
- Video background with gradient overlay
- Text appears with fade-in

### Project Cards
- Hover: Overlay appears with project details
- Cursor: Changes to circular preview on hover

### Featured Work
- Video plays on hover
- Sound toggle available
- Smooth transitions

### Menu
- Slides in from right (desktop)
- Full screen overlay (mobile)
- Backdrop blur effect

### Scroll Animations
- Parallax effects on images
- Fade-in on scroll for sections
- Progress bar updates on blog posts

### Page Transitions
- Smooth fade between pages
- Preloader animation on initial load

---

## Image Assets

All images are served via Figma's asset API with 7-day expiration:
- Format: `https://www.figma.com/api/mcp/asset/{asset-id}`
- Images should be downloaded and stored locally for production

### Required Images
1. Hero backgrounds (multiple pages)
2. Project thumbnails (8+ projects)
3. Team member photos (4+ members)
4. Blog post featured images
5. Timeline/award photos
6. Logo (white version)
7. Social media icons
8. Decorative patterns/backgrounds

---

## Implementation Notes

### Technology Stack
- Framework: Next.js 14+ with App Router
- Styling: Tailwind CSS (or convert to your system)
- CMS: Payload CMS
- Fonts: Degular Bold, IBM Plex Sans
- Languages: English, Arabic (RTL support)

### Key Considerations

1. **Bilingual Support**:
   - Every page has English and Arabic versions
   - RTL layout for Arabic
   - Font loading for both languages

2. **Performance**:
   - Lazy load images
   - Video optimization
   - Code splitting per page

3. **Accessibility**:
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation
   - Focus states

4. **SEO**:
   - Meta tags per page
   - Open Graph images
   - Structured data for blog posts
   - Sitemap generation

5. **CMS Integration**:
   - All content should be manageable via Payload
   - Image uploads and optimization
   - Bilingual content fields
   - Preview functionality

---

## Next Steps for Implementation

1. Set up design tokens in Tailwind config
2. Create base components (Header, Footer, Button, etc.)
3. Implement page layouts
4. Connect to Payload CMS
5. Add animations and interactions
6. Test responsive behavior
7. Implement bilingual routing
8. Performance optimization
9. Accessibility audit
10. Cross-browser testing

---

**Document Version**: 1.0
**Last Updated**: 2026-03-01
