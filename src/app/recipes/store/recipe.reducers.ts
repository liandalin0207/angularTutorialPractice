import { Recipe } from './../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';
import { createReducer, on } from '@ngrx/store';

export interface FeatureState extends fromApp.AppState {
    recipes: RecipeState;
}

export interface RecipeState {
    recipes: Recipe[];
}

const initialRecipeState = {
    recipes: [
        new Recipe(
            'Test recipe',
            'Test 1',
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Fries', 12),
            ]
            ),
        new Recipe(
            'Another Test recipe',
            'Test 2',
            'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=ULkGk3Pn',
            [
                new Ingredient('Buns', 11),
                new Ingredient('Meat', 2),
            ]
            )
      ]
};

// export function recipeReducer(state = initialRecipeState, action: RecipeActions.RecipeActions) {
//     switch (action.type) {
//         case RecipeActions.SET_RECIPES:
//             return {
//                 ...state,
//                 recipes: [...action.payload]
//             };
//         case RecipeActions.ADD_RECIPES:
//             return {
//                 ...state,
//                 recipes: [...state.recipes, action.payload]
//             };
//         case RecipeActions.UPDATE_RECIPES:
//             const recipe = state.recipes[action.payload.index];
//             const updateRecipe = {
//                 ...recipe,
//                 ...action.payload.updatedRecipe
//             };
//             const recipes = [...state.recipes];
//             recipes[action.payload.index] = updateRecipe;
//             return {
//                 ...state,
//                 recipes: recipes
//             };
//         case RecipeActions.DELETE_RECIPES:
//             const oldRecipes = [...state.recipes];
//             oldRecipes.splice(action.payload, 1);
//             return {
//                 ...state,
//                 recipes: oldRecipes
//             }
//         default:
//             return state;
//     }
// }

export const recipeReducer = createReducer(
    initialRecipeState,
    on(RecipeActions.setRecipes, (state, {payload}) => ({
        ...state,
        recipes: [...payload]
    })),
    on(RecipeActions.addRecipes, (state, {payload}) => ({
        ...state,
        recipes: [...state.recipes, payload]
    })),
    on(RecipeActions.updateRecipes, (state, {index, updatedRecipe}) => {
        const recipe = state.recipes[index];
        const updateRecipe = {
            ...recipe,
            ...updatedRecipe
        };
        const recipes = [...state.recipes];
        recipes[index] = updateRecipe;
        return {
            ...state,
            recipes: recipes
        };
    }),
    on(RecipeActions.deleteRecipes, (state, {payload}) => {
        const oldRecipes = [...state.recipes];
        oldRecipes.splice(payload, 1);
        return {
            ...state,
            recipes: oldRecipes
        };
    })
);

