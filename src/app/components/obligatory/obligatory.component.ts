import { Component, OnInit } from '@angular/core';
import { Obligatory } from 'src/app/models/obligatory.model';
import { ObligatoryService } from 'src/app/services/obligatory.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss', '../subscriptions/subscriptions.component.scss']
})
export class ObligatoryComponent implements OnInit {
  showOverlay: boolean = false;
  searchTerm: string = '';
  obligatories: Obligatory[];
  filteredObligatories: Obligatory[];
  selectedDate: string = '';

  constructor(private obligatoryService: ObligatoryService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.getObligatories();
  }

  toggleOverlay(s?: string) {
    this.showOverlay = !this.showOverlay;
  }

  getObligatories() {
    this.accountService.getObligatories().subscribe(
      (obligatories: any) => {
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
