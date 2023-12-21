import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWidgetComponentComponent } from './user-widget-component.component';

describe('UserWidgetComponentComponent', () => {
  let component: UserWidgetComponentComponent;
  let fixture: ComponentFixture<UserWidgetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWidgetComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWidgetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
