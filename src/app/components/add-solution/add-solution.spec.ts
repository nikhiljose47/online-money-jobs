import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolution } from './add-solution';

describe('AddSolution', () => {
  let component: AddSolution;
  let fixture: ComponentFixture<AddSolution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSolution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSolution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
