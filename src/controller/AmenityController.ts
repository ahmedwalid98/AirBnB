import { Amenity } from "../entities/Amenity";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";


export const getAmenities = (req: Request, res: Response) => {
    const amenities = AppDataSource.manager.find(Amenity);

    amenities.then((amenities) => {
        res.status(200).json(amenities)
    }).catch((error) =>{
        res.status(500).json({"msg": "an error occurd"})
    })
}

export const getAmenityById = async (req: Request, res: Response) => {
    try {
        const amenity = await Amenity.findOneBy({
            id: req.params.id
        })
        if (!amenity) return res.status(404).json({"msg": "not found"})
        res.status(200).json(amenity)
    } catch (error) {
        res.status(500).json({"msg": "an error occurd"})
    }
}

export const deleteAmenityById = (req: Request, res: Response) => {
    AppDataSource
    .createQueryBuilder()
    .delete()
    .from(Amenity)
    .where("id = :id", {id: req.params.id})
    .execute()
    .then(() => res.status(200).json({"msg": 'deleted'}))
    .catch((error) => res.status(500).json({'msg': error}))
}

export const createAmenity = (req: Request, res: Response) => {
    const { name } = req.body
    const amenity = new Amenity()
    amenity.name = name;
    amenity.save()
    .then((amenity) => res.status(200).json(amenity))
    .catch((error) => res.status(500).json({"msg": error}))
}

export const updateAmenityById = (req: Request, res: Response) => {
    const {name} = req.body
    const updateAmenity = AppDataSource
    .createQueryBuilder()
    .update(Amenity)

    if (name !== undefined) updateAmenity.set({name})

    updateAmenity
    .where("id = :id", {id: req.params.id})
    .execute()
    .then( _ => {
        Amenity.findOneBy({
            id: req.params.id
        }).then((amenity) => res.status(200).json(amenity))
    }).catch((error) => {
        res.status(500).json({"msg": error})
    })
}