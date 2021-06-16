"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var channel_controller_1 = __importDefault(require("../controllers/channel-controller"));
var channelController = new channel_controller_1["default"]();
var router = express_1.Router();
router.put('/channel/update', channelController.updateChannelInformation);
router.get('/channel/information', channelController.getInformation);
router.post('/channel/subscribe', channelController.subscribeOnChannel);
router.post('/channel/unsubscribe', channelController.unSubscribeOnChannel);
router.get('/channel/subscribe/check', channelController.checkSubscription);
exports["default"] = router;
