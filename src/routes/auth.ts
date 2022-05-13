import { Router } from "express";
import { SingUp, SingIn, Profile } from "../controllers/auth.controller";
import { tokenValidation } from "../libs/validateToken";

const router: Router = Router();

router.post("/singup", SingUp);
router.post("/singin", SingIn);

router.get("/profile", tokenValidation, Profile);

export default router; 