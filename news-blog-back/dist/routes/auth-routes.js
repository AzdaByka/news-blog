"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
var router = express_1.Router();
var controller = new auth_controller_1["default"]();
router.post('/signin', controller.login);
router.post("/user", controller.me);
exports["default"] = router;
