import { Router } from "express";
import userAuthentication from "../middleware/getProfile";
import { CreateContract, RetrieveContract, RetrieveContracts } from "../controllers/contract.controller";
import { Create } from "../controllers/profile.controller";
import { viewContractAuthorization } from "../middleware/contractAuth";


const router = Router()

router.post('/create', userAuthentication, CreateContract);

router.get('/',
    userAuthentication,
    RetrieveContracts
)
router.get(
    '/:id', 
    userAuthentication, 
    viewContractAuthorization,
    RetrieveContract
);



export default router;