/**
 * @name AppComponent
 * @catergory app 
 * @import { Component } from '@angular/core';
 * @import { RouterOutlet } from '@angular/router';
 * @export class AppComponent
 * @description This is the root component of the app
 * @module app component
 * @exports class AppComponent
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'myFlix-Angular-client';

}
