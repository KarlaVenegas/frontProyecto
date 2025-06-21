import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCuentaCompComponent } from './mi-cuenta-comp.component';

describe('MiCuentaCompComponent', () => {
  let component: MiCuentaCompComponent;
  let fixture: ComponentFixture<MiCuentaCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiCuentaCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiCuentaCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
