import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensasCompComponent } from './recompensas-comp.component';

describe('RecompensasCompComponent', () => {
  let component: RecompensasCompComponent;
  let fixture: ComponentFixture<RecompensasCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecompensasCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecompensasCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
