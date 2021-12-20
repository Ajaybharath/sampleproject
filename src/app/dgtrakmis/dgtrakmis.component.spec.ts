import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DGTRAKMISComponent } from './dgtrakmis.component';

describe('DGTRAKMISComponent', () => {
  let component: DGTRAKMISComponent;
  let fixture: ComponentFixture<DGTRAKMISComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DGTRAKMISComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DGTRAKMISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
