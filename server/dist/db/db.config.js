"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = (0, mysql2_1.createConnection)({
    host: process.env.HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABASE || 'music_library',
});
pool.connect((err) => {
    if (err)
        throw err;
});
exports.default = pool;
//# sourceMappingURL=db.config.js.map