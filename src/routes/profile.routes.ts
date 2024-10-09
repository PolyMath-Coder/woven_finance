import { Router } from 'express';
import { Create, SeedUsers, Update } from '../controllers/profile.controller';

const router = Router();

router.post('/create', Create);
router.put('/update/:id', Update)

router.post('/seed', SeedUsers)

export default router;