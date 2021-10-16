export const multipleColumnSet = (object: object) => {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const columnSet: string = keys.map((key) => `${key} = ?`).join(', ');

    return {
        columnSet,
        values,
    };
};
