import { Recipe } from "@/app/types";

export const getRecipeKey = (recipe: Recipe): string => {
    return btoa(
        unescape(
            encodeURIComponent(
                recipe.title + "|" +
                recipe.prepTime + "|" +
                (recipe.ingredients ?? []).join(",") + "|" +
                (recipe.instructions ?? []).join(",")
            )
        )
    );
}