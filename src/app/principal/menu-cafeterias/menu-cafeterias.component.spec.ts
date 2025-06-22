import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCafeteriasComponent } from './menu-cafeterias.component';

describe('MenuCafeteriasComponent', () => {
  let component: MenuCafeteriasComponent;
  let fixture: ComponentFixture<MenuCafeteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCafeteriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCafeteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
