import type { Client } from "../types";

type Highlight = { name: string; value: number };

function getHigher(current: Highlight | null, candidate: Highlight): Highlight {
  if (!current || candidate.value > current.value) return candidate;
  return current;
}

export function calculateHighlights(clients: Client[]) {
  const initialHighlights = {
    highestVolume: null as Highlight | null,
    highestAverage: null as Highlight | null,
    highestFrequency: null as Highlight | null,
  };

  return clients.reduce((acc, { info, estatisticas }) => {
    const sales = estatisticas?.vendas ?? [];
    const totalSales = sales.reduce((sum, sale) => sum + sale.valor, 0);
    const frequency = sales.length;
    const average = frequency > 0 ? totalSales / frequency : 0;

    acc.highestVolume = getHigher(acc.highestVolume, {
      name: info.nomeCompleto,
      value: totalSales,
    });

    acc.highestAverage = getHigher(acc.highestAverage, {
      name: info.nomeCompleto,
      value: average,
    });

    acc.highestFrequency = getHigher(acc.highestFrequency, {
      name: info.nomeCompleto,
      value: frequency,
    });

    return acc;
  }, initialHighlights);
}
