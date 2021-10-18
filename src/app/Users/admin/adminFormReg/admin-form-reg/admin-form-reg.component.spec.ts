import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormRegComponent } from './admin-form-reg.component';

describe('AdminFormRegComponent', () => {
  let component: AdminFormRegComponent;
  let fixture: ComponentFixture<AdminFormRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFormRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
