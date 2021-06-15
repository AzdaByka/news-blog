"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var statisticsArticleController_1 = __importDefault(require("../controllers/statisticsArticleController"));
var express_1 = require("express");
var statisticsArticles = new statisticsArticleController_1["default"]();
var router = express_1.Router();
router.post('/article/like', statisticsArticles.updateStatisticsLike);
router.post('/article/dislike', statisticsArticles.updateStatisticsDislike);
router.get('/channel/statistics/articles', statisticsArticles.getStatisticsPublication);
router.get('/channel/statistics/auditorium', statisticsArticles.getStatisticsAuditorium);
router.get('/channel/statistics/articles/export', statisticsArticles.exportStatisticsPublication);
exports["default"] = router;
