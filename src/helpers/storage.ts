import type { Client } from "../types";

const STORAGE_KEY = "clients";

export function getClientsFromStorage(): Client[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveClientsToStorage(clients: Client[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}
