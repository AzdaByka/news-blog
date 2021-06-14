import StatisticsArticleController from "../controllers/statisticsArticleController";
import {Router} from "express";
const statisticsArticles = new StatisticsArticleController()

const router = Router()


router.post('/article/like', statisticsArticles.updateStatisticsLike)
router.post('/article/dislike', statisticsArticles.updateStatisticsDislike)

export default router