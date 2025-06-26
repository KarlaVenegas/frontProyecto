import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarproductoscafeComponent } from './gestionarproductoscafe.component';

describe('GestionarproductoscafeComponent', () => {
  let component: GestionarproductoscafeComponent;
  let fixture: ComponentFixture<GestionarproductoscafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarproductoscafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarproductoscafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
