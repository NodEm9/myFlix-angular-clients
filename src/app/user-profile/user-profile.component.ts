/**
 * @module user-profile
 * @description This component will display the user's profile information.
 * @remarks This component handles user data, favorite movies, screen size detection,
 * user interactions, and dialog box interactions.
 * @typeParam userData - object the UserData model 
 * @param navRender - object
 * @param movies - array
 * @param favoriteMovies - array
 * @param defaultScreenSize - object
 * @param navigationBar - object
 * @param updateDataForm - object
 * @param fetchApiData - FetchApiDataService
 * @see FetchApiDataService - fetch-api-data.service.ts
 * @param dialog - MatDialog
 * @param snackBar - MatSnackBar
 * @param router - Router
 * @param icon - object 
 * @param movie - object
 * @param title - string
 * @param user - object
 */

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NgClass} from '@angular/common';

import { FetchApiDataService } from '../fetch-api-data.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UpdateUserDataComponent } from '../update-user-data/update-user-data.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

import { UserData } from '../../models/userData';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardActions } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    NgClass,
    MatIconModule,
    MatCardActions,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MovieCardComponent,
    MatDividerModule,
    UpdateUserDataComponent,
    NavigationBarComponent, 
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {
  @Input() userData: UserData = new UserData('', '', '', new Date(), [], '');
  @Input() navRender: any = {};

  movies: any[] = [];
  favoriteMovies: any = [];
  defaultScreenSize = { width: 'small' };
  navigationBar: any;
  updateDataForm: any;
  cssClassess: any = {};
 


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.favoriteMovies = this.getFavoriteMovies();
    this.formattedDate(this.userData.Birthday);
    this.navigationBar = this.getScreenSize();
  }

  get setCssClasses() {
   return {'bgColor': this.userData.Birthday}
  }

  /**
   * 
   * @returns {any} - object with width property set to 'small', 'medium', or 'large'
   * @remarks This method will get the screen size and return an object with the width property set to 'small', 'medium', or 'large'
   * @see navRender - object
   * @see width - any
   * @see toolBar - MatToolbarModule
   * @see router - Router
   * @see getScreenSize - navigation-bar.component.ts
   */
  getScreenSize(): any {
    return this.navRender
  }


  /**
   * 
   * @param {Date} date - date object
   * @returns {string} - formatted date string
   * @remarks This method will take a date object and return a formatted date string
   * @see date - Date
   * @see formattedDate - user-profile.component.ts
   */
  formattedDate(date: Date): string {
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    } else {
      return date.toLocaleDateString();
    }
  }

  /**
   * 
   * @returns {void}
   * @remarks This method will get the user data from local storage
   * @see user - object
   * @see getUser - user-profile.component.ts
   */
  getUser(): void {
    let user = localStorage.getItem('user');
    if (user) {
      this.userData = JSON.parse(user);
    }
  }

  /**
   * 
   * @returns {void}
   * @remarks This method will get the user's favorite movies from the API
   * @see favoriteMovies - array
   * @see getFavoriteMovies - user-profile.component.ts
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
    });
  }


  /**
   * 
   * @param {any} movie - object
   * @returns {void}
   * @remarks This method will add a movie to the user's favorite movies
   * @see user - object
   * @see icon - object
   * @see fetchApiData - FetchApiDataService
   * @see router - Router
   * @see snackBar - MatSnackBar
   * @see addFavoriteMovie - fetch-api-data.service.ts
   */
  favoriteMovie(movie: any) {
    let user = JSON.parse(localStorage.getItem('user') || '');
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.favoriteMovies.includes(movie._id)) {
      this.fetchApiData.removeFavoriteMovie(movie._id).subscribe((resp: any) => {
        /**
         * Update user's favorite movies by setting it
         * to the response from the API and then removing the
         * 
         */
        icon?.setAttribute("fontIcon", "favorite");
        user.favoriteMovies = resp.favoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        movie.isFavorite = !movie.isFavorite;
        this.router.navigate(['users']);
        this.snackBar.open(
          `${movie.Title} has been removed from your favorites!`,
          'OK',
          {
            duration: 2000,
          }
        );
      });
    }
  };

  /**
   * 
   * @returns {void}
   * @remarks This method will delete the user's account and log the user out
   * @see deleteUserAccount - user-profile.component.ts
   */
  deleteUserAccount() {
    this.fetchApiData.deleteUser().subscribe(() => { 
      localStorage.clear();
      this.router.navigate(['welcome']);
    });
    this.snackBar.open('Account deleted', 'OK', {
      duration: 2000,
    });
    
  }

  /**
   * 
   * @param {string} movieId - string
   * @param {string} title - string
   * @returns {void}
   * @remarks This method will open the dialog box for the movie information
   * @see openDialog - user-profile.component.ts
   */
  openDialog(movieId: string, title: string): void {
    this.dialog.open(DialogBoxComponent, {
      data: { movieId, title },
    });
  }

  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserDataComponent, {
      data: { user: this.userData },

      width: '800px',
    });
  }

  openDeleteUserDialog(): void {
    this.dialog.open(DialogBoxComponent, {
      data: { user: this.userData }
    });
    alert('Are you sure you want to delete your account?');
    return
  }


  // This function will open the dialog box for the director information
  showDirector(movie: any): void {
    this.dialog.open(DialogBoxComponent, {
      data: {
        name: movie.Director.name,
        bio: movie.Director.bio,
        birthyear: movie.Director.birthyear,
        deathyear: movie.Director.deathyear
      },
      role: 'dialog',
    });
  };

  // This function will open the dialog box for the genre information
  showGenre(movie: any): void {
    this.dialog.open(DialogBoxComponent, {
      data: {
        name: movie.Genre.name,
        description: movie.Genre.description
      },
      role: 'dialog',
    });
  };

  // This function will open the dialog box for the movie synopsis
  showSynopsis(movie: any): void {
    this.dialog.open(DialogBoxComponent, {
      data: {
        title: movie.Title,
        description: movie.Description
      },
      role: 'dialog',
    });
  };


}
