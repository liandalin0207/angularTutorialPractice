import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from './../recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';

import * as RecipeActions from '../store/recipe.actions';
import { Injectable } from '@angular/core';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
    // @Effect()
    // recipeFetch = this.actions$.pipe(
    //     ofType(RecipeActions.FETCH_RECIPES),
    //     switchMap((action: RecipeActions.FetchRecipes) => {
    //         return this.httpClient.get<Recipe[]>('https://angulartest-10543.firebaseio.com/recipes.json');
    //     }),
    //     map(
    //         recipes => {
    //             for (let recipe of recipes) {
    //                 if (!recipe['ingredients']) {
    //                     console.log(recipe);
    //                     recipe['ingredients'] = [];
    //                 }
    //             }
    //             return {
    //                 type: RecipeActions.SET_RECIPES,
    //                 payload: recipes
    //             };
    //         }
    //     )
    // );

    recipeFetch$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(RecipeActions.fetchRecipes),
            switchMap(() =>
                this.httpClient.get<Recipe[]>('https://angulartest-10543.firebaseio.com/recipes.json')
            ),
            map(
                (recipes: Recipe[]) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }
                    RecipeActions.setRecipes({payload: recipes});
                }
            )
        )
    );

    // @Effect({dispatch: false})
    // recipeStore = this.actions$.pipe(
    //     ofType(RecipeActions.STORE_RECIPES),
    //     withLatestFrom(this.store.select('recipes')),
    //     map(([action, state]) => {
    //         const req = new HttpRequest('PUT', 'https://angulartest-10543.firebaseio.com/recipes.json',
    //             state.recipes, {reportProgress: true});
    //         this.httpClient.request(req).subscribe(response => {
    //                 console.log('store recipes response');
    //                 console.log(response);
    //         });
    //     })
    // );

    recipeStore$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(RecipeActions.storeRecipes),
            withLatestFrom(this.store.select('recipes')),
            map(([action, recipeState]) => {
                const req = new HttpRequest('PUT', 'https://angulartest-10543.firebaseio.com/recipes.json',
                    recipeState.recipes, {reportProgress: true});
                this.httpClient.request(req).subscribe(response => {
                    console.log('store recipes response');
                    console.log(response);
                });
            })
        ),
        { dispatch: false }
    );

    constructor(
            private actions$: Actions,
            private httpClient: HttpClient,
            private store: Store<fromRecipe.FeatureState>) {}
}