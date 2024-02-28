import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggyBankInfoComponent } from './piggy-bank-info.component';

describe('PiggyBankInfoComponent', () => {
  let component: PiggyBankInfoComponent;
  let fixture: ComponentFixture<PiggyBankInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiggyBankInfoComponent]
    });
    fixture = TestBed.createComponent(PiggyBankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
