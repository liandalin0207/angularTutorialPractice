import { Ingredient } from './ingredient.model';

export interface RecipeInterface {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
}