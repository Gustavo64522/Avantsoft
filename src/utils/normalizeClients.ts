import type { Client } from "../types";

function extractString(
  source: Record<string, unknown> | undefined,
  key: string
): string {
  if (!source) return "";
  const value = source[key];
  return typeof value === "string" ? value : "";
}

function parseInfo(record: Record<string, unknown>) {
  const infoRecord = record.info as Record<string, unknown> | undefined;
  const detailsRecord = infoRecord?.detalhes as
    | Record<string, unknown>
    | undefined;

  const fullName =
    extractString(infoRecord, "nomeCompleto") ||
    extractString(record, "nomeCompleto");

  const details = {
    email:
      extractString(detailsRecord, "email") || extractString(record, "email"),
    nascimento: extractString(detailsRecord, "nascimento"),
  };

  return { nomeCompleto: fullName, detalhes: details };
}

function parseStatistics(record: Record<string, unknown>) {
  const statsRaw = record.estatisticas as
    | { vendas?: { data: string; valor: number }[] }
    | undefined;

  return { vendas: statsRaw?.vendas ?? [] };
}

export function normalizeClients(rawClients: unknown[]): Client[] {
  const clientMap = new Map<string, Client>();

  for (const rawClient of rawClients) {
    if (typeof rawClient !== "object" || rawClient === null) continue;
    const clientRecord = rawClient as Record<string, unknown>;

    const { nomeCompleto, detalhes } = parseInfo(clientRecord);
    if (!detalhes.email) continue;

    const estatisticas = parseStatistics(clientRecord);

    if (!clientMap.has(detalhes.email)) {
      clientMap.set(detalhes.email, {
        info: { nomeCompleto, detalhes },
        estatisticas,
      });
    }
  }

  return Array.from(clientMap.values());
}
