import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRrssComponent } from './edit-rrss.component';

describe('EditRrssComponent', () => {
  let component: EditRrssComponent;
  let fixture: ComponentFixture<EditRrssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRrssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRrssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
