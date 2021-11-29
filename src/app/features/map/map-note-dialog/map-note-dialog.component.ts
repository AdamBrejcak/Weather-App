import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CitiesNotesService } from 'src/app/core/cities-notes-service/cities-notes.service';
import { City } from 'src/app/shared/city/city';

@Component({
  selector: 'map-note-dialog',
  templateUrl: 'map-note-dialog.component.html',
  styleUrls: ['./map-note-dialog.component.scss'],
})
export class MapNoteDialogComponent implements OnInit {
  cityNoteForm!: FormGroup;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MapNoteDialogComponent>,
    private formBuilder: FormBuilder,
    private citiesNotesService: CitiesNotesService,
    @Inject(MAT_DIALOG_DATA) public city: City
  ) {}

  ngOnInit(): void {
    this.cityNoteForm = this.formBuilder.group({
      note: this.city.note,
    });
  }

  onCancelClick(): void {
    this.dialogRef.close({ save: false, value: '' });
  }

  onSaveClick(): void {
    this.loading = true;
    this.citiesNotesService.changeCityNote(this.city.code, this.cityNoteForm.controls.note.value);
    this.dialogRef.close({
      save: true,
      newValue: this.citiesNotesService.getCityNote(this.city.code),
    });
    this.loading = false;
  }
}