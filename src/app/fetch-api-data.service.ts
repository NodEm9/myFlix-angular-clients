import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError'
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
  
export class FetchApiDataService implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  private getStoredToken(): any {
    const token = localStorage.getItem('token')!;    
    return token ? token : '';  
  }

  private getStoredUser(): any {
    const userdata = localStorage.getItem('user');
    return userdata ? JSON.parse(userdata) : null;
  }
  
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

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

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

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

