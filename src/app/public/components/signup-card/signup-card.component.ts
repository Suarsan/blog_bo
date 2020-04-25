import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.scss']
})
export class SignupCardComponent implements OnInit {

  @Output() showSignInCardEmitter = new EventEmitter<any>();

  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    firstname: new FormControl(null),
    lastname: new FormControl(null)
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public showSignInCard() {
    this.showSignInCardEmitter.emit();
  }

  public signUp() {
    this.userService.signup(
      this.signupForm.get('email').value,
      this.signupForm.get('password').value,
      this.signupForm.get('firstname').value,
      this.signupForm.get('lastname').value)
    .pipe().subscribe();
  }
}
