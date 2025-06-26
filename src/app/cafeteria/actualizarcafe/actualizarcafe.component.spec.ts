import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarcafeComponent } from './actualizarcafe.component';

describe('ActualizarcafeComponent', () => {
  let component: ActualizarcafeComponent;
  let fixture: ComponentFixture<ActualizarcafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarcafeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarcafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
