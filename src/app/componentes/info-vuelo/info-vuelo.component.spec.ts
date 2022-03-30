import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVueloComponent } from './info-vuelo.component';

describe('InfoVueloComponent', () => {
  let component: InfoVueloComponent;
  let fixture: ComponentFixture<InfoVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVueloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
