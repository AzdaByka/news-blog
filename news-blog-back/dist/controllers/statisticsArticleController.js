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
var StatisticsArticles_1 = require("../entity/StatisticsArticles");
var ChannelArticles_1 = require("../entity/ChannelArticles");
var Channels_1 = require("../entity/Channels");
var Users_1 = require("../entity/Users");
var ArticleUserRate_1 = require("../entity/ArticleUserRate");
var StatisticsChannels_1 = require("../entity/StatisticsChannels");
var excel = require('node-excel-export');
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
            var id, articleId, user, article, _i, _a, rate, statistic, newArticle, likes, dislikes, _b, _c, rate, _d, _e, statistics;
            return __generator(this, function (_f) {
                switch (_f.label) {
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
                        user = _f.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(articleId, { relations: ['articlesUserRate'] })];
                    case 2:
                        article = _f.sent();
                        _i = 0, _a = user.articlesUserRate;
                        _f.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        rate = _a[_i];
                        if (!(rate.articleId == articleId)) return [3 /*break*/, 5];
                        if (!(rate.userId == id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, typeorm_1.getRepository(ArticleUserRate_1.ArticlesUserRate).remove(rate)];
                    case 4:
                        _f.sent();
                        _f.label = 5;
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
                        _f.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(articleId, { relations: ['articlesUserRate', 'statisticsArticles'] })];
                    case 8:
                        newArticle = _f.sent();
                        likes = 0;
                        dislikes = 0;
                        for (_b = 0, _c = newArticle.articlesUserRate; _b < _c.length; _b++) {
                            rate = _c[_b];
                            if (rate.like == 1)
                                likes += 1;
                            if (rate.like == 0)
                                dislikes += 1;
                        }
                        _d = 0, _e = newArticle.statisticsArticles;
                        _f.label = 9;
                    case 9:
                        if (!(_d < _e.length)) return [3 /*break*/, 12];
                        statistics = _e[_d];
                        statistics.like = likes;
                        statistics.dislike = dislikes;
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsArticles_1.StatisticsArticles).save(statistics)];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11:
                        _d++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/, res.status(200).send('Лайкнул')];
                }
            });
        });
    };
    StatisticsArticleController.prototype.updateStatisticsDislike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, articleId, user, article, _i, _a, rate, statistic, newArticle, likes, dislikes, _b, _c, rate, _d, _e, statistics;
            return __generator(this, function (_f) {
                switch (_f.label) {
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
                        user = _f.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(articleId, { relations: ['articlesUserRate', 'statisticsArticles'] })];
                    case 2:
                        article = _f.sent();
                        _i = 0, _a = user.articlesUserRate;
                        _f.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        rate = _a[_i];
                        if (!(rate.articleId == articleId && rate.userId == id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, typeorm_1.getRepository(ArticleUserRate_1.ArticlesUserRate).remove(rate)];
                    case 4:
                        _f.sent();
                        _f.label = 5;
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
                        _f.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).findOne(articleId, { relations: ['articlesUserRate', 'statisticsArticles'] })];
                    case 8:
                        newArticle = _f.sent();
                        likes = 0;
                        dislikes = 0;
                        for (_b = 0, _c = newArticle.articlesUserRate; _b < _c.length; _b++) {
                            rate = _c[_b];
                            if (rate.like == 1)
                                likes += 1;
                            if (rate.like == 0)
                                dislikes += 1;
                        }
                        _d = 0, _e = newArticle.statisticsArticles;
                        _f.label = 9;
                    case 9:
                        if (!(_d < _e.length)) return [3 /*break*/, 12];
                        statistics = _e[_d];
                        statistics.like = likes;
                        statistics.dislike = dislikes;
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsArticles_1.StatisticsArticles).save(statistics)];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11:
                        _d++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/, res.status(200).send('Дизлайкнул')];
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
    StatisticsArticleController.prototype.getStatisticsPublication = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, channel, articles, result, ctrMax, showsSum, commentSum, subscriptionsSum, likesSum, _i, articles_1, article, _a, _b, art, ctr, shows, subscriptions, likes, _c, _d, statistic, responseArticle;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(id)];
                    case 1:
                        user = _e.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).findOne({ where: { user: user } })
                            // console.log(channel)
                        ];
                    case 2:
                        channel = _e.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Articles_1.Articles).find({ relations: ['statisticsArticles', 'channelArticles'] })];
                    case 3:
                        articles = _e.sent();
                        result = [];
                        ctrMax = 0;
                        showsSum = 0;
                        commentSum = 0;
                        subscriptionsSum = 0;
                        likesSum = 0;
                        for (_i = 0, articles_1 = articles; _i < articles_1.length; _i++) {
                            article = articles_1[_i];
                            for (_a = 0, _b = article.channelArticles; _a < _b.length; _a++) {
                                art = _b[_a];
                                if (art.channelId == channel.id) {
                                    ctr = void 0;
                                    shows = void 0;
                                    subscriptions = void 0;
                                    likes = void 0;
                                    for (_c = 0, _d = article.statisticsArticles; _c < _d.length; _c++) {
                                        statistic = _d[_c];
                                        shows = statistic.shows;
                                        ctr = statistic.ctr / shows * 100;
                                        subscriptions = statistic.subscriptions;
                                        likes = statistic.like;
                                    }
                                    showsSum += shows;
                                    likesSum += likes;
                                    subscriptionsSum += subscriptions;
                                    if (ctr > ctrMax)
                                        ctrMax = ctr;
                                    responseArticle = [
                                        article.updatedAt,
                                        article.title,
                                        ctr,
                                        shows,
                                        subscriptions,
                                        likes,
                                    ];
                                    result.push(responseArticle);
                                }
                            }
                        }
                        result.push([
                            ctrMax,
                            showsSum,
                            commentSum,
                            subscriptionsSum,
                            likesSum,
                        ]);
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    StatisticsArticleController.prototype.getStatisticsAuditorium = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result, nowDate, user, channel, i, nextDate, lastDate, statisticsChannels, existUser, _i, statisticsChannels_1, stat, arr, nextDate, lastDate, statisticsChannels, existUser, _a, statisticsChannels_2, stat, arr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        result = [];
                        nowDate = new Date();
                        nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 28);
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(id)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).findOne({ where: { user: user } })];
                    case 2:
                        channel = _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < 12)) return [3 /*break*/, 8];
                        if (!(nowDate.getMonth() - i > 0)) return [3 /*break*/, 5];
                        nextDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - i + 1, 1);
                        console.log("nowDate/ " + nextDate.toISOString());
                        lastDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - i, 1);
                        console.log("lastDate/ " + lastDate.toISOString());
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsChannels_1.StatisticsChannels).find({
                                where: {
                                    channelId: channel.id,
                                    updatedAt: typeorm_2.Between(lastDate, nextDate)
                                }
                            })];
                    case 4:
                        statisticsChannels = _b.sent();
                        existUser = [];
                        for (_i = 0, statisticsChannels_1 = statisticsChannels; _i < statisticsChannels_1.length; _i++) {
                            stat = statisticsChannels_1[_i];
                            existUser.push(stat.userId);
                        }
                        console.log(existUser);
                        arr = Array.from(new Set(existUser));
                        console.log(arr);
                        result.push(arr.length);
                        return [3 /*break*/, 7];
                    case 5:
                        nextDate = new Date(nowDate.getFullYear() - 1, nowDate.getMonth() + (12 - i + 1), 1);
                        lastDate = new Date(nowDate.getFullYear() - 1, nowDate.getMonth() + (12 - i), 1);
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsChannels_1.StatisticsChannels).find({ where: {
                                    channelId: channel.id,
                                    updatedAt: typeorm_2.Between(lastDate, nextDate)
                                } })];
                    case 6:
                        statisticsChannels = _b.sent();
                        existUser = [];
                        for (_a = 0, statisticsChannels_2 = statisticsChannels; _a < statisticsChannels_2.length; _a++) {
                            stat = statisticsChannels_2[_a];
                            existUser.push(stat.userId);
                        }
                        console.log(existUser);
                        arr = Array.from(new Set(existUser));
                        console.log(arr);
                        result.push(arr.length);
                        _b.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 3];
                    case 8: 
                    // let newDate= nowDate.
                    return [2 /*return*/, res.json(result).status(200)];
                }
            });
        });
    };
    StatisticsArticleController.prototype.exportStatisticsPublication = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, heading, specification, dataset, merges, report;
            return __generator(this, function (_a) {
                styles = {
                    headerDark: {
                        fill: {
                            fgColor: {
                                rgb: 'FF000000'
                            }
                        },
                        font: {
                            color: {
                                rgb: 'FFFFFFFF'
                            },
                            sz: 14,
                            bold: true
                        }
                    },
                    cellPink: {
                        fill: {
                            fgColor: {
                                rgb: 'FFFFCCFF'
                            }
                        }
                    },
                    cellGreen: {
                        fill: {
                            fgColor: {
                                rgb: 'FF00FF00'
                            }
                        }
                    }
                };
                heading = [
                    [{ value: 'a1', style: styles.headerDark }, { value: 'b1', style: styles.headerDark }, { value: 'c1', style: styles.headerDark }],
                    ['a2', 'b2', 'c2'] // <-- It can be only values
                ];
                specification = {
                    customer_name: {
                        displayName: 'Customer',
                        headerStyle: styles.headerDark,
                        cellStyle: function (value, row) {
                            // if the status is 1 then color in green else color in red
                            // Notice how we use another cell value to style the current one
                            return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible
                        },
                        width: 120 // <- width in pixels
                    },
                    status_id: {
                        displayName: 'Status',
                        headerStyle: styles.headerDark,
                        cellFormat: function (value, row) {
                            return (value == 1) ? 'Active' : 'Inactive';
                        },
                        width: '10' // <- width in chars (when the number is passed as string)
                    },
                    note: {
                        displayName: 'Description',
                        headerStyle: styles.headerDark,
                        cellStyle: styles.cellPink,
                        width: 220 // <- width in pixels
                    }
                };
                dataset = [
                    { customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown' },
                    { customer_name: 'HыавпвпывапP', status_id: 0, note: 'some note' },
                    { customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown' }
                ];
                merges = [
                    { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
                    { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
                    { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
                ];
                report = excel.buildExport([
                    {
                        name: 'Report',
                        heading: heading,
                        merges: merges,
                        specification: specification,
                        data: dataset // <-- Report data
                    }
                ]);
                // You can then return this straight
                res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
                return [2 /*return*/, res.json(report)];
            });
        });
    };
    return StatisticsArticleController;
}());
exports["default"] = StatisticsArticleController;
