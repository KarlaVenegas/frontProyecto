import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComComponent } from './menu-com.component';

describe('MenuComComponent', () => {
  let component: MenuComComponent;
  let fixture: ComponentFixture<MenuComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
