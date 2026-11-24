import { Activity, Bot, Boxes, Building2, Cable, Columns3, Cpu, FileText, GitBranch, Inbox, LayoutDashboard, ListChecks, MessageSquareText, Plus, ScrollText, Settings, ShieldCheck, Users, UsersRound, Webhook, Wrench, Zap } from "lucide-react";
export const navigation = [
  { title: "Visão geral", items: [{ label: "Dashboard", to: "/", icon: LayoutDashboard }, { label: "Monitoramento", to: "/monitoramento", icon: Activity }] },
  { title: "Inteligência artificial", items: [{ label: "Agentes de IA", to: "/agentes", icon: Bot }, { label: "Criar agente", to: "/agentes/novo", icon: Plus }, { label: "Ferramentas", to: "/ferramentas", icon: Wrench }, { label: "Modelos de IA", to: "/modelos", icon: Cpu }, { label: "Prompts", to: "/prompts", icon: FileText }] },
  { title: "Atendimento", items: [{ label: "Conversas", to: "/conversas", icon: MessageSquareText }, { label: "Contatos", to: "/contatos", icon: UsersRound }, { label: "Kanban", to: "/kanban", icon: Columns3 }, { label: "Filas", to: "/filas", icon: Inbox }] },
  { title: "Integrações", items: [{ label: "WhatsApp", to: "/whatsapp", icon: Cable }, { label: "Webhooks", to: "/webhooks", icon: Webhook }, { label: "APIs externas", to: "/apis", icon: Boxes }] },
  { title: "Automações", items: [{ label: "Fluxos", to: "/fluxos", icon: GitBranch }, { label: "Gatilhos", to: "/gatilhos", icon: Zap }, { label: "Regras", to: "/regras", icon: ListChecks }] },
  { title: "Administração", items: [{ label: "Usuários", to: "/usuarios", icon: Users }, { label: "Equipes", to: "/equipes", icon: ShieldCheck }, { label: "Logs", to: "/logs", icon: ScrollText }, { label: "Configurações", to: "/configuracoes", icon: Settings }] },
] as const;
export const companyIcon = Building2;