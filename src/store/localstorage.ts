import type { Recipe as BaseRecipe } from "@/app/types";
import { getRecipeKey } from "@/utils/create-recipe-key";

// Extend Recipe locally to include _favKey for internal use
type Recipe = BaseRecipe & { _favKey?: string };

const RECIPES_KEY = "recipes";
const LAST_ID_KEY = "lastRecipeId";
const FAVORITES_KEY = "favorites";

export function getAllRecipes(): Recipe[] {
    return JSON.parse(localStorage.getItem(RECIPES_KEY) || "[]");
}

export function saveAllRecipes(recipes: Recipe[]) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

export function getNextRecipeId(): string {
    const lastId = parseInt(localStorage.getItem(LAST_ID_KEY) || "0", 10);
    const nextId = lastId + 1;
    localStorage.setItem(LAST_ID_KEY, nextId.toString());
    return nextId.toString();
}

// Save a single recipe (assigns id if not present)
export function saveRecipe(recipe: Recipe): Recipe {
    let recipes = getAllRecipes();
    const newRecipe = { ...recipe };
    if (!newRecipe.id) {
        newRecipe.id = getNextRecipeId();
    }
    recipes = recipes.filter(r => r.id !== newRecipe.id);
    recipes.push(newRecipe);
    saveAllRecipes(recipes);
    return newRecipe;
}

export function getRecipeById(id: string): Recipe | undefined {
    return getAllRecipes().find(r => r.id === id);
}

export function getFavoriteIds(): string[] {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

export function setFavoriteIds(ids: string[]) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function addFavorite(recipe: Recipe) {
    const key = getRecipeKey(recipe);
    const ids = getFavoriteIds();
    if (!ids.includes(key)) {
        ids.push(key);
        setFavoriteIds(ids);
        saveRecipeWithKey(recipe, key);
    }
}

export function removeFavorite(recipe: Recipe) {
    const key = getRecipeKey(recipe);
    const ids = getFavoriteIds().filter(favId => favId !== key);
    setFavoriteIds(ids);
}

export function isFavorite(recipe: Recipe): boolean {
    const key = getRecipeKey(recipe);
    return getFavoriteIds().includes(key);
}

// Save recipe with key (for favorites)
function saveRecipeWithKey(recipe: Recipe, key: string) {
    let recipes = getAllRecipes();
    // Attach the key as a property for lookup
    const recipeWithKey = { ...recipe, _favKey: key };
    recipes = recipes.filter(r => r._favKey !== key);
    recipes.push(recipeWithKey);
    saveAllRecipes(recipes);
}

// Get favorite recipes by key
export function getFavoriteRecipes(): Recipe[] {
    const all = getAllRecipes();
    const favIds = getFavoriteIds();
    return all.filter(r => r._favKey !== undefined && favIds.includes(r._favKey));
}