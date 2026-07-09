import { describe, it, expect, beforeEach } from 'vitest';
import { UserRepository } from '../repositories/UserRepository';
import db from '../lib/db';

describe('UserRepository', () => {
  beforeEach(() => {
    db.prepare('DELETE FROM users').run();
  });

  it('should create and find a user', () => {
    const user = UserRepository.createUser({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');

    const found = UserRepository.findById(user.id);
    expect(found).toBeDefined();
    expect(found?.email).toBe('test@example.com');
  });

  it('should find a user by email', () => {
    UserRepository.createUser({
      email: 'find@example.com',
      password: 'password123'
    });

    const found = UserRepository.findByEmail('find@example.com');
    expect(found).toBeDefined();
    expect(found?.email).toBe('find@example.com');
  });

  it('should update a user including criteria and stats', () => {
    const user = UserRepository.createUser({
      email: 'update@example.com',
      password: 'password'
    });

    const criteria = [{ label: 'Age', value: '25' }];
    const stats = [{ label: 'Reviews', value: 10 }];
    const badges = ['Top Reviewer'];
    const updated = UserRepository.updateUser(user.id, {
      name: 'Updated Name',
      bio: 'New bio',
      location: 'Paris',
      avatarUrl: 'http://image.com',
      criteria,
      stats,
      badges
    });

    expect(updated?.name).toBe('Updated Name');
    expect(updated?.bio).toBe('New bio');
    expect(updated?.location).toBe('Paris');
    expect(updated?.avatarUrl).toBe('http://image.com');
    expect(updated?.criteria).toEqual(criteria);
    expect(updated?.stats).toEqual(stats);
    expect(updated?.badges).toEqual(badges);

    const fresh = UserRepository.findById(user.id);
    expect(fresh?.name).toBe('Updated Name');
    expect(fresh?.criteria).toEqual(criteria);
    expect(fresh?.stats).toEqual(stats);
    expect(fresh?.badges).toEqual(badges);
  });
});
