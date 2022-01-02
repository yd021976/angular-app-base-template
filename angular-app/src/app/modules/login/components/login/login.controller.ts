import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "primeng/api";
import { LoginCredentialsModel, LoginServiceModel } from "src/app/models/login.model";
import { LoginService } from "src/app/services/Login/login.service";


@Injectable()
export class LoginController {
    constructor(public loginService: LoginService, protected router: Router) {
        /** Handle login service events change */
        this.loginService.authInfos.subscribe((loginserviceinfos) => {
            this.afterLogin(loginserviceinfos);
        })
    }

    /**
     * 
     */
    login(credentials: LoginCredentialsModel) {
        this.loginService.login(credentials)
    }

    /**
     * Redirect to home once login is true
     * @param loginServiceInfos 
     */
    protected afterLogin(loginServiceInfos: LoginServiceModel) {
        if (loginServiceInfos.isAuth === true) {
            this.router.navigate(['/']);
        }
    }
}