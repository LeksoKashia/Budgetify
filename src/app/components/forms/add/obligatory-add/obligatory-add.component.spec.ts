import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatoryAddComponent } from './obligatory-add.component';

describe('ObligatoryAddComponent', () => {
  let component: ObligatoryAddComponent;
  let fixture: ComponentFixture<ObligatoryAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObligatoryAddComponent]
    });
    fixture = TestBed.createComponent(ObligatoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
