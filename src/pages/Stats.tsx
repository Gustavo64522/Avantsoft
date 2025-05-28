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
  // rawClients simula dados do localStorage ou mock
  const rawClients = mockClients.data.clientes;

  const clients: Client[] = useMemo(
    () => normalizeClients(rawClients),
    [rawClients]
  );

  const highlights = useMemo(() => calculateHighlights(clients), [clients]);

  // Aggregate sales by date for chart
  const salesByDate = useMemo(() => {
    const salesMap = new Map<string, number>();

    clients.forEach(({ estatisticas }) => {
      (estatisticas?.vendas ?? []).forEach(({ data, valor }) => {
        salesMap.set(data, (salesMap.get(data) ?? 0) + valor);
      });
    });

    return Array.from(salesMap.entries())
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [clients]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6">Estatísticas</h2>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">
              Maior volume de vendas
            </h3>
            <p className="mt-2 text-2xl font-bold">
              {highlights.highestVolume?.name || "-"}
            </p>
            <p className="text-gray-500">
              R$ {highlights.highestVolume?.value.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">
              Maior média por venda
            </h3>
            <p className="mt-2 text-2xl font-bold">
              {highlights.highestAverage?.name || "-"}
            </p>
            <p className="text-gray-500">
              R$ {highlights.highestAverage?.value.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700">
              Maior frequência de compra
            </h3>
            <p className="mt-2 text-2xl font-bold">
              {highlights.highestFrequency?.name || "-"}
            </p>
            <p className="text-gray-500">
              {highlights.highestFrequency?.value || 0} purchases
            </p>
          </div>
        </div>

        {/* Sales per day chart */}
        <div className="bg-white p-6 rounded-lg shadow" style={{ height: 300 }}>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Total de vendas por dia
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesByDate}
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
        </div>
      </main>
    </div>
  );
}
