import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNameComponent } from './menu-name.component';

describe('MenuNameComponent', () => {
  let component: MenuNameComponent;
  let fixture: ComponentFixture<MenuNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
