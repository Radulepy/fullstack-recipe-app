
//TODO: improve for scalability
export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  servings: number;
  sourceUrl: string;
}

export interface User {
  id: string;
  name: string;
  favorites: string[];
}

export interface FavoritesListProps {
  favorites: Recipe[];
  onToggleFavorite: (recipe: Recipe) => void;
  onViewDetails: (recipe: Recipe) => void;
  loading?: boolean;
}

export interface RecipeCardProps {
  title: string;
  image: string;
  prepTime: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewDetails: () => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}