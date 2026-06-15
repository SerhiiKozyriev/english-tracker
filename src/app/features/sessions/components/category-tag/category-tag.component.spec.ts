import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTagComponent } from './category-tag.component';

describe('CategoryTag', () => {
  let component: CategoryTagComponent;
  let fixture: ComponentFixture<CategoryTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTagComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
