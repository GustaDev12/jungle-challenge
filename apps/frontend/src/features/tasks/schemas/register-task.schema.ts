import { PriorityEnum, StatusEnum } from '@repo/dto'
import { z } from 'zod'

export const registerTask = z.object({
    title: z.string({ message: "Insira um texto válido." }).min(4, { message: "O titulo deve conter no minimo 4 caracteres." }),
    description: z.string({ message: "Insira uma descrição válida." }).min(6, { message: "A descrição deve conter no minimo 6 caracteres." }),
    prazo: z.date(),
    priority: z.enum(PriorityEnum),
    status: z.enum(StatusEnum)
})
