"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var log4js_1 = __importDefault(require("log4js"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var index_1 = __importDefault(require("./routes/index"));
var errorhandler_1 = __importDefault(require("errorhandler"));
typeorm_1.createConnection();
dotenv_1["default"].config();
var logger = log4js_1["default"].getLogger();
logger.level = process.env.LOG_LEVEL;
var app = express_1["default"]();
var port = process.env.PORT;
/** Parse the body of the request */
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json());
app.use(errorhandler_1["default"]());
app.use(cors_1["default"]());
app.use(morgan_1["default"]('dev'));
app.use('/api', index_1["default"]);
app.listen(port, function () { return console.log("Running on port " + port); });
