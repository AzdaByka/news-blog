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
exports.ChannelArticles = void 0;
var typeorm_1 = require("typeorm");
var Articles_1 = require("./Articles");
var Channels_1 = require("./Channels");
var ChannelArticles = /** @class */ (function () {
    function ChannelArticles() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], ChannelArticles.prototype, "id");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "created_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], ChannelArticles.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "updated_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], ChannelArticles.prototype, "updatedAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return Articles_1.Articles; }, function (articles) { return articles.channelArticles; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "Article_id", referencedColumnName: "id" }]),
        __metadata("design:type", Articles_1.Articles)
    ], ChannelArticles.prototype, "article");
    __decorate([
        typeorm_1.ManyToOne(function () { return Channels_1.Channels; }, function (channels) { return channels.channelArticles; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "channel_id", referencedColumnName: "id" }]),
        __metadata("design:type", Channels_1.Channels)
    ], ChannelArticles.prototype, "channel");
    ChannelArticles = __decorate([
        typeorm_1.Index("channelarticles_pk", ["id"], { unique: true }),
        typeorm_1.Entity("channelArticles", { schema: "public" })
    ], ChannelArticles);
    return ChannelArticles;
}());
exports.ChannelArticles = ChannelArticles;
