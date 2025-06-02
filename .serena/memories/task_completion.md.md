# Task Completion Guidelines

## When a Task is Completed:

### 1. Code Quality Check:
- Ensure TypeScript strict mode compliance
- Check for unused variables/parameters
- Verify proper error handling
- Confirm type safety

### 2. Testing:
```bash
# Start development server to test
npm run dev

# Test in browser at http://localhost:5173
# Manual testing checklist:
# - Image upload functionality
# - Text input with different fonts
# - ASCII art generation with various dimensions
# - Copy to clipboard feature
# - Download functionality
# - Responsive design on different screen sizes
```

### 3. Build Verification:
```bash
# Ensure production build works
npm run build

# Preview production build
npm run preview
```

### 4. Code Organization:
- Verify methods are properly private/public
- Check that event handlers are organized
- Ensure consistent naming conventions
- Confirm proper separation of concerns

### 5. Performance Considerations:
- Character intensity calculation happens once on load
- Canvas operations are optimized
- Large image handling is efficient
- Memory cleanup for temporary objects

### 6. Browser Compatibility:
- Test modern browser features (Canvas API, File API)
- Verify clipboard API with fallback
- Check Google Fonts loading
- Test drag-and-drop functionality

### 7. Git Workflow:
```bash
git add .
git commit -m "descriptive commit message"
git push
```

## No Automated Testing:
This project currently has no unit tests, linting, or formatting tools configured. All verification is done through manual testing and TypeScript compilation.