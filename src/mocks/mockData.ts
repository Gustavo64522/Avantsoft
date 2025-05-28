//ok
export const mockClients = {
  data: {
    clientes: [
      {
        info: {
          nomeCompleto: "Ana Beatriz",
          detalhes: {
            email: "ana.b@example.com",
            nascimento: "1992-05-01",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 150 },
            { data: "2024-01-02", valor: 50 },
            { data: "2024-01-05", valor: 200 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "Carlos Eduardo",
          detalhes: {
            email: "cadu@example.com",
            nascimento: "1987-08-15",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 100 },
            { data: "2024-01-03", valor: 120 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "Beatriz Souza",
          detalhes: {
            email: "beatriz.s@example.com",
            nascimento: "1990-12-20",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-02", valor: 300 },
            { data: "2024-01-03", valor: 50 },
            { data: "2024-01-04", valor: 100 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "Diego Silva",
          detalhes: {
            email: "diego.s@example.com",
            nascimento: "1985-07-30",
          },
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 80 },
            { data: "2024-01-05", valor: 40 },
          ],
        },
      },
      {
        info: {
          nomeCompleto: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          detalhes: {
            email: "Alfabeto@example.com",
            nascimento: "1993-03-10",
          },
        },
        estatisticas: {
          vendas: [],
        },
      },
    ],
  },
  meta: {
    registroTotal: 5,
    pagina: 1,
  },
  redundante: {
    status: "ok",
  },
};
