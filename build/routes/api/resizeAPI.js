"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var findPhoto_1 = __importDefault(require("./findPhoto"));
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("../../util/sharp"));
var resizeAPI = (0, express_1.Router)();
resizeAPI.get('/', function (req, res) {
    // get the name of the file, width and hieght.
    var name = req.query.filename;
    var width = Number(req.query.width);
    var hieght = Number(req.query.hieght);
    // get both folder (input and output) path.
    var ImagePath = path_1.default.resolve('./images');
    var OutputPath = (path_1.default.resolve('./') + '/output/');
    // know the cached Photo path (to check of it's exists)
    var cachedPhotoName = OutputPath + '/' + name + '_' + hieght + '_' + width + '.jpg';
    // return the photo (I make it as function so I can reuse it)
    var cropPhoto = function (ImagePath, name, hieght, width, OutputPath) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, sharp_1.default)(ImagePath + '/' + name + '.jpg', hieght, width, OutputPath + '/' + name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.status(200).sendFile(cachedPhotoName)];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // check if the photo is cashed or the photo is exit in the image folder.
    var isPhotoCashed = (0, fs_1.existsSync)(cachedPhotoName);
    var isPhotoExist = (0, findPhoto_1.default)(ImagePath, name);
    if (name === undefined || isNaN(width) || isNaN(hieght)) {
        return res
            .status(400)
            .send("Bad Request. Ether File name, Width or Hieght is missing. please use: resize?filename='File Name'&width=' Number'&hieght=' Number' in your URL");
    }
    else if (isPhotoCashed) {
        return res.status(200).sendFile(cachedPhotoName);
    }
    else if (isPhotoExist) {
        return cropPhoto(ImagePath, name, hieght, width, OutputPath);
    }
    else {
        return res
            .status(400)
            .send('The file you Request is not available please choose anthor file.');
    }
});
exports.default = resizeAPI;
