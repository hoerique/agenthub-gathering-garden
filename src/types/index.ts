export type Status = "ativo" | "pausado" | "rascunho";
export type ConnectionStatus = "conectado" | "desconectado" | "aguardando";
export interface Agent {
  id: string; name: string; description: string; category: string; tone: "primary" | "violet" | "info" | "warning";
  provider: "OpenAI" | "Anthropic" | "Google"; model: string; temperature: number; maxTokens: number;
  channel: string; status: Status; conversations: number; lastActivity: string;
  prompt: { personality: string; goal: string; rules: string; restrictions: string; instructions: string; greeting: string };
  tools: string[]; memory: { enabled: boolean; type: string; history: number; context: number; perContact: boolean };
}
export interface Tool { id: string; name: string; key: string; description: string; category: string; returnType: string; permissions: string[]; enabled: boolean; schema: Record<string, unknown> }
export interface WhatsAppInstance { id: string; name: string; number: string; provider: "Evolution API" | "WhatsApp Cloud API"; status: ConnectionStatus; agentId: string | null; lastActivity: string }
export interface Message { id: string; from: "contato" | "ia" | "operador"; text: string; time: string; tool?: string }
export interface Conversation { id: string; contactId: string; agentId: string; status: "IA" | "Humano" | "Aguardando" | "Finalizada"; unread: number; messages: Message[] }
export interface Contact { id: string; name: string; phone: string; email: string; tags: string[]; owner: string; createdAt: string }
export type LeadStage = "Novo lead" | "Primeiro contato" | "Qualificado" | "Proposta" | "Negociação" | "Ganho" | "Perdido";
export interface Lead { id: string; title: string; company: string; value: number; stage: LeadStage; tags: string[]; owner: string; notes: string }
export interface Execution { id: string; agentId: string; conversationId: string; tools: string[]; duration: number; status: "sucesso" | "erro"; error?: string; time: string }
export interface User { id: string; name: string; email: string; role: "Administrador" | "Supervisor" | "Operador"; team: string; active: boolean }
export interface SimpleItem { id: string; name: string; description: string; status: boolean; meta: string }