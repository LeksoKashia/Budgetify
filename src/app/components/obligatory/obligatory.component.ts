import { Component, OnInit } from '@angular/core';
import { Obligatory } from 'src/app/models/obligatory.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss', '../subscriptions/subscriptions.component.scss']
})
export class ObligatoryComponent implements OnInit {
  showOverlay = false;
  searchTerm = '';
  obligatories: Obligatory[];
  filteredObligatories: Obligatory[];
  selectedDate = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getObligatories();
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  getObligatories() {
    this.accountService.getObligatories().subscribe(
      (obligatories: Obligatory[]) => {
        this.obligatories = obligatories;
        this.filteredObligatories = obligatories;
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
      }
    );
  }

  filterObligatories() {
    if (this.searchTerm.trim() === '' && this.selectedDate === '') {
      this.filteredObligatories = this.obligatories; 
    } else {
      const selectedDateObj = this.selectedDate ? new Date(this.selectedDate) : null;
      this.filteredObligatories = this.obligatories.filter(obligatory =>
        obligatory.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (!selectedDateObj || (selectedDateObj >= new Date(obligatory.startDate) && selectedDateObj <= new Date(obligatory.endDate)))
      );
    }
  }
}
