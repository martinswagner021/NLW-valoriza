import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {

    const userRepositories = getCustomRepository(UsersRepositories)
    
    // Verificar se o usuario admin
    const { user_id } = req

    const { admin } = await userRepositories.findOne({ id: user_id })

    if(admin) {
        return next()
    }

    return res.status(401).json({
        error: "Unauthorized"
    })
}