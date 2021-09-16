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
var typeorm_2 = require("typeorm");
var Articles_1 = require("../entity/Articles");
var auth_controller_1 = __importDefault(require("./auth-controller"));
var typeorm_linq_repository_1 = require("typeorm-linq-repository");
var StatisticsArticles_1 = require("../entity/StatisticsArticles");
var Categories_1 = require("../entity/Categories");
var ChannelArticles_1 = require("../entity/ChannelArticles");
var Channels_1 = require("../entity/Channels");
var statisticsArticleController_1 = __importDefault(require("./statisticsArticleController"));
var ArticlesUserRate_1 = require("../entity/ArticlesUserRate");
var Subscriptions_1 = require("../entity/Subscriptions");
var auth = new auth_controller_1["default"]();
var statisticsArticles = new statisticsArticleController_1["default"]();
var ArticlesController = /** @class */ (function () {
    function ArticlesController() {
    }
    ArticlesController.prototype.getArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, authHeader, articles, _i, articles_1, article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = req.body.ids;
                        authHeader = req.headers["authorization"].split(' ')[1];
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).find({ relations: ['statisticsArticles'] })];
                    case 1:
                        articles = _a.sent();
                        _i = 0, articles_1 = articles;
                        _a.label = 2;
                    case 2:
                        if (!(_i < articles_1.length)) return [3 /*break*/, 5];
                        article = articles_1[_i];
                        return [4 /*yield*/, statisticsArticles.updateStatisticsArticle(article)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    //console.log(article)
                    return [2 /*return*/, res.json(articles)];
                }
            });
        });
    };
    ArticlesController.prototype.addArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, title, text, shortDescription, preview, rubrics, article, statistic, _i, rubrics_1, rub, category, channels, channel, _b, channels_1, channelItem, channelArticles;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, id = _a.id, title = _a.title, text = _a.text, shortDescription = _a.shortDescription, preview = _a.preview, rubrics = _a.rubrics;
                        article = new Articles_1.Articles();
                        article.title = title;
                        article.text = text;
                        article.shortDescription = shortDescription;
                        article.imgs = preview;
                        article.createdAt = new Date();
                        article.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).save(article)];
                    case 1:
                        _c.sent();
                        statistic = new StatisticsArticles_1.StatisticsArticles();
                        statistic.ctr = 0;
                        statistic.shows = 0;
                        statistic.like = 0;
                        statistic.dislike = 0;
                        statistic.subscriptions = 0;
                        statistic.article = article;
                        statistic.createdAt = new Date();
                        statistic.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsArticles_1.StatisticsArticles).save(statistic)];
                    case 2:
                        _c.sent();
                        if (!Array.isArray(rubrics)) return [3 /*break*/, 6];
                        _i = 0, rubrics_1 = rubrics;
                        _c.label = 3;
                    case 3:
                        if (!(_i < rubrics_1.length)) return [3 /*break*/, 6];
                        rub = rubrics_1[_i];
                        category = new Categories_1.Categories();
                        category.name = String(rub);
                        category.article = article;
                        category.createdAt = new Date();
                        category.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Categories_1.Categories).save(category)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).find({ relations: ["user"] })];
                    case 7:
                        channels = _c.sent();
                        channel = null;
                        for (_b = 0, channels_1 = channels; _b < channels_1.length; _b++) {
                            channelItem = channels_1[_b];
                            if (channelItem.user.id == id) {
                                channel = channelItem;
                                break;
                            }
                        }
                        channelArticles = new ChannelArticles_1.ChannelArticles();
                        channelArticles.channel = channel;
                        channelArticles.article = article;
                        channelArticles.createdAt = new Date();
                        channelArticles.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(ChannelArticles_1.ChannelArticles).save(channelArticles)];
                    case 8:
                        _c.sent();
                        return [2 /*return*/, res.status(201).json("Статья добавлена")];
                }
            });
        });
    };
    ArticlesController.prototype.putArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, title, text, shortDescription, preview, rubrics, article, articlesCategories, _i, articlesCategories_1, articleItem, _b, rubrics_2, rub, category;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, id = _a.id, title = _a.title, text = _a.text, shortDescription = _a.shortDescription, preview = _a.preview, rubrics = _a.rubrics;
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(id)
                            // const article= new Articles()
                        ];
                    case 1:
                        article = _c.sent();
                        // const article= new Articles()
                        article.title = title;
                        article.text = text;
                        article.shortDescription = shortDescription;
                        article.imgs = preview;
                        article.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).save(article)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).find({ relations: ["categories"] })];
                    case 3:
                        articlesCategories = _c.sent();
                        _i = 0, articlesCategories_1 = articlesCategories;
                        _c.label = 4;
                    case 4:
                        if (!(_i < articlesCategories_1.length)) return [3 /*break*/, 7];
                        articleItem = articlesCategories_1[_i];
                        if (!(articleItem.id == id)) return [3 /*break*/, 6];
                        return [4 /*yield*/, typeorm_1.getRepository(Categories_1.Categories).remove(articleItem.categories)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        if (!Array.isArray(rubrics)) return [3 /*break*/, 11];
                        _b = 0, rubrics_2 = rubrics;
                        _c.label = 8;
                    case 8:
                        if (!(_b < rubrics_2.length)) return [3 /*break*/, 11];
                        rub = rubrics_2[_b];
                        category = new Categories_1.Categories();
                        category.name = String(rub);
                        category.article = article;
                        category.createdAt = new Date();
                        category.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Categories_1.Categories).save(category)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        _b++;
                        return [3 /*break*/, 8];
                    case 11: return [2 /*return*/, res.status(200).json("Статья обнавлена")];
                }
            });
        });
    };
    ArticlesController.prototype.deleteArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, articles, _i, articles_2, article, _a, _b, category, _c, _d, statistic;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        id = req.body.id;
                        if (id == null)
                            id = Number(req.query.id);
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).find({ relations: ["categories", "statisticsArticles"] })];
                    case 1:
                        articles = _e.sent();
                        _i = 0, articles_2 = articles;
                        _e.label = 2;
                    case 2:
                        if (!(_i < articles_2.length)) return [3 /*break*/, 11];
                        article = articles_2[_i];
                        if (!(article.id == id)) return [3 /*break*/, 10];
                        _a = 0, _b = article.categories;
                        _e.label = 3;
                    case 3:
                        if (!(_a < _b.length)) return [3 /*break*/, 6];
                        category = _b[_a];
                        return [4 /*yield*/, typeorm_1.getRepository(Categories_1.Categories)["delete"](category.id)];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        _c = 0, _d = article.statisticsArticles;
                        _e.label = 7;
                    case 7:
                        if (!(_c < _d.length)) return [3 /*break*/, 10];
                        statistic = _d[_c];
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsArticles_1.StatisticsArticles)["delete"](statistic.id)];
                    case 8:
                        _e.sent();
                        _e.label = 9;
                    case 9:
                        _c++;
                        return [3 /*break*/, 7];
                    case 10:
                        _i++;
                        return [3 /*break*/, 2];
                    case 11: return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles)["delete"](id)];
                    case 12:
                        _e.sent();
                        return [2 /*return*/, res.status(200).send("Статья удалена")];
                }
            });
        });
    };
    ArticlesController.prototype.getEditor = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, channels, channel, _i, channels_2, channelItem, channelArticles, result, _a, channelArticles_1, channelArticle;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.body.id;
                        if (id == null)
                            id = Number(req.query.id);
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).find({ relations: ["user"] })];
                    case 1:
                        channels = _b.sent();
                        console.log(channels);
                        channel = null;
                        for (_i = 0, channels_2 = channels; _i < channels_2.length; _i++) {
                            channelItem = channels_2[_i];
                            if (channelItem.user !== null)
                                if (channelItem.user.id == id) {
                                    channel = channelItem;
                                    break;
                                }
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(ChannelArticles_1.ChannelArticles).find({ relations: ["article"] })];
                    case 2:
                        channelArticles = _b.sent();
                        console.log(channel);
                        result = [];
                        for (_a = 0, channelArticles_1 = channelArticles; _a < channelArticles_1.length; _a++) {
                            channelArticle = channelArticles_1[_a];
                            if (channelArticle.id == channel.id) {
                                result.push(channelArticle.article);
                            }
                        }
                        if (result.length == 0)
                            return [2 /*return*/, res.status(404).send('У вас нет статей')];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    ArticlesController.prototype.getArticleById = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var id, flag, article, userId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        flag = req.query.flag;
                        if (!flag) {
                            flag = req.body.flag;
                        }
                        console.log(flag);
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(id, { relations: ['categories', 'statisticsArticles'] })];
                    case 1:
                        article = _c.sent();
                        if (!(flag == null)) return [3 /*break*/, 3];
                        userId = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.userId);
                        if (!userId) {
                            userId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.userId;
                        }
                        console.log(userId);
                        return [4 /*yield*/, statisticsArticles.updateStatisticsCTR(article, userId)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3: 
                    // const articleLinqRepository: LinqRepository<Articles> = new LinqRepository(Articles);
                    // const article = await articleLinqRepository
                    //     .getOne()
                    //     .where(m => m.id)
                    //     .equal(id)
                    return [2 /*return*/, res.json(article)];
                }
            });
        });
    };
    ArticlesController.prototype.getArticlesLiked = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, articlesUserRates, _i, articlesUserRates_1, articlesUserRate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        result = [];
                        return [4 /*yield*/, typeorm_1.getRepository(ArticlesUserRate_1.ArticlesUserRate).find({ relations: ['article'] })];
                    case 1:
                        articlesUserRates = _a.sent();
                        for (_i = 0, articlesUserRates_1 = articlesUserRates; _i < articlesUserRates_1.length; _i++) {
                            articlesUserRate = articlesUserRates_1[_i];
                            if (articlesUserRate.user.id == id && articlesUserRate.like == 1) {
                                result.push(articlesUserRate.article);
                            }
                        }
                        return [2 /*return*/, res.json(result).status(200)];
                }
            });
        });
    };
    ArticlesController.prototype.getSubscribeArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, subscriptionsRepository, subscriptions, channelArticles, _i, channelArticles_2, channel, _a, subscriptions_1, sub;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        if (!id)
                            return [2 /*return*/, res.status(404).json("У вас нет подписок")];
                        result = [];
                        subscriptionsRepository = new typeorm_linq_repository_1.LinqRepository(Subscriptions_1.Subscriptions);
                        return [4 /*yield*/, subscriptionsRepository.getAll()
                                .where(function (u) { return u.user.id; })
                                .equal(id)
                            // const subscriptions= await getRepository(Subscriptions).find()
                        ];
                    case 1:
                        subscriptions = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(ChannelArticles_1.ChannelArticles).find({ relations: ['article'] })];
                    case 2:
                        channelArticles = _b.sent();
                        for (_i = 0, channelArticles_2 = channelArticles; _i < channelArticles_2.length; _i++) {
                            channel = channelArticles_2[_i];
                            for (_a = 0, subscriptions_1 = subscriptions; _a < subscriptions_1.length; _a++) {
                                sub = subscriptions_1[_a];
                                if (channel.channel.id == sub.id)
                                    result.push(channel.article);
                            }
                        }
                        //   console.log(result.length)
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    ArticlesController.prototype.searchArticle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, articles, _i, articles_3, article, channels, channelArticles, _a, channels_3, channel, _b, channelArticles_3, channelArticle;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = req.query.query;
                        if (!query) {
                            query = req.body.query;
                        }
                        result = [];
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).find({ title: typeorm_2.Like("%" + query + "%") })];
                    case 1:
                        articles = _c.sent();
                        if (articles.length > 0)
                            for (_i = 0, articles_3 = articles; _i < articles_3.length; _i++) {
                                article = articles_3[_i];
                                result.push(article);
                            }
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).find({ name: typeorm_2.Like("%" + query + "%") })];
                    case 2:
                        channels = _c.sent();
                        if (!(channels.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, typeorm_1.getRepository(ChannelArticles_1.ChannelArticles).find({ relations: ['article'] })];
                    case 3:
                        channelArticles = _c.sent();
                        for (_a = 0, channels_3 = channels; _a < channels_3.length; _a++) {
                            channel = channels_3[_a];
                            for (_b = 0, channelArticles_3 = channelArticles; _b < channelArticles_3.length; _b++) {
                                channelArticle = channelArticles_3[_b];
                                if (channel.id === channelArticle.channel.id)
                                    result.push(channelArticle.article);
                            }
                        }
                        _c.label = 4;
                    case 4:
                        if (result.length > 0)
                            return [2 /*return*/, res.status(200).json(result)];
                        return [2 /*return*/, res.status(404).json("По вашему запросу ничего не найдено")];
                }
            });
        });
    };
    return ArticlesController;
}());
exports["default"] = ArticlesController;
