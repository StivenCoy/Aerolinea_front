import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVuelosComponent } from './detalle-vuelos.component';

describe('DetalleVuelosComponent', () => {
  let component: DetalleVuelosComponent;
  let fixture: ComponentFixture<DetalleVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
