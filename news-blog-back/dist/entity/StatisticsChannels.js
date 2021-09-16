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
exports.StatisticsChannels = void 0;
var typeorm_1 = require("typeorm");
var Channels_1 = require("./Channels");
var Users_1 = require("./Users");
var StatisticsChannels = /** @class */ (function () {
    function StatisticsChannels() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], StatisticsChannels.prototype, "id");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "created_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], StatisticsChannels.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp without time zone", {
            name: "updated_at",
            "default": function () { return "now()"; }
        }),
        __metadata("design:type", Date)
    ], StatisticsChannels.prototype, "updatedAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return Channels_1.Channels; }, function (channels) { return channels.statisticsChannels; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "channel_id", referencedColumnName: "id" }]),
        __metadata("design:type", Channels_1.Channels)
    ], StatisticsChannels.prototype, "channel");
    __decorate([
        typeorm_1.ManyToOne(function () { return Users_1.Users; }, function (users) { return users.statisticsChannels; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "id" }]),
        __metadata("design:type", Users_1.Users)
    ], StatisticsChannels.prototype, "user");
    StatisticsChannels = __decorate([
        typeorm_1.Index("statisticschannels_pk", ["id"], { unique: true }),
        typeorm_1.Entity("statisticsChannels", { schema: "public" })
    ], StatisticsChannels);
    return StatisticsChannels;
}());
exports.StatisticsChannels = StatisticsChannels;
