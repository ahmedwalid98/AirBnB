import { City } from "../entities/City";
import { State } from "../entities/State";
import { AppDataSource } from "../data-source";
import { Request, Response }from "express"

export const getCitiesOfState = async (req: Request, res: Response) => {
    const {id} = req.params
    const state = await AppDataSource.getRepository(State)
        .findOne({
            relations: {
                citites: true
            },
            where: {
                id: id
            }
        })
    if (!state) return res.status(404).json({"msg": 'not found'})
    return res.status(200).json(state.citites)
}

export const getCityById = async (req: Request, res: Response) => {
    const {id} = req.params
    const city = await AppDataSource.getRepository(City)
        .findOneBy({
            id
        })
    if (!city) return res.status(404).json({"msg": 'not found'})
    return res.status(200).json(city)
}

export const removeCityById = async (req: Request, res: Response) => {
    const { id } = req.params
    await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(City)
        .where("id = :id", { id })
        .execute()
        .then( _ => res.status(200).json({'msg': 'deleted'}))
        .catch(error => res.status(400).json(error))
}

export const createCity = async (req: Request, res: Request) => {
    const {id} = req.params
    const { name } = req.body

    const state = await State.findOneBy({
        id
    })

    if (!state) return res.status(404).json({"msg": "Not found"})

    const city = new City()
    city.name = name
    city.state = state
    city.save()
        .then((city) => res.status(201).json(city))
        .catch((error) => res.status(500).json({ error: 'An error occurred while updating the record.' }))
}

export const updateCity = (req: Request, res: Response) => {
    const { name } = req.body;
    const updateQuery = AppDataSource
    .createQueryBuilder()
    .update(City)

    if (name !== undefined) updateQuery.set({name});
    updateQuery
    .where("id = :id", {id: req.params.id})
    .execute()
        .then(async _ => {
            const city = await City.findOneBy({
                id: req.params.id
            })
            res.status(200).json(city)
        })
        .catch((error) => res.status(500).json({ error: 'An error occurred while updating the record.' }))
}