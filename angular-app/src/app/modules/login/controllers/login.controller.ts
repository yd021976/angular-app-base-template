import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
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
        const subs = this.loginService.login(credentials).subscribe((authinfos) => {
            this.afterLogin(authinfos);
            subs.unsubscribe();
        })

    }

    /**
     * Execute logout action and do nothing
     */
    public logout() {
        const s = this.loginService.logout().subscribe((logout) => {
            s.unsubscribe();
        })
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