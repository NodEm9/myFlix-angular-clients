/**
 * @name UserLoginFormComponent
 * @type {Component}
 * @description This component provides a user login form. 
 * It handles user login functionality by sending form inputs to the backend.
 * It displays success/failure messages and navigates to the movies view upon successful login.
 * @param {UserData} userData - The user data object.
 * @param {boolean} loginForm - The login form status.
 * @param {MatDialogRef} dialogRef - The dialog reference object.
 * @param {MatDialog} dialog - The dialog object.
 * @param {MatSnackBar} snackBar - The snack bar object.
 * @param {Router} router - The router object.
 * @method loginUser - Logs in the user by sending the user data to the backend for authentication.
 * @method openResetPasswordForm - Opens the reset password form.
 * @method ngOnInit - This lifecycle hook function is used to initialize the component.
 * @export class UserLoginFormComponent
 *
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule} from '@angular/forms';


import { FetchApiDataService } from '../fetch-api-data.service';
import { UserData } from '../../models/userData';

import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';


/** 
 * @title User Login Form
 * Component for the user login form.
 * Handles user login functionality by sending form inputs to the backend.
 * Displays success/failure messages and navigates to the movies view upon successful login.
 */


@Component({ 
  selector: 'user-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatCardFooter,
    MatFormField,
    MatInputModule,
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };
  loginForm: boolean = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend

  /**
 * Logs in the user by sending the user data to the backend for authentication.
 * Closes the modal on successful login, stores user data and token in local storage,
 * displays a success message using a snack bar, and navigates to the movies lists view.
 * @param e - The event object triggering the login action.
 * @returns void
 * @method loginUser - Logs in the user by sending the user data to the backend for authentication.
 */
  loginUser(e: any): void {
    e.preventDefault();
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.snackBar.open('User logged in successfully!', 'OK', {
        duration: 2000
      });
      // Navigates to the movies view upon successful login
      this.router.navigate(['/movieslist']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
