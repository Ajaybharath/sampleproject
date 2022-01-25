import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailconfigModelComponent } from './mailconfig-model.component';

describe('MailconfigModelComponent', () => {
  let component: MailconfigModelComponent;
  let fixture: ComponentFixture<MailconfigModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailconfigModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailconfigModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
