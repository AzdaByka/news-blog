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
var auth_controller_1 = __importDefault(require("./auth-controller"));
var StatisticsArticles_1 = require("../entity/StatisticsArticles");
var ChannelArticles_1 = require("../entity/ChannelArticles");
var Users_1 = require("../entity/Users");
var ArticleUserRate_1 = require("../entity/ArticleUserRate");
var StatisticsChannels_1 = require("../entity/StatisticsChannels");
var auth = new auth_controller_1["default"]();
var StatisticsArticleController = /** @class */ (function () {
    function StatisticsArticleController() {
    }
    StatisticsArticleController.prototype.updateStatisticsCTR = function (article, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, statistic, channel, channelArticles, _b, channelArticles_1, channelArticle, user, statisticsChannel;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = article.statisticsArticles;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        statistic = _a[_i];
                        statistic.ctr += 1;
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsArticles_1.StatisticsArticles).save(statistic)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, typeorm_1.getRepository(ChannelArticles_1.ChannelArticles).find({ relations: ["channel"] })];
                    case 5:
                        channelArticles = _c.sent();
                        for (_b = 0, channelArticles_1 = channelArticles; _b < channelArticles_1.length; _b++) {
                            channelArticle = channelArticles_1[_b];
                            console.log(channelArticle.articleId);
                            if (channelArticle.articleId == article.id) {
                                channel = channelArticle.channel;
                                break;
                            }
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(userId)
                            //  console.log(user)
                        ];
                    case 6:
                        user = _c.sent();
                        statisticsChannel = new StatisticsChannels_1.StatisticsChannels();
                        statisticsChannel.channel = channel;
                        statisticsChannel.user = user;
                        statisticsChannel.createdAt = new Date();
                        statisticsChannel.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsChannels_1.StatisticsChannels).save(statisticsChannel)];
                    case 7:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StatisticsArticleController.prototype.updateStatisticsLike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, articleId, user, article, _i, _a, rate, statistic;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        articleId = Number(req.query.articleId);
                        if (!articleId) {
                            articleId = req.body.articleId;
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(id, { relations: ['articlesUserRate'] })];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(articleId, { relations: ['articlesUserRate'] })];
                    case 2:
                        article = _b.sent();
                        _i = 0, _a = user.articlesUserRate;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        rate = _a[_i];
                        if (!(rate.articleId == articleId && rate.userId == id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, typeorm_1.getRepository(ArticleUserRate_1.ArticlesUserRate).remove(rate)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        statistic = new ArticleUserRate_1.ArticlesUserRate();
                        statistic.user = user;
                        statistic.article = article;
                        statistic.like = 1;
                        statistic.createdAt = new Date();
                        statistic.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(ArticleUserRate_1.ArticlesUserRate).save(statistic)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send('Лайкнул')];
                }
            });
        });
    };
    StatisticsArticleController.prototype.updateStatisticsDislike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, articleId, user, article, _i, _a, rate, statistic;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        articleId = Number(req.query.articleId);
                        if (!articleId) {
                            articleId = req.body.articleId;
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(id, { relations: ['articlesUserRate'] })];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(articleId, { relations: ['articlesUserRate'] })];
                    case 2:
                        article = _b.sent();
                        _i = 0, _a = user.articlesUserRate;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        rate = _a[_i];
                        if (!(rate.articleId == articleId && rate.userId == id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, typeorm_1.getRepository(ArticleUserRate_1.ArticlesUserRate).remove(rate)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        statistic = new ArticleUserRate_1.ArticlesUserRate();
                        statistic.user = user;
                        statistic.article = article;
                        statistic.like = 0;
                        statistic.createdAt = new Date();
                        statistic.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(ArticleUserRate_1.ArticlesUserRate).save(statistic)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send('Дизлайкнул')];
                }
            });
        });
    };
    StatisticsArticleController.prototype.updateStatisticsArticle = function (article) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, statistic;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = article.statisticsArticles;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        statistic = _a[_i];
                        statistic.shows += 1;
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsArticles_1.StatisticsArticles).save(statistic)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return StatisticsArticleController;
}());
exports["default"] = StatisticsArticleController;
