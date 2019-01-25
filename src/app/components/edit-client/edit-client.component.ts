import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"]
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    id: "",
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    balance: 0
  };
  disableBalanceOnEdit: boolean;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessageService.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessageService.show("Client successfully updated", {
        cssClass: "alert-success",
        timeout: 3000
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
