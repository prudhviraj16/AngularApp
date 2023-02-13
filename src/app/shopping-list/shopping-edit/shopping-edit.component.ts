import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('f') slForm : NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppinglistService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index);
        this.slForm.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    if(this.editMode){
      this.shoppinglistService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
      this.shoppinglistService.addIngredients(newIngredient);
    }
    this.editMode = false
    form.reset()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear(){
    this.slForm.reset()
    this.editMode = false
  }

  onDelete(){
    this.shoppinglistService.ingredientDelete(this.editedItemIndex)
  }
}
