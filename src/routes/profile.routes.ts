import { Router } from 'express';
import { Create, Update } from '../controllers/profile.controller';

const router = Router();

router.post('/create', Create);
router.put('/update/:id', Update)

export default router;