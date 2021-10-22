import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnregComponent } from './header-unreg.component';

describe('HeaderUnregComponent', () => {
  let component: HeaderUnregComponent;
  let fixture: ComponentFixture<HeaderUnregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUnregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUnregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
