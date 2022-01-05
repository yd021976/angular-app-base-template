import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginCredentialsModel, LoginServiceModel } from "src/app/models/login.model";
import { LoginService } from "src/app/services/Login/login.service";


@Injectable()
export class LoginController {
    constructor(public loginService: LoginService, protected router: Router) {
    }

    /**
     * 
     */
    login(credentials: LoginCredentialsModel) {
        const s = this.loginService.login(credentials).subscribe((authentication) => {
            this.afterLogin(authentication);
        })
        s.unsubscribe();
    }
    public logout() {
        this.loginService.logout();
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