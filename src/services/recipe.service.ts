import { Recipe } from "@/app/types";
import { RecipeRepository } from "@/repositories/recipe.respository";

const recipeRepository = new RecipeRepository();

export class RecipeService {
  async getAllRecipes(): Promise<Recipe[]> {
    return recipeRepository.findAll();
  }

  async getRecipeById(id: number): Promise<Recipe | null> {
    return recipeRepository.findById(id);
  }

  async createRecipe(data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    return recipeRepository.create(data);
  }

  async updateRecipe(id: number, data: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Recipe | null> {
    return recipeRepository.update(id, data);
  }

  async deleteRecipe(id: number): Promise<void> {
    return recipeRepository.delete(id);
  }
}