import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCounterComponent } from './customer-counter.component';

describe('CustomerCounterComponent', () => {
  let component: CustomerCounterComponent;
  let fixture: ComponentFixture<CustomerCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
