import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggyBankAddComponent } from './piggy-bank-add.component';

describe('PiggyBankAddComponent', () => {
  let component: PiggyBankAddComponent;
  let fixture: ComponentFixture<PiggyBankAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiggyBankAddComponent]
    });
    fixture = TestBed.createComponent(PiggyBankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
