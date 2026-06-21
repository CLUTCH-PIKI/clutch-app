import db from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  bio?: string;
  preferences?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export class UserRepository {
  static createUser(user: Omit<User, 'id'>): User {
    const id = uuidv4();
    const { email, password, name, bio, preferences } = user;
    const stmt = db.prepare(`
      INSERT INTO users (id, email, password, name, bio, preferences)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, email, password, name, bio, preferences ? JSON.stringify(preferences) : null);
    return this.findById(id)!;
  }

  static findByEmail(email: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email) as {
      id: string;
      email: string;
      password?: string;
      name?: string;
      bio?: string;
      preferences?: string;
      created_at?: string;
      updated_at?: string;
    } | undefined;
    if (!user) return null;
    return {
      ...user,
      preferences: user.preferences ? JSON.parse(user.preferences) : undefined
    };
  }

  static findById(id: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id) as {
      id: string;
      email: string;
      password?: string;
      name?: string;
      bio?: string;
      preferences?: string;
      created_at?: string;
      updated_at?: string;
    } | undefined;
    if (!user) return null;
    return {
      ...user,
      preferences: user.preferences ? JSON.parse(user.preferences) : undefined
    };
  }

  static updateUser(id: string, updates: Partial<Omit<User, 'id' | 'email'>>): User | null {
    const fields = Object.keys(updates);
    if (fields.length === 0) return this.findById(id);

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => {
      if (field === 'preferences') return JSON.stringify(updates[field as keyof typeof updates]);
      return updates[field as keyof typeof updates];
    });

    const stmt = db.prepare(`
      UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    stmt.run(...values, id);

    return this.findById(id);
  }
}
