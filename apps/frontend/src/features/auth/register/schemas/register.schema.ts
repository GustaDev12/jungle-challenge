import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({ message: "Insira um nome de usuário valiado!" }).min(3, { message: "Seu nome de usuário deve ter no minímo 3 caracteres!" }),
    email: z.email({ message: "Insira um e-mail válido!" }),
    password: z.string({ message: "Insira uma senha válida!" }).min(6, { message: "Sua senha deve ter no minímo 6 caracteres!" })
})