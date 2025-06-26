import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicuentacafeComponent } from './micuentacafe.component';

describe('MicuentacafeComponent', () => {
  let component: MicuentacafeComponent;
  let fixture: ComponentFixture<MicuentacafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicuentacafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicuentacafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
