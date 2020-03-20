import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

    authState: Observable<fromAuth.AuthState>;

    constructor(
        private store: Store<fromRecipe.FeatureState>) {}

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveDate() {
        this.store.dispatch(RecipeActions.storeRecipes());
    }

    onFetchDate() {
        this.store.dispatch(RecipeActions.fetchRecipes());
    }

    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }
}