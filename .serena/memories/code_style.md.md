# Code Style and Conventions

## TypeScript Style:
- **Interfaces** for type definitions (CharacterIntensity, TextSizeConfig)
- **Private methods** for internal class functionality
- **Async/await** for asynchronous operations
- **Type annotations** on all parameters and return values
- **Const assertions** for readonly data
- **Optional chaining** (?.) and nullish coalescing (??)

## Naming Conventions:
- **Classes**: PascalCase (AsciiArtGenerator)
- **Methods/Variables**: camelCase (handleImageUpload, previewCanvas)
- **Constants**: UPPER_SNAKE_CASE (ASCII_CHARS)
- **HTML IDs**: kebab-case (preview-canvas, generate-btn)
- **CSS Classes**: kebab-case (left-panel, tab-button)

## Class Structure:
- Private properties first
- Constructor
- Private methods grouped by functionality
- Event handlers grouped together
- Core algorithm methods
- Utility methods last

## Error Handling:
- Try-catch blocks for async operations
- User-friendly error messages in UI
- Console logging for debugging
- Graceful fallbacks (clipboard API)

## DOM Interaction:
- Type assertions for HTML elements
- Event delegation where appropriate
- Clear separation of concerns
