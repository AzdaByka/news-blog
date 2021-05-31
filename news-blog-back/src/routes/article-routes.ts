import {Router} from "express"
import ArticlesController from "../controllers/article-controller";

const router = Router()
const controller = new ArticlesController()
router.get('/article', controller.getArticle)
//router.get('/articles', controller.getArticles)



//router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )

export default router