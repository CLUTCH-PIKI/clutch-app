import db from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  badges?: string[];
  stats?: { label: string; value: number | string }[];
  criteria?: Record<string, unknown> | { label: string; value: string; type?: string; color: string; options?: string[] }[];
  preferences?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export class UserRepository {
  static createUser(user: Omit<User, 'id'>): User {
    const id = uuidv4();
    const { email, password, name, bio, location, avatarUrl, badges, stats, criteria, preferences } = user;
    const stmt = db.prepare(`
      INSERT INTO users (id, email, password, name, bio, location, avatarUrl, badges, stats, criteria, preferences)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id, 
      email, 
      password, 
      name, 
      bio, 
      location || null,
      avatarUrl || null,
      badges ? JSON.stringify(badges) : null,
      stats ? JSON.stringify(stats) : null,
      criteria ? JSON.stringify(criteria) : null,
      preferences ? JSON.stringify(preferences) : null
    );
    return this.findById(id)!;
  }

  static findByEmail(email: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = stmt.get(email) as any;
    if (!user) return null;
    return {
      ...user,
      badges: user.badges ? JSON.parse(user.badges) : undefined,
      stats: user.stats ? JSON.parse(user.stats) : undefined,
      criteria: user.criteria ? JSON.parse(user.criteria) : undefined,
      preferences: user.preferences ? JSON.parse(user.preferences) : undefined
    };
  }

  static findById(id: string): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = stmt.get(id) as any;
    if (!user) return null;
    return {
      ...user,
      badges: user.badges ? JSON.parse(user.badges) : undefined,
      stats: user.stats ? JSON.parse(user.stats) : undefined,
      criteria: user.criteria ? JSON.parse(user.criteria) : undefined,
      preferences: user.preferences ? JSON.parse(user.preferences) : undefined
    };
  }

  static updateUser(id: string, updates: Partial<Omit<User, 'id' | 'email'>>): User | null {
    const fields = Object.keys(updates);
    if (fields.length === 0) return this.findById(id);

    const jsonFields = ['preferences', 'criteria', 'badges', 'stats'];
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => {
      if (jsonFields.includes(field)) return JSON.stringify(updates[field as keyof typeof updates]);
      return updates[field as keyof typeof updates];
    });

    const stmt = db.prepare(`
      UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    stmt.run(...values, id);

    return this.findById(id);
  }
}
