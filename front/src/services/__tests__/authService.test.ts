import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';
import { userStore } from '../../store/userStore';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
    userStore.setUser(null);
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

  it('should return current user from store', () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    userStore.setUser(mockUser as Parameters<typeof userStore.setUser>[0]);

    const user = authService.getCurrentUser();
    expect(user?.id).toBe(mockUser.id);
    expect(user?.email).toBe(mockUser.email);
  });

  it('should logout by clearing store', () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    userStore.setUser(mockUser as Parameters<typeof userStore.setUser>[0]);
    authService.logout();
    expect(userStore.getState().user).toBeNull();
    expect(localStorage.getItem('clutch_user')).toBeNull();
  });
});
