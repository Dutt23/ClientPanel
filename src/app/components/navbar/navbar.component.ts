import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { SettingsService } from "../../services/settings.service";
import { Client } from "../../models/Client";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogOutClick() {
    this.authService.logout();
    this.flashMessageService.show("User has been logged out", {
      cssClass: "alert-success",
      timeout: 3000
    });
    this.router.navigate(["/login"]);
    this.isLoggedIn = false;
  }
}
