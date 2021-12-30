import { multipleColumnSet } from '../utils/common.utils';
import pool from '../db/db.config';
import IReturnedRows from '../interfaces/returnedRow.interface';
import IAlbum from '../interfaces/album.interface';

class albumModel {
    _table = 'albums';

    read = async (params: object = {}) => {
        let sql = `SELECT albums.name, year, albums.slug, artists.name as artist FROM ${this._table} INNER JOIN artists ON ${this._table}.artist_id = artists.id`;

        if (!Object.keys(params).length) {
            const [rows] = await pool.query<IAlbum[]>(sql, []);
            return rows;
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const [rows] = await pool.query<IAlbum[]>(sql, [...values]);

        return rows;
    };

    find = async (params: object): Promise<IAlbum> => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql = `SELECT * FROM ${this._table} WHERE ${columnSet}`;
        const [rows] = await pool.query<IAlbum[]>(sql, [...values]);
        return rows[0];
    };

    create = async (album: IAlbum) => {
        const sql = `INSERT INTO ${this._table}(id, name, year, slug, artist_id) VALUES(NULL, ?, ?, ?, ?)`;
        const { name, year, slug, artist_id } = album;
        const [rows] = await pool.query<IAlbum[]>(sql, [
            name,
            year,
            slug,
            artist_id,
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

export default new albumModel();
