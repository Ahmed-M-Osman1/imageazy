"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("../../util/sharp"));
var resizeAPI = (0, express_1.Router)();
resizeAPI.get('/', function (req, res) {
    // get the name of the file.
    var name = req.query.filename;
    var width = Number(req.query.width);
    var hieght = Number(req.query.hieght);
    console.log('check : ', name);
    console.log('check : ', hieght);
    console.log('check : ', typeof width); // get all file names on the images folder.
    var ImagePath = path_1.default.resolve('./images');
    var OutputPath = path_1.default.resolve('./') + '/out/';
    var filesOnInputFolder = [];
    // use fs readdir function to read the folder:
    fs_1.default.readdir(ImagePath, function (err, files) {
        if (err) {
            throw err;
        }
        // get all files name:
        files.forEach(function (file) {
            // parse the file name. TO remove the extention.
            var fileName = path_1.default.parse(file);
            filesOnInputFolder.push(fileName.name);
            if (filesOnInputFolder.includes(name)) {
                return photoFound;
            }
        });
    });
    var photoFound = function () {
        var isFileExist = filesOnInputFolder.includes(name);
        console.log(isFileExist);
        if (isFileExist) {
            return (0, sharp_1.default)(ImagePath + '/' + name + '.jpg', hieght, width, OutputPath + '/' + name);
        }
        else {
            return console.log('not exist');
        }
    };
});
exports.default = resizeAPI;
