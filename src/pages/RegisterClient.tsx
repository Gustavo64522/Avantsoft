import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { normalizeClients } from "../utils/normalizeClients";
import { mockClients } from "../mocks/mockData";
import type { Client } from "../types";
import {
  getClientsFromStorage,
  saveClientsToStorage,
} from "../helpers/storage";

export default function RegisterClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    birthdate: false,
    emailExists: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasEmpty = !fullName || !email || !birthdate;
    const emailExists = clients.some(
      (c) => c.info.detalhes.email.toLowerCase() === email.toLowerCase()
    );

    setErrors({
      fullName: !fullName,
      email: !email || emailExists,
      birthdate: !birthdate,
      emailExists,
    });

    if (hasEmpty || emailExists) return;

    const newClient: Client = {
      info: {
        nomeCompleto: fullName,
        detalhes: {
          email,
          nascimento: birthdate,
        },
      },
      estatisticas: {
        vendas: [],
      },
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    saveClientsToStorage(updatedClients);

    // limpar
    setFullName("");
    setEmail("");
    setBirthdate("");

    // mostrar popup
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <Sidebar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Cadastrar Cliente
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">
                  Nome completo é obrigatório.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.emailExists
                    ? "Já existe cliente com esse email."
                    : "Email é obrigatório."}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.birthdate ? "border-red-500" : "border-gray-300"
                }`}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
              {errors.birthdate && (
                <p className="text-red-600 text-sm mt-1">
                  Data de nascimento é obrigatória.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </main>

      {/* Popup de sucesso */}
      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-md text-sm">
          Cliente cadastrado com sucesso!
        </div>
      )}
    </div>
  );
}
