import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rrss-connection',
  templateUrl: './rrss-connection.component.html',
  styleUrls: ['./rrss-connection.component.scss']
})
export class RrssConnectionComponent implements OnInit {

  @Input() rrssConnection;

  constructor() { }

  ngOnInit(): void { }

}
