import StatisticsArticleController from "../controllers/statisticsArticleController";
import {Router} from "express";
const statisticsArticles = new StatisticsArticleController()

const router = Router()


router.post('/article/like', statisticsArticles.updateStatisticsLike)
router.post('/article/dislike', statisticsArticles.updateStatisticsDislike)
router.get('/channel/statistics/articles', statisticsArticles.getStatisticsPublication)
router.get('/channel/statistics/auditorium', statisticsArticles.getStatisticsAuditorium)

router.get('/channel/statistics/articles/export',statisticsArticles.exportStatisticsPublication)

export default router