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
exports.findAll = void 0;
const db_config_1 = __importDefault(require("../db/db.config"));
const common_utils_1 = require("../utils/common.utils");
const poolPromise = db_config_1.default.promise();
const _table = 'songs';
const findAll = (params = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT * FROM ${_table}`;
    if (!Object.keys(params).length)
        return yield poolPromise.query(sql, []);
    const { columnSet, values } = (0, common_utils_1.multipleColumnSet)(params);
    sql += ` WHERE ${columnSet}`;
    return yield poolPromise.query(sql, [...values]);
});
exports.findAll = findAll;
//# sourceMappingURL=songs.model.js.map