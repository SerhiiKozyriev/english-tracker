import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsSearch } from './sessions-search';

describe('SessionSearch', () => {
  let component: SessionsSearch;
  let fixture: ComponentFixture<SessionsSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionsSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
