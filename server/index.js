const express = require("express");
const { nanoid } = require('nanoid');
const { DB } = require('./db');

const db = new DB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

// locations

app.get("/api/locations", async (req, res) => {
    let locations = await db.getAll('locations');
    return res.json(locations);
});

app.post("/api/locations", async (req, res) => {
    let data = {
        "id": nanoid(10),
        "name": req.body.name,
        "parent": req.body.location
    }
    let book = await db.save('locations', data);
    return res.json(book);
});

app.get("/api/locations/:locationId", async (req, res) => {
    let book = await db.getOne('locations', req.params.locationId);
    return res.json(book);
});

app.put("/api/locations/:locationId", async (req, res) => {
    let locationId = req.params.locationId,
        location = await db.getOne('locations', locationId);
    let data = {
        "id": location.id,
        "title": req.body.name,
        "parent": req.body.location
    }
    location = await db.update('locations', locationId, data);
    return res.json(location);
});

app.delete("/api/locations/:locationId", async (req, res) => {
    await db.delete('locations', req.params.locationId);
    return res.json({});
});

// books

app.get("/api/books", async (req, res) => {
    let books = await db.getAll('books');
    return res.json(books);
});

app.post("/api/books", async (req, res) => {
    let data = {
        "id": nanoid(10),
        "title": req.body.title,
        "location": req.body.location
    }
    let book = await db.save('books', data);
    return res.json(book);
});

app.get("/api/books/:bookId", async (req, res) => {
    let book = await db.getOne('books', req.params.bookId);
    return res.json(book);
});

app.put("/api/books/:bookId", async (req, res) => {
    let bookId = req.params.bookId,
        book = await db.getOne('books', bookId);
    let data = {
        "id": book.id,
        "title": req.body.title,
        "location": req.body.location
    }
    book = await db.update('books', bookId, data);
    return res.json(book);
});

app.delete("/api/books/:bookId", async (req, res) => {
    await db.delete('books', req.params.bookId);
    return res.json({});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));