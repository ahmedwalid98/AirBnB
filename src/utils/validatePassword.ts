import bcrypt from 'bcrypt'

export async function hashPassword(password:string): Promise<String> {
    return bcrypt.hash(password, 10)
}