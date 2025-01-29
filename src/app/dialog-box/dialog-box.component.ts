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
