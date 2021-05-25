import { Router } from 'express';

import ArticleRouter from './article-routes'


const router = Router();
// User-route
router.use(ArticleRouter)

// //Auth-route
// router.use(ArticleRouter)
//
// //Color-route
// router.use(ColorRouter)
//
// //Brand-route
// router.use(BrandRouter)

export default router;