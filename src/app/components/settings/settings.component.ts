import { Component, OnInit } from "@angular/core";
import { Settings } from "../../models/Settings";
import { SettingsService } from "../../services/settings.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  };

  constructor(
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }
  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessageService.show("Chnaged settings", {
      cssClass: "alert-success",
      timeout: 3000
    });
  }
}
