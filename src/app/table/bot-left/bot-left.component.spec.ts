import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotLeftComponent } from './bot-left.component';

describe('BotLeftComponent', () => {
  let component: BotLeftComponent;
  let fixture: ComponentFixture<BotLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
