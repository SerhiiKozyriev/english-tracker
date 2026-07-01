import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDropdownComponent } from './category-dropdown.component';

describe('CategoryDropdownComponent', () => {
  let component: CategoryDropdownComponent;
  let fixture: ComponentFixture<CategoryDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDropdownComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
