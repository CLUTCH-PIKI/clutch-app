import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Support Railway Volumes or local development
const dbPath = process.env.DATABASE_PATH || path.resolve(process.cwd(), 'clutch.db');

// Ensure directory exists to avoid crash if /data or other path is missing
const dbDir = path.dirname(dbPath);
console.log(`Checking database directory: ${dbDir}`);
if (!fs.existsSync(dbDir)) {
  console.log(`Creating database directory: ${dbDir}`);
  try {
    fs.mkdirSync(dbDir, { recursive: true });
  } catch (err) {
    console.error(`Failed to create database directory: ${err}`);
  }
}

console.log(`Initializing database at: ${dbPath}`);
let db;
try {
  db = new Database(dbPath);
  console.log('Database initialized successfully');
} catch (err) {
  console.error(`Failed to initialize database: ${err}`);
  // Fallback to in-memory if persistent fails, to avoid 502
  console.log('Falling back to in-memory database');
  db = new Database(':memory:');
}

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    bio TEXT,
    location TEXT,
    avatarUrl TEXT,
    badges JSON,
    stats JSON,
    criteria JSON,
    preferences JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
