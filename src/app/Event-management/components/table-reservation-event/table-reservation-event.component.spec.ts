import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReservationEventComponent } from './table-reservation-event.component';

describe('TableReservationEventComponent', () => {
  let component: TableReservationEventComponent;
  let fixture: ComponentFixture<TableReservationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableReservationEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableReservationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
