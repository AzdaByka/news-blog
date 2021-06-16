import {Router} from "express"
import ArticlesController from "../controllers/article-controller";

import StatisticsArticleController from "../controllers/statisticsArticleController";
import UserController from "../controllers/user-controller";
const userController = new UserController()


const router = Router()

router.post('/signup', userController.createUser)
router.put('/user/update',userController.updateInformation)
router.get('/user/information',userController.getInformation)

export default router