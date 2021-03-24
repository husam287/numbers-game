import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersYardComponent } from './numbers-yard.component';

describe('NumbersYardComponent', () => {
  let component: NumbersYardComponent;
  let fixture: ComponentFixture<NumbersYardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumbersYardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersYardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
