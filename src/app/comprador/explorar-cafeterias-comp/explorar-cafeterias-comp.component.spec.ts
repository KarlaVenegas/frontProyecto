import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarCafeteriasCompComponent } from './explorar-cafeterias-comp.component';

describe('ExplorarCafeteriasCompComponent', () => {
  let component: ExplorarCafeteriasCompComponent;
  let fixture: ComponentFixture<ExplorarCafeteriasCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarCafeteriasCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarCafeteriasCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
