import { UserModel } from "./user.model";

export interface UserLoginModel extends UserModel {
    password: string
}

export interface LoginServiceModel {
    isError: boolean
    errorMsg: string
}