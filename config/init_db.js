const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données SQLite :', err);
    } else {
        console.log('Connexion réussie à la base de données SQLite');
    }
});

const createTables = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('student', 'teacher', 'admin')) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projectors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status TEXT CHECK(status IN ('working', 'broken')) NOT NULL DEFAULT 'working',
        available INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        projector_id INTEGER NOT NULL,
        datetime TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (projector_id) REFERENCES projectors(id) ON DELETE CASCADE
    );
`;

db.exec(createTables, (err) => {
    if (err) {
        console.error('Erreur lors de la création des tables :', err);
    } else {
        console.log('Tables créées avec succès');
    }
});

module.exports = db;
