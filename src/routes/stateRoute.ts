import  {Router} from "express"
import { getStates, getStateById, deleteStateById, updateStateById, createState } from "../controller/StateController"

const router = Router()
router.get('/states', getStates)
router.get('/states/:id', getStateById)
router.delete('/states/:id', deleteStateById)
router.put('/states/:id', updateStateById)
router.post('/states', createState)
export default router