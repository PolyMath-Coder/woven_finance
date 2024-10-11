import { Router } from 'express';
import profileRoutes from './profile.routes'
import contractRoutes from './contract.routes'
import jobRoutes from './job.routes';

const app = Router();

app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);

export default app;