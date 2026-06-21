import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should store user on successful login', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const user = await authService.login({ email: 'test@example.com', password: 'password' });
    
    expect(user).toEqual(mockUser);
    expect(localStorage.getItem('clutch_user')).toBe(JSON.stringify(mockUser));
  });

  it('should return current user from localStorage', () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    localStorage.setItem('clutch_user', JSON.stringify(mockUser));

    const user = authService.getCurrentUser();
    expect(user).toEqual(mockUser);
  });

  it('should logout by removing item from localStorage', () => {
    localStorage.setItem('clutch_user', 'some-data');
    authService.logout();
    expect(localStorage.getItem('clutch_user')).toBeNull();
  });
});
