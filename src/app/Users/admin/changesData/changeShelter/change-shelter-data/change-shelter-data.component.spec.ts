import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeShelterDataComponent } from './change-shelter-data.component';

describe('ChangeShelterDataComponent', () => {
  let component: ChangeShelterDataComponent;
  let fixture: ComponentFixture<ChangeShelterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeShelterDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeShelterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
