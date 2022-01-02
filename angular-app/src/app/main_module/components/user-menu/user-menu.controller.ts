import { Injectable } from "@angular/core";
import { LoginService } from "src/app/services/Login/login.service";

@Injectable()
export class UserMenuController {
    constructor(public loginService: LoginService) {

    }
}