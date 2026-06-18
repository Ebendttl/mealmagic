\# Meal Magic AI



A culinary pairing app that suggests recipes based on the ingredients you have on hand. Stock your pantry, add ingredients, and let Meal Magic match them to curated recipes — complete with onboarding for cuisine, dietary, and skill preferences, a pantry tracker with expiry warnings, saved recipes, and a kitchen journal.



\## Features



\- \*\*Discover\*\* — Add ingredients you have and "cast a spell" to get matching recipe suggestions from a curated list.

\- \*\*Pantry\*\* — Track ingredients with an expiry slider; items are automatically grouped into Critical, This Week, and Fresh sections based on days remaining.

\- \*\*Saved\*\* — Bookmark recipes for quick access later.

\- \*\*Journal\*\* — Browse short culinary notes and technique write-ups.

\- \*\*Profile \& Onboarding\*\* — Set cuisine affinities, dietary boundaries (vegetarian, vegan, gluten-free, pescatarian), and a skill level (Novice, Practitioner, Alchemist) that personalize the experience.

\- \*\*Light/Dark mode\*\* with preferences saved locally.

\- Fully responsive: sidebar navigation on desktop, bottom tab bar on mobile.



\## Tech Stack



Vanilla HTML, CSS, and JavaScript (ES modules) — no frameworks required. State is persisted in the browser via `localStorage`.



\## Getting Started



Clone the repo and open `index.html` in your browser:



```bash

git clone https://github.com/Ebendttl/mealmagic.git

cd mealmagic

```



Then simply open `index.html` directly in your browser, or serve it locally, e.g.:



```bash

npx serve .

```



No build step or dependencies are required to run the app.



\## Project Structure



```

mealmagic/

├── index.html      # App shell and page markup

├── main.js         # App logic: state, navigation, rendering

├── recipes.js       # Curated recipe and ingredient data, matching logic

├── style.css       # Styling for light/dark themes and layout

└── favicon.svg

```



\## License



See \[LICENSE](./LICENSE) for details.

