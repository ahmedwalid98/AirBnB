import {Router} from "express"
import { 
    getAmenities, 
    getAmenityById,
    deleteAmenityById,
    createAmenity,
    updateAmenityById
} from "../controller/AmenityController"

const router = Router();

router.get('/amenities', getAmenities)
router.get('/amenities/:id', getAmenityById)
router.delete('/amenities/:id', deleteAmenityById)
router.post('/amenities', createAmenity)
router.put('/amenities/:id', updateAmenityById)

export default router