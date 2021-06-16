import { Router } from 'express';

import ArticleRouter from './article-routes'
import AuthRouter from "./auth-routes"
import StatisticRouter from './statistic-routes'
import UserRouter from './user-routes'
import ChannelRouter from './channel-routes'


const router = Router();
// User-route
router.use(ArticleRouter)

//Auth-route
router.use(AuthRouter)
router.use(StatisticRouter)
router.use(UserRouter)
router.use(ChannelRouter)
//
// //Color-route
// router.use(ColorRouter)
//
// //Brand-route
// router.use(BrandRouter)

export default router;