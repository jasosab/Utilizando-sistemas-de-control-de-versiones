import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosReportComponent } from './movimientos-report.component';

describe('MovimientosReportComponent', () => {
  let component: MovimientosReportComponent;
  let fixture: ComponentFixture<MovimientosReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
