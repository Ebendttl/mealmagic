# Meal Magic AI — Culinary Pairing Instrument

Meal Magic AI is a premium, client-side single-page application (SPA) designed as an elegant, editorial-style companion for culinary enthusiasts. It allows users to track pantry items, visualize ingredient expiration timelines, explore flavor-matching coordinates, and dynamically generate custom flavor-aligned recipes.

---

## 🚀 Key Features

*   **Fixed Full-Screen Onboarding:** A structured three-step wizard (Cuisines, Dietary Boundaries, and Culinary Temperament) that configures user preferences.
*   **Dual Viewport Layout:** Adaptive interface showcasing a persistent left sidebar on desktop viewports and an integrated bottom navigation tab-bar on mobile viewports.
*   **Ingredient Teleportation:** Dynamically shifts search controls between the sidebar (desktop) and page container (mobile) automatically based on window dimensions.
*   **Pairing & Custom Generation Engine:** Autocompletes ingredient searches and executes a matching algorithm. If a search contains ingredients matching a curated recipe, it serves it first; otherwise, it dynamically compiles custom cooking instructions based on raw ingredient properties.
*   **Visual Pantry Organizer:** Chronologically categorizes ingredients by remaining lifespan (**Critical** / $\le 2$ days, **Medium** / 3–6 days, and **Fresh** / $\ge 7$ days). Clicking a card teleports the ingredient directly into the search bar.
*   **Saved Recipe Manual & Poetic Journal:** Offers bookmarks to save generated or curated recipes and an editorial kitchen journal exploring food science.
*   **Aesthetics & Theming:** Persisted Dark/Light theme toggles with smooth micro-animations, premium serif headings, and color palettes optimized for reading.

---

## 🛠️ Tech Stack & Dependencies

*   **Runtime:** Node.js (ES Modules, `"type": "module"`)
*   **Build Tool:** Vite (`^5.2.0`)
*   **Languages:** HTML5, Vanilla CSS3 (Custom Variables, CSS Grids, Flexbox), JavaScript (ES6+ Standards)
*   **State & Persistence:** LocalStorage API

---

## 📁 File Structure

```
mealmagic/
├── index.html            # Main HTML5 shell, page containers, details modal, onboarding overlay
├── main.js              # Application state, initialization, page router, UI event listeners
├── recipes.js           # Curated recipes, ingredient pairing metadata, recipe generator logic
├── style.css            # Modular design system, transitions, media queries, theme variables
├── package.json         # Scripts and development dependencies
├── package-lock.json    # Dependency lockfile
├── .gitignore           # File and directory exclusions for Git
├── .editorconfig        # Formatting standards (indentation, line breaks)
└── LICENSE              # Repository license configuration
```

---

## ⚙️ Local Development Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
Navigate to the root directory and run:
```bash
npm install
```

### 2. Start the Development Server
Launch the local server using Vite:
```bash
npm run dev
```
Once active, open your browser and navigate to the local address displayed in the terminal console (usually `http://localhost:5173/`).

### 3. Build for Production
To bundle the application into optimized static assets under the `dist/` directory:
```bash
npm run build
```

---

## 🧠 Architectural Mechanics

### 1. State Management (`main.js`)
State is centralized inside a single mutable object that persists dynamically to `localStorage` under `mealmagic_state` on change:

```javascript
const state = {
  onboarding: {
    step: 1,
    cuisines: [],
    diet: null,
    skill: null,
    username: "Chef Alchemist"
  },
  selectedIngredients: [],
  pantry: [ ... ],
  savedRecipeIds: [],
  currentModalRecipe: null,
  activePage: "page-discover"
};
```

### 2. Onboarding Gate & Full-Screen Overlay
The onboarding container (`#onboarding-flow`) is styled with `position: fixed` and `z-index: 200` to sit directly over all interactive navigation components. It is dismissed once `localStorage.getItem("mealmagic_onboarding_completed") === "true"` is set.
*   **Escape Hatch:** When users adjust their settings from the Profile screen, the overlay is displayed with a close button (`#close-onboarding-btn`) at the top right, enabling returning users to dismiss edit modals without clicking through the entire wizard.

### 3. Pairing & Generation Algorithm (`recipes.js`)
When a user adds ingredients and clicks **"Cast Spell"**:
1.  **Curated Search:** The app matches search tags against `curatedRecipes`. If $\ge 2$ ingredients intersect, it loads the curated recipe.
2.  **Custom Generation:** If no matches are found, `castSpell` executes. It looks up the primary ingredients in `ingredientsDb` to extract flavor notes (e.g. Earthy, Umami) and construct procedural instructions dynamically.

---

## 🎨 Theme Customization & Extensions

### 1. Adding New Ingredients
To extend the pairing suggestions or autocomplete vocabulary, append new key-value definitions to `ingredientsDb` inside `recipes.js`:

```javascript
export const ingredientsDb = {
  // ... existing ingredients
  "avocado": { 
    category: "V", // V = Vegetable, H = Herb, P = Pantry, F = Fruit, M = Meat/Sea
    flavor: "Rich/Creamy", 
    pairings: ["lime", "coriander", "tomato", "chili oil"] 
  }
};
```

### 2. Editing CSS Variables
Global colors, typography scales, and fonts are defined as root tokens in `style.css`. Toggle dark mode properties by targeting the `body.dark` namespace:

```css
:root {
  --ground: #faf6f0;     /* Light cream background */
  --text: #1a1208;       /* Warm black text */
  --accent: #c4622d;     /* Editorial orange accent */
}

body.dark {
  --ground: #120e0a;     /* Dark obsidian background */
  --text: #f0e6da;       /* Soft warm text */
  --accent: #e07840;     /* Vibrant orange accent */
}
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.