import { FavoritesListProps } from "@/app/types";
import React from "react";
import emptyImagePlaceholder from "@/assets/emptyImage.png";
import { LoadingSpinner } from "./LoadingSpinner";

const FavoritesList: React.FC<FavoritesListProps> = ({
    favorites,
    onToggleFavorite,
    onViewDetails,
    loading = false,
}) => (
    <>
        <h2 style={{ marginBottom: 24 }}>Favorites</h2>
        {loading ? (
            <LoadingSpinner />
        ) : favorites.length === 0 ? (
            <div>No favorite recipes added yet.</div>
        ) : (
            favorites.map((recipe, index) => (
                <div
                    className="favorite-card"
                    key={recipe.id + "-" + index}
                    role="button"
                    tabIndex={0}
                    onClick={() => onViewDetails(recipe)}
                >
                    <img src={emptyImagePlaceholder.src} alt={recipe.title} />
                    <div className="info">
                        <div className="title">{recipe.title}</div>
                        <div className="time">{recipe.prepTime}</div>
                    </div>
                    <span
                        className="heart"
                        onClick={e => { e.stopPropagation(); onToggleFavorite(recipe); }}
                        role="img"
                        aria-label="favorite"
                        style={{ color: "#6c4ba6" }}
                    >💜</span>
                </div>
            ))
        )}
    </>
);

export default FavoritesList;