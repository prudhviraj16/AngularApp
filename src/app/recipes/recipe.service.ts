import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    // new Recipe(
    //   'Chicken Soup',
    //   'Delicious chicken Soup',
    //   'https://www.licious.in/blog/wp-content/uploads/2020/12/Cream-of-chicken-Soup.jpg',
    //   [new Ingredient('Chicken', 1), new Ingredient('Cloves', 10)]
    // ),
    // new Recipe(
    //   'Mutton Biriyani',
    //   'Awesome Mutton Biriyani',
    //   'https://www.cubesnjuliennes.com/wp-content/uploads/2021/03/Best-Mutton-Biryani-Recipe.jpg',
    //   [new Ingredient('Mutton', 1), new Ingredient('Rice', 1)]
    // ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipe: Recipe[]){
    this.recipes = recipe
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  ingredientsToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredientsFromRecipe(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
    console.log(this.recipes)
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }

}
