import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionPreferences } from './solution-preferences';

describe('SolutionPreferences', () => {
  let component: SolutionPreferences;
  let fixture: ComponentFixture<SolutionPreferences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionPreferences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionPreferences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
