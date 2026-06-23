# Project Memory: Meal Magic AI

A comprehensive record of the project state, architecture, design decisions, and roadmap for **Meal Magic AI** to maintain consistency and prevent context drift.

---

## 1. Project Overview & Objectives
**Meal Magic AI** is a premium, client-side single-page application (SPA) built as a culinary companion. It enables home cooks and culinary practitioners to track pantry items, discover recipes matching their available ingredients, and dynamically generate custom flavor-aligned recipes.

### Key Visual & Design Pillars:
*   **Rich Aesthetics:** Modern editorial styling with elegant serif headings, high-contrast typography, and smooth micro-animations.
*   **Affinities & Boundaries:** Onboarding experience to capture cuisine preferences (e.g., Levantine, Iberian, Japanese, Italian), dietary boundaries (e.g., Vegetarian, Vegan, Gluten-Free, Pescatarian), and culinary skill level (Novice, Practitioner, Alchemist).
*   **Dynamic Layouts:** Dual-viewport layout featuring a persistent left sidebar on desktop and a navigation bar at the bottom for mobile devices. Viewport portals handle the dynamic repositioning of the ingredient selection panel based on screen size.

---

## 2. Technical Stack
*   **Build Tool / Environment:** Vite (`vite ^5.2.0`), Node type module.
*   **Frontend Technologies:** Vanilla HTML5, CSS3 (using custom variables, fluid grids, and transitions), and ES Modules JavaScript.
*   **Storage:** LocalStorage (for persisting onboarding preferences, pantry lists, and bookmarked recipes).

---

## 3. Project Architecture & File Structure

```
mealmagic/
├── index.html            # Core SPA shell (pages, modals, onboarding, responsive navigation)
├── main.js              # App initialization, state manager, page router, UI event listeners
├── recipes.js           # Curated recipes, ingredient pairings database, custom recipe generator
├── style.css            # Design system, fluid layout, responsive breakpoints, dark/light themes
├── package.json         # Project metadata and development dependencies
├── favicon.svg          # Scalable application icon
├── .gitignore           # File and directory exclusions for Git
├── .editorconfig        # Formatting standards (indentation, line breaks)
├── .prettierrc          # Prettier rules for JS and CSS files
├── CONTRIBUTING.md      # Guidelines for contributing developers
├── memory.md            # Comprehensive development record (avoiding context drift)
└── README.md            # Detailed setup instructions and project documentation
```

### Core State Schema (`main.js`):
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
  pantry: [
    { id: "p1", name: "Aubergine", expiryDays: 2, category: "V" },
    ...
  ],
  savedRecipeIds: [],
  currentModalRecipe: null,
  activePage: "page-discover"
};
```

---

## 4. Implemented Features & Work Progress

### 4.1 Onboarding Flow
*   **UI/UX:** A multi-step introductory card sequence (Step 1: Cuisines; Step 2: Diets; Step 3: Skill).
*   **Layout Behavior:** Styled as a viewport-fixed full-screen overlay (`position: fixed`) covering the sidebar and navigation. This prevents clicking sidebar navigation items prior to completing the onboarding setup.
*   **Settings Interactivity:** A close button (`#close-onboarding-btn`) is displayed at the top right of the overlay, but *only* if the onboarding has already been completed once. This allows returning users to dismiss edit modals without having to click through all wizard steps.
*   **State Integration:** Clicks write directly to `state.onboarding`.
*   **Persistence:** Saved to `localStorage` under `mealmagic_state`.
*   **Reset functionality:** A "Reset Onboarding" button is available in the header and profile page to clear stored configurations and reload.

### 4.2 Discover & Pairing Engine ("Cast Spell")
*   **Autocomplete Search:** Supports lookup of ingredients from the internal database (`recipes.js`) with suggestions indicating category and flavor notes.
*   **Ingredient Selection:** Users can add multiple tags/chips to their search.
*   **Spell Casting Logic:**
    1.  *Curated Match:* If the selected ingredients match at least two ingredients of a curated recipe (e.g., Smoked Aubergine & Sesame Paste), the app serves that high-quality recipe first.
    2.  *Dynamic Generation:* If no curated match is found, the system generates a tailored recipe on-the-fly (`castSpell` in `recipes.js`) based on flavor category, matching complementary properties (e.g., Earthy, Umami, Sweet-sour) and generating step-by-step instructions.

### 4.3 Pantry Management
*   **Lifespan & Expiry tracking:** Items are categorized chronologically based on their remaining shelf life:
    *   **Critical (Red):** Expires in $\le 2$ days.
    *   **Medium (Amber):** Expires in 3 to 6 days.
    *   **Fresh (Green):** Expires in $\ge 7$ days.
*   **Interactive pantry cards:** Clicking a card scales it down, pushes the ingredient into the search chips, and redirects the user to the **Discover** page for instant pairing suggestions.

### 4.4 Saved Recipes & Journal
*   **Saved Recipes:** Bookmarked recipes are stored in `state.savedRecipeIds` and rendered in the **Saved** tab.
*   **Kitchen Journal:** Contains narrative-style editorial entries detailing culinary chemistry (e.g., Maillard reactions, cold extraction kinetics).

### 4.5 Responsive Architecture & Theming
*   **Adaptive Portals:** The ingredient search panel is teleported between the sidebar (desktop) and page container (mobile) depending on screen width.
*   **Dual Theme:** Complete light and dark themes using CSS properties with theme preferences persisted to `localStorage` under `mealmagic_theme`.

---

## 5. Development History & Commits
*   `fe8f7dc` — **feat: implement core recipe engine and add project favicon**
    Implemented custom recipe generator logic and integrated `favicon.svg`.
*   `b34d3a5` — **feat: implement recipe data and generation logic into main application flow**
    Added curated recipes database, ingredient lookup dictionary, and state mappings.
*   `00ae64c` — **chore: update Vite dependency optimization metadata and configuration**
*   `b8dc87f` — **chore: add type module to vite dependency configuration**
*   `b033f61` — **chore: initialize project with Vite dependencies and build artifacts**

---

## 6. Future Enhancements & Open Items
- [ ] **Live AI Integration:** Swap the deterministic client-side recipe generator (`castSpell`) with a Gemini API client for true AI culinary recommendations.
- [ ] **Dynamic Journal Entries:** Allow users to write and save their own journal entries instead of reading hardcoded mock records.
- [ ] **Pantry Notifications:** Push visual alerts or mock push notifications when items in the pantry transition into the "Critical" expiration zone.
- [ ] **Advanced Filtering:** Allow filtering the recipe grid based on selected diet types and cooking skill levels stored in the onboarding profile.
