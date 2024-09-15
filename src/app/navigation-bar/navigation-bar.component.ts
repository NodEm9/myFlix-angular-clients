/**
 * Title: navigation-bar.component.ts
 * @remarks This component handles the navigation bar for the application 
 * @param navRender - object
 * @param width - number
 * @see MovieListComponent - movie-list.component.ts
 * @see UserProfilesComponent - user-profiles.component.ts
 * @public router - Router
 * @public toolBar - MatToolbarModule
 * @method logOut - function
 * @name NavigationBarComponent 
 * @exports class NavigationBarComponent
 */
import { Component, EventEmitter, Injectable, Input, OnInit, Output, NgZone, afterNextRender } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';;
import { MatToolbarRow } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Injectable(
  { providedIn: 'any' }
)

@Component({
  selector: 'navigation-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatToolbarRow,
    MatMenuModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {
  @Input() navRender: any;
  @Output() navRenderChange = new EventEmitter<any>();

  width: any;

  constructor(
    public toolBar: MatToolbarModule,
    private router: Router,
    private ngZone: NgZone

  ) {
    afterNextRender(() => {
      this.ngZone.run(() => {
        this.width = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
        if (this.width < 599) {
          return { width: 'small' }
        } else if (this.width < 959) {
          return { width: 'medium' };
        } else {
          return { width: 'large' };
        }
      });
    });
  } 

  ngOnInit(): void {
    this.navRender = this.toolBar;
    this.navRenderChange.emit(this.navRender);
  }

  /**
   * @method logOut - function
   * @returns { void }
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  };

}
