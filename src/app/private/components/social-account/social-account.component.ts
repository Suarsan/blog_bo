import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-account',
  templateUrl: './social-account.component.html',
  styleUrls: ['./social-account.component.scss']
})
export class SocialAccountComponent implements OnInit {

  @Input() account;

  constructor() { }

  ngOnInit(): void {
  }

  public socialSignIn() {
    
  }
}
