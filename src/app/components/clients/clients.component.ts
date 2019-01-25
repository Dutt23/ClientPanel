import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil, map } from "rxjs/operators";
@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router
  ) {}
  clients: Client[];
  totalOwed: number;
  ngUnsubscribe: Subject<void> = new Subject();

  ngOnInit() {
    this.authService
      .getAuth()

      .subscribe(auth => {
        if (auth) {
          this.clientService
            .getClients()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(clients => {
              this.clients = clients;
              this.totalOwed = this.getTotalOwed();
            });
        }
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTotalOwed(): number {
    const total = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
    return total;
  }
}
