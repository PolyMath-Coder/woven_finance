import { Router } from 'express';
import userRoutes from './user.routes'

const app = Router();

app.use('/contracts', userRoutes);

export default app;