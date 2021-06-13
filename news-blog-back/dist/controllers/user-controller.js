"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Users_1 = require("../entity/Users");
var typeorm_linq_repository_1 = require("typeorm-linq-repository");
var Channels_1 = require("../entity/Channels");
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, login, email, password, name, surname, patronymic, tel, img_avatar, hashedPassword, userRepository, userByEmail, userByLogin, user, channel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, login = _a.login, email = _a.email, password = _a.password, name = _a.name, surname = _a.surname, patronymic = _a.patronymic, tel = _a.tel, img_avatar = _a.img_avatar;
                        return [4 /*yield*/, UserController.cryptPassword(password)];
                    case 1:
                        hashedPassword = _b.sent();
                        if (typeof hashedPassword !== "string")
                            return [2 /*return*/, res.status(400).json("loh")];
                        userRepository = new typeorm_linq_repository_1.LinqRepository(Users_1.Users);
                        return [4 /*yield*/, userRepository.getOne()
                                .where(function (u) { return u.email; })
                                .equal(email).count()];
                    case 2:
                        userByEmail = _b.sent();
                        if (userByEmail > 0) {
                            return [2 /*return*/, res.status(409).send('user with email already exist')];
                        }
                        return [4 /*yield*/, userRepository.getOne()
                                .where(function (u) { return u.login; })
                                .equal(login).count()];
                    case 3:
                        userByLogin = _b.sent();
                        if (userByLogin > 0) {
                            return [2 /*return*/, res.status(409).send('user with login already exist')];
                        }
                        user = new Users_1.Users();
                        user.email = email;
                        user.login = login;
                        user.password = hashedPassword;
                        user.name = name;
                        user.surname = surname;
                        user.patronymic = patronymic;
                        user.tel = tel;
                        user.imgAvatar = img_avatar;
                        user.createdAt = new Date();
                        user.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
                    case 4:
                        _b.sent();
                        channel = new Channels_1.Channels();
                        channel.name = "";
                        channel.descriptions = '';
                        channel.imgAvatar = '';
                        channel.user = user;
                        channel.createdAt = new Date();
                        channel.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).save(channel)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.status(201).send("User created")];
                }
            });
        });
    };
    UserController.cryptPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1["default"].genSalt(10)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1["default"].hash(password, salt)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserController;
}());
exports["default"] = UserController;
