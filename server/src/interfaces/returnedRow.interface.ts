export default interface IReturnedRows {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    info?: string;
    serverStatus?: number;
    warningStatus?: number;
    changedRows?: number;
}
