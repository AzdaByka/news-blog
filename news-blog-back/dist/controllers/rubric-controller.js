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
var Articles_1 = require("../entity/Articles");
var statisticsArticleController_1 = __importDefault(require("./statisticsArticleController"));
var statisticsArticles = new statisticsArticleController_1["default"]();
var RubricController = /** @class */ (function () {
    function RubricController() {
    }
    RubricController.prototype.top = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RubricController.getArticles("top")];
                    case 1:
                        result = _a.sent();
                        if (result.length == 0)
                            return [2 /*return*/, res.status(404).json("Нет статей в рубрике")];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    RubricController.prototype.movie = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RubricController.getArticles("Кино")];
                    case 1:
                        result = _a.sent();
                        if (result.length == 0)
                            return [2 /*return*/, res.status(404).json("Нет статей в рубрике")];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    RubricController.prototype.travel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RubricController.getArticles("Путешествия")];
                    case 1:
                        result = _a.sent();
                        if (result.length == 0)
                            return [2 /*return*/, res.status(404).json("Нет статей в рубрике")];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    RubricController.prototype.science = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RubricController.getArticles("Наука")];
                    case 1:
                        result = _a.sent();
                        if (result.length == 0)
                            return [2 /*return*/, res.status(404).json("Нет статей в рубрике")];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    RubricController.prototype.corona = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RubricController.getArticles("Коронавирус")];
                    case 1:
                        result = _a.sent();
                        if (result.length == 0)
                            return [2 /*return*/, res.status(404).json("Нет статей в рубрике")];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    RubricController.prototype.car = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RubricController.getArticles("Авто")];
                    case 1:
                        result = _a.sent();
                        if (result.length == 0)
                            return [2 /*return*/, res.status(404).json("Нет статей в рубрике")];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    RubricController.getArticles = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var articles, result, _i, articles_1, article, _a, _b, rub;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).find({ relations: ["categories", "statisticsArticles"] })];
                    case 1:
                        articles = _c.sent();
                        result = [];
                        _i = 0, articles_1 = articles;
                        _c.label = 2;
                    case 2:
                        if (!(_i < articles_1.length)) return [3 /*break*/, 7];
                        article = articles_1[_i];
                        _a = 0, _b = article.categories;
                        _c.label = 3;
                    case 3:
                        if (!(_a < _b.length)) return [3 /*break*/, 6];
                        rub = _b[_a];
                        if (!(rub.name == name)) return [3 /*break*/, 5];
                        return [4 /*yield*/, statisticsArticles.updateStatisticsArticle(article)];
                    case 4:
                        _c.sent();
                        result.push(article);
                        _c.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    return RubricController;
}());
exports["default"] = RubricController;
