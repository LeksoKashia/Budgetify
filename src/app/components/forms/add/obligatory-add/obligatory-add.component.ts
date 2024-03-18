import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/Account.model';
import { Obligatory } from 'src/app/models/Obligatory.model';
import { ObligatoryService } from 'src/app/services/obligatoryService/obligatory.service';

@Component({
  selector: 'app-obligatory-add',
  templateUrl: './obligatory-add.component.html',
  styleUrls: ['./obligatory-add.component.scss',  '../../add/account-add/account-add.component.scss']
})
export class ObligatoryAddComponent {
  @Output() closeForm = new EventEmitter<void>();

  obligatoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private obligatoryService: ObligatoryService
  ) {
    this.obligatoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      amount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  close() {
    this.closeForm.emit();
  }

  onSubmit() {
    this.closeForm.emit();
    if (this.obligatoryForm.valid) {
      const activeCard: Account= JSON.parse(localStorage.getItem('activeCard'));
      if (activeCard && activeCard.id) {
        const obligatoryData: Obligatory = {
          title: this.obligatoryForm.value.title,
          amount: this.obligatoryForm.value.amount,
          startDate: this.obligatoryForm.value.startDate,
          endDate: this.obligatoryForm.value.endDate,
          description: this.obligatoryForm.value.description,
          account: activeCard
        };

        this.obligatoryService.addObligatory(obligatoryData).subscribe(
          (newSubscription: Obligatory) => {
            console.log('Subscription added successfully:', newSubscription);
          },
          (error) => {
            console.error('Error adding subscription:', error);
          }
        );
      } else {
        console.error('User information not found.');
      }
    } else {
      console.log('Please fill in all fields.');
    }
  }
}