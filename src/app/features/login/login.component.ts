import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  error!: boolean;
  loginForm!: FormGroup;
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  onFormSubmit() {
    this.error = false;
    this.authenticationService
      .loginUser(this.loginForm.controls.name.value, this.loginForm.controls.password.value)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: boolean) => {
        if (res) {
          this.loginForm.reset();
          this.router.navigate(['map']);
        } else {
          this.loginForm.reset();
          this.error = true;
        }
      });
  }

  get f() {
    return this.loginForm.controls;
  }
}
