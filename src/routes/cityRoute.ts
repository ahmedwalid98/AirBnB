import {Router} from "express"
import { getCitiesOfState, getCityById, removeCityById, createCity, updateCity } from "../controller/CityController"
const router = Router();
router.get('/states/:id/cities', getCitiesOfState);
router.post('/states/:id/cities', createCity);
router.get('/cities/:id', getCityById)
router.delete('/cities/:id', removeCityById)
router.put('/cities/:id', updateCity)

export default router