import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCafeteriasComponent } from './nav-bar-cafeterias.component';

describe('NavBarCafeteriasComponent', () => {
  let component: NavBarCafeteriasComponent;
  let fixture: ComponentFixture<NavBarCafeteriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarCafeteriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarCafeteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
