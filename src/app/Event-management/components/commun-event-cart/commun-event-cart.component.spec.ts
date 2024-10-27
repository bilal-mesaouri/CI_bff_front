import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunEventCartComponent } from './commun-event-cart.component';

describe('CommunEventCartComponent', () => {
  let component: CommunEventCartComponent;
  let fixture: ComponentFixture<CommunEventCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunEventCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunEventCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
