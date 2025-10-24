import { z } from 'zod'

export const commentSchema = z.object({
    comment: z.string({ message: 'Insira um comentário válido.' }).min(10, { message: "O comentário precisa ter no minímo 10 caracteres." })
})