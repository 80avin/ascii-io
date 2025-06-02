# Project Structure

## Root Files:
- `index.html` - Main HTML entry point with app structure
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `pnpm-lock.yaml` - Package lock file
- `.gitignore` - Git ignore patterns

## Source Directory (`src/`):
- `main.ts` - Main TypeScript application entry point
  - Contains AsciiArtGenerator class (main application logic)
  - Character intensity calculation
  - Image/text processing
  - DOM event handling
  - ASCII art generation algorithm
- `style.css` - Complete styling for the application
  - Responsive grid layout
  - Tab system styling
  - Button and form styling
  - Mobile responsive breakpoints
- `vite-env.d.ts` - TypeScript environment declarations

## Public Directory (`public/`):
- `vite.svg` - Vite logo asset

## AI Directory (`ai/`):
- `01-instruction.md` - AI development instructions

## Key Classes:
- **AsciiArtGenerator** - Main application class handling all functionality
  - Image upload and processing
  - Text rendering with font selection
  - ASCII character intensity mapping
  - Canvas-to-ASCII conversion algorithm
  - UI event management

## Interfaces:
- **CharacterIntensity** - Character to intensity mapping
- **TextSizeConfig** - Font size configuration