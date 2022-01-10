import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoginCredentialsModel, AuthenticationServiceResponseModel } from "src/app/modules/authentication/models/authentication.model";
import { TAUTHENTICATION_CONFIG, TAUTHENTICATION_BASE_REQUEST, TAUTHENTICATION_TYPE, TAUTHENTICATION_REQUEST } from "../../models/authentication.types";

export class AuthenticationRequestUtils {

    /**
     * 
     * @param config 
     * @param httpClient 
     */
    constructor(private config: TAUTHENTICATION_CONFIG, private httpClient: HttpClient) { }


    /**
     * 
     * 
     * @returns
     * @throws An `Observable` of type `never`
     */
    public prepareAutologinRequest(): TAUTHENTICATION_REQUEST {
        const token = localStorage.getItem('token');
        const method: string = 'GET';
        const url: string = this.buildURL(this.config.auto_login_url);
        const headers: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        const request: Observable<AuthenticationServiceResponseModel> = this.httpClient.request<AuthenticationServiceResponseModel>(method, url, {
            headers: headers
        });

        /** Observable throwable error if token is empty (avoid API request)  */
        const errorResponseRequest = throwError(() => {
            return new Error('autologin failed');
        });

        /** return the request */
        const req = token ? request : errorResponseRequest;
        return {
            type: 'autologin',
            request: req
        }
    }


    /**
    * Construct request and parameters for login request.
    * 
    * @param credentials The user login/password to login
    * @returns An `observable` of type `LoginServiceResponseModel`
    */
    public prepareLoginRequest(credentials: LoginCredentialsModel): TAUTHENTICATION_REQUEST {
        const method: string = 'POST';
        const url: string = this.buildURL(this.config.login_url);
        const logintype: TAUTHENTICATION_TYPE = 'login'
        const req: TAUTHENTICATION_BASE_REQUEST = this.httpClient.request<AuthenticationServiceResponseModel>(method, url, { body: credentials });

        /** Return the observable httpclient request to execute */
        return {
            type: logintype,
            request: req,
        }
    }

    /**
     * 
     * @returns 
     */
    public prepareLogoutRequest(): TAUTHENTICATION_REQUEST {
        let req: TAUTHENTICATION_BASE_REQUEST;
        const method = 'POST';
        const url = this.buildURL(this.config.logout_url);

        const token = localStorage.getItem('token');
        const httpheaders: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${token}`);

        /** if no token is available, just throw an Observable error */
        if (!token) {
            req = throwError(() => { });
        }
        else {
            req = this.httpClient.request<AuthenticationServiceResponseModel>(method, url, { headers: httpheaders });
        }

        return <TAUTHENTICATION_REQUEST>{
            type: 'logout',
            request: req,
        };
    }


    /**
     * 
     * @param credentials 
     */
    public prepareSignupRequest(credentials: LoginCredentialsModel): TAUTHENTICATION_REQUEST {
        const url = this.buildURL(this.config.signup_url);
        const method = 'POST';
        const params = { body: credentials }
        const request = this.httpClient.request<AuthenticationServiceResponseModel>(method, url, params);
        return {
            type: 'signup',
            request: request
        }
    }


    /**
     * 
     * @param url 
     * @returns 
     */
    private buildURL(url: string) {
        return this.config.server + url;
    }
}