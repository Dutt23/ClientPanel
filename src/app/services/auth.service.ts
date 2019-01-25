import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

import { Observable } from "rxjs";
import { LoginComponent } from "../components/login/login.component";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  getAuth() {
    return this.angularFireAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
