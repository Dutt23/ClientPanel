import { Component, OnInit, ViewChild } from "@angular/core";
import { Client } from "../../models/Client";
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";
@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    balance: 0
  };
  @ViewChild("clientForm") form: any;
  disableBalanceOnAdd: boolean;
  constructor(
    private flashMessageService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      // Show error
      this.flashMessageService.show("Please fill out the form completely", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      // Add new client
      this.clientService.addNewClient(value);
      // Show message
      this.flashMessageService.show("New client added", {
        cssClass: "alert-success",
        timeout: 3000
      });
      this.router.navigate(["/"]);
    }
  }
}
