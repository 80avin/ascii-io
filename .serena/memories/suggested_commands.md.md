# Suggested Commands

## Development:
```bash
# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Preview production build
npm run preview
# or
pnpm preview
```

## Package Management:
```bash
# Install dependencies
npm install
# or
pnpm install

# Add new dependency
npm install <package>
# or
pnpm add <package>

# Add dev dependency
npm install -D <package>
# or
pnpm add -D <package>
```

## Git Commands:
```bash
# Basic git operations
git status
git add .
git commit -m "message"
git push
git pull

# View changes
git diff
git log --oneline
```

## File System (Linux):
```bash
# Navigation
ls -la          # List files with details
cd <directory>  # Change directory
pwd             # Print working directory

# File operations
find . -name "*.ts"     # Find TypeScript files
grep -r "search" src/   # Search in source files
cat <file>              # Display file content
less <file>             # View file with paging

# Process management
ps aux | grep node      # Find Node processes
kill <pid>              # Kill process
```

## TypeScript:
```bash
# Type checking (if needed manually)
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/main.ts
```

## Browser Testing:
- Open http://localhost:5173 in development
- Use browser DevTools for debugging
- Check Console for runtime errors
- Use Network tab for resource loading issues