import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(AuthActions.trySignin({username: email, password: password}));
  }
}
