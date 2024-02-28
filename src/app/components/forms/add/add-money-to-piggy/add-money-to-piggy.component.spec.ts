import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyToPiggyComponent } from './add-money-to-piggy.component';

describe('AddMoneyToPiggyComponent', () => {
  let component: AddMoneyToPiggyComponent;
  let fixture: ComponentFixture<AddMoneyToPiggyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMoneyToPiggyComponent]
    });
    fixture = TestBed.createComponent(AddMoneyToPiggyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
