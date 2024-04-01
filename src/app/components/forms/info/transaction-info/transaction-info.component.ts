import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModel } from 'src/app/models/image.model';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit{
  @Input() transaction: Transaction;
  @Input() categories: any[];
  images : ImageModel[] = [];
  @Output() closeForm = new EventEmitter<void>();

  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.getImages(this.transaction.id);
    console.log(this.categories);
    
  }

  getImages(transactionId: number){
    console.log(this.categories);
    
    this.transactionService.getImages(transactionId).subscribe(
      (response : ImageModel[]) => {
        this.images = response;
        console.log(response);
        
      }
    )
  }

  closeTransactionForm(){
    this.closeForm.emit();
  }

  deleteTransaction(){
    this.closeForm.emit();
    this.transactionService.deleteTransaction(this.transaction.id).subscribe(
      () => {}
    )
  }
}
