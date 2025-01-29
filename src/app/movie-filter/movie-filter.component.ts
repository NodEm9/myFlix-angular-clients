import { Component, Injectable, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
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
