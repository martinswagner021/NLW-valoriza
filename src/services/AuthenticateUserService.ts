import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string,
    password: string,
}

export class AuthenticateUserService {
    async execute({ email, password } : IAuthenticateRequest) {
        
        const usersRepositories = getCustomRepository(UsersRepositories)


        const user = await usersRepositories.findOne({
            email
        })

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email
        }, "4add635c15d59ffee8eadbdf0ae62baa", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}