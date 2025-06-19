import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuCarritoCompComponent } from './tu-carrito-comp.component';

describe('TuCarritoCompComponent', () => {
  let component: TuCarritoCompComponent;
  let fixture: ComponentFixture<TuCarritoCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuCarritoCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuCarritoCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
