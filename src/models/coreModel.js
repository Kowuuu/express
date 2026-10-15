const db = require('../services/db');

const CoreModel = {
    async getAll(table) {
        const [rows] = await db.execute('SELECT * FROM ' + table)
        return rows;
    },
    deleteById(table, id) {
        db.execute('DELETE FROM ' + table + ' WHERE id=?', [id]);
    },
    async create(table, data) {
        const fields = Object.keys(data);   //['name','email','password']
        const values = Object.values(data);
        const fieldsString = fields.join(', ')
        const placeholders = fields.map(() => '?').join(', ')
        const [result] = await db.execute("INSERT INTO " + table + " (" + fieldsString + ") VALUES (" + placeholders + ")", values);
        return result.insertId
    }
}
module.exports = CoreModel;