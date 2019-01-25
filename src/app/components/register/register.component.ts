import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService
      .register(this.email, this.password)
      .then(res => {
        this.flashMessagesService.show(
          `${this.email} user created in and logged in successfully`,
          {
            cssClass: "alert-success",
            timeout: 3000
          }
        );
        this.router.navigate(["/"]);
      })
      .catch(err => {
        this.flashMessagesService.show(err.message, {
          cssClass: "alert-danger",
          timeout: 3000
        });
      });
  }
}
