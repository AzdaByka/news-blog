"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var article_controller_1 = __importDefault(require("../controllers/article-controller"));
var router = express_1.Router();
var controller = new article_controller_1["default"]();
router.get('/', controller.getArticle);
router.get('/top', controller.getArticle);
router.get('/movie', controller.getArticle);
router.get('/travel', controller.getArticle);
router.get('/science', controller.getArticle);
router.get('/corona', controller.getArticle);
router.get('/car', controller.getArticle);
//router.get('/articles', controller.getArticles)
//router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )
exports["default"] = router;
