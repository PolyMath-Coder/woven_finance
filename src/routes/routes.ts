import { Router } from 'express';
import profileRoutes from './profile.routes'

const app = Router();

app.use('/contracts', profileRoutes);

export default app;