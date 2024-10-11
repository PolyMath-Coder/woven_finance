import { Router } from 'express';
import { Create, SeedUsers, Update } from '../controllers/profile.controller';
import userAuthentication from '../middleware/getProfile';

const router = Router();

router.post('/create', userAuthentication, Create);
router.put('/update/:id', Update)

router.post('/seed', SeedUsers)

export default router;