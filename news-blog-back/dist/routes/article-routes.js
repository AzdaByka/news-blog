"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var article_controller_1 = __importDefault(require("../controllers/article-controller"));
var rubric_controller_1 = __importDefault(require("../controllers/rubric-controller"));
var router = express_1.Router();
var articlesController = new article_controller_1["default"]();
var rubricController = new rubric_controller_1["default"]();
router.get('/', articlesController.getArticle);
router.get('/top', rubricController.top);
router.get('/movie', rubricController.movie);
router.get('/travel', rubricController.travel);
router.get('/science', rubricController.science);
router.get('/corona', rubricController.corona);
router.get('/car', rubricController.car);
router.get('/editor', articlesController.getEditor);
router.post('/articleAdd', articlesController.addArticle);
router.put('/article/update', articlesController.putArticle);
router["delete"]('/article/delete', articlesController.deleteArticle);
router.get('/articleById', articlesController.getArticleById);
router.get('/article/liked', articlesController.getArticlesLiked);
//router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )
exports["default"] = router;
