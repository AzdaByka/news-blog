import {Router} from "express"
import AuthController from "../controllers/auth-controller";

const router = Router()
const controller = new AuthController()
router.post('/signin', controller.login)
router.get("/user",  controller.me);
export default router