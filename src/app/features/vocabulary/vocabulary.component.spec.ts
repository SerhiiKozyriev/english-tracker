import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyComponent } from './vocabulary.component';

describe('Vocabulary', () => {
  let component: VocabularyComponent;
  let fixture: ComponentFixture<VocabularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VocabularyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
