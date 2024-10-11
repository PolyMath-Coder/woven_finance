import { Router } from 'express';
import profileRoutes from './profile.routes'
import contractRoutes from './contract.routes'
import jobRoutes from './job.routes';
import { MakeDeposit } from '../controllers/job.controller';
import userAuthentication from '../middleware/getProfile';


const app = Router();

app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/users', profileRoutes);
app.post('/balances/deposit/:userId', userAuthentication, MakeDeposit,)

export default app;