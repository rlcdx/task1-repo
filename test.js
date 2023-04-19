const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

const rawData = fs.readFileSync('./data/songs.json')
const data = JSON.parse(rawData)
console.log(data)

const db = new sqlite3.Database('./data/data.db')

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY,
        title TEXT,
        artist TEXT,
        releaseYear INTEGER
    )
  `)

    const stmt = db.prepare(`
    INSERT INTO songs (id, title, artist, releaseYear)
    VALUES (?, ?, ?, ?)
  `)

    data.forEach((row) => {
        stmt.run(row.id, row.title, row.artist, row.releaseYear)
    })

    stmt.finalize()
})

db.close()
