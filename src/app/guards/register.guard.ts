import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SettingsService } from "../services/settings.service";
import { FlashMessagesService } from "angular2-flash-messages";
@Injectable({
  providedIn: "root"
})
export class RegisterGuard implements CanActivate {
  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private flashMessagesService: FlashMessagesService
  ) {}

  canActivate(): boolean {
    if (this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.flashMessagesService.show("Registration disabled contact admin", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
