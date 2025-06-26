import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalcafeComponent } from './principalcafe.component';

describe('PrincipalcafeComponent', () => {
  let component: PrincipalcafeComponent;
  let fixture: ComponentFixture<PrincipalcafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalcafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalcafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
