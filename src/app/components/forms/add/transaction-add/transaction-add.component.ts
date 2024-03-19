import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Account } from 'src/app/models/Account.model';
import { ImageModel } from 'src/app/models/Image.model';
import { Transaction } from 'src/app/models/Transaction.model';
import { ImageService } from 'src/app/services/ImageService/image.service';
import { TransactionService } from 'src/app/services/transactionService/transaction.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent {
  type: string = 'Expenses';
  expensesType: boolean = true;
  fileSelected: boolean[] = [];
  changedInputs: string[] = [];

  @Output() closeForm = new EventEmitter<void>();


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
    this.type = type === "expenses" ? "Expenses" : "Income";
    this.expensesType = type === "expenses";
  }

  onSubmit() {
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
          for (let index = 0; index < this.transactionForm.value.files.length; index++) {
            const path = this.transactionForm.value.files[index]
            const fileName = path.split(/[\\\/]/).pop();
            const image: ImageModel = {
              transaction: transactionResponse,
              fileName: fileName,
              filePath: path
            }

            this.imageService.addImage(image).subscribe();
          }
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
}
