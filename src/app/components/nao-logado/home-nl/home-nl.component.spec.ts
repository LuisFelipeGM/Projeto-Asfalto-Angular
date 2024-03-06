import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNlComponent } from './home-nl.component';

describe('HomeNlComponent', () => {
  let component: HomeNlComponent;
  let fixture: ComponentFixture<HomeNlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeNlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeNlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
