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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    NgClass,
    MatIconModule,
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
    this.navigationBar = this.getScreenSize();
  }

  get setCssClasses() {
   return {'bgColor': this.userData.Birthday}
  }

  getScreenSize(): any {
    return this.navRender
  }

  getUser(): void {
    let user = localStorage.getItem('user');
    if (user) {
      this.userData = JSON.parse(user);
    }
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
    });
  }

  favoriteMovie(movie: any) {
    let user = JSON.parse(localStorage.getItem('user') || '');
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.favoriteMovies.includes(movie._id)) {
      this.fetchApiData.removeFavoriteMovie(movie._id).subscribe((resp: any) => {
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

  deleteUserAccount() {
    this.fetchApiData.deleteUser().subscribe(() => { 
      localStorage.clear();
      this.router.navigate(['welcome']);
    });
    this.snackBar.open('Account deleted', 'OK', {
      duration: 2000,
    });
    
  }

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
  };


}
