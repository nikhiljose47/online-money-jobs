import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBar } from './profile-bar';

describe('ProfileBar', () => {
  let component: ProfileBar;
  let fixture: ComponentFixture<ProfileBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
