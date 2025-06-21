import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCompComponent } from './pedidos-comp.component';

describe('PedidosCompComponent', () => {
  let component: PedidosCompComponent;
  let fixture: ComponentFixture<PedidosCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
