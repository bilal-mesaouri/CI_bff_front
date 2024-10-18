import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCalculatorComponent } from './customer-calculator.component';

describe('CustomerCalculatorComponent', () => {
  let component: CustomerCalculatorComponent;
  let fixture: ComponentFixture<CustomerCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
