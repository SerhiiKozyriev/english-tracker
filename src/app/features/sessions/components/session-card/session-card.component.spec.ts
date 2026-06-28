import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCardComponent } from './session-card.component';

describe('SessionCard', () => {
  let component: SessionCardComponent;
  let fixture: ComponentFixture<SessionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('session', {
      id: '1',
      date: '2026-06-20',
      notes: 'Test notes',
      duration: 30,
      topics: [],
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
