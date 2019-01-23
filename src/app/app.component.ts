import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChinaBay';
  constructor(private router: Router) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // this.router.navigate(['']);
  }
}
