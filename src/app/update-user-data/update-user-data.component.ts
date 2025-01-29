import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { UserData } from '../../models/userData';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'; 
import { MatCardActions } from '@angular/material/card';
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
  @Input() userData: UserData = new UserData('', '', '', new Date(), [], '');
  @Output()  userDataChange = new EventEmitter<UserData>();

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

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
