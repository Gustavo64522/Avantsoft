import { useState, useEffect } from "react";
import { normalizeClients } from "../utils/normalizeClients";
import { mockClients } from "../mocks/mockData";
import type { Client } from "../types";
import {
  getClientsFromStorage,
  saveClientsToStorage,
} from "../helpers/storage";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const storedClients = getClientsFromStorage();

    if (storedClients.length === 0) {
      const normalized = normalizeClients(mockClients.data.clientes);
      saveClientsToStorage(normalized);
      setClients(normalized);
    } else {
      setClients(storedClients);
    }
  }, []);

  const addClient = (newClient: Client) => {
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    saveClientsToStorage(updatedClients);
  };

  return { clients, addClient };
}
