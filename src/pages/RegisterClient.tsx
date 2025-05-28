import { useState } from "react";
import Sidebar from "../components/Sidebar";
import type { Client } from "../types";
import { useClients } from "../hooks/useClients";
import { validateClientForm } from "../utils/validateClientForm";
import type {
  ClientFormErrors,
  ClientFormData,
} from "../utils/validateClientForm";

export default function RegisterClient() {
  const { clients, addClient } = useClients();

  const [formData, setFormData] = useState<ClientFormData>({
    fullName: "",
    email: "",
    birthdate: "",
  });

  const [formErrors, setFormErrors] = useState<ClientFormErrors>({
    fullName: false,
    email: false,
    birthdate: false,
    emailExists: false,
  });

  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange =
    (field: keyof ClientFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateClientForm(formData, clients);
    setFormErrors(errors);

    if (Object.values(errors).some(Boolean)) return;

    const newClient: Client = {
      info: {
        nomeCompleto: formData.fullName,
        detalhes: {
          email: formData.email,
          nascimento: formData.birthdate,
        },
      },
      estatisticas: {
        vendas: [],
      },
    };

    addClient(newClient);

    setFormData({ fullName: "", email: "", birthdate: "" });
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
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
                  formErrors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.fullName}
                onChange={handleInputChange("fullName")}
              />
              {formErrors.fullName && (
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
                  formErrors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.email}
                onChange={handleInputChange("email")}
              />
              {formErrors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.emailExists
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
                  formErrors.birthdate ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.birthdate}
                onChange={handleInputChange("birthdate")}
              />
              {formErrors.birthdate && (
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

      {formSuccess && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-md text-sm">
          Cliente cadastrado com sucesso!
        </div>
      )}
    </div>
  );
}
