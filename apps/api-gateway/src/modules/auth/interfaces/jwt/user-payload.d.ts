export interface UserPayLoad {
    sub: string
    email: string
    type: 'refresh' | 'access'
    iat: number 
    exp: number
}