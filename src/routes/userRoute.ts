import { Router } from 'express'
import { getUsers, getUserById, deleteUserById, updateUserById, createNewUser } from '../controller/UserController'
const router = Router();

router.get('/users', getUsers)

router.get('/users/:id', getUserById)

router.delete('/users/:id', deleteUserById)

router.put('/users/:id', updateUserById)

router.post('/users', createNewUser)

export default router