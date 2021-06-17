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
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Users_1 = require("../entity/Users");
var typeorm_linq_repository_1 = require("typeorm-linq-repository");
var Channels_1 = require("../entity/Channels");
var Subscriptions_1 = require("../entity/Subscriptions");
var StatisticsChannels_1 = require("../entity/StatisticsChannels");
var ChannelController = /** @class */ (function () {
    function ChannelController() {
    }
    ChannelController.prototype.updateChannelInformation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, description, img_avatar, channel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, name = _a.name, description = _a.description, img_avatar = _a.img_avatar;
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).findOne(Number(id))];
                    case 1:
                        channel = _b.sent();
                        channel.name = name;
                        channel.descriptions = description;
                        channel.imgAvatar = img_avatar;
                        channel.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).save(channel)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).json("Канал обновлен")];
                }
            });
        });
    };
    ChannelController.prototype.getInformation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, channelRepository, channel, subscriptionsRepository, subscriptions, check, subscription, _i, subscription_1, sub, aud, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        channelRepository = new typeorm_linq_repository_1.LinqRepository(Channels_1.Channels);
                        return [4 /*yield*/, channelRepository.getOne()
                                .where(function (u) { return u.user.id; })
                                .equal(id)];
                    case 1:
                        channel = _a.sent();
                        subscriptionsRepository = new typeorm_linq_repository_1.LinqRepository(Subscriptions_1.Subscriptions);
                        return [4 /*yield*/, subscriptionsRepository.getAll()
                                .where(function (u) { return u.channelId; })
                                .equal(channel.id).count()];
                    case 2:
                        subscriptions = _a.sent();
                        console.log(subscriptions);
                        check = 'нет';
                        return [4 /*yield*/, typeorm_1.getRepository(Subscriptions_1.Subscriptions).find()];
                    case 3:
                        subscription = _a.sent();
                        for (_i = 0, subscription_1 = subscription; _i < subscription_1.length; _i++) {
                            sub = subscription_1[_i];
                            if (sub.userId == id && sub.channelId == channel.id)
                                check = 'подписан';
                        }
                        return [4 /*yield*/, ChannelController.getAuditorium(id)];
                    case 4:
                        aud = _a.sent();
                        result = [
                            channel.name,
                            channel.descriptions,
                            channel.imgAvatar,
                            subscriptions,
                            channel.id,
                            check,
                            aud
                        ];
                        return [2 /*return*/, res.status(200).json(result)];
                }
            });
        });
    };
    ChannelController.prototype.subscribeOnChannel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, channelId, channel, user, subscriptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        channelId = Number(req.query.channelId);
                        if (!channelId) {
                            channelId = req.body.channelId;
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).findOne(channelId)];
                    case 1:
                        channel = _a.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(id)];
                    case 2:
                        user = _a.sent();
                        subscriptions = new Subscriptions_1.Subscriptions();
                        subscriptions.channel = channel;
                        subscriptions.user = user;
                        subscriptions.createdAt = new Date();
                        subscriptions.updatedAt = new Date();
                        return [4 /*yield*/, typeorm_1.getRepository(Subscriptions_1.Subscriptions).save(subscriptions)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json("Подписался")];
                }
            });
        });
    };
    ChannelController.prototype.unSubscribeOnChannel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, channelId, subscriptions, _i, subscriptions_1, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        channelId = Number(req.query.channelId);
                        if (!channelId) {
                            channelId = req.body.channelId;
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Subscriptions_1.Subscriptions).find()];
                    case 1:
                        subscriptions = _a.sent();
                        _i = 0, subscriptions_1 = subscriptions;
                        _a.label = 2;
                    case 2:
                        if (!(_i < subscriptions_1.length)) return [3 /*break*/, 5];
                        sub = subscriptions_1[_i];
                        if (!(sub.userId == id && sub.channelId == channelId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, typeorm_1.getRepository(Subscriptions_1.Subscriptions).remove(sub)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json('отписан')];
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, res.status(200).json('нет от чего отписываться')];
                }
            });
        });
    };
    ChannelController.prototype.checkSubscription = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, channelId, subscriptions, _i, subscriptions_2, sub;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number(req.query.id);
                        if (!id) {
                            id = req.body.id;
                        }
                        channelId = Number(req.query.channelId);
                        if (!channelId) {
                            channelId = req.body.channelId;
                        }
                        return [4 /*yield*/, typeorm_1.getRepository(Subscriptions_1.Subscriptions).find()];
                    case 1:
                        subscriptions = _a.sent();
                        for (_i = 0, subscriptions_2 = subscriptions; _i < subscriptions_2.length; _i++) {
                            sub = subscriptions_2[_i];
                            if (sub.userId == id && sub.channelId == channelId)
                                return [2 /*return*/, res.status(200).json('подписан')];
                        }
                        return [2 /*return*/, res.status(200).json('неподписан')];
                }
            });
        });
    };
    ChannelController.getAuditorium = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, nowDate, user, channel, i, nextDate, lastDate, statisticsChannels, existUser, _i, statisticsChannels_1, stat, arr, nextDate, lastDate, statisticsChannels, existUser, _a, statisticsChannels_2, stat, arr, count, _b, result_1, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        result = [];
                        nowDate = new Date();
                        nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 28);
                        return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(id)];
                    case 1:
                        user = _c.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(Channels_1.Channels).findOne({ where: { user: user } })];
                    case 2:
                        channel = _c.sent();
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < 12)) return [3 /*break*/, 8];
                        if (!(nowDate.getMonth() - i > 0)) return [3 /*break*/, 5];
                        nextDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - i + 1, 1);
                        lastDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - i, 1);
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsChannels_1.StatisticsChannels).find({
                                where: {
                                    channelId: channel.id,
                                    updatedAt: typeorm_1.Between(lastDate, nextDate)
                                }
                            })];
                    case 4:
                        statisticsChannels = _c.sent();
                        existUser = [];
                        for (_i = 0, statisticsChannels_1 = statisticsChannels; _i < statisticsChannels_1.length; _i++) {
                            stat = statisticsChannels_1[_i];
                            existUser.push(stat.userId);
                        }
                        arr = Array.from(new Set(existUser));
                        // console.log(arr)
                        result.push(arr.length);
                        return [3 /*break*/, 7];
                    case 5:
                        nextDate = new Date(nowDate.getFullYear() - 1, nowDate.getMonth() + (12 - i + 1), 1);
                        lastDate = new Date(nowDate.getFullYear() - 1, nowDate.getMonth() + (12 - i), 1);
                        return [4 /*yield*/, typeorm_1.getRepository(StatisticsChannels_1.StatisticsChannels).find({ where: {
                                    channelId: channel.id,
                                    updatedAt: typeorm_1.Between(lastDate, nextDate)
                                } })];
                    case 6:
                        statisticsChannels = _c.sent();
                        existUser = [];
                        for (_a = 0, statisticsChannels_2 = statisticsChannels; _a < statisticsChannels_2.length; _a++) {
                            stat = statisticsChannels_2[_a];
                            existUser.push(stat.userId);
                        }
                        arr = Array.from(new Set(existUser));
                        //     console.log(arr)
                        result.push(arr.length);
                        _c.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 3];
                    case 8:
                        count = 0;
                        for (_b = 0, result_1 = result; _b < result_1.length; _b++) {
                            i = result_1[_b];
                            count += i;
                        }
                        return [2 /*return*/, count];
                }
            });
        });
    };
    return ChannelController;
}());
exports["default"] = ChannelController;
