import { LoginUserDTO, RegisterUserDto } from '@repo/dto'
import type { IEventsLoginUser, IEventsRegisterUser } from '@repo/interfaces/events'

import api from '../../../api/client'

export const authServices = {
    login: async (data: LoginUserDTO) => {
        const response = await api.post<IEventsLoginUser>('/auth/login', data)
        return response.data
    },

    register: async (data: RegisterUserDto) => {
        const response = await api.post<IEventsRegisterUser>('/auth/register', data)
        return response.data
    }
}