import { Observable } from "rxjs";
import { AuthenticationServiceResponseModel } from "src/app/models/login.model";

/** 
 * types
 */
 export type TAUTHENTICATION_BASE_REQUEST = Observable<AuthenticationServiceResponseModel>
 export type TAUTHENTICATION_TYPE = 'autologin' | 'login' | 'logout';
 
 export type TAUTHENTICATION_REQUEST = {
   type: TAUTHENTICATION_TYPE,
   request: TAUTHENTICATION_BASE_REQUEST,
 }
 
 export type TAUTHENTICATION_CONFIG = {
   server: string,
   login_url: string,
   auto_login_url: string,
   logout_url: string,
   signup_url: string,
 }