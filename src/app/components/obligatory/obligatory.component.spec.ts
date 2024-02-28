import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatoryComponent } from './obligatory.component';

describe('ObligatoryComponent', () => {
  let component: ObligatoryComponent;
  let fixture: ComponentFixture<ObligatoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObligatoryComponent]
    });
    fixture = TestBed.createComponent(ObligatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
