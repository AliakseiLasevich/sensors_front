import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authFacade: AuthStoreFacade
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  initializeValues() {
    this.authFacade.error.subscribe((error) => {
      if (error) {
        this._snackBar.open(error, 'OK', { duration: 2 * 1000 });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authFacade.login(this.form.value);
    }
  }
}
