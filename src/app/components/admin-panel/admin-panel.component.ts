import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class MainComponent implements OnInit {
  showBtn = true;
  constructor() {}

  ngOnInit() {}

  hide() {
    this.showBtn = !this.showBtn;
  }
}
