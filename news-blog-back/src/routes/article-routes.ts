import {Router} from "express"
import ArticlesController from "../controllers/article-controller";
import RubricController from "../controllers/rubric-controller";

const router = Router()
const articlesController = new ArticlesController()
const rubricController=new RubricController()


router.get('/', articlesController.getArticle)
router.get('/top', rubricController.top)
router.get('/movie', rubricController.movie)
router.get('/travel', rubricController.travel)
router.get('/science', rubricController.science)
router.get('/corona', rubricController.corona)
router.get('/car', rubricController.car)


router.get('/editor',articlesController.getEditor)


router.post('/articleAdd', articlesController.addArticle)
router.delete('/article', articlesController.addArticle)


router.get('/articleById', articlesController.getArticleById)



//router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )

export default router