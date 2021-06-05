import {Router} from "express"
import AuthController from "../controllers/auth-controller";
import CheckJwtMiddleware from "../middleware/checkJwt";

const router = Router()
const controller = new AuthController()
router.post('/signin', controller.login)
router.post("/user", [CheckJwtMiddleware.checkJwt], controller.me);
export default router