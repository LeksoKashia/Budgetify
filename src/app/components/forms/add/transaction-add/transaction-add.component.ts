import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Account } from 'src/app/models/Account.model';
import { ImageModel } from 'src/app/models/Image.model';
import { Transaction } from 'src/app/models/Transaction.model';
import { ImageService } from 'src/app/services/ImageService/image.service';
import { AccountService } from 'src/app/services/accountService/account.service';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss', "../../add/account-add/account-add.component.scss"]
})
export class TransactionAddComponent {
  type: string = 'Expenses';
  expensesType: boolean = true;
  fileSelected: boolean[] = []; 
  changedInputs: string[] = []; // Array to store names of changed inputs


  transactionForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    categories: ['', Validators.required],
    amount: ['', Validators.required],
    paymentDate: ['', Validators.required],
    payee: ['', Validators.required],
    description: ['', Validators.required], 
    files: this.formBuilder.array([this.formBuilder.control(null)]) 
  });

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService, private imageService: ImageService) { }

  selectType(type: string) {
    if (type == "expenses") {
      this.type = "Expenses";
      this.expensesType = true;
    } else {
      this.type = "Income";
      this.expensesType = false;
    }
  }

  onSubmit() {
    const activeCard: Account= JSON.parse(localStorage.getItem('activeCard'));
    const transaction: Transaction = {
      account:activeCard,
      type: this.type,
      title: this.transactionForm.value.title,
      categories: this.transactionForm.value.categories,
      amount: this.transactionForm.value.amount,
      paymentDate: this.transactionForm.value.paymentDate,
      payee: this.transactionForm.value.payee,
      description: this.transactionForm.value.description
    };

    this.transactionService.addTransaction(transaction)
      .subscribe(
        (transactionResponse: Transaction) => {
          console.log('Transaction added successfully:', transactionResponse);
          for (let index = 0; index < this.transactionForm.value.files.length; index++) {
            console.log(this.transactionForm.value.files[index]);
            const path = this.transactionForm.value.files[index]
            const parts = path.split(/[\\\/]/);
            console.log(parts[parts.length - 1]);
            const image: ImageModel = {
              transaction: transactionResponse,
              fileName: parts[parts.length - 1],
              filePath: path
            }

            console.log(image);
            
            this.imageService.addImage(image).subscribe(
              (response) => {

              }
            )
             
          }
        },
        (error) => {
          // Handle error response
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
    this.fileSelected.splice(index, 1); // Remove corresponding entry from fileSelected array
    this.changedInputs.splice(index, 1); // Remove corresponding entry from changedInputs array
  }
  

  handleFileInput(event: any, index: number) {
    const inputName = event.target.files[0].name; // Get the name of the changed file

    this.addFile();
    this.fileSelected[index] = true; // Set corresponding entry in fileSelected array to true when file is selected
    this.changedInputs[index] = inputName; // Store the name in changedInputs array

  }
}
