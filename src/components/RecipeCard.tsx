import React from 'react';
import emptyImagePlaceholder from "@/assets/emptyImage.png"
import { RecipeCardProps } from '@/app/types';

const RecipeCard: React.FC<RecipeCardProps> = ({
    title,
    image, //todo
    prepTime,
    isFavorite,
    onToggleFavorite,
    onViewDetails,
}) => {
    return (
        <div className="main-list" role="button" tabIndex={0} onClick={onViewDetails}>
            <div className="favorite-card" role="button" tabIndex={0} onClick={onViewDetails}>
                {/* img will always be returned empty so display placeholder */}
                <img src={emptyImagePlaceholder.src} alt={title} />
                <div className="info">
                    <div className="title">{title}</div>
                    <div className="time">{prepTime}</div>
                </div>
                <span
                    className="heart"
                    onClick={e => { e.stopPropagation(); onToggleFavorite(); }}
                    role="img"
                    aria-label="favorite"
                    style={{ color: isFavorite ? "#6c4ba6" : "#bbb" }}
                >
                    {isFavorite ? "💜" : "🤍"}
                </span>
            </div>
        </div>
    );
};

export default RecipeCard;