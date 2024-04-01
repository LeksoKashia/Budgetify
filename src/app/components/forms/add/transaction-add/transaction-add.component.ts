import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TransactionType } from 'src/app/enum/transaction-type.enum';
import { Account } from 'src/app/models/account.model';
import { ImageModel } from 'src/app/models/image.model';
import { Transaction } from 'src/app/models/transaction.model';
import { ImageService } from 'src/app/services/image.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Category } from 'src/app/models/category.model';
import { AccountService } from 'src/app/services/account.service';
import { TransactionCategory } from 'src/app/models/transaction-category.model';
import { TransactionCategoriesService } from 'src/app/services/transaction-categories.service';


@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent implements OnInit{
  type: TransactionType = TransactionType.Expenses;
  expensesType = true;
  fileSelected: boolean[] = [];
  changedInputs: string[] = [];
  readonly transactionType = TransactionType;
  categories: Category[];
  selectedCategories: Category[] = [];

  @Output() closeForm = new EventEmitter<void>();

  transactionForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    amount: ['', Validators.required],
    paymentDate: ['', Validators.required],
    payee: ['', Validators.required],
    description: ['', Validators.required],
    files: this.formBuilder.array([this.formBuilder.control(null)])
  });

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService, private imageService: ImageService, private accountService: AccountService, private TransactionCategoriesService: TransactionCategoriesService) { }
  ngOnInit(): void {
    this.getCategories();
  }

  selectType(type: string) {
    if (type === TransactionType.Expenses) {
      this.type = TransactionType.Expenses;
    } else {
      this.type = TransactionType.Income;
    }
    this.expensesType = (type === TransactionType.Expenses);

    console.log(this.type);
    
  }

  onSubmit() {
    console.log(this.selectedCategories);
    this.closeForm.emit();
    const activeCard: Account = JSON.parse(localStorage.getItem('activeCard'));
    const transaction: Transaction = {
      account: activeCard,
      type: this.type,
      ...this.transactionForm.value
    };

    this.transactionService.addTransaction(transaction)
    .subscribe(
      (transactionResponse: Transaction) => {
        if (this.transactionForm.value.files) {
          this.transactionForm.value.files.forEach((path: string) => {
            if (path) {
              const fileName = path.split(/[\\\/]/).pop();
              const image: ImageModel = {
                transaction: transactionResponse,
                fileName: fileName,
                filePath: path
              }
  
              this.imageService.addImage(image).subscribe();
            }
          });
        }
        console.log("kairaaad");
      

        this.selectedCategories.forEach(selectedCategory => {
          const category: TransactionCategory = {
              name: selectedCategory.name,
              type: selectedCategory.type,
              transaction: transactionResponse
          };
          console.log(category);
          
          this.TransactionCategoriesService.addTransactionCategories(category).subscribe();
      });
      },
    (error) => {
      console.error('Error adding transaction:', error);
    }
  );

  }

  get filesFormArray() {
    return this.transactionForm.get('files') as FormArray;
  }

  addFile() {
    this.filesFormArray.push(this.formBuilder.control(null));
  }

  removeFile(index: number) {
    this.filesFormArray.removeAt(index);
    this.fileSelected.splice(index, 1);
    this.changedInputs.splice(index, 1);
  }

  handleFileInput(event: any, index: number) {
    const inputName = event.target.files[0].name;

    this.addFile();
    this.fileSelected[index] = true;
    this.changedInputs[index] = inputName;
  }

  getCategories(): void {
    this.accountService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
      
    });
  }

  onSelectionChange(event: any) {
    console.log(event);
  }

  opa(category: Category) {
    const index = this.selectedCategories.findIndex(cat => cat.id === category.id);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    console.log(this.selectedCategories);
  }

  
}
