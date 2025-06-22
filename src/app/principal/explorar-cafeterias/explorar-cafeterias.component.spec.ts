import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorarCafeteriasComponent } from './explorar-cafeterias.component';

describe('ExplorarCafeteriasComponent', () => {
  let component: ExplorarCafeteriasComponent;
  let fixture: ComponentFixture<ExplorarCafeteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorarCafeteriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarCafeteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
