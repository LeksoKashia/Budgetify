import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionType } from 'src/app/enum/transaction-type.enum';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss', '../../add/account-add/account-add.component.scss' , '../../add/transaction-add/transaction-add.component.scss']
})
export class CategoryEditComponent implements OnInit{
  expensesType : boolean;
  @Input() currentCategory: any;
  readonly transactionType = TransactionType;
  type: TransactionType;
  @Output() closeForm = new EventEmitter<void>();
  categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private categoryService:CategoryService) { }
  ngOnInit(): void {
    this.initlaiseForm();
    if(this.currentCategory.type == this.transactionType.Expenses){
      this.type = this.transactionType.Expenses;
      this.expensesType = true;
    }else{
      this.type = this.transactionType.Income;
      this.expensesType = false;
    }
  }

  initlaiseForm(){
    this.categoryForm = this.formBuilder.group({
      name: [this.currentCategory.name, Validators.required]
    });
  }

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
    const category: Category = {
      id: this.currentCategory.id,
      account: this.currentCategory.account,
      type: this.type,
      name: this.categoryForm.value.name
    };

    console.log(this.type);

    this.categoryService.addCategory(category)
    .subscribe(
      (response: any) => {
      });
    (error) => {
      console.error('Error adding transaction:', error);
    }
  }

  close(){
    this.closeForm.emit();
  }
}
