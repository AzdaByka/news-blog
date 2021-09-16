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
exports.Comments = void 0;
var typeorm_1 = require("typeorm");
var ArticlesComments_1 = require("./ArticlesComments");
var UserComment_1 = require("./UserComment");
var Comments = /** @class */ (function () {
    function Comments() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Comments.prototype, "id");
    __decorate([
        typeorm_1.Column("text", { name: "text" }),
        __metadata("design:type", String)
    ], Comments.prototype, "text");
    __decorate([
        typeorm_1.Column("integer", { name: "like" }),
        __metadata("design:type", Number)
    ], Comments.prototype, "like");
    __decorate([
        typeorm_1.Column("integer", { name: "dislike" }),
        __metadata("design:type", Number)
    ], Comments.prototype, "dislike");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "created_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], Comments.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "updated_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], Comments.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return ArticlesComments_1.ArticlesComments; }, function (articlesComments) { return articlesComments.comment; }),
        __metadata("design:type", Array)
    ], Comments.prototype, "articlesComments");
    __decorate([
        typeorm_1.OneToMany(function () { return UserComment_1.UserComment; }, function (userComment) { return userComment.comment; }),
        __metadata("design:type", Array)
    ], Comments.prototype, "userComments");
    Comments = __decorate([
        typeorm_1.Index("comments_pk", ["id"], { unique: true }),
        typeorm_1.Entity("comments", { schema: "public" })
    ], Comments);
    return Comments;
}());
exports.Comments = Comments;
