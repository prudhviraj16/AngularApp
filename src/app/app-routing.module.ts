import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes : Routes = [

  {path : '', redirectTo : '/recipe', pathMatch : 'full'},
  {path : 'recipe', component : RecipesComponent, children : [
    {path : '', component : RecipeStartComponent},
    {path:'new', component : RecipeEditComponent},
    {path:':id', component : RecipeDetailComponent, resolve : [RecipeResolverService]},
    {path:':id/edit', component : RecipeEditComponent},
  ]},
  {path : 'shopping-list', component : ShoppingListComponent , children : [

  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
