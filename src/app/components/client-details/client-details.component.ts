import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  client: Client;
  id: string;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    });
  }
  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessageService.show("Client Updated", {
      cssClass: "alert-success",
      timeout: 3000
    });
    this.showBalanceUpdateInput = !this.showBalanceUpdateInput;
  }
  onDelete() {
    if (confirm("Are you sure ?")) {
      this.clientService.deleteClient(this.client);
      this.flashMessageService.show("Client Removed", {
        cssClass: "alert-success",
        timeout: 3000
      });
      this.router.navigate(["/"]);
    }
  }
}
