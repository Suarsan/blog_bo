import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-accounts',
  templateUrl: './social-accounts.component.html',
  styleUrls: ['./social-accounts.component.scss']
})
export class SocialAccountsComponent implements OnInit {

  accounts;

  constructor() { }

  ngOnInit(): void {
    this.accounts = this.getAccounts();

  }

  
  private getAccounts() {
    return [{
      id: '123546',
      type: 'twitter'
    }]
  }
}
