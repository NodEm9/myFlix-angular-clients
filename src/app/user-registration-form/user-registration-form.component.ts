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

  registerUser(e: any): void {
    e.preventDefault();
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close();
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
