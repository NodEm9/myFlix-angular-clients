/**
 * @name WelcomePageComponent
 * @type {Component}
 * @description This component provides the welcome page for the app.
 * It displays the app name, a brief description, and buttons to navigate to the login and registration forms.
 * @method openUserRegistrationDialog - Opens the user registration dialog.
 * @method openUserLoginDialog - Opens the user login dialog.
 * @see UserRegistrationFormComponent - user-registration-form.component.ts
 * @see UserLoginFormComponent - user-login-form.component.ts
 * @exports class WelcomePageComponent
 */
import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

import { MatDialog } from '@angular/material/dialog';

@Component({ 
  selector: 'welcome-page',
  standalone: true,
  imports: [],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
  
  
export class WelcomePageComponent {

  constructor(public dialog: MatDialog) { }

  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
  // Assigning the dialog a width
        width: '480px',
         autoFocus: 'true'
      });
  }
  
  // This is the function that will open the dialog when the login button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '380px',
      autoFocus: 'true'
    });
  }
}
