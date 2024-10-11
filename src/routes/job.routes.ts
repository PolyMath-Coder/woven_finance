import { Router } from "express";
import { AllUnPaidJobs, PayForJob } from "../controllers/job.controller";
import userAuthentication from "../middleware/getProfile";



const router = Router()

router.get('/unpaid', userAuthentication, AllUnPaidJobs);

router.post('/:job_id/pay', userAuthentication, PayForJob);



export default router;