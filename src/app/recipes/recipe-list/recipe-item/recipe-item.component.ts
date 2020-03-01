import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input, AfterContentInit} from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, AfterContentInit {

  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // console.log('after content init ' + this.recipe);
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

}
