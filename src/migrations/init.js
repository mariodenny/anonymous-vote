import db from "$lib/db";

async function migrate() {
    const database = await db

    // Table user for admin
    await database.run(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY NOT NULL,
            email TEXT UNIQUE NOT NULL,
            username TEXT NOT NULL,
            password TEXT UNIQUE NOT NULL        
        )        
    `)

    // Table votes
    await database.run(`
        CREATE TABLE IF NOT EXISTS votes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            options TEXT NOT NULL,
            max_voters INTEGER NOT NULL,
            link_uuid TEXT UNIQUE NOT NULL,
            status BOOLEAN DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     )   
    `)
    // Table vote_tokens
    await database.run(`
        CREATE TABLE IF NOT EXISTS vote_tokens(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vote_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            is_used BOOLEAN DEFAULT FALSE,
            used_at DATETIME,
            ip_address TEXT,
            user_agent TEXT,
            cookie_id TEXT,
            FOREIGN KEY (vote_id) REFERENCES votes(id)
        )
    `)

    // Table vote_results (Encrypted Votes)
    await database.run(`
        CREATE TABLE IF NOT EXISTS vote_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vote_id INTEGER NOT NULL,
            token TEXT NOT NULL,
            encrypted_data TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (vote_id) REFERENCES votes(id),
            FOREIGN KEY (token) REFERENCES vote_tokens(token)
        )
    `)


}