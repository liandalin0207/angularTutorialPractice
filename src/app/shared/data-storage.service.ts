import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
    constructor(
            private httpClient: HttpClient,
            private recipeService: RecipeService) {}

    storeRecipes() {
        // this.authService.getToken()
        //     .then(
        //         (token: string) => {
                    // this.httpClient.put(
                    //     'https://angulartest-10543.firebaseio.com/recipes.json',
                    //     this.recipeService.getRecipes(), {
                    //         params: new HttpParams().set('auth', token)
                    //     })
                    //         .subscribe(response => {
                    //             console.log('store recipes response');
                    //             console.log(response);
                    //         });
            //     })
            // .catch(
            //     (error) => console.log(error)
            // );

            // const httpParams = new HttpParams().set('auth', this.authService.getToken());
            const req = new HttpRequest('PUT', 'https://angulartest-10543.firebaseio.com/recipes.json',
            // this.recipeService.getRecipes(), {reportProgress: true, params: httpParams});
            this.recipeService.getRecipes(), {reportProgress: true});
            this.httpClient.request(req).subscribe(response => {
                    console.log('store recipes response');
                    console.log(response);
            });
    }

    async getRecipes() {
        // this.httpClient.get<Recipe[]>('https://angulartest-10543.firebaseio.com/recipes.json?auth=' + this.authService.getToken())
        this.httpClient.get<Recipe[]>('https://angulartest-10543.firebaseio.com/recipes.json')
                    .map(
                        recipes => {
                            for (let recipe of recipes) {
                                if (!recipe['ingredients']) {
                                    console.log(recipe);
                                    recipe['ingredients'] = [];
                                }
                            }
                            return recipes;
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
}