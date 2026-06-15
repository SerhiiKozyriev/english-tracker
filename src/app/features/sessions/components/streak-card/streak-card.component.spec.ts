import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakCardComponent } from './streak-card.component';

describe('StreakCard', () => {
  let component: StreakCardComponent;
  let fixture: ComponentFixture<StreakCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreakCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StreakCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
