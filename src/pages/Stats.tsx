import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/Sidebar";
import type { Client } from "../types";
import { calculateHighlights } from "../utils/calculateHighlights";
import { normalizeClients } from "../utils/normalizeClients";
import { mockClients } from "../mocks/mockData";

export default function Stats() {
  const rawClientData = mockClients.data.clientes;

  const clients: Client[] = useMemo(
    () => normalizeClients(rawClientData),
    [rawClientData]
  );

  const salesHighlights = useMemo(
    () => calculateHighlights(clients),
    [clients]
  );

  const aggregatedSalesByDate = useMemo(() => {
    const salesTotalsByDate = new Map<string, number>();

    clients.forEach(({ estatisticas }) => {
      (estatisticas?.vendas ?? []).forEach(({ data, valor }) => {
        salesTotalsByDate.set(data, (salesTotalsByDate.get(data) ?? 0) + valor);
      });
    });

    return Array.from(salesTotalsByDate.entries())
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [clients]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6">Estatísticas</h2>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">
              Maior volume de vendas
            </h3>
            <p className="mt-2 text-2xl font-bold">
              {salesHighlights.highestVolume?.name ?? "-"}
            </p>
            <p className="text-gray-500">
              R$ {salesHighlights.highestVolume?.value.toFixed(2) ?? "0.00"}
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">
              Maior média por venda
            </h3>
            <p className="mt-2 text-2xl font-bold">
              {salesHighlights.highestAverage?.name ?? "-"}
            </p>
            <p className="text-gray-500">
              R$ {salesHighlights.highestAverage?.value.toFixed(2) ?? "0.00"}
            </p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">
              Maior frequência de compra
            </h3>
            <p className="mt-2 text-2xl font-bold">
              {salesHighlights.highestFrequency?.name ?? "-"}
            </p>
            <p className="text-gray-500">
              {salesHighlights.highestFrequency?.value ?? 0} compras
            </p>
          </article>
        </section>

        <section
          className="bg-white p-6 rounded-lg shadow"
          style={{ height: 300 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Total de vendas por dia
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aggregatedSalesByDate}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
              />
              <Bar dataKey="total" fill="#4f39f6" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}
