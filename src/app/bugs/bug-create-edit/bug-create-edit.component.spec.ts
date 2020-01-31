import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugCreateEditComponent } from './bug-create-edit.component';

describe('BugCreateEditComponent', () => {
  let component: BugCreateEditComponent;
  let fixture: ComponentFixture<BugCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
