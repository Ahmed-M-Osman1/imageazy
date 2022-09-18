"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var resizeAPI = (0, express_1.Router)();
resizeAPI.get('/', function (req, res) {
    var name = req.query.name;
    console.log(name);
    var pathName = path_1.default.resolve('../../../images');
    console.log(pathName);
});
exports.default = resizeAPI;
