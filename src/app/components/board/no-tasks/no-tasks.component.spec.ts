import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTasksComponent } from './no-tasks.component';

describe('NoTasksComponent', () => {
  let component: NoTasksComponent;
  let fixture: ComponentFixture<NoTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
