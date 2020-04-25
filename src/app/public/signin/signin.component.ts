import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  showSignInCard: boolean;

  constructor() {
    this.showSignInCard = true;
  }

  ngOnInit() {
  }

  public showSignUpCardListener(e) {
    this.showSignInCard = false;
  }

  public showSignInCardListener(e) {
    this.showSignInCard = true;
  }
}
