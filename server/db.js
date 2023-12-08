
const { JsonDB, Config } = require("node-json-db");
const db = new JsonDB(new Config("books", true, false, '/'));

const DB = class {
    async getIndex(collection, id) {
        return await db.getIndex("/" + collection, id);
    }
    async getAll(collection) {
        try {
            return await db.getData("/" + collection);
        } catch (error) {
            return [];
        }
    }
    async save(collection, data) {
        return await db.push("/" + collection + "[]", data, true);
    }
    async getOne(collection, id) {
        let data, inx = await this.getIndex(collection, id);
        try {
            data = await db.getData("/" + collection + "[" + inx + "]");
        } catch (error) {
            data = {};
        }
        return data;
    }
    async update(collection, id, data) {
        try {
            let inx = await this.getIndex(collection, id);
            await db.push("/" + collection + "[" + inx + "]", data);
            return this.getOne(collection, id);
        } catch (error) {
            return
        }
    }
    async delete(collection, id) {
        try {
            let inx = await this.getIndex(collection, id);
            return await db.delete("/" + collection + "[" + inx + "]");
        } catch (error) {
            return
        }
    }
}

exports.DB = DB;