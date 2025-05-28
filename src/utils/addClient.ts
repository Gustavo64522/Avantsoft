import type { Client } from "../types";

type NewClientInput = {
  fullName: string;
  email: string;
  birthDate: string;
  sales?: { date: string; value: number }[];
};

export function addClient(
  clients: Client[],
  newClient: NewClientInput
): Client[] {
  const clientExists = clients.find(
    (client) =>
      client.info.detalhes.email.toLowerCase() === newClient.email.toLowerCase()
  );

  if (clientExists) {
    return clients;
  }

  const clientToAdd: Client = {
    info: {
      nomeCompleto: newClient.fullName,
      detalhes: {
        email: newClient.email,
        nascimento: newClient.birthDate,
      },
    },
    estatisticas: {
      vendas: (newClient.sales ?? []).map(({ date, value }) => ({
        data: date,
        valor: value,
      })),
    },
  };

  return [...clients, clientToAdd];
}
