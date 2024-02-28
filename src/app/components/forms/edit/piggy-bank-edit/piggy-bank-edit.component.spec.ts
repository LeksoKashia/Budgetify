import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggyBankEditComponent } from './piggy-bank-edit.component';

describe('PiggyBankEditComponent', () => {
  let component: PiggyBankEditComponent;
  let fixture: ComponentFixture<PiggyBankEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiggyBankEditComponent]
    });
    fixture = TestBed.createComponent(PiggyBankEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
