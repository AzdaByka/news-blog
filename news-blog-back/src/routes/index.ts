import { Router } from 'express';

import ArticleRouter from './article-routes'
import AuthRouter from "./auth-routes"
import StatisticRouter from './statistic-routes'


const router = Router();
// User-route
router.use(ArticleRouter)

//Auth-route
router.use(AuthRouter)
router.use(StatisticRouter)
//
// //Color-route
// router.use(ColorRouter)
//
// //Brand-route
// router.use(BrandRouter)

export default router;