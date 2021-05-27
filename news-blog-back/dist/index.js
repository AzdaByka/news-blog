"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var index_1 = __importDefault(require("./routes/index"));
typeorm_1.createConnection();
dotenv_1["default"].config();
// let logger = log4js.getLogger()
// logger.level = process.env.LOG_LEVEL
var app = express_1["default"]();
var port = "3001";
/** Parse the body of the request */
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json());
app.use(cors_1["default"]());
app.use(morgan_1["default"]('dev'));
app.use('/api', index_1["default"]);
app.listen(port, function () { return console.log("Running on port " + port); });
