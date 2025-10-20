import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvedNavbar } from './curved-navbar';

describe('CurvedNavbar', () => {
  let component: CurvedNavbar;
  let fixture: ComponentFixture<CurvedNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurvedNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurvedNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
