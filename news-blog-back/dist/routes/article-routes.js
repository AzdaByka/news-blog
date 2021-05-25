"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var article_controller_1 = __importDefault(require("../controllers/article-controller"));
var router = express_1.Router();
var controller = new article_controller_1["default"]();
router.get('/article/:id', controller.getArticle);
router.get('/article', controller.getArticles);
//router.post('/users', controller.createUser)
// router.get('/users/:id', )
// router.put('/users', )
// router.delete('/users/:id', )
exports["default"] = router;
