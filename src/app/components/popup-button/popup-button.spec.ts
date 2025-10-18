import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupButton } from './popup-button';

describe('PopupButton', () => {
  let component: PopupButton;
  let fixture: ComponentFixture<PopupButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
