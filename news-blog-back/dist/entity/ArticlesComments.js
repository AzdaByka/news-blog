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
exports.ArticlesComments = void 0;
var typeorm_1 = require("typeorm");
var Articles_1 = require("./Articles");
var Comments_1 = require("./Comments");
var ArticlesComments = /** @class */ (function () {
    function ArticlesComments() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], ArticlesComments.prototype, "id");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "created_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], ArticlesComments.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "updated_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], ArticlesComments.prototype, "updatedAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return Articles_1.Articles; }, function (articles) { return articles.articlesComments; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "article_id", referencedColumnName: "id" }]),
        __metadata("design:type", Articles_1.Articles)
    ], ArticlesComments.prototype, "article");
    __decorate([
        typeorm_1.ManyToOne(function () { return Comments_1.Comments; }, function (comments) { return comments.articlesComments; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "comment_id", referencedColumnName: "id" }]),
        __metadata("design:type", Comments_1.Comments)
    ], ArticlesComments.prototype, "comment");
    ArticlesComments = __decorate([
        typeorm_1.Index("articlescomments_pk", ["id"], { unique: true }),
        typeorm_1.Entity("articlesComments", { schema: "public" })
    ], ArticlesComments);
    return ArticlesComments;
}());
exports.ArticlesComments = ArticlesComments;
