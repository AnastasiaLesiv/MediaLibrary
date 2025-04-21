import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wildcard',
  imports: [RouterOutlet],
  templateUrl: './wildcard.component.html',
  styleUrls: ['./wildcard.component.css']
})
export class WildcardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
