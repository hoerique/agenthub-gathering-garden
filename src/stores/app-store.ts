import { create } from "zustand";
import * as mock from "@/mocks/data";
import type { Agent, Contact, Conversation, Lead, SimpleItem, Tool, User, WhatsAppInstance } from "@/types";

const id = () => crypto.randomUUID().slice(0, 8);
type State = {
  agents: Agent[]; tools: Tool[]; instances: WhatsAppInstance[]; conversations: Conversation[]; contacts: Contact[]; leads: Lead[]; users: User[]; catalogs: Record<string, SimpleItem[]>;
  saveAgent: (a: Agent) => void; removeAgent: (id: string) => void; duplicateAgent: (id: string) => void; toggleAgent: (id: string) => void;
  saveTool: (t: Tool) => void; saveInstance: (i: WhatsAppInstance) => void; removeInstance: (id: string) => void;
  sendMessage: (cid: string, text: string) => void; setConversationStatus: (cid: string, s: Conversation["status"]) => void; markRead: (cid: string) => void;
  saveContact: (c: Contact) => void; removeContact: (id: string) => void;
  saveLead: (l: Lead) => void; removeLead: (id: string) => void; saveUser: (u: User) => void; removeUser: (id: string) => void;
  saveCatalog: (key: string, item: SimpleItem) => void; removeCatalog: (key: string, id: string) => void;
};
const upsert = <T extends { id: string }>(list: T[], item: T) => list.some((x) => x.id === item.id) ? list.map((x) => (x.id === item.id ? item : x)) : [item, ...list];
export const newId = id;
export const useAppStore = create<State>((set) => ({
  agents: mock.agents, tools: mock.tools, instances: mock.instances, conversations: mock.conversations, contacts: mock.contacts, leads: mock.leads, users: mock.users, catalogs: mock.catalogs,
  saveAgent: (a) => set((s) => ({ agents: upsert(s.agents, a) })),
  removeAgent: (aid) => set((s) => ({ agents: s.agents.filter((a) => a.id !== aid) })),
  duplicateAgent: (aid) => set((s) => { const a = s.agents.find((x) => x.id === aid); return a ? { agents: [{ ...a, id: id(), name: `${a.name} (cópia)`, status: "rascunho", conversations: 0, lastActivity: "agora" }, ...s.agents] } : s; }),
  toggleAgent: (aid) => set((s) => ({ agents: s.agents.map((a) => a.id === aid ? { ...a, status: a.status === "ativo" ? "pausado" : "ativo" } : a) })),
  saveTool: (t) => set((s) => ({ tools: upsert(s.tools, t) })),
  saveInstance: (i) => set((s) => ({ instances: upsert(s.instances, i) })),
  removeInstance: (iid) => set((s) => ({ instances: s.instances.filter((i) => i.id !== iid) })),
  sendMessage: (cid, text) => set((s) => ({ conversations: s.conversations.map((c) => c.id === cid ? { ...c, status: "Humano", messages: [...c.messages, { id: id(), from: "operador", text, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }] } : c) })),
  setConversationStatus: (cid, st) => set((s) => ({ conversations: s.conversations.map((c) => c.id === cid ? { ...c, status: st } : c) })),
  markRead: (cid) => set((s) => ({ conversations: s.conversations.map((c) => c.id === cid ? { ...c, unread: 0 } : c) })),
  saveContact: (c) => set((s) => ({ contacts: upsert(s.contacts, c) })), removeContact: (cid) => set((s) => ({ contacts: s.contacts.filter((c) => c.id !== cid) })),
  saveLead: (l) => set((s) => ({ leads: upsert(s.leads, l) })), removeLead: (lid) => set((s) => ({ leads: s.leads.filter((l) => l.id !== lid) })),
  saveUser: (u) => set((s) => ({ users: upsert(s.users, u) })), removeUser: (uid) => set((s) => ({ users: s.users.filter((u) => u.id !== uid) })),
  saveCatalog: (key, item) => set((s) => ({ catalogs: { ...s.catalogs, [key]: upsert(s.catalogs[key] ?? [], item) } })),
  removeCatalog: (key, iid) => set((s) => ({ catalogs: { ...s.catalogs, [key]: (s.catalogs[key] ?? []).filter((i) => i.id !== iid) } })),
}));