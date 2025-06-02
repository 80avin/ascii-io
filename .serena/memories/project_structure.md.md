# Project Structure - Enhanced Architecture

## Root Files:
- `index.html` - Main HTML entry point with enhanced UI for character sets
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `pnpm-lock.yaml` - Package lock file
- `.gitignore` - Git ignore patterns

## Source Directory (`src/`):
- `main.ts` - Main TypeScript application entry point with advanced algorithms
  - **AsciiArtGenerator** - Main application class
  - **TemplateMatchingEngine** - Advanced pattern matching system
  - **CharacterSetManager** - Multi-character set support
  - **PerformanceOptimizer** - Template caching and optimization
- `style.css` - Enhanced styling with character set UI
- `vite-env.d.ts` - TypeScript environment declarations

## Enhanced Architecture Components:

### Core Classes:
- **AsciiArtGenerator** - Main orchestrator
  - UI event management
  - Conversion pipeline coordination
  - Settings management

- **TemplateMatchingEngine** - Pattern matching core
  - Template generation and caching
  - Normalized cross-correlation algorithm
  - Multi-scale template support
  - Performance optimization strategies

- **CharacterSetManager** - Character set abstraction
  - Alphanumeric character set support
  - Unicode block character rendering
  - Character set switching logic
  - Font rendering optimization

- **PatternAnalyzer** - Spatial analysis
  - 2D pattern extraction from pixel blocks
  - Statistical correlation calculations
  - Fast rejection algorithms
  - Quality vs speed trade-offs

### Enhanced Interfaces:
- **CharacterTemplate** - Template data structure
  - Character metadata
  - Rendered pattern data
  - Statistical properties
  - Correlation cache

- **MatchingResult** - Pattern matching results
  - Best character match
  - Confidence score
  - Alternative matches

- **CharacterSet** - Character set definition
  - Character array
  - Unicode ranges
  - Rendering parameters
  - Optimization hints

- **ConversionSettings** - User preferences
  - Character set selection
  - Quality vs speed preference
  - Block size optimization
  - Caching strategies

### Algorithm Architecture:
1. **Template Generation Phase**:
   - Multi-threaded character rendering
   - Template caching system
   - Statistical pre-computation

2. **Pattern Matching Phase**:
   - Spatial correlation analysis
   - Fast rejection filtering
   - Progressive quality enhancement

3. **Optimization Layer**:
   - Memory management
   - Performance monitoring
   - Adaptive quality scaling