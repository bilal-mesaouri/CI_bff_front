import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCustomerCountComponent } from './event-customer-count.component';

describe('EventCustomerCountComponent', () => {
  let component: EventCustomerCountComponent;
  let fixture: ComponentFixture<EventCustomerCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCustomerCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCustomerCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
