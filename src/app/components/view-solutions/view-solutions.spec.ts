import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSolutions } from './view-solutions';

describe('ViewSolutions', () => {
  let component: ViewSolutions;
  let fixture: ComponentFixture<ViewSolutions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSolutions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSolutions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
