import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDescuentosComponent } from './detalle-descuentos.component';

describe('DetalleDescuentosComponent', () => {
  let component: DetalleDescuentosComponent;
  let fixture: ComponentFixture<DetalleDescuentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDescuentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
