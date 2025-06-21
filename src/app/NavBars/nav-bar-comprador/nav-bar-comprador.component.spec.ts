import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCompradorComponent } from './nav-bar-comprador.component';

describe('NavBarCompradorComponent', () => {
  let component: NavBarCompradorComponent;
  let fixture: ComponentFixture<NavBarCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarCompradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
