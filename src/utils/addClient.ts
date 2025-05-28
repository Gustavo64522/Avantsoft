import type { Client } from "../types";

type NovoClienteInput = {
  nomeCompleto: string;
  email: string;
  nascimento: string;
  vendas?: { data: string; valor: number }[];
};

export function addClient(
  clientes: Client[],
  novo: NovoClienteInput
): Client[] {
  const existe = clientes.find(
    (c) => c.info.detalhes.email.toLowerCase() === novo.email.toLowerCase()
  );
  if (existe) {
    // Se já existe, opcional: poderia atualizar info ou vendas, mas aqui só retorna original
    return clientes;
  }

  const clienteNovo: Client = {
    info: {
      nomeCompleto: novo.nomeCompleto,
      detalhes: {
        email: novo.email,
        nascimento: novo.nascimento,
      },
    },
    estatisticas: {
      vendas: novo.vendas ?? [],
    },
  };

  return [...clientes, clienteNovo];
}
