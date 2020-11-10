import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';


const routers = Router();

routers.use('/appointments', appointmentsRouter);
routers.use('/users', usersRouter);

export default routers;

