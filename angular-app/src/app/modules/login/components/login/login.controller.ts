import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/Login/login.service";


@Injectable()
export class LoginController {
    constructor(public loginService: LoginService, router: Router) {
        this.loginService.isError.subscribe((value) => {
            switch (value) {
                case true:
                    break;
                case false:
                    break;
            }
        })
    }

    /**
     * 
     */
    login() {
        this.loginService.login()
    }
}