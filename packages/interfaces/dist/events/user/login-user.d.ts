import { IUserHttpResponse } from "../../users/user";
export interface IEventsLoginUser {
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
    user: IUserHttpResponse;
}
//# sourceMappingURL=login-user.d.ts.map