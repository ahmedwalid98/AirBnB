import {Request, Response} from 'express'
import { User } from '../entities/User'
import { AppDataSource } from '../data-source'
import {createUserSchema} from '../utils/schema'
import { hashPassword } from '../utils/validatePassword'

export const getUsers = async (req: Request, res: Response) => {
    const users = await AppDataSource.manager.find(User)
    res.status(200).json(users)
}

export const getUserById = async (req: Request, res: Response) => {
    // const user = await User.findOneBy({
    //     id: req.params.id
    // })

    const user = await AppDataSource.manager
        .createQueryBuilder(User, "user")
        .where("user.id = :id", {id: req.params.id})
        .getOne()

    if (!user) {
        res.send("user doesnt exist")
    }else {
        res.status(200).json(user)
    }
    
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", {id: req.params.id})
        .execute()
        // const user = await User.findOneBy({
        //     id: req.params.id
        // })
        // await User.remove(user)

        res.status(200).send("Deleted")
    } catch (error ){
        res.status(404).send(error)
    }
}
export const updateUserById = async (req: Request, res: Response) =>{
    console.log(req.params.id)
    console.log(req.body)
    const user = await User.findOneBy({
        id: req.params.id
    })
    console.log(user)
    const {first_name, last_name, email, password} = req.body
    const updateQuery =await AppDataSource
        .createQueryBuilder()
        .update(User)

    if (first_name !== undefined) updateQuery.set({first_name: first_name})

    if (last_name !== undefined) updateQuery.set({last_name: last_name})

    if (email !== undefined) updateQuery.set({email: email})

    if (password !== undefined) updateQuery.set({password: password})

    updateQuery
    .where("id = :id", {id: req.params.id})
    .execute()
    .then(async (updated) => {
        const user = await User.findOneBy({
            id: req.params.id
        })
        res.status(200).json(user)
    })
    .catch((error) => {
        res.status(500).json({ error: 'An error occurred while updating the record.' })
    })
}

export const createNewUser = async (req: Request, res: Response) => {
    const { error } = createUserSchema.validate(req.body)
    if (error) {
        return res.status(400).json({error: error.details})
    }
    // const user = new User()
    // user.first_name = req.body.first_name;
    // user.last_name = req.body.last_name;
    // user.email = req.body.email;
    // user.password = req.body.password;
    // await user.save()
    // .then((user) => res.status(200).json(user))

    let {first_name, last_name, email, password} = req.body
    password = await hashPassword(password)
    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
            first_name,
            last_name,
            email,
            password
        })
        .execute()
        .then(async (value) => {
            const id = value.identifiers[0].id
            const user = await User.findOneBy({
                id: id
            })
            return res.status(200).json(user)
        })
        .catch((error) =>  res.json({"error": error}))
    
}