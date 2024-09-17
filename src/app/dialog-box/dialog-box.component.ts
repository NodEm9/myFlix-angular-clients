/**
 * Title: dialog-box.component.ts
 * Author: Emmanuel Nodo
 * @remarks This component handles the display of a dialog box with detailed information about a specific item.
 * @param name - string 
 * @param title - string
 * @param bio - string
 * @param birthdate - string
 * @param deathyear - string
 * @param description - string
 * @param genre - string
 * @param dialogRef - MatDialogRef
 * @param data - MAT_DIALOG_DATA
 * @method ngOnInit - function
 * @method closeDailogBox - function
 * @method closeGenreDailogBox - function
 * @method closeSynopsisDailogBox - function
 * @see MatDialogRef - angular/material/dialog
 * @see MAT_DIALOG_DATA - angular/material/dialog
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



/**
 * Component for displaying a dialog box with specific data.
 * @remarks This component handles the display of a dialog box with detailed information about a specific item.
 */

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatDialogContent,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
  
export class DialogBoxComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string, title: string, bio: string, birthdate: string, description: string, genre: string },
    public dialogRef : MatDialogRef<DialogBoxComponent>
  ) { }

  ngOnInit(): void { }

  closeDailogBox(): void {
    this.dialogRef.close();
  }

  closeGenreDailogBox(): void {
    this.dialogRef.close();
  }

  closeSynopsisDailogBox(): void {
    this.dialogRef.close();
  }
}
