# ASCII Art Generator Project

This is a single webpage project called "ascii-io" that converts images and text into ASCII art.

## Key Features:
- **Image to ASCII**: Users can upload images (JPG, PNG, GIF, WebP) which are converted to ASCII art
- **Text to ASCII**: Users can input text and choose from Google Fonts (Roboto, Bungee, Dancing Script, Orbitron, Playfair Display) with different sizes (Small, Medium, Large)
- **Customizable Output**: Users can specify output dimensions (50-1000 columns and rows)
- **Preview System**: Live preview of input in a canvas before conversion
- **Export Options**: Copy to clipboard and download as text file

## Technical Approach:
- Uses pixel-based intensity mapping approach
- Precomputes ASCII character intensities by measuring visual density
- Character set: " qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM[];',./{}:\"<>?`1234567890-=~!@#$%^&*()_+"
- Converts canvas data to grayscale and maps brightness to closest ASCII character
