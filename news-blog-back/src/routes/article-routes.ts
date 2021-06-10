import {Router} from "express"
import ArticlesController from "../controllers/article-controller";

const router = Router()
const controller = new ArticlesController()
router.get('/', controller.getArticle)
router.get('/top', controller.getArticle)
router.get('/movie', controller.getArticle)
router.get('/travel', controller.getArticle)
router.get('/science', controller.getArticle)
router.get('/corona', controller.getArticle)
router.get('/car', controller.getArticle)
router.get('/articleById', controller.getArticleById)



//router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )

export default router