import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    sendRecipesToShoppingList = new EventEmitter
    recipes: Recipe[] = [
        new Recipe(
            'Test recipe', 
            'Test', 
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Fries', 12),
            ]
            ),
    
        new Recipe(
            'Another Test recipe', 
            'Test', 
            'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
            [
                new Ingredient('Buns', 11),
                new Ingredient('Meat', 2),
            ]
            )
            
      ];
    
    constructor(private slService: ShoppingListService) {}
      
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

}