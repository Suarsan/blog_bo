import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAccountComponent } from './social-account.component';

describe('SocialAccountComponent', () => {
  let component: SocialAccountComponent;
  let fixture: ComponentFixture<SocialAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
