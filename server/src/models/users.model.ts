import { multipleColumnSet } from '../utils/common.utils';
import pool from '../db/db.config';
import IUser from '../interfaces/user.interface';

interface IReturnedRows {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    info?: string;
    serverStatus?: number;
    warningStatus?: number;
    changedRows?: number;
}

class userModel {
    _table = 'users';

    read = async (params: object = {}) => {
        let sql = `SELECT * FROM ${this._table}`;

        if (!Object.keys(params).length) {
            const [rows] = await pool.query<IUser[]>(sql, []);
            return rows;
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const [rows] = await pool.query<IUser[]>(sql, [...values]);

        return rows;
    };

    find = async (params: object): Promise<IUser> => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql = `SELECT * FROM ${this._table} WHERE ${columnSet}`;
        const [rows] = await pool.query<IUser[]>(sql, [...values]);
        return rows[0];
    };

    create = async (user: IUser) => {
        // uuid lub NULL
        const sql = `INSERT INTO ${this._table}(id, email, password_digest, username, birth_date, gender, send_newsletter) VALUES(NULL, ?, ?, ?, ?, ?, ?)`;
        const {
            email,
            password,
            username,
            birthDay,
            birthMonth,
            birthYear,
            gender,
            isSubscribedToNewsletter,
        } = user;
        const [rows] = await pool.query<IUser[]>(sql, [
            email,
            password,
            username,
            `${birthYear}-${birthMonth}-${birthDay}`,
            gender,
            isSubscribedToNewsletter,
        ]);
        const result = rows as IReturnedRows;

        return result ? result.affectedRows : 0;
    };

    update = async (id: string, params: object) => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql = `UPDATE ${this._table} SET ${columnSet} WHERE id = ?`;
        const [rows] = await pool.query(sql, [...values, id]);
        const result = rows as IReturnedRows;

        return result;
    };

    delete = async (id: string) => {
        const sql = `DELETE FROM ${this._table} WHERE id = ?`;
        const [rows] = await pool.query(sql, [id]);
        const result = rows as IReturnedRows;

        return result ? result.affectedRows : 0;
    };
}

export default new userModel();
