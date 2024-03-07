import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaNlComponent } from './mapa-nl.component';

describe('MapaNlComponent', () => {
  let component: MapaNlComponent;
  let fixture: ComponentFixture<MapaNlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaNlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapaNlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
