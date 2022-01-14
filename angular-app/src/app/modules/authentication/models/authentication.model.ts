import { UserModel } from "../../user/models/user.model";

export interface AuthenticationErrorModel {
    isError: boolean
    message?: string
    source?: Error
}

export interface credentialsModel {
    email: string
    password: string
    nickname?:string // Optionnal, use for signup
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