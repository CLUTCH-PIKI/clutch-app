
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
  criteria?: {
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

export interface User {
  personalInfo: PersonalInfo;
  preferences: UserPreferences;
  criteria: UserCriteria;
}

export interface UserStoreState {
  user: User | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'clutch_user';

// Helper pour transformer l'objet User plat de l'API vers notre structure de store
export const transformToStoreUser = (apiUser: Record<string, unknown>): User => {
  if (!apiUser) return null as unknown as User;
  
  return {
    personalInfo: {
      id: apiUser.id as string,
      email: apiUser.email as string,
      name: (apiUser.name as string) || '',
      bio: (apiUser.bio as string) || '',
      location: (apiUser.location as string) || 'Paris, France',
      avatarUrl: (apiUser.avatarUrl as string) || 'https://via.placeholder.com/300x400?text=Profile+Photo',
      badges: (apiUser.badges as string[]) || ['Membre Clutch'],
      stats: (apiUser.stats as PersonalInfo['stats']) || [
        { label: 'Avis', value: 0 },
        { label: 'Likes', value: 0 },
        { label: 'Loops', value: 0 },
        { label: 'Points', value: 0 }
      ],
    },
    criteria: {
      criteria: Array.isArray(apiUser.criteria) 
        ? apiUser.criteria as UserCriteria['criteria']
        : (apiUser.criteria as Record<string, unknown>)?.criteria as UserCriteria['criteria'] || [],
    },
    preferences: {
      settings: (apiUser.preferences as Record<string, unknown>) || (apiUser.settings as Record<string, unknown>) || {},
      theme: ((apiUser.preferences as Record<string, unknown>)?.theme as 'light' | 'dark') || ((apiUser.preferences as Record<string, unknown>) as { theme?: 'light' | 'dark' })?.theme || 'light',
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
        const apiUser = JSON.parse(data);
        this.state.user = transformToStoreUser(apiUser);
        this.state.isAuthenticated = true;
      } catch (e) {
        console.error('Failed to load user from storage', e);
      }
    }
  }

  getState(): UserStoreState {
    return { ...this.state };
  }

  setUser(apiUser: Record<string, unknown> | null) {
    if (apiUser) {
      this.state.user = transformToStoreUser(apiUser);
      this.state.isAuthenticated = true;
      localStorage.setItem(AUTH_KEY, JSON.stringify(apiUser));
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
