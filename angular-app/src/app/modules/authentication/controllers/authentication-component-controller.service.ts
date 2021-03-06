import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { credentialsModel, AuthenticationServiceModel } from "src/app/modules/authentication/models/authentication.model";
import { AuthenticationService } from "src/app/modules/authentication/services/authentication/authentication.service";


@Injectable()
export class AuthenticationComponentController {
    constructor(public authService: AuthenticationService, protected router: Router) {
    }

    clearErrors(){
        this.authService.clearCurrentErrors()
    }
    /**
     * 
     */
    public login(credentials: credentialsModel) {
        const sub = this.authService.login(credentials).subscribe((auth) => {
            this.afterLoginOrSignup(auth);
            sub.unsubscribe();
        });
    }

    /**
     * Execute logout action and do nothing
     */
    public logout() {
        const sub = this.authService.logout().subscribe((logout) => {
            sub.unsubscribe();
        })
    }

    /**
     * 
     * @param credentials 
     */
    public signup(credentials: credentialsModel) {
        const sub = this.authService.signup(credentials).subscribe((auth) => {
            this.afterLoginOrSignup(auth);
            sub.unsubscribe();
        });
    }


    /**
     * Redirect to home once login is true
     * 
     * @param loginServiceInfos 
     */
    protected afterLoginOrSignup(loginServiceInfos: AuthenticationServiceModel) {
        if (loginServiceInfos.isAuth === true) {
            this.router.navigate(['/']);
        }
    }
}