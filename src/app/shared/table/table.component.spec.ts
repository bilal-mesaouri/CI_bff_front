import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableButtonComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableButtonComponent;
  let fixture: ComponentFixture<TableButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
