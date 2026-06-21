
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

// Valeurs par défaut pour les options de critères
export const DEFAULT_CRITERIA_OPTIONS: Record<string, string[]> = {
  "Tranche d'âge": ['18-24', '25-34', '35-49', '50+'],
  "Budget": ['Essentiel 0-50', 'Regulier 50-150', 'Beauty lover: 150-400', 'Expert beaute 400+'],
  "Phénotype": ['Blanc pâle', 'Clair', 'Mat', 'Brune', 'Noire', 'Darkskin'],
  "Type Cheveux": ['Raides', 'Ondulés', 'Bouclés', 'Crépus'],
  "Couleur Cheveux": ['Blond', 'Châtain', 'Roux', 'Brun', 'Noir'],
  "Style Maquillage": ['Naturel', 'Baddie', 'Softie', 'artsy'],
  "Problématiques": ['Normal', 'Seche', 'Acneique', 'Grasse', 'Mixte', 'Hyperpigmentation', 'Ridee', 'Psioriasis', 'Eczema', 'Sensibilite urbaine']
};

// Map des couleurs pour les options visuelles
export const COLOR_MAP: Record<string, string> = {
  // Phénotype
  'Blanc pâle': '#FFF5EE',
  'Clair': '#FAD4D4',
  'Mat': '#D2B48C',
  'Brune': '#8B4513',
  'Noire': '#2C1B18',
  'Darkskin': '#1A1110',
  // Couleur Cheveux
  'Blond': '#FAF0BE',
  'Châtain': '#8B4513',
  'Roux': '#D2691E',
  'Brun': '#2C1B18',
  'Noir': '#000000',
};

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
        { label: 'Evaluations', value: 0 },
        { label: 'Mes UGC', value: 0 },
        { label: 'Commissions', value: 0 },
        { label: 'Progression loop', value: 0 }
      ],
    },
    criteria: {
      criteria: Array.isArray(apiUser.criteria) && apiUser.criteria.length > 0
        ? (apiUser.criteria as { label: string; value: string; type?: string; color: string; options?: string[] }[]).map(c => {
            const options = DEFAULT_CRITERIA_OPTIONS[c.label] || c.options || [];
            let value = c.value;
            
            // Si la valeur actuelle n'est pas dans les nouvelles options, on synchronise avec les nouvelles valeurs métiers
            if (options.length > 0 && !options.includes(value)) {
              if (c.label === 'Style Maquillage') {
                if (value === 'Minimaliste') value = 'Naturel';
                else if (value === 'Sophistiqué') value = 'Baddie';
                else if (value === 'Artistique') value = 'artsy';
                else value = 'Naturel';
              } else if (c.label === 'Phénotype') {
                if (value === 'Très Clair') value = 'Blanc pâle';
                else if (value === 'Médium') value = 'Mat';
                else if (value === 'Foncé') value = 'Brune';
                else value = 'Mat';
              } else if (c.label === 'Problématiques') {
                const values = value.split(', ').filter(v => options.includes(v));
                value = values.length > 0 ? values.join(', ') : 'Mixte';
              } else {
                value = options[0];
              }
            }
            
            return {
              ...c,
              value,
              options
            };
          })
        : [
            { label: 'Tranche d\'âge', value: '25-34', type: 'Démographie', color: 'bg-blue-100 text-blue-800', options: DEFAULT_CRITERIA_OPTIONS["Tranche d'âge"] },
            { label: 'Budget', value: 'Regulier 50-150', type: 'Profil', color: 'bg-green-100 text-green-800', options: DEFAULT_CRITERIA_OPTIONS["Budget"] },
            { label: 'Phénotype', value: 'Mat', type: 'Carnation', color: 'bg-orange-100 text-orange-800', options: DEFAULT_CRITERIA_OPTIONS["Phénotype"] },
            { label: 'Type Cheveux', value: 'Bouclés', type: 'Cheveux', color: 'bg-purple-100 text-purple-800', options: DEFAULT_CRITERIA_OPTIONS["Type Cheveux"] },
            { label: 'Couleur Cheveux', value: 'Châtain', type: 'Cheveux', color: 'bg-yellow-100 text-yellow-800', options: DEFAULT_CRITERIA_OPTIONS["Couleur Cheveux"] },
            { label: 'Style Maquillage', value: 'Naturel', type: 'Esthétique', color: 'bg-pink-100 text-pink-800', options: DEFAULT_CRITERIA_OPTIONS["Style Maquillage"] },
            { label: 'Problématiques', value: 'Mixte', type: 'Peau', color: 'bg-red-100 text-red-800', options: DEFAULT_CRITERIA_OPTIONS["Problématiques"] }
          ]
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
