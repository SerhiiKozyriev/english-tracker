import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStatsCardComponent } from './total-stats-card.component';

describe('StatsCard', () => {
  let component: TotalStatsCardComponent;
  let fixture: ComponentFixture<TotalStatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalStatsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalStatsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
