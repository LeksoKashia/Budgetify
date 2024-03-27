import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionType } from 'src/app/enum/transaction-type.enum';
import { Account } from 'src/app/models/account.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  expensesType = true;
  readonly transactionType = TransactionType;
  type: TransactionType = this.transactionType.Expenses;
  @Output() closeForm = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private categoryService:CategoryService) { }

  categoryForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  selectType(type: string) {
    if (type === TransactionType.Expenses) {
      this.type = TransactionType.Expenses;
    } else {
      this.type = TransactionType.Income;
    }
    this.expensesType = (type === TransactionType.Expenses);
  }

  onSubmit() {
    this.closeForm.emit();
    const activeCard: Account = JSON.parse(localStorage.getItem('activeCard'));
    const category: Category = {
      account: activeCard,
      type: this.type,
      name: this.categoryForm.value.name
    };

    console.log(this.type);
    
    this.categoryService.addCategory(category)
    .subscribe(
      (response: any) => {});
    (error) => {
      console.error('Error adding transaction:', error);
    }
  }
}
