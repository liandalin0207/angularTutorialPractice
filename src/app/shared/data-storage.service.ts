import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
    constructor(
            private http: HttpClient,
            private recipeService: RecipeService,
            private authService: AuthService) {}

    storeRecipes() {
        this.authService.getToken()
            .then(
                (token: string) => {
                    this.http.put(
                        'https://angulartest-10543.firebaseio.com/recipes.json?auth=' + token,
                        this.recipeService.getRecipes())
                        .subscribe(response => {
                            console.log('store recipes response');
                            console.log(response);
                        });
                })
            .catch(
                (error) => console.log(error)
            );
    }

    async getRecipes() {
        this.authService.getToken()
            .then(
                (token: string) => {
                    this.http.get<Recipe[]>('https://angulartest-10543.firebaseio.com/recipes.json?auth=' + token)
                    .map(
                        response => {
                            for (let recipe of response) {
                                if (!recipe['ingredients']) {
                                    console.log(recipe);
                                    recipe['ingredients'] = [];
                                }
                            }
                            return response;
                        }
                    )
                    .subscribe(
                        response => {
                            // console.log(response);
                            // console.log(response.body);
                            const recipes = response;
                            console.log(recipes);
                            this.recipeService.setRecipes(recipes);
                        }
                    );
                }
            );
    }
}