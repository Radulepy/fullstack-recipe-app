"use client";
import { useState, useEffect } from "react";
import "@/styles/styles.css"
import SearchBar from "@/components/SearchBar";
import FavoritesList from "@/components/FavoritesList";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/app/types";
import { getFavoriteRecipes, addFavorite, removeFavorite, isFavorite } from "@/store/localstorage";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);
  const isRecipeEmpty = !!recipes.length;

  useEffect(() => {
    setIsFavoriteLoading(true);
    setFavorites(getFavoriteRecipes());
    setIsFavoriteLoading(false);
  }, []);

  const handleSearch = async (query: string) => {
    setLastQuery(query);
    try {
      setIsLoading(true);
      const URI = "/api/recipes"; // todo: move to .env
      const res = await fetch(URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = (recipe: Recipe) => {
    if (isFavorite(recipe)) {
      removeFavorite(recipe);
      setFavorites(getFavoriteRecipes());
      setRecipes(prev =>
        prev.some(r => r.title === recipe.title)
          ? prev
          : [recipe, ...prev]
      );
    } else {
      addFavorite(recipe);
      setFavorites(getFavoriteRecipes());
      setRecipes(prev => prev.filter(r => r.title !== recipe.title));
    }
  };

  const handleViewDetails = (recipe: Recipe) => {
    localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    window.location.href = `/recipe/${recipe.id}`;
  };

  return (
    <div className="container py-4 main-list">

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      <FavoritesList
        favorites={favorites}
        onToggleFavorite={handleFavoriteToggle}
        onViewDetails={handleViewDetails}
        loading={isFavoriteLoading}
      />
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <>
          {isRecipeEmpty && (
            <h2 className="fw-bold" style={{ marginBottom: 24 }}>Suggested recipes</h2>
          )}
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id + index}
              title={recipe.title}
              image={recipe.image}
              prepTime={recipe.prepTime}
              isFavorite={isFavorite(recipe)}
              onToggleFavorite={() => handleFavoriteToggle(recipe)}
              onViewDetails={() => handleViewDetails(recipe)}
            />
          ))}
          {recipes.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <button
                className="dont-like-btn"
                onClick={() => handleSearch(lastQuery)}
              >
                I don't like these
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}