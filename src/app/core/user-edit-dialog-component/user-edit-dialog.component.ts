import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Component({
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent implements OnInit {
  userNameForm!: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) {}

  ngOnInit(): void {
    this.userNameForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4)]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSaveClick(): void {
    this.error = '';
    this.loading = true;
    this.authenticationService.changeUserName(this.userNameForm.controls.name.value);
    this.loading = false;
    this.dialogRef.close(true);
  }

  get f() {
    return this.userNameForm.controls;
  }
}
