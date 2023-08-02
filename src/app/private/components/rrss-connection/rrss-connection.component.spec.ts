import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RrssConnectionComponent } from './rrss-connection.component';

describe('RrssConnectionComponent', () => {
  let component: RrssConnectionComponent;
  let fixture: ComponentFixture<RrssConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrssConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrssConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
