"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var article_routes_1 = __importDefault(require("./article-routes"));
var auth_routes_1 = __importDefault(require("./auth-routes"));
var statistic_routes_1 = __importDefault(require("./statistic-routes"));
var user_routes_1 = __importDefault(require("./user-routes"));
var channel_routes_1 = __importDefault(require("./channel-routes"));
var router = express_1.Router();
// User-route
router.use(article_routes_1["default"]);
//Auth-route
router.use(auth_routes_1["default"]);
router.use(statistic_routes_1["default"]);
router.use(user_routes_1["default"]);
router.use(channel_routes_1["default"]);
//
// //Color-route
// router.use(ColorRouter)
//
// //Brand-route
// router.use(BrandRouter)
exports["default"] = router;
