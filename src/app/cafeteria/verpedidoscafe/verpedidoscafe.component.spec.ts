import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpedidoscafeComponent } from './verpedidoscafe.component';

describe('VerpedidoscafeComponent', () => {
  let component: VerpedidoscafeComponent;
  let fixture: ComponentFixture<VerpedidoscafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerpedidoscafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerpedidoscafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
