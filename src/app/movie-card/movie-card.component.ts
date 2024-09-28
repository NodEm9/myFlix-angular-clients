/** 
 * @name movie-card component 
 * Movie card component for displaying movie information and interactions.
 * @remarks This component handles movie filtering, screen size detection, 
 * user authentication, movie favorites, and dialog box interactions.
 * @param favoriteMovies - array
 * @param defaultScreenSize - object
 * @see MovieFilterComponent - movie-filter.component.ts
 * @param favorite - object
 * @param fetchApiData - FetchApiDataService
 * @see FetchApiDataService - fetch-api-data.service.ts
 * @param dialog - MatDialog
 * @see DialogBoxComponent - dialog-box.component.ts 
 * @param snackBar - MatSnackBar
 * @param router - Router
 * @param movies - array
 * @param totalMovies - number
 * @implements OnInit
 * @public favoriteMovie - function
 * @public handleRemoveFavoriteMovie - function
 * @constructor MovieCardComponent
 */

import { Component, Input, Injectable, Output, OnInit} from '@angular/core';;
import { Router } from '@angular/router';


import { FetchApiDataService } from '../fetch-api-data.service';

import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

import { CommonModule } from '@angular/common';
import { MovieFilterComponent } from '../movie-filter/movie-filter.component';

import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarRow } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable(
  { providedIn: 'root' }
)

@Component({
  selector: 'movie-card', 
  standalone: true,
  imports: [
    MatCardModule,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatDialogContent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatToolbarRow,
    MatFormFieldModule,
    MatInputModule,
    NavigationBarComponent,
    MatPaginatorModule,
    MovieFilterComponent,
    CommonModule
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})


export class MovieCardComponent implements OnInit {
  @Input() movies: any[] = [];
  @Output() favoriteMovies: any;
  favorite: any;
  totalMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.favoriteMovies = this.favoriteMovie(this.favorite);
  }

  /**
   * 
   * @param movie - object
   * @returns favorite movie
   * @description This function will favorite a movie by adding it to the user's 
   * favorite movies array and updating the user's favorite movies array in local storage.
   * @method favoriteMovie - function
   * 
   */
  favoriteMovie(movie: any): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    const icon = document.getElementById(`${movie._id}-favorite-icon`);
    if (!user.favoriteMovies.includes(movie._id)) {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe((resp: any) => {
        if (icon) {
          icon.setAttribute("fontIcon", "favorite");
        }
        movie.isFavorite = !movie.isFavorite;
        user.favoriteMovies = resp.favoriteMovies;;
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['movieslist']);
        this.snackBar.open(
          `${movie.Title} has been added to your favorites!`,
          'OK',
          {
            duration: 2000,
          }
        );

      });
    } else {
      this.handleRemoveFavoriteMovie(movie);
    }
  }


  /**
   * @param movie - object
   * @returns remove favorite movie
   * @description This function will remove a movie from the user's favorite movies array
   * and update the user's favorite movies array in local storage.
   * @see favoriteMovie
   * @method handleRemoveFavoriteMovie - function
   */
  handleRemoveFavoriteMovie(movie: any): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    const icon = document.getElementById(`${movie._id}-favorite-icon`);
    this.fetchApiData.removeFavoriteMovie(movie._id).subscribe((resp: any) => {
      /**
       * Update user's favorite movies by setting it
       * to the response from the API which then removes the
       * movie from the user's favorite movies array
       */
      movie.isFavorite = !movie.isFavorite;
      icon?.setAttribute("fontIcon", "favorite");
      user.favoriteMovies = resp.favoriteMovies;
      localStorage.setItem("user", JSON.stringify(user));
      this.router.navigate(['movieslist']);
      this.snackBar.open(
        `${movie.Title} has been removed from your favorites!`,
        'OK',
        {
          duration: 2000,
        }
      );
    });
  };


  /**
   * @param movie - object
   * @returns show director
   * @description This function will open the dialog box for the movie director
   * @method showDirector - function
   */
  showDirector(movie: any): void {
    this.dialog.open(DialogBoxComponent, {
      data: {
        name: movie.Director.name,
        bio: movie.Director.bio,
        birthdate: movie.Director.birthdate,
        deathyear: movie.Director.deathyear
      },
      role: 'dialog',
    });
  };

  // This function will open the dialog box for the movie genre
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
  }
};