import type { User } from '../services/userService';

export interface PersonalInfo {
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
}

export interface UserCriteria {
  dna?: {
    label: string;
    value: string;
    type?: string;
    color: string;
    options?: string[];
  }[];
}

export interface UserPreferences {
  settings?: Record<string, unknown>;
  notifications?: boolean;
  theme?: 'light' | 'dark';
}

export interface UserStoreState {
  user: {
    personalInfo: PersonalInfo;
    preferences: UserPreferences;
    criteria: UserCriteria;
  } | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'clutch_user';

// Helper pour transformer l'objet User plat de l'API vers notre structure de store
export const transformToStoreUser = (user: User): UserStoreState['user'] => {
  if (!user) return null;
  
  return {
    personalInfo: {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      location: user.location,
      avatarUrl: user.avatarUrl,
      badges: user.badges,
      stats: user.stats,
    },
    criteria: {
      dna: user.dna,
    },
    preferences: {
      settings: (user.preferences as Record<string, unknown>) || {},
      theme: (user.preferences?.theme as 'light' | 'dark') || 'light',
    }
  };
};

// Singleton pour gérer l'état global du côté client (React Context pourrait être utilisé pour la réactivité)
// Pour l'instant, nous implémentons un store simple qui pourra être wrappé dans un Context si besoin
class UserStore {
  private state: UserStoreState = {
    user: null,
    isAuthenticated: false,
  };

  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const data = localStorage.getItem(AUTH_KEY);
    if (data) {
      try {
        const user = JSON.parse(data) as User;
        this.state.user = transformToStoreUser(user);
        this.state.isAuthenticated = true;
      } catch (e) {
        console.error('Failed to load user from storage', e);
      }
    }
  }

  getState(): UserStoreState {
    return { ...this.state };
  }

  setUser(user: User | null) {
    if (user) {
      this.state.user = transformToStoreUser(user);
      this.state.isAuthenticated = true;
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      this.state.user = null;
      this.state.isAuthenticated = false;
      localStorage.removeItem(AUTH_KEY);
    }
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const userStore = new UserStore();
