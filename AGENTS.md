# Agent Guidelines for bfbf Project

## Project Overview
bfbf is a Brainfuck interpreter implemented in pure JavaScript. The project demonstrates Turing completeness through a Towers of Hanoi implementation in Brainfuck code.

- **Language**: JavaScript (Node.js)
- **Type System**: Plain JavaScript (no TypeScript)
- **Test Framework**: Mocha
- **Package Manager**: npm (pnpm lock file present)
- **Module System**: CommonJS
- **Commit Convention**: Commitizen with cz-jt adapter

## Build, Lint, and Test Commands

### Core Commands
```bash
npm start          # Start development server with nodemon (auto-restarts on changes)
npm test           # Run all tests with mocha
npm run cz         # Run commitizen for interactive conventional commits
```

### Running Specific Tests
```bash
# Run a single test file
npx mocha tests/filename.js

# Run all test files matching a pattern
npx mocha --grep "pattern" ./tests/*.js

# Run a specific test within a file
npx mocha tests/filename.js --grep "test name"

# Run tests with reporter options
npx mocha tests/*.js --reporter spec
```

## Code Style Guidelines

### Formatting
- Use **tabs** for indentation (2 spaces per tab) - not spaces
- **No semicolons** at statement ends
- Maximum line length: 100 characters
- Use template literals for string interpolation (backticks)
- Use consistent spacing around operators and after commas
- Break long lines at logical points with proper indentation

### Naming Conventions
- **Functions**: camelCase with descriptive names (e.g., `js2BF`, `parseInput`, `executeBF`)
- **Variables**: camelCase with descriptive names (e.g., `memoryPtr`, `inputPtr`, `outputBuffer`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `MEMORY_SIZE`, `MAX_INPUT_LENGTH`)
- **Files**: kebab-case for JavaScript files (e.g., `brainfuck-interpreter.js`, `hanoi-solver.js`)
- **Classes**: PascalCase if used (e.g., `BFInterpreter`, `MemoryManager`)

### Type Handling
- Use `Uint8Array` for memory buffers (fixed-size, typed arrays)
- Use `String.fromCharCode()` for character conversions
- Use `charCodeAt()` for string to character code conversion
- Avoid implicit type coercion; use explicit comparisons (`===` not `==`)
- Validate input types at function boundaries with early returns
- Use `typeof` and `instanceof` for type checking

### Import Patterns
- Use CommonJS `require()` for module imports (not ES6 imports)
- Use `module.exports` or `exports` for module exports
- Import modules at the top of files (no inline requires)
- Group related imports together
- Avoid circular dependencies

### Error Handling
- Use `try/catch` for synchronous operations that may throw
- Return error objects with descriptive messages instead of throwing when appropriate
- Handle edge cases explicitly (empty input, null values, undefined values)
- Validate array bounds before access operations to prevent errors
- Use defensive programming techniques for external inputs
- Log errors with sufficient context for debugging

### Code Structure
- Keep functions focused and small (target under 50 lines when possible)
- Use early returns to reduce nesting and improve readability
- Group related logic together in the same function
- Extract complex logic into separate, well-named helper functions
- Add Chinese comments for complex algorithms (per project convention)
- Document public APIs with JSDoc-style comments

### BF Interpreter Specific Guidelines
- Memory size: 10,000 bytes (fixed, `Uint8Array(10000)`)
- Input handling: character-by-character with fallback to null/0
- Loop matching: Use stack-based approach for bracket pairs (`[` and `]`)
- Pointer movement: Validate pointer bounds (0 to 9999)
- Output: Support both array collection and stream output modes
- Command filtering: Skip non-BF commands silently (optimization)

### Git Workflow
- Use `npm run cz` for commits to follow conventional changelog
- Write meaningful commit messages describing the "why" not just the "what"
- Keep commits atomic and focused on a single change
- Review changes before committing
- Push changes regularly to avoid data loss

## Testing Guidelines
- Write tests for new functionality in the `tests/` directory
- Use descriptive test names that explain the behavior being tested
- Test edge cases: empty input, maximum input, invalid characters
- Test both success and error paths
- Mock external dependencies when necessary

## Development Workflow
1. Create a feature branch for changes
2. Write code following the style guidelines
3. Add or update tests for the functionality
4. Run `npm test` to verify all tests pass
5. Use `npm run cz` to create a proper commit message
6. Push changes and create a pull request when ready
