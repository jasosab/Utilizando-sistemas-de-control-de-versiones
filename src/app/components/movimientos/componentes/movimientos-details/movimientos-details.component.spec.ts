import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosDetailsComponent } from './movimientos-details.component';

describe('MovimientosDetailsComponent', () => {
  let component: MovimientosDetailsComponent;
  let fixture: ComponentFixture<MovimientosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
