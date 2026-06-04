// Curated, editorial recipes database for Meal Magic AI
export const curatedRecipes = [
  {
    id: "r1",
    title: "Smoked Aubergine & Sesame Paste",
    cuisine: "Levantine",
    time: "45 min",
    servings: "2 servings",
    flavorNote: "EARTHY",
    imageBg: "#e3dac9",
    ingredients: ["aubergine", "tahini", "garlic", "lemon", "olive oil", "pomegranate"],
    description: "Charred aubergine flesh emulsified with toasted sesame paste, finished with cold-pressed olive oil and acid-sweet pomegranate jewels.",
    steps: [
      "Prick the aubergines and char directly over a flame until the skin is papery and blackened, and the flesh collapses entirely.",
      "Steam in a closed bowl for 10 minutes to loosen skins, then peel gently, discarding charred skin and excess bitter liquid.",
      "Chop the warm flesh finely with a heavy knife, gradually folding in raw garlic paste, sea salt, and fresh lemon juice.",
      "Slowly whisk in tahini, allowing the emulsion to thicken. Adjust acidity and salt to taste.",
      "Plate in a shallow ceramic dish, creating deep ridges with a spoon. Fill ridges with olive oil and scatter pomegranate seeds."
    ]
  },
  {
    id: "r2",
    title: "Pan-Roasted Fennel with Wild Honey & Vinegar",
    cuisine: "Italian",
    time: "30 min",
    servings: "2 servings",
    flavorNote: "SWEET-SOUR",
    imageBg: "#d8ebd9",
    ingredients: ["fennel", "honey", "red wine vinegar", "olive oil", "sea salt", "black pepper"],
    description: "Crisp fennel bulbs caramelized in olive oil, glazed with dark wildflower honey and deglazed with sharp red wine vinegar.",
    steps: [
      "Trim the fennel bulbs, saving the delicate green fronds for garnish. Slice the bulbs vertically into thick wedges, keeping the core intact.",
      "Heat olive oil in a heavy cast-iron skillet over medium-high heat. Lay the fennel wedges in a single layer.",
      "Sear undisturbed for 5-6 minutes until a dark golden crust forms, then flip and sear the second side.",
      "Drizzle wild honey over the caramelized edges, letting it bubble and foam for a minute.",
      "Splash in the red wine vinegar, deglazing the pan. Reduce heat and simmer until the liquid coats the fennel like a glaze.",
      "Serve warm, scattered with the reserved fronds and flaky salt."
    ]
  },
  {
    id: "r3",
    title: "Cold-Brewed Shiitake & Kombu Broth",
    cuisine: "Japanese",
    time: "120 min",
    servings: "4 servings",
    flavorNote: "UMAMI",
    imageBg: "#cfc5b3",
    ingredients: ["shiitake", "kombu", "ginger", "soy sauce", "mirin", "water"],
    description: "A patient extraction of clean woodland earthiness and oceanic depth, seasoned lightly with brewed soy and sweet rice wine.",
    steps: [
      "Wipe the kombu strip gently with a damp cloth to remove excess salt, leaving the white mineral powder.",
      "Place kombu and dried shiitake mushrooms in a glass vessel with cold filtered water. Cover and steep in the refrigerator for at least 8 hours (or 2 hours at room temp for rapid extraction).",
      "Transfer to a pot, add sliced ginger, and heat over very low flame. Remove the kombu just before the water begins to bubble to avoid bitterness.",
      "Bring the broth to a gentle simmer for 10 minutes to extract the full mushroom essence.",
      "Strain through a fine cloth. Stir in soy sauce and mirin to finish. Serve warm in stoneware cups."
    ]
  },
  {
    id: "r4",
    title: "Seared Cod in Terracotta Tomato Reduction",
    cuisine: "Iberian",
    time: "35 min",
    servings: "2 servings",
    flavorNote: "ZESTY",
    imageBg: "#ebd5c8",
    ingredients: ["cod", "tomato", "garlic", "smoked paprika", "sherry vinegar", "parsley"],
    description: "Flaky white fish skin-seared, resting in a dense, smoky reduction of vine-ripened tomatoes, sweet garlic, and pimentón.",
    steps: [
      "Salt the cod fillets generously and let sit at room temp for 15 minutes. Pat the skin completely dry with paper towels.",
      "Grate the tomatoes on a box grater, discarding the skins, to yield a clean pulp.",
      "In a skillet, gently warm sliced garlic in olive oil. Once fragrant, add smoked paprika and immediately follow with the tomato pulp.",
      "Simmer the tomato mixture until darkened and thick. Season with sherry vinegar and salt.",
      "In a separate pan, sear the cod skin-side down in very hot oil under light pressure until skin is crisp (about 4 minutes). Flip and cook for 1-2 minutes.",
      "Spoon the warm tomato reduction into bowl bases, lay the cod skin-side up on top, and garnish with parsley."
    ]
  },
  {
    id: "r5",
    title: "Smashed Cucumber with Garlic & Toasted Sesame",
    cuisine: "Sichuan",
    time: "15 min",
    servings: "2 servings",
    flavorNote: "HERBACEOUS",
    imageBg: "#dcdfd6",
    ingredients: ["cucumber", "garlic", "sesame oil", "black vinegar", "chili oil", "coriander"],
    description: "Cracked Persian cucumbers dressed in a pungent, sharp mixture of raw garlic, black vinegar, and deep sesame oil.",
    steps: [
      "Lay cucumbers on a board and strike them firmly with the flat side of a chef's knife until they split open.",
      "Rip or slice them into bite-sized, irregular pieces. Toss with salt and let drain in a colander for 10 minutes to draw out excess water.",
      "Whisk together grated garlic, Chinese black vinegar, toasted sesame oil, and a touch of sugar.",
      "Toss the drained cucumbers in the dressing. Finish with chili oil and torn coriander leaves. Serve chilled."
    ]
  }
];

// Flavor categorization and pairing notes for dynamic AI generator
export const ingredientsDb = {
  // Vegetables
  "aubergine": { category: "V", flavor: "Earthy/Bitter", pairings: ["tahini", "garlic", "lemon", "pomegranate", "tomato"] },
  "fennel": { category: "V", flavor: "Anise/Sweet", pairings: ["honey", "red wine vinegar", "orange", "cod", "olive oil"] },
  "cucumber": { category: "V", flavor: "Fresh/Cool", pairings: ["garlic", "sesame oil", "black vinegar", "chili oil", "coriander", "mint"] },
  "tomato": { category: "V", flavor: "Acidic/Sweet", pairings: ["garlic", "olive oil", "basil", "cod", "aubergine", "onion"] },
  "garlic": { category: "V", flavor: "Pungent/Alliaceous", pairings: ["olive oil", "lemon", "tomato", "aubergine", "ginger", "soy sauce"] },
  "onion": { category: "V", flavor: "Sweet/Sharp", pairings: ["tomato", "olive oil", "garlic", "thyme", "vinegar"] },
  "ginger": { category: "V", flavor: "Spicy/Zesty", pairings: ["soy sauce", "mirin", "kombu", "garlic", "chili", "sesame oil"] },
  "coriander": { category: "H", flavor: "Herbal/Citrusy", pairings: ["chili", "garlic", "lemon", "cucumber", "sesame oil"] },
  "mint": { category: "H", flavor: "Cooling/Sweet", pairings: ["cucumber", "lemon", "honey", "fennel"] },
  "thyme": { category: "H", flavor: "Woody/Earthy", pairings: ["tomato", "garlic", "olive oil", "honey"] },
  "parsley": { category: "H", flavor: "Fresh/Grassy", pairings: ["lemon", "garlic", "cod", "tomato", "olive oil"] },

  // Pantry / Condiments
  "tahini": { category: "P", flavor: "Nutty/Rich", pairings: ["aubergine", "garlic", "lemon", "honey", "pomegranate"] },
  "honey": { category: "P", flavor: "Floral/Sweet", pairings: ["fennel", "red wine vinegar", "lemon", "tahini", "soy sauce"] },
  "soy sauce": { category: "P", flavor: "Umami/Salty", pairings: ["ginger", "kombu", "shiitake", "mirin", "garlic", "sesame oil"] },
  "mirin": { category: "P", flavor: "Sweet/Alcoholic", pairings: ["soy sauce", "kombu", "shiitake", "ginger"] },
  "black vinegar": { category: "P", flavor: "Malty/Acidic", pairings: ["cucumber", "garlic", "sesame oil", "chili oil"] },
  "red wine vinegar": { category: "P", flavor: "Sharp/Acidic", pairings: ["fennel", "honey", "olive oil", "onion"] },
  "sherry vinegar": { category: "P", flavor: "Nutty/Acidic", pairings: ["tomato", "cod", "garlic", "smoked paprika"] },
  "olive oil": { category: "P", flavor: "Fruity/Rich", pairings: ["tomato", "garlic", "fennel", "aubergine", "lemon"] },
  "sesame oil": { category: "P", flavor: "Toasted/Nutty", pairings: ["soy sauce", "ginger", "cucumber", "garlic", "chili oil"] },
  "chili oil": { category: "P", flavor: "Spicy/Warm", pairings: ["cucumber", "garlic", "black vinegar", "sesame oil"] },
  "smoked paprika": { category: "P", flavor: "Smoky/Sweet", pairings: ["tomato", "cod", "garlic", "olive oil"] },
  "pomegranate": { category: "F", flavor: "Tart/Sweet", pairings: ["aubergine", "tahini", "mint", "fennel"] },
  "lemon": { category: "F", flavor: "Bright/Acidic", pairings: ["garlic", "olive oil", "tahini", "aubergine", "parsley", "cod"] },
  "orange": { category: "F", flavor: "Citrusy/Sweet", pairings: ["fennel", "honey", "mint"] },

  // Proteins & Sea
  "cod": { category: "M", flavor: "Clean/Mild", pairings: ["tomato", "garlic", "smoked paprika", "sherry vinegar", "parsley", "lemon"] },
  "shiitake": { category: "F", flavor: "Woodland/Umami", pairings: ["kombu", "soy sauce", "ginger", "mirin", "garlic"] },
  "kombu": { category: "S", flavor: "Oceanic/Umami", pairings: ["shiitake", "soy sauce", "mirin", "ginger"] }
};

// Generates an editorial recipe based on ingredients provided
export function castSpell(selectedIngredients) {
  if (!selectedIngredients || selectedIngredients.length === 0) {
    return null;
  }

  // First, check if we have a direct match in curated recipes
  // (A recipe matches if it contains at least two of the selected ingredients)
  const sortedCurated = curatedRecipes.map(recipe => {
    const matches = recipe.ingredients.filter(ing => 
      selectedIngredients.some(sel => sel.toLowerCase() === ing.toLowerCase())
    );
    return { recipe, matchCount: matches.length };
  }).filter(item => item.matchCount >= 2)
    .sort((a, b) => b.matchCount - a.matchCount);

  if (sortedCurated.length > 0) {
    // Return the best-matching curated recipe
    return {
      type: "curated",
      ...sortedCurated[0].recipe,
      matchNote: `Matched ${sortedCurated[0].matchCount} ingredients from your selection.`
    };
  }

  // Otherwise, we "cast a spell" and generate a brand-new, beautifully typeset custom recipe
  const primaryIng = selectedIngredients[0];
  const secondaryIng = selectedIngredients[1] || "";
  const remaining = selectedIngredients.slice(2);

  // Determine flavor tags, title, and steps dynamically
  const primInfo = ingredientsDb[primaryIng.toLowerCase()] || { category: "I", flavor: "Unique", pairings: [] };
  const secInfo = secondaryIng ? (ingredientsDb[secondaryIng.toLowerCase()] || { category: "I", flavor: "Complementary", pairings: [] }) : null;

  const title = secondaryIng 
    ? `Infusion of ${capitalize(primaryIng)} & ${capitalize(secondaryIng)}`
    : `Essence of Roasted ${capitalize(primaryIng)}`;

  const flavorNote = primInfo.flavor.split("/")[0].toUpperCase() || "BALANCED";
  
  const generatedIngredients = [...selectedIngredients];
  // Add olive oil and sea salt if not present to make it feel culinary
  if (!generatedIngredients.includes("olive oil")) generatedIngredients.push("olive oil");
  if (!generatedIngredients.includes("sea salt")) generatedIngredients.push("sea salt");

  const steps = [];
  steps.push(`Prepare the ${primaryIng} by clean trimming. If root or bulb, wedge vertically to preserve structural geometry. If herbaceous, tear gently by hand.`);
  if (secondaryIng) {
    steps.push(`Introduce the ${secondaryIng}. If dry or aromatic, toast in a dry iron skillet to wake the essential oils. If wet or acidic, prepare a cold reduction.`);
    steps.push(`Warm olive oil in a low-sided earthenware dish. Sauté the ${primaryIng} and ${secondaryIng} side-by-side, allowing their aromatic boundaries to bleed together.`);
  } else {
    steps.push(`Roast the ${primaryIng} slowly over hot embers or at high heat in a cast-iron pan until edges blister into charcoal lines.`);
  }
  
  if (remaining.length > 0) {
    steps.push(`Introduce the backing chords: fold in raw crushed ${remaining.join(" and ")} towards the absolute end of the thermal curve to preserve their volatile top notes.`);
  }
  
  steps.push(`Finish with a thin thread of cold-pressed oil and flaky sea salt. Let rest for three minutes on a room-temperature plate before presentation.`);

  return {
    type: "generated",
    id: `gen-${Date.now()}`,
    title,
    cuisine: "Modern Minimalist",
    time: "20 min",
    servings: "1-2 servings",
    flavorNote,
    imageBg: "#e8e1d7",
    ingredients: generatedIngredients,
    description: `A custom-tailored dish highlighting the ${primInfo.flavor.toLowerCase()} characteristics of ${primaryIng}${secondaryIng ? ` supported by the ${secInfo.flavor.toLowerCase()} qualities of ${secondaryIng}` : ""}.`,
    steps,
    matchNote: "Spell cast successfully: customized pairing generated by the culinary engine."
  };
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
