/**
 * @name MovieFilterComponent 
 * @summary: This component is responsible for the search bar that
 *  filters the movies based on the user's input.
 * @param searchQuery: string
 * @param searchChange: EventEmitter 
 * @method onSearchChange(): void
 * @returns searchChange event
 */
import { Component, Injectable, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MovieCardComponent } from '../movie-card/movie-card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'movie-filter',
  standalone: true,
  imports: [
    MovieCardComponent,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    FormsModule
  ],
  
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.scss'
})
export class MovieFilterComponent {
  searchQuery: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchChange.emit(this.searchQuery);
    this.searchQuery = '';
  }

}
