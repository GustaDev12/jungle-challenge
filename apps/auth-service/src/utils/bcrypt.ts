import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 11

export async function hashPassword(password: string) {
    return await hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, passwordHash: string) {
    return await compare(password, passwordHash)
}