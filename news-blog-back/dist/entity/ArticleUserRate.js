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
exports.ArticlesUserRate = void 0;
var typeorm_1 = require("typeorm");
var Articles_1 = require("./Articles");
var Users_1 = require("./Users");
var ArticlesUserRate = /** @class */ (function () {
    function ArticlesUserRate() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], ArticlesUserRate.prototype, "id");
    __decorate([
        typeorm_1.Column("integer", { name: "like", nullable: true, unique: true }),
        __metadata("design:type", Number)
    ], ArticlesUserRate.prototype, "like");
    __decorate([
        typeorm_1.Column("integer", { name: "articleId", nullable: true, unique: true }),
        __metadata("design:type", Number)
    ], ArticlesUserRate.prototype, "articleId");
    __decorate([
        typeorm_1.Column("integer", { name: "userId", nullable: true, unique: true }),
        __metadata("design:type", Number)
    ], ArticlesUserRate.prototype, "userId");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "createdAt" }),
        __metadata("design:type", Date)
    ], ArticlesUserRate.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "updatedAt" }),
        __metadata("design:type", Date)
    ], ArticlesUserRate.prototype, "updatedAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return Articles_1.Articles; }, function (articles) { return articles.articlesUserRate; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "articleId", referencedColumnName: "id" }]),
        __metadata("design:type", Articles_1.Articles)
    ], ArticlesUserRate.prototype, "article");
    __decorate([
        typeorm_1.ManyToOne(function () { return Users_1.Users; }, function (users) { return users.articlesUserRate; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "userId", referencedColumnName: "id" }]),
        __metadata("design:type", Users_1.Users)
    ], ArticlesUserRate.prototype, "user");
    ArticlesUserRate = __decorate([
        typeorm_1.Index("article_user_rate_articleId_userId_key", ["articleId", "userId"], { unique: true }),
        typeorm_1.Index("article_user_rate_pkey", ["id"], { unique: true }),
        typeorm_1.Entity("article_user_rate", { schema: "public" })
    ], ArticlesUserRate);
    return ArticlesUserRate;
}());
exports.ArticlesUserRate = ArticlesUserRate;
