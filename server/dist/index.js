"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const songs_1 = __importDefault(require("./routes/songs"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});
// Routes
app.use('/api/v1', songs_1.default);
// Error handling
app.use('*', (req, res) => {
    const error = new Error('Endpoint not found!');
    return res.status(404).json({
        message: error.message,
    });
});
app.listen(port, () => 
// tslint:disable-next-line:no-console
console.log(`Running on http://localhost:${port}`));
//# sourceMappingURL=index.js.map