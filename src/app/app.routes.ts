import { Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieListComponent } from './movie-list/movie-list.component';

export const routes: Routes = [
  { path: 'welcome', title: 'Welcome Page', component: WelcomePageComponent },
  { path: 'signup', title: 'Registration Page', component: UserRegistrationFormComponent },
  { path: 'login', title: 'Login Page', component: UserLoginFormComponent },
  { path: 'movieslist', title: 'Movie List', component: MovieListComponent },
  { path: 'users', title: 'Profile Page', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  { path: '**', component: PageNotFoundComponent }
];
