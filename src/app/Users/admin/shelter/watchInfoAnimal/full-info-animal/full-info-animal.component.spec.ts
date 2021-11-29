import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullInfoAnimalComponent } from './full-info-animal.component';

describe('FullInfoAnimalComponent', () => {
  let component: FullInfoAnimalComponent;
  let fixture: ComponentFixture<FullInfoAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullInfoAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullInfoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
