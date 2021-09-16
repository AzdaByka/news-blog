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
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var ArticlesUserRate_1 = require("./ArticlesUserRate");
var Channels_1 = require("./Channels");
var StatisticsChannels_1 = require("./StatisticsChannels");
var Subscriptions_1 = require("./Subscriptions");
var UserComment_1 = require("./UserComment");
var Users = /** @class */ (function () {
    function Users() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Users.prototype, "id");
    __decorate([
        typeorm_1.Column("character varying", { name: "login", length: 40 }),
        __metadata("design:type", String)
    ], Users.prototype, "login");
    __decorate([
        typeorm_1.Column("character varying", { name: "email", length: 40 }),
        __metadata("design:type", String)
    ], Users.prototype, "email");
    __decorate([
        typeorm_1.Column("character varying", { name: "password" }),
        __metadata("design:type", String)
    ], Users.prototype, "password");
    __decorate([
        typeorm_1.Column("character varying", { name: "name" }),
        __metadata("design:type", String)
    ], Users.prototype, "name");
    __decorate([
        typeorm_1.Column("character varying", { name: "surname" }),
        __metadata("design:type", String)
    ], Users.prototype, "surname");
    __decorate([
        typeorm_1.Column("character varying", { name: "patronymic" }),
        __metadata("design:type", String)
    ], Users.prototype, "patronymic");
    __decorate([
        typeorm_1.Column("character varying", { name: "tel" }),
        __metadata("design:type", String)
    ], Users.prototype, "tel");
    __decorate([
        typeorm_1.Column("character varying", { name: "imgAvatar" }),
        __metadata("design:type", String)
    ], Users.prototype, "imgAvatar");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "created_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], Users.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "updated_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], Users.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return ArticlesUserRate_1.ArticlesUserRate; }, function (articlesUserRate) { return articlesUserRate.user; }),
        __metadata("design:type", Array)
    ], Users.prototype, "articlesUserRates");
    __decorate([
        typeorm_1.OneToMany(function () { return Channels_1.Channels; }, function (channels) { return channels.user; }),
        __metadata("design:type", Array)
    ], Users.prototype, "channels");
    __decorate([
        typeorm_1.OneToMany(function () { return StatisticsChannels_1.StatisticsChannels; }, function (statisticsChannels) { return statisticsChannels.user; }),
        __metadata("design:type", Array)
    ], Users.prototype, "statisticsChannels");
    __decorate([
        typeorm_1.OneToMany(function () { return Subscriptions_1.Subscriptions; }, function (subscriptions) { return subscriptions.user; }),
        __metadata("design:type", Array)
    ], Users.prototype, "subscriptions");
    __decorate([
        typeorm_1.OneToMany(function () { return UserComment_1.UserComment; }, function (userComment) { return userComment.user; }),
        __metadata("design:type", Array)
    ], Users.prototype, "userComments");
    Users = __decorate([
        typeorm_1.Index("user_pk", ["id"], { unique: true }),
        typeorm_1.Entity("users", { schema: "public" })
    ], Users);
    return Users;
}());
exports.Users = Users;
