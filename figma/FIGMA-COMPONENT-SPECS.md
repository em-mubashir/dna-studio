# DNA Studio - Component Specifications

This document provides detailed specifications for all reusable components in the DNA Studio design system.

---

## Navigation Components

### 1. Header Component

#### Desktop Header
```
Dimensions: 1920px × 120px
Background: #000000
Border-bottom: 1px solid rgba(255, 255, 255, 0.5)
Padding: 0 48px
Display: flex
Justify: space-between
Align: center
```

**Logo Section**:
```
Width: 97px
Height: 23px
Image: DNA STUDIO MARK LOGO_White 1
Position: Left aligned
```

**Navigation Section** (Right):
```
Display: flex
Gap: 32px
Align: center
```

**Language Switcher**:
```
Display: flex
Gap: 11px
Align: center

Active Language:
- Font: Degular Bold
- Size: 24px
- Color: #FFFFFF
- Transform: uppercase
- Line-height: 1.2

Inactive Language:
- Font: Degular Bold
- Size: 24px
- Color: rgba(255, 255, 255, 0.5)
- Transform: uppercase
- Line-height: 1.2

Separator:
- Width: 1px
- Height: 23px
- Background: rgba(255, 255, 255, 0.5)
```

**Menu Icon**:
```
Width: 40px
Height: 24px
Color: #FFFFFF
```

#### Mobile Header
```
Dimensions: 393px × 72px
Background: #000000
Padding: 0 16px
Display: flex
Justify: space-between
Align: center
```

**Logo**:
```
Width: 84.35px
Height: 20px
```

**Language Indicator**:
```
Width: 62px
Height: 32px
Font: Degular Bold, 24px
Color: #FFFFFF
```

**Burger Menu**:
```
Width: 40px
Height: 40px
```

---

### 2. Footer Component

#### Short Footer Desktop
```
Dimensions: 1920px × 574px
Background: #000000
Padding: 48px
```

**Top Section** (3 Columns):
```
Display: flex
Gap: 48px
Margin-top: 48px
Width: 1825px
```

**Column Structure**:
```
Flex: 1 0 0
Border-top: 1px solid rgba(255, 255, 255, 0.5)
Padding: 32px 0
Display: flex
Flex-direction: column
Gap: 16px
```

**Column Title**:
```
Font: Degular Bold
Size: 24px
Color: #FFFFFF
Line-height: 1.0
Transform: uppercase
```

**Column Content**:
```
Font: IBM Plex Sans Regular
Size: 16px
Color: #FFFFFF
Line-height: 1.4
```

**Bottom Text**:
```
Position: absolute
Top: 263px
Font: Degular Bold
Size: 16px
Color: #FFFFFF
Transform: uppercase
Line-height: 1.2

Left text: 48px from left
Right text: 1737px from left
```

**Background Decoration**:
```
Position: absolute
Top: 313px
Left: 48px
Width: 1825px
Height: 213px
Opacity: varies
```

#### Full Footer Desktop
```
Dimensions: 1920px × 918px
Background: #000000
Padding: 48px
```

Similar structure to short footer with additional:
- Newsletter signup section
- Extended social links
- Additional company information
- More detailed contact info

#### Mobile Footer
```
Dimensions: 393px × 954px (English) / 901px (Arabic)
Background: #000000
Padding: 16px
```

**Stacked Layout**:
- All columns stack vertically
- Same styling as desktop
- Adjusted spacing for mobile

---

## Content Components

### 3. Tab Component

#### Desktop Tab
```
Dimensions: 960px × 112px
Display: flex
Align: center
Justify: center
```

**Selected State**:
```
Font: Degular Bold
Size: 80px
Color: #FFFFFF
Line-height: 1.0
Transform: uppercase
Border-bottom: 4px solid #FFFFFF
```

**Unselected State**:
```
Font: Degular Bold
Size: 80px
Color: rgba(255, 255, 255, 0.5)
Line-height: 1.0
Transform: uppercase
Border-bottom: none
```

#### Mobile Tab
```
Dimensions: 204px × 104px (English) / varies (Arabic)
```

**Selected State**:
```
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Line-height: 1.0
Transform: uppercase
```

---

### 4. Card Components

#### Project Card (Desktop)
```
Dimensions: 896px × 896px
Position: relative
Overflow: hidden
Border-radius: 0
```

**Background Image**:
```
Width: 100%
Height: 100%
Object-fit: cover
```

**Overlay** (on hover):
```
Position: absolute
Inset: 0
Background: rgba(0, 0, 0, 0.6)
Transition: opacity 0.3s ease
```

**Project Number**:
```
Position: absolute
Top: 32px
Left: 32px
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Transform: uppercase
Line-height: 1.0
```

**Project Title**:
```
Position: absolute
Bottom: 32px
Left: 32px
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Transform: uppercase
Line-height: 1.0
```

**Service Type**:
```
Position: absolute
Top: 32px
Right: 32px
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Transform: uppercase
Line-height: 1.0
```

**Sound Toggle**:
```
Position: absolute
Bottom: 32px
Right: 32px
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Transform: uppercase
Line-height: 1.0
```

#### Project Card (Mobile)
```
Dimensions: 361px × 361px
Same structure as desktop
Adjusted text sizes: 24px
Padding: 16px
```

#### Blog Card (Desktop)
```
Dimensions: 896px × 896px
Display: flex
Flex-direction: column
```

**Image Section**:
```
Width: 896px
Height: ~600px (varies)
Object-fit: cover
```

**Content Section**:
```
Padding: 32px
Background: #000000
Flex: 1
```

**Title**:
```
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Line-height: 1.2
Margin-bottom: 16px
```

**Excerpt**:
```
Font: IBM Plex Sans Regular
Size: 16px
Color: rgba(255, 255, 255, 0.8)
Line-height: 1.4
```

**Meta Info**:
```
Font: IBM Plex Sans Regular
Size: 14px
Color: rgba(255, 255, 255, 0.5)
Margin-top: 16px
```

#### Blog Card (Mobile)
```
Dimensions: 361px × 361px
Same structure, adjusted spacing
```

#### Featured Work Card
```
Dimensions: 1824px × 920px
Position: relative
Overflow: hidden
```

**Video Background**:
```
Width: 100%
Height: 100%
Object-fit: cover
```

**Gradient Overlay**:
```
Position: absolute
Inset: 0
Background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)
```

**Text Elements**: Same positioning as Project Card but larger scale

---

### 5. Form Components

#### Input Field (Desktop)
```
Dimensions: 410px × 97px (varies by state)
Border: 1px solid rgba(255, 255, 255, 0.5)
Border-radius: 8px
Padding: 24px
Background: transparent
```

**Placeholder State**:
```
Font: IBM Plex Sans Regular
Size: 16px
Color: rgba(255, 255, 255, 0.5)
```

**Active State**:
```
Border: 2px solid #FFFFFF
Font: IBM Plex Sans Regular
Size: 16px
Color: #FFFFFF
```

**Filled State**:
```
Border: 1px solid rgba(255, 255, 255, 0.5)
Font: IBM Plex Sans Regular
Size: 16px
Color: #FFFFFF
```

#### Input Field (Mobile)
```
Dimensions: 313px × 92-97px
Same styling as desktop
Adjusted dimensions
```

#### Textarea
```
Dimensions: 313px × 298px (desktop: larger)
Border: 1px solid rgba(255, 255, 255, 0.5)
Border-radius: 8px
Padding: 24px
Background: transparent
Font: IBM Plex Sans Regular
Size: 16px
Color: #FFFFFF
Resize: vertical
```

#### Dropdown/Select
```
Dimensions: 115px × 56px (varies)
Border: 1px solid rgba(255, 255, 255, 0.5)
Border-radius: 8px
Padding: 17px 19px
Background: transparent
Display: flex
Align: center
Justify: space-between
```

**Label**:
```
Font: Degular Bold
Size: 22px (desktop) / 17px (mobile)
Color: #FFFFFF
```

**Icon**:
```
Width: 24px
Height: 24px
Color: #FFFFFF
```

---

### 6. Button Components

#### Primary CTA Button (Circular)
```
Dimensions: 72px × 72px
Border-radius: 11.816px (nearly circular)
Background: #FFFFFF
Display: flex
Align: center
Justify: center
Cursor: pointer
Transition: transform 0.3s ease
```

**Icon**:
```
Width: 48px
Height: 48px
Transform: rotate(45deg)
Color: #000000
```

**Hover State**:
```
Transform: scale(1.1)
```

#### Text Button
```
Display: inline-flex
Align: center
Padding: 0
Background: transparent
Border: none
Cursor: pointer
```

**Text**:
```
Font: Degular Bold
Size: 24px
Color: #FFFFFF
Transform: uppercase
Line-height: 1.2
```

**Hover State**:
```
Color: rgba(255, 255, 255, 0.8)
```

#### Submit Button
```
Dimensions: 313px × 64px (mobile) / larger (desktop)
Border-radius: 8px
Background: #FFFFFF
Border: none
Cursor: pointer
Display: flex
Align: center
Justify: center
```

**Text**:
```
Font: Degular Bold
Size: 24px (desktop) / 20px (mobile)
Color: #000000
Transform: uppercase
```

**Hover State**:
```
Background: rgba(255, 255, 255, 0.9)
```

---

### 7. Pill/Tag Component

#### Desktop Pill
```
Dimensions: 310px × 48px (varies by content)
Border-radius: 24px
Padding: 12px 24px
Display: inline-flex
Align: center
Justify: center
Cursor: pointer
Transition: all 0.3s ease
```

**Selected State**:
```
Background: #FFFFFF
Border: 2px solid #FFFFFF
```

**Selected Text**:
```
Font: Degular Bold
Size: 24px
Color: #000000
```

**Unselected State**:
```
Background: transparent
Border: 2px solid rgba(255, 255, 255, 0.5)
```

**Unselected Text**:
```
Font: Degular Bold
Size: 24px
Color: #FFFFFF
```

**Hover State** (Unselected):
```
Border: 2px solid #FFFFFF
```

#### Mobile Pill
```
Dimensions: 261px × 48px
Same styling as desktop
Adjusted width
```

---

### 8. Language Switcher Component

```
Display: flex
Gap: 11px (desktop) / varies (mobile)
Align: center
```

**Language Option**:
```
Display: flex
Align: center
Justify: center
Cursor: pointer
Padding: 4px 8px
```

**Active Language**:
```
Font: Degular Bold
Size: 24px (desktop) / 29px (mobile)
Color: #FFFFFF
Line-height: 1.2
```

**Inactive Language**:
```
Font: Degular Bold
Size: 24px (desktop) / 29px (mobile)
Color: rgba(255, 255, 255, 0.5)
Line-height: 1.2
```

**Separator**:
```
Width: 1px
Height: 23px
Background: rgba(255, 255, 255, 0.5)
```

---

### 9. Pagination Component

```
Display: flex
Gap: 90.33px (desktop) / varies (mobile)
Align: center
Justify: center
```

**Arrow Button**:
```
Dimensions: 58.33px × 58.33px (desktop) / 40px × 40px (mobile)
Border-radius: 50%
Border: 2px solid rgba(255, 255, 255, 0.5)
Background: transparent
Display: flex
Align: center
Justify: center
Cursor: pointer
```

**Arrow Icon**:
```
Width: 24px
Height: 24px
Color: #FFFFFF
```

**Page Number**:
```
Font: Degular Bold
Size: 77px (desktop) / 32px (mobile)
Color: #FFFFFF
Line-height: 1.0
Cursor: pointer
```

**Active Page**:
```
Color: #FFFFFF
Text-decoration: underline
```

**Inactive Page**:
```
Color: rgba(255, 255, 255, 0.5)
```

**Hover State**:
```
Color: #FFFFFF
```

---

### 10. Menu Overlay Component

#### Desktop Menu
```
Dimensions: 1920px × 1080px
Position: fixed
Top: 0
Left: 0
Background: rgba(0, 0, 0, 0.95)
Z-index: 1000
Display: flex
Flex-direction: column
```

**Menu Items Container**:
```
Padding: 240px 48px
Display: flex
Flex-direction: column
Gap: 80px
```

**Menu Item**:
```
Display: flex
Justify: space-between
Align: center
Border-bottom: 1px solid rgba(255, 255, 255, 0.5)
Padding-bottom: 40px
```

**Menu Item Label**:
```
Font: Degular Bold
Size: 80px
Color: #FFFFFF
Transform: uppercase
Line-height: 1.0
```

**Menu Item Description**:
```
Font: IBM Plex Sans Regular
Size: 24px
Color: rgba(255, 255, 255, 0.5)
Line-height: 1.4
```

**Hover State**:
```
Label Color: rgba(255, 255, 255, 0.8)
Description Color: #FFFFFF
```

#### Mobile Menu
```
Dimensions: 393px × 852px
Position: fixed
Top: 72px
Left: 0
Background: rgba(0, 0, 0, 0.95)
Z-index: 1000
```

**Menu Items**:
```
Padding: 112px 16px
Gap: 80px (between items)
```

**Menu Item Label**:
```
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Transform: uppercase
```

**Menu Item Description**:
```
Font: IBM Plex Sans Regular
Size: 18px
Color: rgba(255, 255, 255, 0.5)
```

---

### 11. Modal/Popup Component

#### Project Detail Modal
```
Dimensions: 1920px × 1080px (full screen)
Position: fixed
Top: 0
Left: 0
Background: rgba(0, 0, 0, 0.95)
Z-index: 2000
Overflow-y: auto
```

**Close Button**:
```
Position: absolute
Top: 48px
Right: 48px
Width: 48px
Height: 48px
Cursor: pointer
```

**Content Container**:
```
Padding: 120px 48px
Max-width: 1824px
Margin: 0 auto
```

**Project Title**:
```
Font: Degular Bold
Size: 240px (desktop) / 106px (mobile)
Color: #FFFFFF
Line-height: 1.0
Transform: uppercase
Margin-bottom: 56px
```

**Project Description**:
```
Width: 455px (desktop) / 361px (mobile)
Font: IBM Plex Sans Regular
Size: 16px
Color: #FFFFFF
Line-height: 1.4
Margin-bottom: 64px
```

**Info Grid**:
```
Display: grid
Grid-columns: 3 (desktop) / 1 (mobile)
Gap: 48px
Margin-bottom: 64px
```

**Info Item**:
```
Display: flex
Justify: space-between
Align: center
Border-bottom: 1px solid rgba(255, 255, 255, 0.5)
Padding-bottom: 20px
```

**Info Label**:
```
Font: IBM Plex Sans Regular
Size: 20px
Color: rgba(255, 255, 255, 0.5)
```

**Info Value**:
```
Font: IBM Plex Sans Regular
Size: 20px
Color: #FFFFFF
```

---

### 12. Preloader Component

```
Dimensions: 1920px × 1080px (full screen)
Position: fixed
Top: 0
Left: 0
Background: #000000
Z-index: 9999
Display: flex
Flex-direction: column
Align: center
Justify: center
```

**Logo**:
```
Width: 97px (desktop) / 84.35px (mobile)
Height: 23px (desktop) / 20px (mobile)
Margin-bottom: 48px
```

**Progress Bar Container**:
```
Width: 1824px (desktop) / 361px (mobile)
Height: 3px
Background: rgba(255, 255, 255, 0.2)
Border-radius: 1.5px
Position: relative
```

**Progress Bar Fill**:
```
Height: 3px
Background: #FFFFFF
Border-radius: 1.5px
Transition: width 0.3s ease
```

**Percentage Text**:
```
Font: Degular Bold
Size: 32px
Color: #FFFFFF
Position: absolute
Top: -48px
Right: 0
```

**Decorative Elements**:
```
Various rounded rectangles
Sizes: 127px-798px width, 110px-416px height
Opacity: 0.1-0.3
Positioned randomly
Animation: float/fade
```

---

## Interaction States

### Hover States
- **Links**: Opacity 0.8
- **Buttons**: Scale 1.05 or background change
- **Cards**: Overlay appears, scale 1.02
- **Menu Items**: Color change

### Active States
- **Buttons**: Scale 0.98
- **Inputs**: Border color change
- **Tabs**: Border-bottom appears

### Focus States
- **All interactive elements**: 2px outline, offset 2px
- **Color**: rgba(255, 255, 255, 0.5)

### Disabled States
- **Opacity**: 0.5
- **Cursor**: not-allowed
- **Pointer-events**: none

---

## Animation Specifications

### Transitions
```css
Default: all 0.3s ease
Fast: all 0.15s ease
Slow: all 0.5s ease
```

### Keyframe Animations

**Fade In**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
Duration: 0.5s
Easing: ease-in
```

**Slide Up**:
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
Duration: 0.6s
Easing: ease-out
```

**Scale In**:
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
Duration: 0.4s
Easing: ease-out
```

---

## Accessibility Requirements

### Keyboard Navigation
- Tab order follows visual flow
- Focus visible on all interactive elements
- Escape closes modals/menus
- Enter/Space activates buttons

### Screen Readers
- Semantic HTML elements
- ARIA labels on icons
- Alt text on images
- Live regions for dynamic content

### Color Contrast
- Text on black: WCAG AAA compliant
- Minimum contrast ratio: 7:1
- Focus indicators: 3:1 minimum

---

**Document Version**: 1.0
**Last Updated**: 2026-03-01
