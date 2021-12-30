import { multipleColumnSet } from '../utils/common.utils';
import pool from '../db/db.config';
import IReturnedRows from '../interfaces/returnedRow.interface';
import IGenre from '../interfaces/genre.interface';

class genreModel {
    _table = 'genres';

    read = async (params: object = {}) => {
        let sql = `SELECT * FROM ${this._table}`;

        if (!Object.keys(params).length) {
            const [rows] = await pool.query<IGenre[]>(sql, []);
            return rows;
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const [rows] = await pool.query<IGenre[]>(sql, [...values]);

        return rows;
    };

    find = async (params: object): Promise<IGenre> => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql = `SELECT * FROM ${this._table} WHERE ${columnSet}`;
        const [rows] = await pool.query<IGenre[]>(sql, [...values]);
        return rows[0];
    };

    create = async (genre: IGenre) => {
        // uuid lub NULL
        const sql = `INSERT INTO ${this._table}(id, name, slug, theme_color) VALUES(NULL, ?, ?, ?)`;
        const { name, slug, theme_color } = genre;
        const [rows] = await pool.query<IGenre[]>(sql, [
            name,
            slug,
            theme_color,
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

export default new genreModel();
