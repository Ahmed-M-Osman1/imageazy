"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var localport = 3002;
app.use(routes_1.default);
app.listen(localport, function () {
    console.log('App is working on port: ' + localport);
});
exports.default = app;
