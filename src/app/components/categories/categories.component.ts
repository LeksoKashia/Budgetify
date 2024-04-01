import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { switchMap, map } from 'rxjs/operators';
import { TransactionCategoriesService } from 'src/app/services/transaction-categories.service';
import { TransactionCategory } from 'src/app/models/transaction-category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  showOverlay: boolean = false;
  showOverlay1: boolean = false;
  categories: Category[];
  filteredCategories: Category[];
  searchTerm: string = '';
  currentTypeFilter: string = ''; 
  currentCategory: any;
  transactionCategories : TransactionCategory[];

  constructor(private accountService: AccountService, private categoryService: CategoryService, private transactioCategroriesService: TransactionCategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    this.getCategories();
  }
  
  setCurrentCategory(category: any) {
    this.currentCategory = category;
  }

  toggleOverlay12() {
    this.showOverlay1 = !this.showOverlay1;
    this.getCategories();
  }

  getCategories() {
    this.accountService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        this.filteredCategories = categories;
        this.filterCategories();
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  filterCategories() {
    if (this.searchTerm.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    if (this.currentTypeFilter) {
      this.filteredCategories = this.filteredCategories.filter(category =>
        category.type === this.currentTypeFilter
      );
    }
  }

  filterByType(type: string) {
    this.currentTypeFilter = type;
    this.filterCategories();
  }

  deleteCategory(category: Category) {
    this.transactioCategroriesService.getTransactionCategories().subscribe(
      (response: TransactionCategory[]) => {
        this.transactionCategories = response;
        console.log("damiloge", this.transactionCategories);
        
        const matchingIds: number[] = [];

        this.transactionCategories.forEach((transactionCategory) => {
          if (transactionCategory.name === category.name) {
            matchingIds.push(transactionCategory.id);
          }
        });

        console.log("Matching IDs:", matchingIds);

        matchingIds.forEach(id => {
          this.transactioCategroriesService.deleteTransactionCategory(id).subscribe(
            () => {
              console.log(`Successfully deleted transaction category with ID: ${id}`);
            },
            (error) => {
              console.error(`Error occurred while deleting transaction category with ID: ${id}`, error);
            }
          );
        });
      }
    );

    this.categoryService.deleteCategory(category.id).subscribe(
      () => {
        this.getCategories();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }
    
}
