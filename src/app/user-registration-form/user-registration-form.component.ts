/**
 * @name UserRegistrationFormComponent
 * @type {Component} 
 * @description This component provides a user registration form. 
 * It handles user registration functionality by sending form inputs to the backend.
 * It displays success/failure messages and navigates to the login view upon successful registration.
 * @param {UserData} userData - The user data object.
 * @param {MatDialogRef} dialogRef - The dialog reference object.
 * @param {MatSnackBar} snackBar - The snack bar object.
 * @method registerUser - Registers the user by sending the user data to the backend for registration.
 * @method ngOnInit - This lifecycle hook function is used to initialize the component.
 * @export class UserRegistrationFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
 
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserData } from '../../models/userData';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'user-registration-form',
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
    FormsModule
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
})
  
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData: UserData = { Username: '', Password: '', Email: '', Birthday: new Date };
  

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

 /**
  * @description Registers the user by sending the user data to the backend for registration.
  * @returns {object} - user data
  * @method registerUser
  */
  registerUser(e: any): void {
    e.preventDefault();
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      this.userData = response;
      console.log(response);
      this.snackBar.open('User Registeration Successful', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
