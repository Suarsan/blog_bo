import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRrssComponent } from './add-rrss.component';

describe('AddRrssComponent', () => {
  let component: AddRrssComponent;
  let fixture: ComponentFixture<AddRrssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRrssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRrssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
