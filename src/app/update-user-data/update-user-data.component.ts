/**
 * @remarks - This component is used to update the user data in the user profile
 * @typeParam userData - UserData model class
 * @param userData - UserData 
 * @param userDataChange - EventEmitter
 * @method updateUser - function
 * @see FetchApiDataService - fetch-api-data.service.ts
 * @see UserData - models/userData.ts
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { UserData } from '../../models/userData';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'; 
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'update-user-data',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MatCardFooter,
    MatCardActions,
    MatButtonModule,
    MatFormField,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  templateUrl: './update-user-data.component.html',
  styleUrl: './update-user-data.component.scss'
})
  
export class UpdateUserDataComponent implements OnInit {
  /**
   * @Input userData - This is the user data to be updated given by the parent component
   * It is of type UserData model class
   * @Output userDataChange - This is the event emitter that emits the updated user data to the parent component
   * It is of type EventEmitter<UserData> class 
   */
  @Input() userData: UserData = new UserData('', '', '', new Date(), [], '');
  @Output()  userDataChange = new EventEmitter<UserData>();

  
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * @remarks - This function is used to update the user data in the user profile
   * @param e - event object
   * @returns - updated user data
   * @method updateUser - function
   */
  updateUser(e: any): void {
    e.preventDefault();
    this.fetchApiData.editUser(this.userData).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.userData = resp;
      this.userDataChange.emit(this.userData);
      window.location.reload();
      this.router.navigate(['/users']);
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    });
  }
}
