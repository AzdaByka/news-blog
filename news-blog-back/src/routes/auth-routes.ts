import {Router} from "express"
import AuthController from "../controllers/auth-controller";
import CheckJwtMiddleware from "../middleware/checkJwt";
import UserController from "../controllers/user-controller";

const router = Router()
const controller = new AuthController()
const userController = new UserController()
router.post('/signin', controller.login)
router.post('/signup', userController.createUser)
router.get("/user",  controller.me);
export default router