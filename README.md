# Decor / DecorsDigital

A visually stunning, animation-rich website for Decor - an advanced digital production studio based in the UK that specializes in creating immersive digital experiences, breaking conventional boundaries between art and technology.

## Tech Stack

- **Framework:** Next.js 16.1.5 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:**
  - GSAP 3.14.2 with ScrollTrigger
  - Framer Motion 12.29.2
- **Icons:** Lucide React 0.563.0
- **Fonts:** Geist Sans & Geist Mono (Google Fonts)

## Project Structure

```
thedecor2clean/
├── app/
│   ├── favicon.ico          # Site favicon
│   ├── globals.css          # Global styles and Tailwind imports with custom theme
│   ├── layout.tsx           # Root layout with fonts, metadata, and header
│   └── page.tsx             # Main page composing all sections
│
├── components/
│   ├── about/
│   │   ├── index.tsx        # About section exports
│   │   └── AboutSection.tsx # Shutter breach animation with video reveal
│   │
│   ├── contact/
│   │   ├── index.tsx        # Contact section exports
│   │   └── ContactSection.tsx # Dark overlay with CTA and footer reveal
│   │
│   ├── footer/
│   │   ├── index.tsx        # Footer exports
│   │   └── Footer.tsx       # Site footer with newsletter and links
│   │
│   ├── navbar/
│   │   ├── index.tsx        # Navigation exports
│   │   ├── HeaderWrapper.tsx # Header container with menu state
│   │   ├── Header.tsx       # Fixed header with logo and controls
│   │   └── Menu.tsx         # Dropdown menu with newsletter
│   │
│   ├── philosophy/
│   │   ├── index.tsx        # Philosophy section exports
│   │   └── PhilosophySection.tsx # Scanner lens with scrolling text
│   │
│   ├── team/
│   │   ├── index.tsx        # Team section exports
│   │   ├── TeamSection.tsx  # Team groups with scroll transitions
│   │   └── TeamMemberCard.tsx # Individual team member cards
│   │
│   ├── ui/
│   │   ├── index.tsx        # UI components exports
│   │   ├── Hero.tsx         # Frosted fluted glass hero section
│   │   ├── TopoShape.tsx    # Topographic shape SVG
│   │   ├── InfoCard.tsx     # Team member info card component
│   │   └── QRCode.tsx       # QR code SVG component
│   │
│   └── work/
│       ├── index.tsx        # Work section exports
│       ├── ProjectsSection.tsx # Projects wrapper with state
│       ├── FeaturedWork.tsx # Project gallery with theme transition
│       └── ProjectPage.tsx  # Individual project detail page
│
├── lib/
│   ├── data/
│   │   ├── projects.ts      # Project data array
│   │   └── team.ts          # Team member data array
│   └── types.ts             # TypeScript type definitions
│
├── public/
│   ├── lastseg.png          # Contact section image
│   ├── file.svg             # File icon
│   ├── globe.svg            # Globe icon
│   ├── next.svg             # Next.js icon
│   ├── vercel.svg           # Vercel icon
│   └── window.svg           # Window icon
│
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Features & Components

### Hero Section (`components/ui/Hero.tsx`)
- Large animated headline with fade-in animation
- **Frosted Fluted Glass Effect:**
  - Multi-layered glass simulation with backdrop blur
  - Ribbed/fluted pattern using repeating CSS gradients
  - Realistic depth with multiple blend modes
  - Red gradient background (#880808 to #ffcccc)
  - Internal shine/gloss with gradient overlays
  - Ring border with subtle white/20 opacity
- Floating abstract elements and badges
- Framer Motion entrance animations

### About Section (`components/about/AboutSection.tsx`)
- **Shutter Breach Animation:**
  - Left and right panels slide apart to reveal content
  - Video background with grayscale-to-color reveal
  - Velocity skew distortion effect on text content
- Content includes:
  - Animated "System.Init" status indicator
  - Large typography: "Breach The Norm" with gradient text
  - Decorative coordinates and barcode elements
  - "Ultra Think" overlay text with blur effects
- GSAP ScrollTrigger with 3.5 viewport heights for animation space

### Philosophy Section (`components/philosophy/PhilosophySection.tsx`)
- **Scanner Lens Effect:**
  - Center-fixed scanning interface that follows content
  - Words scroll through with synchronized inner lens
  - Red/blue chromatic aberration on text
- Phrases: "IMMERSIVE", "INTERACTION", "DIGITAL", "REALITY", "SYSTEMS", "FUTURE"
- Velocity skew effect based on scroll speed
- HUD elements with "SCANNING" and "TARGET_LOCKED" indicators
- Dark background (#050505) with noise texture overlay

### Featured Work (`components/work/FeaturedWork.tsx`)
- **Theme Transition:** Smoothly transitions from light (#F0F1F7) to dark (#050505) mode
- Project gallery with 2-column grid layout
- **Project Cards:**
  - 16:9 aspect ratio images
  - Internal image parallax (scrolls within container)
  - Hover effects with "View" indicator
  - Editorial text layout with category tags
- Projects include:
  - Porsche Dream (Automotive)
  - Synthetic Human (R&D)
  - Devin AI (Product)
  - Spatial Fusion (XR/AR)
  - Nike Air Max (Commerce)
  - Apple Vision (Interface)

### Project Page (`components/work/ProjectPage.tsx`)
- Full-screen horizontal scroll experience
- **Slides include:**
  - Hero slide with title, description, services, and recognitions
  - Content slides with images/videos
  - Next project preview slide
- Features:
  - Scroll progress bar with Framer Motion spring animation
  - Page counter (current/total slides)
  - Navigation arrows with disabled states
  - Vertical-to-horizontal wheel scroll translation
  - Smooth snap scrolling
- Fixed header with back button

### Team Section (`components/team/TeamSection.tsx`)
- **4 Team Groups:** Creative, Tech, Growth, Ops
- Scroll-snap transitions between groups
- Dynamic labels showing current group name and description
- Vertical progress bar indicating scroll position
- **Team Member Cards:**
  - Futuristic "brave.lab" branding
  - Topographic background shapes
  - User images with grayscale filter and red light leak effects
  - Tech-style info cards with role, name, sector, material, and base unit
  - Corner decorations and noise texture overlay
- Background decorative grid lines

### Contact Section (`components/contact/ContactSection.tsx`)
- **Image Background:**
  - Abstract red image with multiple gradient overlays
  - Top, left, right, and bottom gradients for depth
- "DECOR SDIGITAL" header with brand coloring
- Centered image placeholder with blur backdrop
- **CTA Reveal Animation:**
  - "Let's Work Together" text with blur/scale effects
  - "Start Project" button with hover color transition
- Footer slides up from bottom on scroll

### Footer (`components/footer/Footer.tsx`)
- Company address (Bristol, UK)
- Social media links (Twitter/X, Instagram, LinkedIn)
- Email contacts (general and new business)
- Newsletter subscription with email input
- "R&D: labs.decorsdigital.co" link
- Scroll-to-top button with hover animation
- Built with heart animation

### Navigation (`components/navbar/`)
- **Header:**
  - Fixed positioning with pointer events management
  - "Decor" logo
  - Waveform button (Activity icon)
  - "Let's Talk" CTA with status dot
  - Menu toggle button
- **Menu:**
  - Dropdown with AnimatePresence
  - Navigation links (HOME, ABOUT US, PROJECTS, CONTACT)
  - Newsletter subscription card
  - Smooth fade/slide animations

## Color Scheme

### Brand Colors
- **Primary Brand:** `#E31B23` (red) - used as brandBlue variable
- **Background (Light):** `#ffffff`
- **Foreground (Light):** `#171717`
- **Background (Dark):** `#0a0a0a`
- **Foreground (Dark):** `#ededed`

### Gradients & Accents
- Hero gradient: `#880808 → #d70000 → #ff4d4d → #ffcccc`
- Dark sections: `#050505`
- Contact section: Multiple red gradients (`#D70000`, `red-600`)

### Mix Blend Modes
- Screen, overlay, soft-light, multiply for depth
- Difference for text over varied backgrounds

## Animation Techniques

### GSAP
- **ScrollTrigger:** Pin-based scroll animations
- **Timelines:** Multi-phase animations with precise timing
- **Scrub:** Smooth scroll-linked animations (0.3-1.2)
- **Velocity Effects:** Skew based on scroll velocity
- **Pin & AnticipatePin:** Seamless scroll pinning

### Framer Motion
- **useScroll:** Parallax and scroll tracking
- **useSpring:** Smooth progress bar animations
- **AnimatePresence:** Menu enter/exit animations
- **Motion components:** Page transitions and element reveals

### CSS Effects
- **Backdrop-blur:** Frosted glass effects
- **Repeating-linear-gradient:** Fluted glass patterns
- **Mix-blend-modes:** Color blending and overlays
- **Filter:** Grayscale, brightness, blur transitions
- **Transform:** Skew, scale, translate animations

## Data Management

### Team Data (`lib/data/team.ts`)
- 4 team members with:
  - Name, role, sector number
  - Material (Plasma, Neon, Flux, Aether)
  - Base unit (MK-1, MK-2, MK-3, MK-4)
  - Profile images

### Project Data (`lib/data/projects.ts`)
- 3 featured projects:
  - DecorsDigital
  - Ultra Think
  - Breach The Norm
- Each includes: title, description, thumbnail, accent color, services, recognitions, slides

## Development

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Key Features

### Performance
- Next.js App Router for optimal performance
- TypeScript for type safety
- Tailwind CSS 4 with inline theme configuration
- Optimized images with Next.js Image component

### Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states on interactive elements

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Fluid typography with `clamp()`
- Aspect-ratio preservation for images

### Animation Performance
- `will-change-transform` for animated elements
- GPU-accelerated transforms (translate, scale, rotate)
- Reduced layout thrashing with transform-based animations
- Efficient re-renders with proper React patterns

## Browser Support

- Modern browsers with ES2020+ support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contact Information

- **Studio:** Decor / DecorsDigital
- **Location:** Suite 2, 9 Marsh Street, Bristol, BS1 4AA, United Kingdom
- **Email:** hello@decorsdigital.co
- **Business:** business@decorsdigital.co
- **R&D:** labs.decorsdigital.co

## License

This project is proprietary and confidential.

---

Built with ❤️ by Decor Creative Studio © 2025
