"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var resizeImage = function (inputFile, hieght, width, outputFile) {
    return (0, sharp_1.default)(inputFile)
        .resize(hieght, width)
        .toFile(outputFile + '.jpg');
};
exports.default = resizeImage;
