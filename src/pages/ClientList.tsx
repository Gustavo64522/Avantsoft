//OK

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { normalizeClients } from "../utils/normalizeClients";
import { mockClients } from "../mocks/mockData";
import type { Client } from "../types";
import {
  getClientsFromStorage,
  saveClientsToStorage,
} from "../helpers/storage";
import { findMissingLetter } from "../helpers/stringHelpers";

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const storedClients = getClientsFromStorage();

    if (storedClients.length === 0) {
      const normalized = normalizeClients(mockClients.data.clientes);
      setClients(normalized);
      saveClientsToStorage(normalized);
    } else {
      setClients(storedClients);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Lista de Clientes</h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="text-left p-3">Nome Completo</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Data de Nascimento</th>
                <th className="text-left p-3">Proxima Letra do Alfabeto</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => {
                const { nomeCompleto, detalhes } = client.info;
                const missingLetter = findMissingLetter(nomeCompleto);

                return (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3">{nomeCompleto}</td>
                    <td className="p-3">{detalhes.email}</td>
                    <td className="p-3">
                      {" "}
                      {detalhes.nascimento
                        ? new Date(detalhes.nascimento).toLocaleDateString(
                            "pt-BR"
                          )
                        : ""}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${
                          missingLetter === "-"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {missingLetter.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
