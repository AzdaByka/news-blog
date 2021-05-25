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
exports.Categories = void 0;
var typeorm_1 = require("typeorm");
var Articles_1 = require("./Articles");
var Categories = /** @class */ (function () {
    function Categories() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" }),
        __metadata("design:type", Number)
    ], Categories.prototype, "id");
    __decorate([
        typeorm_1.Column("character varying", { name: "name", unique: true, length: 255 }),
        __metadata("design:type", String)
    ], Categories.prototype, "name");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "createdAt" }),
        __metadata("design:type", Date)
    ], Categories.prototype, "createdAt");
    __decorate([
        typeorm_1.Column("timestamp with time zone", { name: "updatedAt" }),
        __metadata("design:type", Date)
    ], Categories.prototype, "updatedAt");
    __decorate([
        typeorm_1.ManyToOne(function () { return Articles_1.Articles; }, function (articles) { return articles.categories; }, {
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "articleId", referencedColumnName: "id" }]),
        __metadata("design:type", Articles_1.Articles)
    ], Categories.prototype, "article");
    Categories = __decorate([
        typeorm_1.Index("categories_pkey", ["id"], { unique: true }),
        typeorm_1.Index("categories_name_key", ["name"], { unique: true }),
        typeorm_1.Entity("categories", { schema: "public" })
    ], Categories);
    return Categories;
}());
exports.Categories = Categories;
