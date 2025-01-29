import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'user-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatFormField,
    MatInputModule,
    FormsModule,
    CommonModule
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

  loginUser(e: any): void {
    e.preventDefault();
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.snackBar.open('User logged in successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['/movieslist']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
