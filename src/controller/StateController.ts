import {Request, Response} from "express"
import { State } from "../entities/State"
import { AppDataSource } from "../data-source"
import { error } from "console"

export const getStates = async (req: Request, res: Response) => {
    try {
        const states = await AppDataSource.manager.find(State)
        return res.status(200).json(states)
    } catch(error) {
        res.status(400).json({error})
    }
}

export const getStateById = async (req: Request, res: Response) => {
    try {
        const state = await AppDataSource.getRepository(State)
        .find({
            where: {
                id: req.params.id
            }
        })
        if (!state) return res.status(404).json({'msg': 'not found'})
        return res.status(200).json(state)
    } catch (error) {
        res.status(400).json({error})
    }
}

export const deleteStateById = async (req: Request, res: Response) => {
    try {
        await AppDataSource.manager
            .createQueryBuilder()
            .delete()
            .from(State)
            .where("id = :id", {id: req.params.id})
            .execute()

            res.status(200).json({'msg': 'Deleted'})
    } catch (error) {
        res.status(404).json({error})
    }
}

export const updateStateById = async (req: Request, res: Response) => {
    const updateState = await AppDataSource
        .createQueryBuilder()
        .update(State)
    
    const { name } = req.body
    if (name !== undefined) updateState.set({name})
    updateState
    .where("id = :id", {id: req.params.id})
    .execute()
    .then(async () => {
        const state = await State.findOneBy({
            id: req.params.id
        })
        res.status(200).json(state)
    }).catch((error) => {
        res.status(500).json({ error: 'An error occurred while updating the record.' })
    })

}

export const createState =async (req: Request, res: Response) => {
    const state = new State()
    const { name } = req.body
    state.name  = name
    await state.save().then((state) => res.status(201).json(state))
    .catch((error) => {
        res.status(500).json({ error: 'An error occurred while updating the record.' })
    })
}