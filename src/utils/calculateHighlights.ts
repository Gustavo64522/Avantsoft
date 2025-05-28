import type { Client } from "../types";

type Highlight = {
  name: string;
  value: number;
};

function getHighlightWithHighestValue(
  current: Highlight | null,
  candidate: Highlight
): Highlight {
  if (!current || candidate.value > current.value) {
    return candidate;
  }
  return current;
}

export function calculateHighlights(clients: Client[]) {
  const initialHighlights = {
    highestVolume: null as Highlight | null,
    highestAverage: null as Highlight | null,
    highestFrequency: null as Highlight | null,
  };

  return clients.reduce((highlights, client) => {
    const clientName = client.info.nomeCompleto;
    const sales = client.estatisticas?.vendas ?? [];

    const totalSalesValue = sales.reduce((sum, sale) => sum + sale.valor, 0);
    const totalSalesCount = sales.length;
    const averageSaleValue =
      totalSalesCount > 0 ? totalSalesValue / totalSalesCount : 0;

    highlights.highestVolume = getHighlightWithHighestValue(
      highlights.highestVolume,
      { name: clientName, value: totalSalesValue }
    );

    highlights.highestAverage = getHighlightWithHighestValue(
      highlights.highestAverage,
      { name: clientName, value: averageSaleValue }
    );

    highlights.highestFrequency = getHighlightWithHighestValue(
      highlights.highestFrequency,
      { name: clientName, value: totalSalesCount }
    );

    return highlights;
  }, initialHighlights);
}
