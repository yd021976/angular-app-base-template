import { UserModel } from "./user.model";

export interface LoginCredentialsModel {
    email: string
    password: string
}

export interface LoginServiceModel {
    isError: boolean
    errorMsg?: string
    token: string
    isAuth: boolean
    user?: UserModel
}

export interface LoginServiceResponseModel {
    token: string
    user: UserModel
}