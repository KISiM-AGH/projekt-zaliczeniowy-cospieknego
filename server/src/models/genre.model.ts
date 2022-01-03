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
        sql += ` WHERE ${columnSet};`;
        const [rows] = await pool.query<IGenre[]>(sql, [...values]);

        return rows;
    };

    find = async (params: object): Promise<IGenre> => {
        const { columnSet, values } = multipleColumnSet(params);
        const sql1 = `SELECT name as genre, theme_color FROM ${this._table} g
                    WHERE ${columnSet};`;
        const sql2 = `SELECT title, a.name as artist, a.slug as artist_slug, ab.name as album, ab.slug as album_slug, duration, is_explicit, audio_url FROM tracks_genres tg
                    JOIN tracks t ON tg.track_id = t.id
                    JOIN artists a ON t.artist_id = a.id
                    JOIN albums ab ON t.album_id = ab.id
                    JOIN ${this._table} g on tg.genre_id = g.id
                    WHERE g.${columnSet};`;
        const [genres] = await pool.query<IGenre[]>(sql1, [...values]);
        const [tracks] = await pool.query<IGenre[]>(sql2, [...values]);
        return { ...genres[0], tracks };
    };

    create = async (genre: IGenre) => {
        // uuid lub NULL
        const sql = `INSERT INTO ${this._table}(id, name, slug, theme_color) VALUES(NULL, ?, ?, ?);`;
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
        const sql = `UPDATE ${this._table} SET ${columnSet} WHERE id = ?;`;
        const [rows] = await pool.query(sql, [...values, id]);
        const result = rows as IReturnedRows;

        return result;
    };

    delete = async (id: string) => {
        const sql = `DELETE FROM ${this._table} WHERE id = ?;`;
        const [rows] = await pool.query(sql, [id]);
        const result = rows as IReturnedRows;

        return result ? result.affectedRows : 0;
    };
}

export default new genreModel();
