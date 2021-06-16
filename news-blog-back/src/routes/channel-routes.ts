import {Router} from "express"
import ArticlesController from "../controllers/article-controller";

import StatisticsArticleController from "../controllers/statisticsArticleController";
import ChannelController from "../controllers/channel-controller";
const channelController = new ChannelController()


const router = Router()

router.put('/channel/update',channelController.updateChannelInformation)
router.get('/channel/information',channelController.getInformation)


router.post('/channel/subscribe',channelController.subscribeOnChannel)
router.post('/channel/unsubscribe',channelController.unSubscribeOnChannel)
router.get('/channel/subscribe/check',channelController.checkSubscription)

export default router