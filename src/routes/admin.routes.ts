import { Router } from "express";
import { BestClientMetrics } from "../controllers/admin.controller";


const router = Router()
router.post('/best-clients', BestClientMetrics);

export default router;