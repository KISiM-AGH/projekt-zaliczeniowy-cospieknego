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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songs_model_1 = require("../models/songs.model");
const db_config_1 = __importDefault(require("../db/db.config"));
const poolPromise = db_config_1.default.promise();
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const sql = 'SELECT * FROM songs';
    // const [rows] = await poolPromise.query(sql, []);
    // return res.status(200).json(rows);
    const songList = yield (0, songs_model_1.findAll)();
    // !songList.length && throw new Error('awdwa');
    return res.send(songList);
});
const getSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM songs WHERE `id` = ?';
    const id = req.params.id;
    const [rows] = yield poolPromise.query(sql, [id]);
    return res.status(200).json(rows);
});
const addSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield poolPromise.query('INSERT INTO `songs` () * FROM songs', []);
    res.send(rows);
});
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield poolPromise.query('SELECT * FROM songs', []);
    res.send(rows);
});
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield poolPromise.query('SELECT * FROM songs', []);
    res.send(rows);
});
exports.default = { getSongs, getSong, addSong, updateSong, deleteSong };
//# sourceMappingURL=songs.js.map