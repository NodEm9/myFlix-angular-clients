/**
 * @name movie-list
 * @remarks This component will display the list of movies
 * @param movies - array of objects
 * @param filteredMovies - array of objects
 * @param favoriteMovies - array of objects
 * @param defaultScreenSize - object
 * @param length - number
 * @param width - object
 * @param totalMovies - number
 * @param filterMovies - array of objects
 * @param movieListFilter - object
 * @param navigationBar - object
 * @public router - Router
 * @public fetchApiData - FetchApiDataService
 * @metbod onSearchChange - function
 * @method logOut - function
 * @method getMovieData - function
 * @method getMovies - function
 * @see FetchApiDataService - fetch-api-data.service.ts
 * @method getMoviesFromCache - function
 * @see FetchApiDataService - fetch-api-data.service.ts
 * @see NavigationBarComponent - navigation-bar.component.ts
 * @see MovieFilterComponent - movie-filter.component.ts
 * @see MovieCardComponent - movie-card.component.ts
 */
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
    RouterLink
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

  /**
   * @param searchQuery - string
   * @description This function will filter the movies array based on the search query
   * @function onSearchChange - function
   */
  onSearchChange(searchQuery: string): void {
    if (searchQuery) {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      this.filteredMovies = [...this.movies]; // Reset to full movie list
    }
  }

  /**
   * @description This function checkes if the movies array is empty or not
   * if the movies array is empty it will call the getMovies function 
   * to get the list of movies from the API and store it in the movies array 
   * and in local storage. If the movies array is not empty
   * it means we have the data in our local storage, we will then fetch the data from our local storge.
   * This is to reduce the number of API calls made to the server.
   * @returns void
   * @function getMovieData - function
   */
  getMovieData(): void {
    this.movies.length === 0 ? this.getMovies() : this.getMoviesFromCache();
    if (this.movies.length !== 0) {
      this.totalMovies = this.movies.length;
    }
  };  

  /**
   * @description This function will get the list of movies from the local storage
   * and store it in the movies array. This explicitly make the data readily available
   * for the user to view without having to make an API call to the server.
   * This is to reduces the number of API calls made to the server. any cache data is available
   * @see getMovies - function
   * @see getMovieData - function
   * @returns void
   * @function getMoviesFromCache - function
   */
  getMoviesFromCache() {
    this.movies = this.cachedMovies.toString();
  }

  /**
   * @description This function will get the list of movies from the API
   * and store it in the movies array and in local storage
   * @returns void
   * @function getMovies - function
   */
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
