import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerreseniacafeComponent } from './verreseniacafe.component';

describe('VerreseniacafeComponent', () => {
  let component: VerreseniacafeComponent;
  let fixture: ComponentFixture<VerreseniacafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerreseniacafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerreseniacafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
