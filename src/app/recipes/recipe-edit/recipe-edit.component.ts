import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value('name'),
    //   this.recipeForm.value('description'),
    //   this.recipeForm.value('imagePath'),
    //   this.recipeForm.value('ingredients')
    // );
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipes({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    } else {
      this.store.dispatch(new RecipeActions.AddRecipes(this.recipeForm.value));
      this.router.navigate(['/recipes']);
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          if (recipe) {
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
              for (let ingredient of recipe.ingredients) {
                recipeIngredients.push(
                  new FormGroup({
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)
                    ])
                  })
                );
              }
            }
            this.recipeForm = new FormGroup({
              'name': new FormControl(recipeName, Validators.required),
              'imagePath': new FormControl(recipeImagePath, Validators.required),
              'description': new FormControl(recipeDescription, Validators.required),
              'ingredients': recipeIngredients
            });
          } else {
            this.recipeForm = new FormGroup({
              'name': new FormControl(null, Validators.required),
              'imagePath': new FormControl(null, Validators.required),
              'description': new FormControl(null, Validators.required),
              'ingredients': recipeIngredients
            });
          }
        });
    } else {
      this.recipeForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'ingredients': recipeIngredients
      });
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onRemoveIngredient(formGroupIndex: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(formGroupIndex);
  }

}
