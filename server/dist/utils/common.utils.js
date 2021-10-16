"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleColumnSet = void 0;
const multipleColumnSet = (object) => {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const columnSet = keys.map((key) => `${key} = ?`).join(', ');
    return {
        columnSet,
        values,
    };
};
exports.multipleColumnSet = multipleColumnSet;
//# sourceMappingURL=common.utils.js.map