/**
 * @module fetch-api-data.service.ts
 * @description This file provides the methods that allow the client-side application 
 * to make HTTP requests to the server-side application.
 * @exports FetchApiDataService
 * @requires HttpClient
 * @requires HttpHeaders
 * @requires HttpErrorResponse
 * @requires Observable
 * @requires throwError
 * @requires map
 * @requires tap
 * @requires catchError
 * @requires apiUrl
 * @private getToken - get token
 * @private getUserData - get user data
 * @private extractResponseData - extract response data
 * @private handleError - error handling
 * @public userRegistration - user registration
 * @public userLogin - user login
 * @public getUser - get all users
 * @public editUser - edit user
 * @public deleteUser - delete user
 * @public getAllMovies - get all movies
 * @public getMovie - get a movie by title
 * @public getDirector - get director by name
 * @public addFavoriteMovie - add a movie to user's favorites
 * @public removeFavoriteMovie - remove a movie from user's favorites
 * @public getFavoriteMovies - get favorite movies
 * @public getGenre - get genre by name
 * @class FetchApiDataService - provides methods to make HTTP requests to the 
 * server-side application
 */
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError'
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


// Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-app-led6.onrender.com/';

@Injectable({
  providedIn: 'root'
})
  
export class FetchApiDataService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  /**
   * @returns {string} token
   * @description This method retrieves the token from the local storage
   * @function getStoredToken - get token
   */
  private getStoredToken(): any {
    const token = localStorage.getItem('token')!;    
    return token ? token : '';  
  }

  /** 
   * 
   * @returns {object} user data
   * @description This method retrieves the user data from the local storage
   * @function getStoredUser - get user data
   */
  private getStoredUser(): any {
    const userdata = localStorage.getItem('user');
    return userdata ? JSON.parse(userdata) : null;
  }
  
  /**
   * 
   * @param userDetails 
   * @returns {Observable<any>} user registration
   * @description This method makes a POST request to the API endpoint to register a new user
   * @see catchError - error handling
   * @see handleError - error handling
   * @function userRegistration - user registration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  
  /**
   * 
   * @param userDetails 
   * @returns {Observable<any>} user login
   * @description This method makes a POST request to the API endpoint to login a user
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function userLogin - user login
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param userDetails 
   * @returns {Observable<any>} get all users
   * @description This method makes a GET request to the API endpoint to get all users
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function getUser - get all users 
   */
  public getUser(userDetails: any): Observable<any> {
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
        'Content-Type': 'application/json',
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * 
   * @param userData 
   * @returns {Observable<any>} edit user
   * @description This method makes a PUT request to the API endpoint to edit a user
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function editUser - edit user
   */
 public editUser(userData: {}): Observable<any> {
    return this.http.put(apiUrl + `users/${this.getStoredUser().Username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
        'Content-Type': 'application/json'
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * 
   * @returns {Observable<any>} delete user
   * @description This method makes a DELETE request to the API endpoint to delete a user
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function deleteUser - delete user
   */
  public deleteUser(): Observable<any> {
    const username = this.getStoredUser().Username;
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * 
   * @param userData 
   * @returns 
   * @description This method makes a PUT request to the API endpoint to reset a user's password
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function resetPassword - reset password
   */
  public resetPassword(userData: {}): Observable<any> {
    return this.http.put(apiUrl + `users/resetpassword`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
        'Content-Type': 'application/json'
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * 
   * @returns {Observable<any>} get all movies
   * @description This method makes a GET request to the API endpoint to get all movies
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function getAllMovies - get all movies
   */
  public getAllMovies(): Observable<any> {
      return this.http.get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getStoredToken(),
        }) 
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  

  /**
   * 
   * @param title  
   * @returns {Observable<any>} get a movie by title
   * @description This method makes a GET request to the API endpoint to get a movie by title
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function getMovie - get a movie by title
   */
 public getMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param directorName 
   * @returns {Observable<any>} get director by name
   * @description This method makes a GET request to the API endpoint to get a director by name
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function getDirector - get director by name
   */
 public getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/director/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + this.getStoredToken(),
      })
    }).pipe( 
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * 
   * @param title 
   * @returns {Observable<any>} add a movie to user's favorites
   * @description This method makes a POST request to the API endpoint to add a movie to user's favorites
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function addFavoriteMovie - add a movie to user's favorites
   */
  public addFavoriteMovie(title: string): Observable<any> {
    const username =  this.getStoredUser().Username;
    console.log(username, title);
    return this.http.post(apiUrl + `users/${username}/movies/${title}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
        'Content-Type': 'application/json'
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param title 
   * @returns {Observable<any>} remove a movie from user's favorites
   * @description This method makes a DELETE request to the API endpoint to remove a movie from user's favorites
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function removeFavoriteMovie - remove a movie from user's favorites
   */
 public removeFavoriteMovie(title: string): Observable<any> {
    const username = this.getStoredUser().Username;
    return this.http.delete(apiUrl + `users/${username}/movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * 
   * @returns {Observable<any>} get favorite movies
   * @description This method makes a GET request to the API endpoint to get favorite movies
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function getFavoriteMovies - get favorite
   * */
  public getFavoriteMovies(): Observable<any> {
    const username = this.getStoredUser().Username;
    return this.http.get(apiUrl + `users/${username}/movies/favorites`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };


  /**
   * 
   * @param genreName 
   * @returns {Observable<any>} get genre by name
   * @description This method makes a GET request to the API endpoint to get a genre by name
   * @see catchError - error handling
   * @see handleError - error handling
   * @see extractResponseData - extract response data
   * @function getGenre - get genre by name
   * */
 public getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + `movies/genre/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getStoredToken(),
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * 
   * @param res 
   * @returns {any} extract response data
   * @description This method extracts the response data
   * @function extractResponseData - extract response data
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * 
   * @param error 
   * @returns {any} error handling
   * @description This method handles the error
   * @param error - error
   * @see catchError - error handling
   * @function handleError - error handling
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
     return throwError(() => new Error('Something bad happened; please try again later.'));
  }  
}

