# DNA Media Website

A premium bilingual (English/Arabic) website for DNA Media built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm >= 8.0.0

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build

Build the production application:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
dna-media-website/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── .kiro/                 # Kiro specs and configuration
├── node_modules/          # Dependencies
├── .eslintrc.json         # ESLint configuration
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ ESLint for code quality
- ✅ Optimized for production

## Next Steps

Follow the implementation plan in `.kiro/specs/dna-media-website/tasks.md` to continue building the website.

## License

Private - DNA Media
