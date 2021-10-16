"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const songs_1 = __importDefault(require("../controllers/songs"));
const router = (0, express_1.Router)();
router.get('/songs', songs_1.default.getSongs);
router.get('/songs/:id', songs_1.default.getSong);
router.post('/songs', songs_1.default.addSong);
router.put('/songs/:id', songs_1.default.updateSong);
router.delete('/songs/:id', songs_1.default.deleteSong);
module.exports = router;
//# sourceMappingURL=songs.js.map