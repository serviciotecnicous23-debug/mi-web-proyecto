import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// fileURLToPath y no `new URL(...).pathname`: en Windows este último da
// "/C:/..." y la carpeta acaba como "C:\C:\...".
const currentDir = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(currentDir, "..", "data");
const usersFile = path.join(dataDir, "users.json");

// Asegurar que existe la carpeta data
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

interface StoredUser {
  id: number;
  username: string;
  password: string;
  role: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  isActive: boolean;
  cargo?: string;
  country?: string;
  phone?: string;
  email?: string;
  createdAt: string;
}

let users: StoredUser[] = [];
let nextId = 1;

// Cargar usuarios existentes
function loadUsers() {
  if (fs.existsSync(usersFile)) {
    try {
      const data = fs.readFileSync(usersFile, "utf-8");
      users = JSON.parse(data);
      nextId = Math.max(...users.map(u => u.id), 0) + 1;
    } catch (err) {
      console.error("Error loading users file:", err);
      users = [];
    }
  }
}

// Guardar usuarios
function saveUsers() {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving users file:", err);
  }
}

// Cargar al inicializar
loadUsers();

export const memoryStorage = {
  getUser: async (id: number): Promise<StoredUser | null> => {
    return users.find(u => u.id === id) || null;
  },

  getUserByUsername: async (username: string): Promise<StoredUser | null> => {
    return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
  },

  listUsers: async (): Promise<StoredUser[]> => {
    return users;
  },

  createUser: async (data: Omit<StoredUser, "id" | "createdAt">): Promise<StoredUser> => {
    const user: StoredUser = {
      ...data,
      id: nextId++,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers();
    return user;
  },

  updateUser: async (id: number, data: Partial<StoredUser>): Promise<StoredUser | null> => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...data };
    saveUsers();
    return users[index];
  },

  deleteUser: async (id: number): Promise<boolean> => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    users.splice(index, 1);
    saveUsers();
    return true;
  },

  findUserByEmail: async (email: string): Promise<StoredUser | null> => {
    return users.find(u => u.email === email) || null;
  },

  // --- Stub methods for email verification / password reset / push ---
  // These are no-ops in memory mode; features require PostgreSQL.
  getUserByEmail: async (email: string): Promise<StoredUser | null> => {
    return users.find(u => u.email?.toLowerCase() === email.toLowerCase()) || null;
  },
  getUserByVerifyToken: async (_token: string): Promise<StoredUser | null> => null,
  createPasswordResetToken: async (_data: { userId: number; token: string; expiresAt: Date }) => ({ id: 0, userId: 0, token: "", expiresAt: new Date(), usedAt: null, createdAt: new Date() }),
  getPasswordResetToken: async (_token: string) => null,
  markPasswordResetTokenUsed: async (_id: number) => {},
  createPushSubscription: async (_data: { userId: number; endpoint: string; p256dh: string; auth: string }) => ({ id: 0, userId: 0, endpoint: "", p256dh: "", auth: "", createdAt: new Date() }),
  deletePushSubscription: async (_endpoint: string) => {},
  getPushSubscriptionsByUser: async (_userId: number) => [] as any[],
  getAllPushSubscriptions: async () => [] as any[],
  deletePushSubscriptionsByIds: async (_ids: number[]) => {},
};
