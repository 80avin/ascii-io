# ASCII Art Generator Project - Enhanced

This is a single webpage project called "ascii-io" that converts images and text into ASCII art using advanced pattern matching algorithms.

## Key Features:
- **Image to ASCII**: Users can upload images (JPG, PNG, GIF, WebP) which are converted to ASCII art
- **Text to ASCII**: Users can input text and choose from Google Fonts (Roboto, Bungee, Dancing Script, Orbitron, Playfair Display) with different sizes (Small, Medium, Large)
- **Multiple Character Sets**: 
  - Alphanumeric: " qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM[];',./{}:\"<>?`1234567890-=~!@#$%^&*()_+"
  - Block Characters: Unicode block characters (0x2580-0x259f, 0x1fb00-0x1fb9f)
- **Customizable Output**: Users can specify output dimensions (50-1000 columns and rows)
- **Preview System**: Live preview of input in a canvas before conversion
- **Export Options**: Copy to clipboard and download as text file

## Technical Approach - Advanced Pattern Matching:
- **Template Matching Algorithm**: Uses normalized cross-correlation to find best character match
- **Spatial Pattern Recognition**: Considers 2D intensity distribution rather than just overall brightness
- **Multi-Character Set Support**: Different rendering and matching strategies for different character types
- **Performance Optimization**: Template caching, fast rejection algorithms, and progressive quality options
- **Template Generation**: Pre-renders character templates at various block sizes for accurate matching
- **Correlation Analysis**: Uses statistical correlation to find character that best represents pixel block pattern

## Algorithm Evolution:
1. **Phase 1**: Basic intensity mapping (original implementation)
2. **Phase 2**: Template matching with spatial correlation
3. **Phase 3**: Multi-character set support with optimized rendering
4. **Phase 4**: Performance optimization and quality controls