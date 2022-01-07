import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginCredentialsModel, AuthenticationServiceModel } from "src/app/models/login.model";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";


@Injectable()
export class AuthenticationController {
    constructor(public authService: AuthenticationService, protected router: Router) {
    }

    /**
     * 
     */
    public login(credentials: LoginCredentialsModel) {
        const subs = this.authService.login(credentials).subscribe((authinfos) => {
            this.afterLogin(authinfos);
            subs.unsubscribe();
        })
    }

    /**
     * Execute logout action and do nothing
     */
    public logout() {
        const s = this.authService.logout().subscribe((logout) => {
            s.unsubscribe();
        })
    }

    public signup(credentials: LoginCredentialsModel) {
        const s = this.authService.signup(credentials);
    }


    /**
     * Redirect to home once login is true
     * 
     * @param loginServiceInfos 
     */
    protected afterLogin(loginServiceInfos: AuthenticationServiceModel) {
        if (loginServiceInfos.isAuth === true) {
            this.router.navigate(['/']);
        }
    }
}