import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterJobComponent } from './recruiter-job.component';

describe('RecruiterJobComponent', () => {
  let component: RecruiterJobComponent;
  let fixture: ComponentFixture<RecruiterJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
