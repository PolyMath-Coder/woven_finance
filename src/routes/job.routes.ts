import { Router } from "express";
import { AllUnPaidJobs } from "../controllers/job.controller";
import userAuthentication from "../middleware/getProfile";



const router = Router()

router.get('/unpaid', userAuthentication, AllUnPaidJobs);

router.post('/:job_id/pay')



export default router;