import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetshoplayoutComponent } from './betshoplayout.component';

describe('BetshoplayoutComponent', () => {
  let component: BetshoplayoutComponent;
  let fixture: ComponentFixture<BetshoplayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetshoplayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetshoplayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
