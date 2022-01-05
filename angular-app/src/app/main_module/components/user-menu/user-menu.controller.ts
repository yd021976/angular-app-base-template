import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginServiceModel } from "src/app/models/login.model";
import { LoginService } from "src/app/services/Login/login.service";

@Injectable()
export class UserMenuController {
    constructor(public loginService: LoginService, private router: Router) {
        this.loginService.authInfos$.subscribe((status) => {

        })
    }

    public logout() {
        this.loginService.logout();
    }
}