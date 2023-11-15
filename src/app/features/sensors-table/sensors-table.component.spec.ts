import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsTableComponent } from './sensors-table.component';

describe('SensorsTableComponent', () => {
  let component: SensorsTableComponent;
  let fixture: ComponentFixture<SensorsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorsTableComponent]
    });
    fixture = TestBed.createComponent(SensorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
