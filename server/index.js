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
    let root_locations = [];
    locations.forEach(location => {
        if (!location.parent) {
            root_locations.push(location)
        }
    });
    return res.json(root_locations);
});

app.get("/api/locations/:locationId/locations", async (req, res) => {
    let locations = await db.getAll('locations');
    let locationId = req.params.locationId;
    let parent_locations = [];
    locations.forEach(location => {
        if (location.parent === locationId) {
            parent_locations.push(location)
        }
    });
    return res.json(parent_locations);
});

app.post("/api/locations", async (req, res) => {
    let id = nanoid(10),
        data = {
            "id": id,
            "name": req.body.name,
            "parent": req.body.parent
        };
    await db.save('locations', data);
    return res.json(data);
});

app.get("/api/locations/:locationId", async (req, res) => {
    let location = await db.getOne('locations', req.params.locationId);
    return res.json(location);
});

app.get("/api/locations/:locationId/books", async (req, res) => {
    let locationId = req.params.locationId;
    let books = await db.getAll('books');

    let location_books = [];
    books.forEach(book => {
        if (book.location === locationId) {
            location_books.push(book)
        }
    });
    return res.json(location_books);
});

app.put("/api/locations/:locationId", async (req, res) => {
    let locationId = req.params.locationId,
        location = await db.getOne('locations', locationId);
    let data = {
        "id": location.id,
        "title": req.body.name,
        "parent": req.body.parent
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
    let id = nanoid(10),
    data = {
        "id": id,
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