import type { Cliente } from "../types";

function extractString(
  obj: Record<string, unknown> | undefined,
  key: string
): string {
  if (!obj) return "";
  const val = obj[key];
  return typeof val === "string" ? val : "";
}

function extractInfo(obj: Record<string, unknown>): {
  nomeCompleto: string;
  detalhes: { email: string; nascimento: string };
} {
  const info = obj.info as Record<string, unknown> | undefined;
  const detalhes = info
    ? (info.detalhes as Record<string, unknown> | undefined)
    : undefined;

  return {
    nomeCompleto:
      extractString(info, "nomeCompleto") || extractString(obj, "nomeCompleto"),
    detalhes: {
      email: extractString(detalhes, "email") || extractString(obj, "email"),
      nascimento: extractString(detalhes, "nascimento"),
    },
  };
}

function extractEstatisticas(obj: Record<string, unknown>): {
  vendas: { data: string; valor: number }[];
} {
  const estatisticasRaw = obj.estatisticas as
    | { vendas?: { data: string; valor: number }[] }
    | undefined;

  return {
    vendas: estatisticasRaw?.vendas ?? [],
  };
}

export function normalizeClients(rawClients: unknown[]): Cliente[] {
  const map = new Map<string, Cliente>();

  for (const raw of rawClients) {
    if (typeof raw !== "object" || raw === null) continue;

    const obj = raw as Record<string, unknown>;

    const { nomeCompleto, detalhes } = extractInfo(obj);

    if (!detalhes.email) continue;

    const estatisticas = extractEstatisticas(obj);

    if (!map.has(detalhes.email)) {
      map.set(detalhes.email, {
        info: {
          nomeCompleto,
          detalhes,
        },
        estatisticas,
      });
    }
  }

  return Array.from(map.values());
}
