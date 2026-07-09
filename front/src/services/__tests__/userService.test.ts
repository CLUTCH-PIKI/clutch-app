import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '../userService';
import { userStore } from '../../store/userStore';

describe('userService', () => {
  beforeEach(() => {
    localStorage.clear();
    userStore.setUser(null);
    vi.restoreAllMocks();
  });

  it('should call fetch for createUser', async () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const result = await userService.createUser({ email: 'test@example.com', password: 'password', name: 'Test' });
    
    expect(result).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com', password: 'password', name: 'Test' })
      })
    );
  });

  it('should call fetch for updateUser and update store', async () => {
    const initialUser = { id: '1', email: 'test@example.com', name: 'Initial' };
    userStore.setUser(initialUser);

    const updatedUser = { id: '1', email: 'test@example.com', name: 'Updated' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(updatedUser),
    });

    const result = await userService.updateUser('1', { name: 'Updated' });
    
    expect(result).toEqual(updatedUser);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users'),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ id: '1', name: 'Updated' })
      })
    );
    
    expect(userStore.getState().user?.personalInfo.name).toBe('Updated');
  });
});
