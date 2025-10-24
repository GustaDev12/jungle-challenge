import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email({ message: "Insira um e-mail válido." }),
    password: z.string({ message: "Insira uma senha válida." }).min(6, { message: "Sua senha precisa ter no minímo 6 caracteres." })
})
