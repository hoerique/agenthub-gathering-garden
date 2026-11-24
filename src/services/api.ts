// Camada única para o futuro backend FastAPI. Nesta etapa nenhuma requisição remota é feita.
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";
export const endpoints = {
  agents: `${BASE_URL}/agents`, agent: (id: string) => `${BASE_URL}/agents/${id}`, tools: `${BASE_URL}/tools`,
  conversations: `${BASE_URL}/conversations`, messages: (id: string) => `${BASE_URL}/conversations/${id}/messages`,
  sendMessage: `${BASE_URL}/messages`, whatsapp: `${BASE_URL}/whatsapp/instances`, executions: `${BASE_URL}/monitoring/executions`,
} as const;
export async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  if (!response.ok) throw new Error(`Falha na requisição: ${response.status}`);
  return response.json() as Promise<T>;
}