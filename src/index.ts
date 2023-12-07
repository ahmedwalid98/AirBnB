import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from "./data-source"
import userRoute from './routes/userRoute';
import stateRoute from './routes/stateRoute'
import cityRoute from './routes/cityRoute'
import amenityRouter from './routes/amenityRoute'

const app = express();

app.use(express.json());
app.use('/api', userRoute)
app.use('/api', stateRoute)
app.use('/api', cityRoute)
app.use('/api', amenityRouter)
AppDataSource.initialize().then(async () => {

    app.listen(8080, () => console.log('running on port 8080'))
}).catch(error => console.log(error))