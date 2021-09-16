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
exports.StatisticsArticles = void 0;
var typeorm_1 = require("typeorm");
var Articles_1 = require("./Articles");
var StatisticsArticles = /** @class */ (function () {
    function StatisticsArticles() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], StatisticsArticles.prototype, "id");
    __decorate([
        typeorm_1.Column("integer", { name: "CTR" }),
        __metadata("design:type", Number)
    ], StatisticsArticles.prototype, "ctr");
    __decorate([
        typeorm_1.Column("integer", { name: "shows" }),
        __metadata("design:type", Number)
    ], StatisticsArticles.prototype, "shows");
    __decorate([
        typeorm_1.Column("integer", { name: "subscriptions" }),
        __metadata("design:type", Number)
    ], StatisticsArticles.prototype, "subscriptions");
    __decorate([
        typeorm_1.Column("integer", { name: "like" }),
        __metadata("design:type", Number)
    ], StatisticsArticles.prototype, "like");
    __decorate([
        typeorm_1.Column("integer", { name: "dislike" }),
        __metadata("design:type", Number)
    ], StatisticsArticles.prototype, "dislike");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "created_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], StatisticsArticles.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "updated_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], StatisticsArticles.prototype, "updatedAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return Articles_1.Articles; }, function (articles) { return articles.statisticsArticles; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "article_id", referencedColumnName: "id" }]),
        __metadata("design:type", Articles_1.Articles)
    ], StatisticsArticles.prototype, "article");
    StatisticsArticles = __decorate([
        typeorm_1.Index("statisticarticle_pk", ["id"], { unique: true }),
        typeorm_1.Entity("statisticsArticles", { schema: "public" })
    ], StatisticsArticles);
    return StatisticsArticles;
}());
exports.StatisticsArticles = StatisticsArticles;
