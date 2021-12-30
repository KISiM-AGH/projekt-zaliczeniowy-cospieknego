import { multipleColumnSet } from '../utils/common.utils';
import pool from '../db/db.config';
import IReturnedRows from '../interfaces/returnedRow.interface';
import ISong from '../interfaces/song.interface';

class songModel {
    _table = 'songs';

    read = async (params: object = {}) => {
        let sql = `SELECT artists.name as artist, title, albums.name as album, albums.slug, duration, lyrics FROM ${this._table} INNER JOIN artists ON ${this._table}.artist_id = artists.id INNER JOIN albums ON songs.album_id = albums.id`;

        if (!Object.keys(params).length) {
            const [rows] = await pool.query<ISong[]>(sql, []);
            return rows;
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;
        const [rows] = await pool.query<ISong[]>(sql, [...values]);

        return rows;
    };

    find = async (params: object): Promise<ISong> => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql = `SELECT * FROM ${this._table} WHERE ${columnSet}`;
        const [rows] = await pool.query<ISong[]>(sql, [...values]);
        return rows[0];
    };

    create = async (song: ISong) => {
        const sql = `INSERT INTO ${this._table}(id, title, duration, audio_url, artist_id, album_id, lyrics) VALUES(NULL, ?, ?, ?, ?, ?, ?)`;
        const { title, duration, audio_url, artist_id, album_id, lyrics } =
            song;
        const [rows] = await pool.query<ISong[]>(sql, [
            title,
            duration,
            audio_url,
            artist_id,
            album_id,
            lyrics,
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

export default new songModel();
