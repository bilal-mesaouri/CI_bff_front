import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotRightComponent } from './bot-right.component';

describe('BotRightComponent', () => {
  let component: BotRightComponent;
  let fixture: ComponentFixture<BotRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
