import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { DataStorageService } from 'src/shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})


export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private datastorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const recipes = this.recipeService.getRecipes();
    if(recipes.length === 0){
      return this.datastorageService.fetchRecipes()
    }else{
      return recipes
    }
    
  }
}
