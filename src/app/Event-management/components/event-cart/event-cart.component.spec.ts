import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCartComponent } from './event-cart.component';

describe('EventCartComponent', () => {
  let component: EventCartComponent;
  let fixture: ComponentFixture<EventCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
