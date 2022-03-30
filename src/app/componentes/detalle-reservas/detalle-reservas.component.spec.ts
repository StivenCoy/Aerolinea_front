import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReservasComponent } from './detalle-reservas.component';

describe('DetalleReservasComponent', () => {
  let component: DetalleReservasComponent;
  let fixture: ComponentFixture<DetalleReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleReservasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
