import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobPopup } from './add-job-popup';

describe('AddJobPopup', () => {
  let component: AddJobPopup;
  let fixture: ComponentFixture<AddJobPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
