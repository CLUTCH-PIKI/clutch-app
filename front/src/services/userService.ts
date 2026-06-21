import { userStore } from '../store/userStore';

export interface User {
  id: string;
  email: string;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  badges?: string[];
  stats?: {
    label: string;
    value: number | string;
  }[];
  dna?: {
    label: string;
    value: string;
    type?: string;
    color: string;
    options?: string[];
  }[];
  preferences?: Record<string, unknown>;
}

const API_URL = 'http://localhost:3000/api';

export const userService = {
  async createUser(userData: Record<string, unknown>): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create user');
    }
    return response.json();
  },

  async updateUser(id: string, updates: Record<string, unknown>): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }
    const updatedUser = await response.json();
    
    // Mettre à jour le store si l'utilisateur mis à jour est celui actuellement connecté
    const currentUser = userStore.getState().user;
    if (currentUser && currentUser.personalInfo.id === id) {
      userStore.setUser(updatedUser);
    }
    
    return updatedUser;
  },
};
