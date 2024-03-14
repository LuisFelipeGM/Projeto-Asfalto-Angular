import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoLgComponent } from './cabecalho-lg.component';

describe('CabecalhoLgComponent', () => {
  let component: CabecalhoLgComponent;
  let fixture: ComponentFixture<CabecalhoLgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CabecalhoLgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CabecalhoLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
