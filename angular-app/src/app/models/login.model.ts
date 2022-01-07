import { UserModel } from "./user.model";

export interface LoginCredentialsModel {
    email: string
    password: string
}

export interface AuthenticationServiceModel {
    isError: boolean
    errorMsg?: string
    token: string
    isAuth: boolean
    user?: UserModel
}

export interface AuthenticationServiceResponseModel {
    token: string
    user: UserModel
}