import { Component, Input, Injectable, Output, OnInit} from '@angular/core';;
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
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
    MatCardActions,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
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

  handleRemoveFavoriteMovie(movie: any): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    const icon = document.getElementById(`${movie._id}-favorite-icon`);
    this.fetchApiData.removeFavoriteMovie(movie._id).subscribe((resp: any) => {
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

  showGenre(movie: any): void {
    this.dialog.open(DialogBoxComponent, {
      data: {
        name: movie.Genre.name,
        description: movie.Genre.description
      },
      role: 'dialog',
    });
  };

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