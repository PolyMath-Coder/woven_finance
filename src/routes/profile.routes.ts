import { Router } from 'express';
import { SeedUsers } from '../controllers/profile.controller';
import userAuthentication from '../middleware/getProfile';

const router = Router();

router.post('/seed', SeedUsers)

export default router;