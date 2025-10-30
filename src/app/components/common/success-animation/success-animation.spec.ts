import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessAnimation } from './success-animation';

describe('SuccessAnimation', () => {
  let component: SuccessAnimation;
  let fixture: ComponentFixture<SuccessAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessAnimation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
