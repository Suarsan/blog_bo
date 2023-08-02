import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRrssDiffusionComponent } from './add-rrss-diffusion.component';

describe('AddRrssDiffusionComponent', () => {
  let component: AddRrssDiffusionComponent;
  let fixture: ComponentFixture<AddRrssDiffusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRrssDiffusionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRrssDiffusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
