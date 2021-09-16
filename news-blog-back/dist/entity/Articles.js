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
exports.Articles = void 0;
var typeorm_1 = require("typeorm");
var ArticlesComments_1 = require("./ArticlesComments");
var ArticlesUserRate_1 = require("./ArticlesUserRate");
var Categories_1 = require("./Categories");
var ChannelArticles_1 = require("./ChannelArticles");
var StatisticsArticles_1 = require("./StatisticsArticles");
var Articles = /** @class */ (function () {
    function Articles() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Articles.prototype, "id");
    __decorate([
        typeorm_1.Column("character varying", { name: "title" }),
        __metadata("design:type", String)
    ], Articles.prototype, "title");
    __decorate([
        typeorm_1.Column("text", { name: "text" }),
        __metadata("design:type", String)
    ], Articles.prototype, "text");
    __decorate([
        typeorm_1.Column("text", { name: "imgs", nullable: true }),
        __metadata("design:type", String)
    ], Articles.prototype, "imgs");
    __decorate([
        typeorm_1.Column("text", { name: "shortDescription" }),
        __metadata("design:type", String)
    ], Articles.prototype, "shortDescription");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "created_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], Articles.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "updated_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], Articles.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return ArticlesComments_1.ArticlesComments; }, function (articlesComments) { return articlesComments.article; }),
        __metadata("design:type", Array)
    ], Articles.prototype, "articlesComments");
    __decorate([
        typeorm_1.OneToMany(function () { return ArticlesUserRate_1.ArticlesUserRate; }, function (articlesUserRate) { return articlesUserRate.article; }),
        __metadata("design:type", Array)
    ], Articles.prototype, "articlesUserRates");
    __decorate([
        typeorm_1.OneToMany(function () { return Categories_1.Categories; }, function (categories) { return categories.article; }),
        __metadata("design:type", Array)
    ], Articles.prototype, "categories");
    __decorate([
        typeorm_1.OneToMany(function () { return ChannelArticles_1.ChannelArticles; }, function (channelArticles) { return channelArticles.article; }),
        __metadata("design:type", Array)
    ], Articles.prototype, "channelArticles");
    __decorate([
        typeorm_1.OneToMany(function () { return StatisticsArticles_1.StatisticsArticles; }, function (statisticsArticles) { return statisticsArticles.article; }),
        __metadata("design:type", Array)
    ], Articles.prototype, "statisticsArticles");
    Articles = __decorate([
        typeorm_1.Index("articles_pk", ["id"], { unique: true }),
        typeorm_1.Entity("articles", { schema: "public" })
    ], Articles);
    return Articles;
}());
exports.Articles = Articles;
