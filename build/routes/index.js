"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var resizeAPI_1 = __importDefault(require("./api/resizeAPI"));
var routes = (0, express_1.Router)();
routes.get('/', function (req, res) {
    res
        .status(200)
        .send('Welcome to ImagEasy: An Image processer API that will resize your Image. simply add the fileName, hieght and width ');
});
routes.use('/resize', resizeAPI_1.default);
exports.default = routes;
