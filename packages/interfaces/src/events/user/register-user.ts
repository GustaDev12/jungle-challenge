import { IUserHttpResponse } from "src/users"

export interface IEventsRegisterUser {
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    },
    user: IUserHttpResponse
}
