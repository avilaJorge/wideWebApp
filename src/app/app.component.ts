import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WIDEWebApp';

  constructor() {
    console.log('App Component constructor was called!!');
  }
}
