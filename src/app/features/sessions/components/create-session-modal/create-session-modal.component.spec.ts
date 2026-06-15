import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSessionModalComponent } from './create-session-modal.component';

describe('AddSessionModal', () => {
  let component: CreateSessionModalComponent;
  let fixture: ComponentFixture<CreateSessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSessionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSessionModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
