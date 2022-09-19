"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var findPhoto = function (path, name) {
    var filesOnInputFolder = [];
    fs_1.default.readdirSync(path).forEach(function (file) {
        // edit the file name. TO remove the extention. using regix
        var fileName = file.replace(/\.[^/.]+$/, '');
        filesOnInputFolder.push(fileName);
    });
    return filesOnInputFolder.includes(name) ? true : false;
};
exports.default = findPhoto;
