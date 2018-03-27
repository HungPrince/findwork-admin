import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantJobComponent } from './applicant-job.component';

describe('ApplicantJobComponent', () => {
  let component: ApplicantJobComponent;
  let fixture: ComponentFixture<ApplicantJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
