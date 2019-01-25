import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  showBtn = true;
  constructor() {}

  ngOnInit() {}

  hide() {
    this.showBtn = !this.showBtn;
  }
}
