import type { User } from './userService';
import { userStore } from '../store/userStore';
import type { UserStoreState } from '../store/userStore';

const API_URL = 'http://localhost:3000/api';

export const authService = {
  async login(credentials: Record<string, unknown>): Promise<User> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    const user = await response.json();
    userStore.setUser(user);
    return user;
  },

  logout() {
    userStore.setUser(null);
  },

  getCurrentUser(): User | null {
    const state = userStore.getState();
    if (!state.user) return null;
    
    // On reconstruit l'objet User plat si besoin, ou on adapte les appelants
    // Pour la compatibilité, on renvoie un objet qui ressemble à User
    return {
      ...state.user.personalInfo,
      dna: state.user.criteria.dna,
      preferences: state.user.preferences.settings
    } as User;
  },

  isAuthenticated(): boolean {
    return userStore.getState().isAuthenticated;
  },

  subscribeToUserChanges(listener: (state: UserStoreState) => void) {
    return userStore.subscribe(() => listener(userStore.getState()));
  }
};
