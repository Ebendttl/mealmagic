import { curatedRecipes, ingredientsDb, castSpell } from './recipes.js';

// --- STATE MANAGEMENT ---
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
    { id: "p2", name: "Tahini", expiryDays: 12, category: "P" },
    { id: "p3", name: "Fennel", expiryDays: 5, category: "V" },
    { id: "p4", name: "Honey", expiryDays: 14, category: "P" },
    { id: "p5", name: "Kombu", expiryDays: 9, category: "S" }
  ],
  savedRecipeIds: [],
  currentModalRecipe: null,
  activePage: "page-discover",
  oracleSelectedCards: [],
  oracleFlippedCards: [false, false, false]
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  initTheme();
  setupOnboarding();
  setupNavigation();
  setupDiscoverPage();
  setupPantryPage();
  setupSavedPage();
  setupJournalPage();
  setupProfilePage();
  setupModal();
  setupOracle();
  updateTimeGreeting();
  
  // Position search controls based on viewport
  repositionIngredientPanel();
  window.addEventListener("resize", repositionIngredientPanel);
});

// Save state to localStorage
function saveStateToStorage() {
  localStorage.setItem("mealmagic_state", JSON.stringify({
    onboarding: state.onboarding,
    pantry: state.pantry,
    savedRecipeIds: state.savedRecipeIds
  }));
}

// Load state from localStorage
function loadStateFromStorage() {
  const stored = localStorage.getItem("mealmagic_state");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.onboarding) state.onboarding = parsed.onboarding;
      if (parsed.pantry) state.pantry = parsed.pantry;
      if (parsed.savedRecipeIds) state.savedRecipeIds = parsed.savedRecipeIds;
    } catch (e) {
      console.error("Failed to parse local storage state", e);
    }
  }
}

// --- THEME ---
function initTheme() {
  const savedTheme = localStorage.getItem("mealmagic_theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-toggle").textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    document.getElementById("theme-toggle").textContent = "Dark Mode";
  }
}

// Global theme toggler click
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("mealmagic_theme", isDark ? "dark" : "light");
  document.getElementById("theme-toggle").textContent = isDark ? "Light Mode" : "Dark Mode";
}

// --- VIEWPORT PORTAL REPOSITIONING ---
function repositionIngredientPanel() {
  const panel = document.getElementById("ingredient-panel");
  const desktopContainer = document.getElementById("sidebar-discover-controls");
  const mobileContainer = document.getElementById("mobile-discover-controls");
  
  if (!panel) return;

  if (window.innerWidth >= 768) {
    if (desktopContainer && panel.parentElement !== desktopContainer) {
      desktopContainer.appendChild(panel);
    }
    // Always show the discover controls panel in the left sidebar on desktop
    if (desktopContainer) {
      desktopContainer.style.display = "block";
    }
  } else {
    if (mobileContainer && panel.parentElement !== mobileContainer) {
      mobileContainer.appendChild(panel);
    }
    // Mobile floating layout handles container displays naturally
    if (desktopContainer) desktopContainer.style.display = "none";
  }
}

// --- NAVIGATION SYSTEM ---
function setupNavigation() {
  // Select tabs from sidebar, bottom navigation, and the footer links
  const navButtons = document.querySelectorAll(".sidebar-nav-item, .nav-tab, .footer-link");
  navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPageId = btn.getAttribute("data-target");
      switchPage(targetPageId);
    });
  });
}

function switchPage(pageId) {
  state.activePage = pageId;

  // Sync active classes across all navigation elements
  document.querySelectorAll(".sidebar-nav-item, .nav-tab").forEach(btn => {
    if (btn.getAttribute("data-target") === pageId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Switch display panel
  document.querySelectorAll(".app-page").forEach(page => {
    page.classList.remove("active");
  });
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Refresh page canvas views
  if (pageId === "page-pantry") {
    renderPantryGrid();
  } else if (pageId === "page-saved") {
    renderSavedList();
  } else if (pageId === "page-profile") {
    renderProfilePage();
  }

  // Position sidebar portal controls appropriately
  repositionIngredientPanel();
}

// --- ONBOARDING FLOW ---
function setupOnboarding() {
  const container = document.getElementById("onboarding-flow");
  const continueBtn = document.getElementById("continue-onboarding");
  const backBtn = document.getElementById("back-onboarding");
  const resetBtn = document.getElementById("reset-onboarding");
  const closeBtn = document.getElementById("close-onboarding-btn");

  // Check if onboarding is already completed
  const completed = localStorage.getItem("mealmagic_onboarding_completed") === "true";
  if (completed) {
    container.style.display = "none";
  } else {
    container.style.display = "flex";
    renderOnboardingStep();
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      container.style.display = "none";
    });
  }

  // Step 1: Cuisine selection clicks
  document.querySelectorAll(".cuisine-card").forEach(card => {
    const cuisine = card.getAttribute("data-cuisine");
    card.addEventListener("click", () => {
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        state.onboarding.cuisines = state.onboarding.cuisines.filter(c => c !== cuisine);
      } else {
        card.classList.add("selected");
        state.onboarding.cuisines.push(cuisine);
      }
      saveStateToStorage();
    });
  });

  // Step 2: Dietary toggles clicks
  document.querySelectorAll(".dietary-pill").forEach(pill => {
    const diet = pill.getAttribute("data-diet");
    pill.addEventListener("click", () => {
      document.querySelectorAll(".dietary-pill").forEach(p => p.classList.remove("selected"));
      if (state.onboarding.diet === diet) {
        state.onboarding.diet = null;
      } else {
        pill.classList.add("selected");
        state.onboarding.diet = diet;
      }
      saveStateToStorage();
    });
  });

  // Step 3: Skill card clicks
  document.querySelectorAll(".skill-card").forEach(card => {
    const skill = card.getAttribute("data-skill");
    card.addEventListener("click", () => {
      document.querySelectorAll(".skill-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      state.onboarding.skill = skill;
      saveStateToStorage();
    });
  });

  // Next / Continue button
  continueBtn.addEventListener("click", () => {
    if (state.onboarding.step === 1) {
      if (state.onboarding.cuisines.length === 0) {
        // Fallback default
        state.onboarding.cuisines.push("Levantine");
        const card = document.querySelector('[data-cuisine="Levantine"]');
        if (card) card.classList.add("selected");
      }
      state.onboarding.step = 2;
      renderOnboardingStep();
    } else if (state.onboarding.step === 2) {
      state.onboarding.step = 3;
      renderOnboardingStep();
    } else if (state.onboarding.step === 3) {
      if (!state.onboarding.skill) {
        state.onboarding.skill = "Practitioner";
      }
      // Finish onboarding
      localStorage.setItem("mealmagic_onboarding_completed", "true");
      container.style.display = "none";
      renderProfilePage();
    }
  });

  // Back button
  backBtn.addEventListener("click", () => {
    if (state.onboarding.step > 1) {
      state.onboarding.step--;
      renderOnboardingStep();
    }
  });

  // Dev tools reset onboarding
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("mealmagic_onboarding_completed");
    state.onboarding.step = 1;
    state.onboarding.cuisines = [];
    state.onboarding.diet = null;
    state.onboarding.skill = null;
    saveStateToStorage();
    
    document.querySelectorAll(".cuisine-card, .dietary-pill, .skill-card").forEach(el => {
      el.classList.remove("selected");
    });
    
    container.style.display = "flex";
    renderOnboardingStep();
  });
}

function renderOnboardingStep() {
  const step = state.onboarding.step;
  
  // Toggle close button visibility if onboarding is already completed
  const closeBtn = document.getElementById("close-onboarding-btn");
  if (closeBtn) {
    const completed = localStorage.getItem("mealmagic_onboarding_completed") === "true";
    closeBtn.style.display = completed ? "flex" : "none";
  }
  
  // Left Panel instructions
  const indicator = document.getElementById("onboarding-step-indicator");
  const headline = document.getElementById("onboarding-headline");
  const subtitle = document.getElementById("onboarding-subtitle");
  const backBtn = document.getElementById("back-onboarding");
  const continueBtn = document.getElementById("continue-onboarding");

  if (step === 1) {
    indicator.textContent = "I / III";
    headline.innerHTML = `Select your <span>affinities</span>`;
    subtitle.textContent = "Your culinary foundational coordinates";
    backBtn.style.display = "none";
    continueBtn.textContent = "Continue";
  } else if (step === 2) {
    indicator.textContent = "II / III";
    headline.innerHTML = `Dietary <span>boundaries</span>`;
    subtitle.textContent = "Define the parameters of the kitchen";
    backBtn.style.display = "block";
    continueBtn.textContent = "Continue";
  } else if (step === 3) {
    indicator.textContent = "III / III";
    headline.innerHTML = `Culinary <span>temperament</span>`;
    subtitle.textContent = "Select your relationship with fire and knife";
    backBtn.style.display = "block";
    continueBtn.textContent = "✦ Enter Kitchen";
  }

  // Right Panel Panes
  document.querySelectorAll(".onboarding-pane").forEach(pane => {
    const paneStep = parseInt(pane.getAttribute("data-step"));
    if (paneStep === step) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
  });

  // Synchronize UI selected states
  document.querySelectorAll(".cuisine-card").forEach(card => {
    const cuisine = card.getAttribute("data-cuisine");
    if (state.onboarding.cuisines.includes(cuisine)) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });

  document.querySelectorAll(".dietary-pill").forEach(pill => {
    const diet = pill.getAttribute("data-diet");
    if (state.onboarding.diet === diet) {
      pill.classList.add("selected");
    } else {
      pill.classList.remove("selected");
    }
  });

  document.querySelectorAll(".skill-card").forEach(card => {
    const skill = card.getAttribute("data-skill");
    if (state.onboarding.skill === skill) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });
}

// --- DYNAMIC GREETING ---
function updateTimeGreeting() {
  const greetingEl = document.getElementById("time-greeting");
  if (!greetingEl) return;
  
  const hour = new Date().getHours();
  if (hour < 12) {
    greetingEl.textContent = "morning";
  } else if (hour < 17) {
    greetingEl.textContent = "afternoon";
  } else {
    greetingEl.textContent = "evening";
  }
}

// --- DISCOVER PAGE LOGIC ---
function setupDiscoverPage() {
  renderRecipeCards(curatedRecipes, "recipe-list-container");

  const searchInput = document.getElementById("ingredient-search-input");
  const suggestionsBox = document.getElementById("suggestions-container");
  const addBtn = document.getElementById("add-chip-btn");
  const castSpellCta = document.getElementById("cast-spell-cta");

  // Autocomplete suggestions
  searchInput.addEventListener("input", () => {
    const val = searchInput.value.trim().toLowerCase();
    if (!val) {
      suggestionsBox.style.display = "none";
      return;
    }

    const matches = Object.keys(ingredientsDb).filter(ing => 
      ing.includes(val) && !state.selectedIngredients.includes(ing)
    );

    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    suggestionsBox.innerHTML = matches.map(m => {
      const info = ingredientsDb[m];
      return `<div class="suggestion-item" data-value="${m}">
        <span>${capitalize(m)}</span>
        <span style="opacity: 0.5; font-size: 10px;">${info.flavor}</span>
      </div>`;
    }).join("");
    suggestionsBox.style.display = "block";
  });

  suggestionsBox.addEventListener("click", (e) => {
    const item = e.target.closest(".suggestion-item");
    if (item) {
      const val = item.getAttribute("data-value");
      addIngredientChip(val);
      searchInput.value = "";
      suggestionsBox.style.display = "none";
      searchInput.focus();
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = searchInput.value.trim().toLowerCase();
      if (val) {
        addIngredientChip(val);
        searchInput.value = "";
        suggestionsBox.style.display = "none";
      }
    }
  });

  addBtn.addEventListener("click", () => {
    const val = searchInput.value.trim().toLowerCase();
    if (val) {
      addIngredientChip(val);
      searchInput.value = "";
      suggestionsBox.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });

  castSpellCta.addEventListener("click", () => {
    if (state.selectedIngredients.length === 0) {
      alert("Please stock or type at least one ingredient to pair.");
      return;
    }

    const originalText = castSpellCta.innerHTML;
    castSpellCta.disabled = true;
    castSpellCta.innerHTML = `<span>✦ Aligning coordinates...</span>`;

    setTimeout(() => {
      const recipe = castSpell(state.selectedIngredients);
      castSpellCta.innerHTML = originalText;
      castSpellCta.disabled = false;

      if (recipe) {
        openRecipeDetail(recipe);
      }
    }, 1000);
  });
}

function addIngredientChip(ingredient) {
  const clean = ingredient.toLowerCase().trim();
  if (!clean || state.selectedIngredients.includes(clean)) return;

  state.selectedIngredients.push(clean);
  renderChips();
}

function renderChips() {
  const container = document.getElementById("chips-container");
  container.innerHTML = state.selectedIngredients.map(ing => {
    return `<div class="ingredient-chip">
      <span>${capitalize(ing)}</span>
      <button class="chip-remove" data-value="${ing}">&times;</button>
    </div>`;
  }).join("");

  container.querySelectorAll(".chip-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-value");
      state.selectedIngredients = state.selectedIngredients.filter(i => i !== val);
      renderChips();
    });
  });
}

function renderRecipeCards(recipesList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (recipesList.length === 0) {
    container.innerHTML = `<div class="editorial-subtitle" style="text-align: center; margin-top: 48px; grid-column: span 2; width: 100%;">No recipes fit the parameters</div>`;
    return;
  }

  container.innerHTML = recipesList.map((recipe, index) => {
    const initials = recipe.title.split(" ").slice(0, 2).map(w => w[0]).join(" & ");
    const isSaved = state.savedRecipeIds.includes(recipe.id);

    return `<div class="recipe-card stagger-${(index % 5) + 1}" data-id="${recipe.id}">
      <div class="recipe-hero-area" style="background-color: ${recipe.imageBg || '#efe9df'};">
        <div class="recipe-hero-image-placeholder"></div>
        <span class="recipe-hero-engrave">${initials}</span>
        <button class="save-btn ${isSaved ? 'saved' : ''}" style="position: absolute; top: 16px; right: 16px; z-index: 5;" data-id="${recipe.id}">
          <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </div>
      <div class="recipe-card-meta">
        <div class="recipe-card-details">
          <span>${recipe.cuisine}</span>
          <span class="recipe-divider">&middot;</span>
          <span>${recipe.time}</span>
          <span class="recipe-divider">&middot;</span>
          <span>${recipe.servings}</span>
        </div>
        <h3 class="recipe-card-title">${recipe.title}</h3>
        <div class="flavor-badge">${recipe.flavorNote}</div>
      </div>
    </div>`;
  }).join("");

  container.querySelectorAll(".recipe-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".save-btn")) return;
      const id = card.getAttribute("data-id");
      const recipe = curatedRecipes.find(r => r.id === id);
      if (recipe) {
        openRecipeDetail(recipe);
      }
    });
  });

  container.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      toggleSaveRecipe(id, btn);
    });
  });
}

function toggleSaveRecipe(recipeId, buttonEl) {
  if (state.savedRecipeIds.includes(recipeId)) {
    state.savedRecipeIds = state.savedRecipeIds.filter(id => id !== recipeId);
    if (buttonEl) buttonEl.classList.remove("saved");
  } else {
    state.savedRecipeIds.push(recipeId);
    if (buttonEl) buttonEl.classList.add("saved");
  }
  saveStateToStorage();
  
  const modalSaveBtn = document.getElementById("recipe-modal-save-btn");
  if (state.currentModalRecipe && state.currentModalRecipe.id === recipeId && modalSaveBtn) {
    if (state.savedRecipeIds.includes(recipeId)) {
      modalSaveBtn.classList.add("saved");
    } else {
      modalSaveBtn.classList.remove("saved");
    }
  }

  if (state.activePage === "page-saved") {
    renderSavedList();
  }
}

// --- PANTRY PAGE ---
function setupPantryPage() {
  const nameInput = document.getElementById("pantry-name-input");
  const expirySlider = document.getElementById("pantry-expiry-slider");
  const expiryDaysLabel = document.getElementById("expiry-days-label");
  const addBtn = document.getElementById("add-pantry-item-btn");

  expirySlider.addEventListener("input", () => {
    expiryDaysLabel.textContent = `${expirySlider.value} days`;
  });

  addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) return;

    const days = parseInt(expirySlider.value);
    const lookup = ingredientsDb[name.toLowerCase()] || { category: "I" };
    
    const newItem = {
      id: `p-${Date.now()}`,
      name: capitalize(name),
      expiryDays: days,
      category: lookup.category
    };

    state.pantry.unshift(newItem);
    saveStateToStorage();
    renderPantryGrid();

    // Reset inputs
    nameInput.value = "";
    expirySlider.value = 5;
    expiryDaysLabel.textContent = "5 days";
  });
}

function renderPantryGrid() {
  const criticalContainer = document.getElementById("pantry-critical-container");
  const mediumContainer = document.getElementById("pantry-medium-container");
  const freshContainer = document.getElementById("pantry-fresh-container");

  if (!criticalContainer || !mediumContainer || !freshContainer) return;

  const criticalItems = state.pantry.filter(item => item.expiryDays <= 2);
  const mediumItems = state.pantry.filter(item => item.expiryDays > 2 && item.expiryDays <= 6);
  const freshItems = state.pantry.filter(item => item.expiryDays > 6);

  renderPantrySection(criticalItems, criticalContainer, "No critical items");
  renderPantrySection(mediumItems, mediumContainer, "No items expiring this week");
  renderPantrySection(freshItems, freshContainer, "No long-term stock");
}

function renderPantrySection(items, container, emptyMessage) {
  if (items.length === 0) {
    container.innerHTML = `<div class="editorial-subtitle" style="margin-top: 12px; margin-bottom: 12px;">${emptyMessage}</div>`;
    return;
  }

  container.innerHTML = items.map((item, index) => {
    let expiryClass = "fresh";
    if (item.expiryDays <= 2) {
      expiryClass = "critical";
    } else if (item.expiryDays <= 6) {
      expiryClass = "medium";
    }

    const letter = item.category || "I";

    return `<div class="pantry-card ${expiryClass} stagger-${(index % 5) + 1}" data-id="${item.id}">
      <span class="pantry-card-bg-letter">${letter}</span>
      <button class="pantry-card-delete" data-id="${item.id}">&times;</button>
      <div class="pantry-card-name">${item.name}</div>
      <div class="pantry-card-expiry">Expires in ${item.expiryDays}d</div>
    </div>`;
  }).join("");

  // Bind deletion
  container.querySelectorAll(".pantry-card-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      state.pantry = state.pantry.filter(i => i.id !== id);
      saveStateToStorage();
      renderPantryGrid();
    });
  });

  // Bind clicking card to push to discover chips
  container.querySelectorAll(".pantry-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".pantry-card-delete")) return;
      const id = card.getAttribute("data-id");
      const item = state.pantry.find(i => i.id === id);
      if (item) {
        addIngredientChip(item.name);
        
        card.style.transform = "scale(0.95)";
        setTimeout(() => {
          card.style.transform = "";
          // Route back to Discover
          switchPage("page-discover");
        }, 150);
      }
    });
  });
}

// --- SAVED PAGE ---
function setupSavedPage() {
  renderSavedList();
}

function renderSavedList() {
  const container = document.getElementById("saved-recipes-container");
  if (!container) return;

  const savedRecipes = curatedRecipes.filter(r => state.savedRecipeIds.includes(r.id));
  
  if (savedRecipes.length === 0) {
    container.innerHTML = `<div class="editorial-subtitle" style="text-align: center; margin-top: 48px; grid-column: span 2; width: 100%;">No recipes saved yet.</div>`;
    return;
  }

  renderRecipeCards(savedRecipes, "saved-recipes-container");
}

// --- JOURNAL PAGE ---
function setupJournalPage() {
  const container = document.getElementById("journal-container");
  if (!container) return;

  const entries = [
    {
      date: "04 Jun — Fire & Aromatic boundary lines",
      title: "The Charring of Aubergines",
      excerpt: "Charring aubergines directly over carbon flame releases volatile syringol compounds, generating an intensely smoky, woodland aroma. In Mediterranean minimalism, this heavy smokiness demands a balancing emulsifier like sesame fat (tahini) and the raw, stinging acidity of fresh lemon."
    },
    {
      date: "02 Jun — The acidity axis in pan roasting",
      title: "Glazing with Vinegar and Wild Honey",
      excerpt: "When caramelizing winter vegetables like fennel, wild honey adds sugar complexes that brown rapidly. Introducing vinegar does not just cut the heavy sweetness, it halts the caramelization process, trapping volatile botanical oils within a velvety emulsion."
    },
    {
      date: "29 May — Cold extraction dynamics",
      title: "The Patient Extraction of Kombu & Shiitake",
      excerpt: "Simmering kombu extracts bitter alginates that muddy the palate. A cold-water steep over 8 hours yields clean glutamic acids without any bitter top notes. When heated, keep it below 80°C to preserve the purity of this oceanic-woodland broth."
    }
  ];

  container.innerHTML = entries.map((entry, index) => {
    return `<div class="journal-post stagger-${(index % 5) + 1}">
      <div class="journal-date">${entry.date}</div>
      <h3 class="journal-title">${entry.title}</h3>
      <p class="journal-excerpt">${entry.excerpt}</p>
    </div>`;
  }).join("");
}

// --- PROFILE PAGE ---
function setupProfilePage() {
  renderProfilePage();

  const signOutBtn = document.getElementById("sign-out-btn");
  signOutBtn.addEventListener("click", signOutAccount);

  const sidebarSignOutBtn = document.getElementById("sidebar-signout-btn");
  sidebarSignOutBtn.addEventListener("click", signOutAccount);

  // Settings redirect links
  document.getElementById("pref-diet-row").addEventListener("click", () => {
    const onboarding = document.getElementById("onboarding-flow");
    onboarding.style.display = "flex";
    state.onboarding.step = 2;
    renderOnboardingStep();
  });

  document.getElementById("pref-skill-row").addEventListener("click", () => {
    const onboarding = document.getElementById("onboarding-flow");
    onboarding.style.display = "flex";
    state.onboarding.step = 3;
    renderOnboardingStep();
  });

  document.getElementById("toggle-theme-row").addEventListener("click", toggleTheme);

  // Editable username display click
  const nameDisplay = document.getElementById("profile-username-display");
  nameDisplay.addEventListener("click", () => {
    const input = prompt("Edit username:", state.onboarding.username);
    if (input && input.trim()) {
      state.onboarding.username = input.trim();
      saveStateToStorage();
      renderProfilePage();
    }
  });
}

function signOutAccount() {
  if (confirm("Reset application state and delete all settings?")) {
    localStorage.clear();
    location.reload();
  }
}

function renderProfilePage() {
  const nameDisplay = document.getElementById("profile-username-display");
  const avatarInitial = document.getElementById("profile-avatar-initial");
  const affinitiesList = document.getElementById("profile-affinities-list");
  
  // Sidebar footer updates
  const sidebarAvatar = document.getElementById("sidebar-avatar-initial");
  const sidebarName = document.getElementById("sidebar-username-display");

  if (!nameDisplay) return;

  const username = state.onboarding.username || "Chef Alchemist";
  nameDisplay.textContent = username;
  avatarInitial.textContent = username.charAt(0);

  if (sidebarAvatar) sidebarAvatar.textContent = username.charAt(0);
  if (sidebarName) sidebarName.textContent = username;

  // Render cuisine affinities
  const cuisines = state.onboarding.cuisines.length > 0 ? state.onboarding.cuisines : ["Levantine"];
  affinitiesList.innerHTML = cuisines.map(c => {
    return `<span class="affinity-tag">${c}</span>`;
  }).join("");

  if (state.onboarding.diet) {
    affinitiesList.innerHTML += `<span class="affinity-tag" style="border-color: var(--accent); color: var(--accent);">${state.onboarding.diet}</span>`;
  }
  
  if (state.onboarding.skill) {
    affinitiesList.innerHTML += `<span class="affinity-tag spec-skill" style="border-color: var(--accent); color: var(--accent); opacity: 0.8;">${state.onboarding.skill}</span>`;
    
    // Update user subtitle in sidebar
    const sidebarTitle = document.querySelector(".sidebar-usertitle");
    if (sidebarTitle) sidebarTitle.textContent = state.onboarding.skill;
  }

  // Populate dynamic stats
  const pantryCount = document.getElementById("stat-pantry-count");
  const savedCount = document.getElementById("stat-saved-count");
  if (pantryCount) pantryCount.textContent = state.pantry.length;
  if (savedCount) savedCount.textContent = state.savedRecipeIds.length;
}

// --- RECIPE MODAL DETAILS ---
function setupModal() {
  const closeBtn = document.getElementById("close-modal-btn");
  const modal = document.getElementById("recipe-modal-view");
  const saveBtn = document.getElementById("recipe-modal-save-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    state.currentModalRecipe = null;
  });

  saveBtn.addEventListener("click", () => {
    if (state.currentModalRecipe) {
      toggleSaveRecipe(state.currentModalRecipe.id, saveBtn);
      renderRecipeCards(curatedRecipes, "recipe-list-container");
    }
  });
}

function openRecipeDetail(recipe) {
  state.currentModalRecipe = recipe;
  
  const modal = document.getElementById("recipe-modal-view");
  const title = document.getElementById("modal-title");
  const meta = document.getElementById("modal-meta");
  const desc = document.getElementById("modal-desc");
  const imgBox = document.getElementById("modal-image-box");
  const imgText = document.getElementById("modal-image-text");
  const flavorBadge = document.getElementById("modal-flavor-badge");
  const ingredientsList = document.getElementById("modal-ingredients-list");
  const stepsList = document.getElementById("modal-steps-list");
  const saveBtn = document.getElementById("recipe-modal-save-btn");

  title.textContent = recipe.title;
  meta.innerHTML = `${recipe.cuisine} &middot; ${recipe.time} &middot; ${recipe.servings}`;
  desc.textContent = recipe.description;
  
  imgBox.style.backgroundColor = recipe.imageBg || "#efe9df";
  const initials = recipe.title.split(" ").slice(0, 2).map(w => w[0]).join(" & ");
  imgText.textContent = initials;
  flavorBadge.textContent = recipe.flavorNote;

  if (state.savedRecipeIds.includes(recipe.id)) {
    saveBtn.classList.add("saved");
  } else {
    saveBtn.classList.remove("saved");
  }

  ingredientsList.innerHTML = recipe.ingredients.map(ing => {
    return `<div class="recipe-detail-ingredient-item">
      <span class="recipe-detail-ingredient-dot"></span>
      <span>${capitalize(ing)}</span>
    </div>`;
  }).join("");

  stepsList.innerHTML = recipe.steps.map((step, index) => {
    return `<div class="recipe-detail-step-item">
      <span class="recipe-detail-step-num">${String(index + 1).padStart(2, '0')}</span>
      <span class="recipe-detail-step-text">${step}</span>
    </div>`;
  }).join("");

  modal.classList.add("active");
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- MYSTICAL CULINARY ORACLE ---
const ORACLE_CARDS = [
  { title: "Rosemary", monogram: "R", archetype: "The Altar", type: "base", desc: "purifying and focusing, grounding the dish with its woodsy, evergreen warmth." },
  { title: "Olive Oil", monogram: "O", archetype: "The Elixir", type: "base", desc: "smooth and fluid, carrying flavors across boundaries and coating the palate." },
  { title: "Garlic", monogram: "G", archetype: "The Anchor", type: "base", desc: "savory intensity, providing the deep, pungent foundation of the culinary circle." },
  { title: "Rosewater", monogram: "W", archetype: "The Bloom", type: "base", desc: "delicate and floral, raising the ingredients into a higher sensory, etheric realm." },
  
  { title: "Honey", monogram: "H", archetype: "The Catalyst", type: "flavor", desc: "warm and sweet, binding bitter elements and creating smooth, golden attraction." },
  { title: "Lemon", monogram: "L", archetype: "The Spark", type: "flavor", desc: "acidic and bright, cutting through shadows and waking the sleeping senses." },
  { title: "Chili", monogram: "C", archetype: "The Friction", type: "flavor", desc: "fiery heat, accelerating blood circulation and transforming flavor perception." },
  { title: "Cacao", monogram: "K", archetype: "The Shadow", type: "flavor", desc: "bittersweet complexity, adding mysterious depths and rich, dark structure." },
  
  { title: "Sea Salt", monogram: "S", archetype: "The Whisper", type: "accent", desc: "crystalline mineral clarity, multiplying and emphasizing hidden flavor notes." },
  { title: "Black Pepper", monogram: "P", archetype: "The Spike", type: "accent", desc: "sharp heat, puncturing density and leaving a lingering, warm spark on the tongue." },
  { title: "Pistachio", monogram: "T", archetype: "The Gem", type: "accent", desc: "crunchy and rich, a hidden nutty jewel that rewards the curious bite." },
  { title: "Mint", monogram: "M", archetype: "The Breeze", type: "accent", desc: "cool release, clearing the senses and completing the alchemical cycle." }
];

function setupOracle() {
  const openBtn = document.getElementById("open-oracle-btn");
  const closeBtn = document.getElementById("close-oracle-btn");
  const modal = document.getElementById("oracle-modal");
  const manifestBtn = document.getElementById("manifest-recipe-btn");
  const cards = document.querySelectorAll(".tarot-card");

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener("click", () => {
    const bases = ORACLE_CARDS.filter(c => c.type === "base");
    const flavors = ORACLE_CARDS.filter(c => c.type === "flavor");
    const accents = ORACLE_CARDS.filter(c => c.type === "accent");

    const baseCard = bases[Math.floor(Math.random() * bases.length)];
    const flavorCard = flavors[Math.floor(Math.random() * flavors.length)];
    const accentCard = accents[Math.floor(Math.random() * accents.length)];

    state.oracleSelectedCards = [baseCard, flavorCard, accentCard];
    state.oracleFlippedCards = [false, false, false];

    cards.forEach((card, idx) => {
      card.classList.remove("flipped");
      const front = card.querySelector(".tarot-card-front");
      if (front) {
        front.querySelector(".tarot-card-archetype").textContent = state.oracleSelectedCards[idx].archetype;
        front.querySelector(".tarot-card-monogram").textContent = state.oracleSelectedCards[idx].monogram;
        front.querySelector(".tarot-card-title").textContent = state.oracleSelectedCards[idx].title;
      }
    });

    document.getElementById("prophecy-text").textContent = "Focus on your culinary intent, then click each card to reveal the omen...";
    manifestBtn.disabled = true;
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-index"));
      if (state.oracleFlippedCards[idx]) return;

      card.classList.add("flipped");
      state.oracleFlippedCards[idx] = true;

      const drawn = state.oracleSelectedCards[idx];
      
      if (state.oracleFlippedCards.every(f => f === true)) {
        const [c1, c2, c3] = state.oracleSelectedCards;
        const prophecy = `You have drawn ${c1.title} (${c1.archetype}), ${c2.title} (${c2.archetype}), and ${c3.title} (${c3.archetype}). This combination represents a culinary union of structure, transformation, and enhancement. The ${c1.title} acts as your vessel, ${c2.title} sparks the transformation, and ${c3.title} seals the connection.`;
        document.getElementById("prophecy-text").textContent = prophecy;
        manifestBtn.disabled = false;
      } else {
        document.getElementById("prophecy-text").textContent = `Revealed ${drawn.title} (${drawn.archetype}): ${drawn.desc}`;
      }
    });
  });

  manifestBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    const [c1, c2, c3] = state.oracleSelectedCards;
    const recipeId = `recipe-oracle-${Date.now()}`;
    
    const titles = {
      "Rosemary": {
        "Honey": { "Sea Salt": "Nectar of the Pine Grove", "Black Pepper": "Hearthfire Rosemary Glaze", "Pistachio": "Encrusted Altar Crust", "Mint": "Herbal Meadow Dew" },
        "Lemon": { "Sea Salt": "Ethereal Rosemary Citron", "Black Pepper": "Spiked Lemon Needle Tea", "Pistachio": "Crushed Gem Citronade", "Mint": "Green Wind Infusion" },
        "Chili": { "Sea Salt": "Flame-Seared Pine Confit", "Black Pepper": "Spiced Rosemary Embers", "Pistachio": "Fiery Emerald Relish", "Mint": "Chili Mint Sage Infusion" },
        "Cacao": { "Sea Salt": "Shadowed Rosemary Reduction", "Black Pepper": "Cacao Needle Confit", "Pistachio": "Alchemical Cacao Crust", "Mint": "Dark Herbal Ganache" }
      },
      "Olive Oil": {
        "Honey": { "Sea Salt": "Emulsified Golden Nectar", "Black Pepper": "Glazed Pepper Elixir", "Pistachio": "Pistachio Honey Paste", "Mint": "Sweet Mint Dressing" },
        "Lemon": { "Sea Salt": "Luminous Citron Emulsion", "Black Pepper": "Lemon Pepper Vinaigrette", "Pistachio": "Nutty Citron Oil", "Mint": "Breeze Lemon Drizzle" },
        "Chili": { "Sea Salt": "Fiery Amber Condiment", "Black Pepper": "Peppery Chili Glaze", "Pistachio": "Spiced Nut Paste", "Mint": "Chili Herb Infusion" },
        "Cacao": { "Sea Salt": "Earthy Velvet Emulsion", "Black Pepper": "Dark Pepper Oil", "Pistachio": "Rich Cacao Spread", "Mint": "Dark Mint Infusion" }
      },
      "Garlic": {
        "Honey": { "Sea Salt": "Golden Sweet Garlic Confit", "Black Pepper": "Black Pepper Garlic Glaze", "Pistachio": "Garlic Pistachio Butter", "Mint": "Garlic Sweet Herb Oil" },
        "Lemon": { "Sea Salt": "Zesty Garlic Aioli", "Black Pepper": "Peppery Lemon Garlic Butter", "Pistachio": "Garlic Pistachio Pesto", "Mint": "Lemon Garlic Mint Oil" },
        "Chili": { "Sea Salt": "Toum of the Sun-Gazer", "Black Pepper": "Blackened Garlic Butter", "Pistachio": "Chili Garlic Tapenade", "Mint": "Spiced Garlic Emulsion" },
        "Cacao": { "Sea Salt": "Mole of the Deep Hearth", "Black Pepper": "Spiced Cacao Garlic Glaze", "Pistachio": "Dark Nutty Pesto", "Mint": "Garlic Cacao Jus" }
      },
      "Rosewater": {
        "Honey": { "Sea Salt": "Dew of the Persian Gardens", "Black Pepper": "Spiced Rose Syrup", "Pistachio": "Rosewater Pistachio Halva", "Mint": "Floral Mint Elixir" },
        "Lemon": { "Sea Salt": "Ethereal Rose Sherbet", "Black Pepper": "Zesty Rose Reduction", "Pistachio": "Rosewater Nut Crumble", "Mint": "Rose Citron Breeze" },
        "Chili": { "Sea Salt": "Fiery Rose Syrup", "Black Pepper": "Spiced Rose Compote", "Pistachio": "Spicy Pistachio Delicacy", "Mint": "Chili Rosewater Coulis" },
        "Cacao": { "Sea Salt": "Celestial Rose Ganache", "Black Pepper": "Spiced Rose Cacao", "Pistachio": "Rose Pistachio Fudge", "Mint": "Rosewater Mint Truffle" }
      }
    };

    const title = titles[c1.title]?.[c2.title]?.[c3.title] || `Alchemical ${c1.title} & ${c2.title} Medley`;

    const generatedRecipe = {
      id: recipeId,
      title: title,
      cuisine: "Alchemical",
      time: "25 min",
      servings: "2 servings",
      description: `A unique gastronomic manifest drawn from the Oracle. This alchemical creation binds ${c1.title} (${c1.archetype}) as the foundation, transforms it with ${c2.title} (${c2.archetype}), and crowns it with the accent of ${c3.title} (${c3.archetype}).`,
      imageBg: "#17120e",
      flavorNote: `${c2.type.toUpperCase()} & ${c3.type.toUpperCase()}`,
      ingredients: [
        `3 parts ${c1.title.toLowerCase()}`,
        `1 part ${c2.title.toLowerCase()}`,
        `A generous pinch of ${c3.title.toLowerCase()}`,
        "High-quality culinary water or olive oil",
        "Assorted companion pantry items of choice"
      ],
      steps: [
        `Prepare the foundation: Warm and activate the ${c1.title.toLowerCase()} to capture its full essence as the core ${c1.archetype.toLowerCase()}.`,
        `Introduce the catalyst: Slowly incorporate the ${c2.title.toLowerCase()} to harmonize the flavors and stimulate chemical bonding.`,
        `Apply the final seal: Remove from heat and scatter the ${c3.title.toLowerCase()} as the finishing ${c3.archetype.toLowerCase()} to elevate and preserve the dish.`,
        "Serve in a quiet environment, appreciating the cosmic pairings of the ingredients."
      ]
    };

    curatedRecipes.push(generatedRecipe);
    openRecipeDetail(generatedRecipe);
  });
}
