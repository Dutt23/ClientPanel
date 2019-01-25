import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {}

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      map(auth => {
        if (!auth) {
          this.router.navigate(["/login"]);
          return false;
        } else return true;
      })
    );
  }
}
