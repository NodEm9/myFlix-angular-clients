import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MovieFilterComponent } from '../movie-filter/movie-filter.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'movie-list',
  standalone: true,
  imports: [
    MovieFilterComponent,
    MovieCardComponent,
    NavigationBarComponent,
    MatPaginatorModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})

export class MovieListComponent {
  movies: any[] = [];
  filteredMovies: any[] = [];

  favoriteMovies: any = [];
  defaultScreenSize = { width: 'small' };
  length: number = 0;

  width: any;
  totalMovies: any = [];
  filterMovies: any;
  movieListFilter: any;

  navigationBar: any;
  cachedMovies = JSON.parse(localStorage.getItem('movies') || '{}');  

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.navigationBar = this.defaultScreenSize.width;
    this.getMovieData();
    this.filterMovies = this.movies;
    this.length = this.movies.length;
  }

  onSearchChange(searchQuery: string): void {
    if (searchQuery) {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      this.filteredMovies = [...this.movies]; // Reset to full movie list
    }
  }

  getMovieData(): void {
    this.movies.length === 0 ? this.getMovies() : this.getMoviesFromCache();
    if (this.movies.length !== 0) {
      this.totalMovies = this.movies.length;
    }
  };  

  getMoviesFromCache() {
    this.movies = this.cachedMovies.toString();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((data: any) => {
      this.filteredMovies = data;
      this.movies = data;
      localStorage.setItem('movies', JSON.stringify(this.movies));
      if (this.movies.length !== 0) {
        this.totalMovies = this.movies.length;
      }
    });

  }
}
