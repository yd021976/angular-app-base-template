import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/modules/authentication/services/authentication/authentication.service";

@Injectable()
export class UserMenuControllerService {
    constructor(public authService: AuthenticationService, private router: Router) {
        this.authService.authInfos$.subscribe((status) => {

        })
    }

    public logout() {
        this.authService.logout();
    }
}