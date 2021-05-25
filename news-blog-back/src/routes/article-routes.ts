import {Router} from "express"
import ArticlesController from "../controllers/article-controller";

const router = Router()
const controller = new ArticlesController()
router.get('/article/:id', controller.getArticle)
router.get('/article', controller.getArticles)
//router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )

export default router