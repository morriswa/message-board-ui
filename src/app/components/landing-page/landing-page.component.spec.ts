import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingAgeComponent } from './landing-page.component';

describe('LandingAgeComponent', () => {
  let component: LandingAgeComponent;
  let fixture: ComponentFixture<LandingAgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingAgeComponent]
    });
    fixture = TestBed.createComponent(LandingAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
