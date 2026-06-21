import { userStore, type User, type UserStoreState } from '../store/userStore';

const API_URL = 'http://localhost:3000/api';

export const authService = {
  async login(credentials: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    const apiUser = await response.json();
    userStore.setUser(apiUser);
    return apiUser;
  },

  logout() {
    userStore.setUser(null);
  },

  getCurrentUser(): User | null {
    const state = userStore.getState();
    return state.user;
  },

  isAuthenticated(): boolean {
    return userStore.getState().isAuthenticated;
  },

  subscribeToUserChanges(listener: (state: UserStoreState) => void) {
    return userStore.subscribe(() => listener(userStore.getState()));
  }
};
