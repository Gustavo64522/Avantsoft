import type { Client } from "../types";

export type ClientFormData = {
  fullName: string;
  email: string;
  birthdate: string;
};

export type ClientFormErrors = {
  fullName: boolean;
  email: boolean;
  birthdate: boolean;
  emailExists: boolean;
};

export function validateClientForm(
  data: ClientFormData,
  clients: Client[]
): ClientFormErrors {
  const emailExists = clients.some(
    (client) =>
      client.info.detalhes.email.toLowerCase() === data.email.toLowerCase()
  );

  return {
    fullName: data.fullName.trim() === "",
    email: data.email.trim() === "" || emailExists,
    birthdate: data.birthdate.trim() === "",
    emailExists,
  };
}
