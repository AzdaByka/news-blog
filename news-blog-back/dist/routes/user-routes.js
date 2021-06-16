"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controllers/user-controller"));
var userController = new user_controller_1["default"]();
var router = express_1.Router();
router.post('/signup', userController.createUser);
router.put('/user/update', userController.updateInformation);
router.get('/user/information', userController.getInformation);
exports["default"] = router;
