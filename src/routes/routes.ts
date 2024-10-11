import { Router } from 'express';
import profileRoutes from './profile.routes'
import contractRoutes from './contract.routes'

const app = Router();

app.use('/contracts', contractRoutes);

export default app;