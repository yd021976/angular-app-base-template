import { UserModel } from "../../user/models/user.model";
import { TAUTHENTICATION_REQUEST, TAUTHENTICATION_TYPE } from "./authentication.types";

export interface AuthenticationErrorModel {
    isError: boolean
    message?: string
    source?: Error
}

export interface LoginCredentialsModel {
    email: string
    password: string
}

export interface AuthenticationServiceModel {
    token: string
    isAuth: boolean
    user?: UserModel
    error: AuthenticationErrorModel
}

export interface AuthenticationServiceResponseModel {
    token: string
    user: UserModel
}