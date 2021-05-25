"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Channels = void 0;
var typeorm_1 = require("typeorm");
var ChannelArticles_1 = require("./ChannelArticles");
var Users_1 = require("./Users");
var StatisticsChannels_1 = require("./StatisticsChannels");
var Subscriptions_1 = require("./Subscriptions");
var Channels = /** @class */ (function () {
    function Channels() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Channels.prototype, "id");
    __decorate([
        typeorm_1.Column("character varying", { name: "name", length: 255 }),
        __metadata("design:type", String)
    ], Channels.prototype, "name");
    __decorate([
        typeorm_1.Column("character varying", { name: "descriptions", length: 255 }),
        __metadata("design:type", String)
    ], Channels.prototype, "descriptions");
    __decorate([
        typeorm_1.Column("character varying", { name: "img_avatar", length: 255 }),
        __metadata("design:type", String)
    ], Channels.prototype, "imgAvatar");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "createdAt" }),
        __metadata("design:type", Date)
    ], Channels.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "updatedAt" }),
        __metadata("design:type", Date)
    ], Channels.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return ChannelArticles_1.ChannelArticles; }, function (channelArticles) { return channelArticles.channel; }),
        __metadata("design:type", Array)
    ], Channels.prototype, "channelArticles");
    __decorate([
        typeorm_1.ManyToOne(function () { return Users_1.Users; }, function (users) { return users.channels; }, {
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "userId", referencedColumnName: "id" }]),
        __metadata("design:type", Users_1.Users)
    ], Channels.prototype, "user");
    __decorate([
        typeorm_1.OneToMany(function () { return StatisticsChannels_1.StatisticsChannels; }, function (statisticsChannels) { return statisticsChannels.channel; }),
        __metadata("design:type", Array)
    ], Channels.prototype, "statisticsChannels");
    __decorate([
        typeorm_1.OneToMany(function () { return Subscriptions_1.Subscriptions; }, function (subscriptions) { return subscriptions.channel; }),
        __metadata("design:type", Array)
    ], Channels.prototype, "subscriptions");
    Channels = __decorate([
        typeorm_1.Index("channels_pkey", ["id"], { unique: true }),
        typeorm_1.Entity("channels", { schema: "public" })
    ], Channels);
    return Channels;
}());
exports.Channels = Channels;
