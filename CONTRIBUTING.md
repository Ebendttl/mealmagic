# Contributing to Meal Magic AI

Thank you for taking the time to contribute! We want to make contributing to Meal Magic AI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Code of Conduct

We expect all contributors to adhere to standard professional conduct, maintaining a respectful, welcoming, and harassment-free environment for everyone.

## Our Development Process

1. **Fork and Clone:** Fork the repository and clone it locally.
2. **Install Dependencies:** Run `npm install` to install Vite and other development dependencies.
3. **Run Dev Server:** Start the server with `npm run dev` and perform local checks.
4. **Create a Branch:** Create a branch for your feature or fix (e.g., `feature/pantry-alerts` or `bugfix/onboarding-overflow`).
5. **Implement and Test:** Implement your changes and verify that they render correctly in both light/dark modes and responsive viewport sizes.
6. **Submit a Pull Request:** Open a Pull Request targeting the `main` branch with a clear description of the modifications.

## Style Guides

### JavaScript Style Guide
- We use ES modules (`import`/`export`).
- Indentation must be **2 spaces** (configured via `.editorconfig`).
- Variable names should use `camelCase`.
- Keep the global `state` in `main.js` clean and structured.

### CSS/Styling Guide
- Do not use utility-first frameworks like Tailwind CSS unless explicitly agreed upon. Maintain the fluid design system using custom CSS properties in `style.css`.
- Support both `.light` and `.dark` body themes.
- Ensure all hover states, transition timelines, and typography scales match the editorial design rules.

### Commit Message Guidelines
We follow standard semantic commit guidelines:
- `feat:` for new features (e.g., `feat: integrate LLM API client`)
- `fix:` for bug fixes (e.g., `fix: center onboarding container on mobile viewport`)
- `chore:` for background changes, package updates, config modifications (e.g., `chore: update vite version`)
- `docs:` for documentation updates (e.g., `docs: update setup guide in README`)
