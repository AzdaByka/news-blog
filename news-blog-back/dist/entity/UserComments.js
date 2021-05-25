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
exports.UserComments = void 0;
var typeorm_1 = require("typeorm");
var Comments_1 = require("./Comments");
var Users_1 = require("./Users");
var UserComments = /** @class */ (function () {
    function UserComments() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], UserComments.prototype, "id");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "createdAt" }),
        __metadata("design:type", Date)
    ], UserComments.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "updatedAt" }),
        __metadata("design:type", Date)
    ], UserComments.prototype, "updatedAt");
    __decorate([
        typeorm_1.Column("integer", { name: "userId", nullable: true, unique: true }),
        __metadata("design:type", Number)
    ], UserComments.prototype, "userId");
    __decorate([
        typeorm_1.Column("integer", { name: "commentId", nullable: true, unique: true }),
        __metadata("design:type", Number)
    ], UserComments.prototype, "commentId");
    __decorate([
        typeorm_1.ManyToOne(function () { return Comments_1.Comments; }, function (comments) { return comments.userComments; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "commentId", referencedColumnName: "id" }]),
        __metadata("design:type", Comments_1.Comments)
    ], UserComments.prototype, "comment");
    __decorate([
        typeorm_1.ManyToOne(function () { return Users_1.Users; }, function (users) { return users.userComments; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "userId", referencedColumnName: "id" }]),
        __metadata("design:type", Users_1.Users)
    ], UserComments.prototype, "user");
    UserComments = __decorate([
        typeorm_1.Index("user_comments_userId_commentId_key", ["commentId", "userId"], {
            unique: true
        }),
        typeorm_1.Index("user_comments_pkey", ["id"], { unique: true }),
        typeorm_1.Entity("user_comments", { schema: "public" })
    ], UserComments);
    return UserComments;
}());
exports.UserComments = UserComments;
