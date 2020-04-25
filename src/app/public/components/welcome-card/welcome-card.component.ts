import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent implements OnInit {

  @Output() showSignUpCardEmitter = new EventEmitter<boolean>();
  @Input() showSignUpButton;

  constructor() {
  }

  ngOnInit() {
  }

  public showSignUpCard() {
    this.showSignUpCardEmitter.emit(!this.showSignUpButton);
    this.showSignUpButton = !this.showSignUpButton;
  }

}
