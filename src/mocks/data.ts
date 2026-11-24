import type { Agent, Contact, Conversation, Execution, Lead, SimpleItem, Tool, User, WhatsAppInstance } from "@/types";

const prompt = (goal: string) => ({ personality: "Cordial, objetivo e consultivo.", goal, rules: "Confirme dados antes de registrar alterações.", restrictions: "Não compartilhe dados de outros clientes.", instructions: "Transfira para um atendente quando houver reclamação.", greeting: "Olá! Como posso ajudar hoje?" });
const memory = { enabled: true, type: "Resumo da conversa", history: 20, context: 8000, perContact: true };
export const agents: Agent[] = [
  { id: "a1", name: "Lívia Vendas", description: "Qualifica leads e apresenta propostas comerciais.", category: "Vendas", tone: "primary", provider: "OpenAI", model: "gpt-4.1", temperature: 0.6, maxTokens: 1200, channel: "Comercial SP", status: "ativo", conversations: 1842, lastActivity: "há 2 min", prompt: prompt("Converter interessados em oportunidades."), tools: ["t1", "t5", "t6"], memory },
  { id: "a2", name: "Theo Suporte", description: "Resolve dúvidas de pedidos, entregas e trocas.", category: "Atendimento", tone: "info", provider: "Anthropic", model: "claude-sonnet-4", temperature: 0.3, maxTokens: 1600, channel: "Suporte Brasil", status: "ativo", conversations: 3271, lastActivity: "há 4 min", prompt: prompt("Resolver solicitações no primeiro contato."), tools: ["t1", "t3", "t10"], memory },
  { id: "a3", name: "Clara Agenda", description: "Organiza horários e confirma visitas técnicas.", category: "Agendamento", tone: "violet", provider: "Google", model: "gemini-2.5-pro", temperature: 0.4, maxTokens: 900, channel: "Agenda Técnica", status: "pausado", conversations: 624, lastActivity: "há 3 h", prompt: prompt("Agendar e confirmar atendimentos."), tools: ["t9", "t10"], memory },
  { id: "a4", name: "Rafa Cobrança", description: "Envia lembretes e negocia faturas pendentes.", category: "Financeiro", tone: "warning", provider: "OpenAI", model: "gpt-4.1-mini", temperature: 0.2, maxTokens: 800, channel: "Sem conexão", status: "rascunho", conversations: 0, lastActivity: "nunca", prompt: prompt("Recuperar pagamentos com cordialidade."), tools: ["t1"], memory },
];
const tool = (id: string, name: string, key: string, category: string, description: string, properties: Record<string, string>): Tool => ({ id, name, key, category, description, returnType: "object", permissions: ["Administrador", "Supervisor"], enabled: true, schema: { type: "object", properties: Object.fromEntries(Object.entries(properties).map(([k, t]) => [k, { type: t }])), required: Object.keys(properties).slice(0, 1) } });
export const tools: Tool[] = [
  tool("t1", "Buscar cliente", "buscar_cliente", "CRM", "Localiza um cliente por telefone ou e-mail.", { telefone: "string", email: "string" }),
  tool("t2", "Criar cliente", "criar_cliente", "CRM", "Cadastra um novo contato no CRM.", { nome: "string", telefone: "string" }),
  tool("t3", "Consultar pedido", "consultar_pedido", "Vendas", "Retorna status, itens e previsão de entrega.", { pedido_id: "string" }),
  tool("t4", "Atualizar cadastro", "atualizar_cadastro", "CRM", "Altera dados cadastrais confirmados.", { cliente_id: "string", campos: "object" }),
  tool("t5", "Criar lead", "criar_lead", "Vendas", "Abre uma oportunidade no funil.", { nome: "string", interesse: "string" }),
  tool("t6", "Atualizar Kanban", "atualizar_kanban", "Automação", "Move uma oportunidade para outra etapa.", { lead_id: "string", etapa: "string" }),
  tool("t7", "Consultar produtos", "consultar_produtos", "Vendas", "Pesquisa o catálogo de produtos.", { termo: "string" }),
  tool("t8", "Consultar estoque", "consultar_estoque", "Vendas", "Verifica disponibilidade por SKU.", { sku: "string" }),
  tool("t9", "Criar agendamento", "criar_agendamento", "Atendimento", "Reserva um horário disponível.", { data: "string", servico: "string" }),
  tool("t10", "Transferir atendimento", "transferir_atendimento", "Comunicação", "Encaminha a conversa para uma fila humana.", { fila: "string", motivo: "string" }),
  tool("t11", "Consultar informações externas", "consultar_externo", "Integrações externas", "Consulta uma API autorizada.", { recurso: "string" }),
  tool("t12", "Emitir segunda via", "emitir_segunda_via", "Financeiro", "Gera uma nova via de boleto.", { fatura_id: "string" }),
];
export const instances: WhatsAppInstance[] = [
  { id: "w1", name: "Comercial SP", number: "+55 11 98422-1180", provider: "Evolution API", status: "desconectado", agentId: "a1", lastActivity: "Sem atividade real" },
  { id: "w2", name: "Suporte Brasil", number: "+55 21 99610-4432", provider: "WhatsApp Cloud API", status: "desconectado", agentId: "a2", lastActivity: "Sem atividade real" },
  { id: "w3", name: "Agenda Técnica", number: "+55 31 97750-3091", provider: "Evolution API", status: "aguardando", agentId: "a3", lastActivity: "QR Code pendente" },
];
export const contacts: Contact[] = [
  { id: "c1", name: "Marina Costa", phone: "+55 11 99124-5521", email: "marina@aurora.com.br", tags: ["VIP", "B2B"], owner: "Ana Ribeiro", createdAt: "12/10/2026" },
  { id: "c2", name: "Pedro Almeida", phone: "+55 21 98871-0042", email: "pedro@almeida.dev", tags: ["Suporte"], owner: "Lucas Moura", createdAt: "03/11/2026" },
  { id: "c3", name: "Juliana Torres", phone: "+55 31 99640-7710", email: "ju.torres@mail.com", tags: ["Novo"], owner: "Ana Ribeiro", createdAt: "20/11/2026" },
  { id: "c4", name: "Grupo Vértice", phone: "+55 41 3012-8890", email: "compras@vertice.com", tags: ["Enterprise"], owner: "Bruno Lima", createdAt: "28/09/2026" },
];
export const conversations: Conversation[] = [
  { id: "v1", contactId: "c1", agentId: "a1", status: "IA", unread: 2, messages: [
    { id: "m1", from: "contato", text: "Oi, queria entender os planos para uma equipe de 40 pessoas.", time: "10:31" },
    { id: "m2", from: "ia", text: "Claro, Marina! Para 40 usuários recomendo o plano Growth. Posso preparar uma proposta?", time: "10:31", tool: "buscar_cliente" },
    { id: "m3", from: "contato", text: "Pode sim. Tem desconto anual?", time: "10:34" } ] },
  { id: "v2", contactId: "c2", agentId: "a2", status: "Humano", unread: 0, messages: [
    { id: "m4", from: "contato", text: "Meu pedido 88412 ainda não chegou.", time: "09:58" },
    { id: "m5", from: "ia", text: "Encontrei o pedido. Ele está em trânsito com previsão para amanhã.", time: "09:58", tool: "consultar_pedido" },
    { id: "m6", from: "operador", text: "Pedro, acompanhei com a transportadora e priorizamos sua entrega.", time: "10:12" } ] },
  { id: "v3", contactId: "c3", agentId: "a3", status: "Aguardando", unread: 1, messages: [{ id: "m7", from: "contato", text: "Vocês têm horário quinta à tarde?", time: "08:44" }] },
  { id: "v4", contactId: "c4", agentId: "a1", status: "Finalizada", unread: 0, messages: [{ id: "m8", from: "operador", text: "Contrato enviado. Obrigado!", time: "Ontem" }] },
];
export const leads: Lead[] = [
  { id: "l1", title: "Expansão do atendimento", company: "Aurora Têxtil", value: 48000, stage: "Novo lead", tags: ["B2B"], owner: "Ana", notes: "Avaliando três fornecedores." },
  { id: "l2", title: "Bot de agendamento", company: "Clínica Vida", value: 18500, stage: "Primeiro contato", tags: ["Saúde"], owner: "Bruno", notes: "" },
  { id: "l3", title: "Suporte 24h", company: "Grupo Vértice", value: 96000, stage: "Qualificado", tags: ["Enterprise"], owner: "Ana", notes: "Reunião técnica marcada." },
  { id: "l4", title: "Cobrança automática", company: "Fintrack", value: 32000, stage: "Proposta", tags: ["Financeiro"], owner: "Lucas", notes: "" },
  { id: "l5", title: "Integração ERP", company: "Mercato", value: 61000, stage: "Negociação", tags: ["Varejo"], owner: "Bruno", notes: "" },
  { id: "l6", title: "Agentes de vendas", company: "Nuvem Imóveis", value: 27000, stage: "Ganho", tags: ["B2C"], owner: "Ana", notes: "" },
];
export const executions: Execution[] = Array.from({ length: 14 }, (_, i) => i).flatMap((i): Execution[] => {
  const agent = agents[i % 3]; const conversation = conversations[i % 4]; const selectedTool = tools[i % 6];
  if (!agent || !conversation || !selectedTool) return [];
  return [{ id: `e${i + 1}`, agentId: agent.id, conversationId: conversation.id, tools: [selectedTool.key], duration: 380 + ((i * 337) % 2600), status: i % 6 === 4 ? "erro" : "sucesso", ...(i % 6 === 4 ? { error: "Tempo limite da ferramenta excedido" } : {}), time: `10:${String(48 - i * 3).padStart(2, "0")}` }];
});
export const users: User[] = [
  { id: "u1", name: "Erique Ferreira", email: "erique@empresa.com", role: "Administrador", team: "Diretoria", active: true },
  { id: "u2", name: "Ana Ribeiro", email: "ana@empresa.com", role: "Supervisor", team: "Comercial", active: true },
  { id: "u3", name: "Lucas Moura", email: "lucas@empresa.com", role: "Operador", team: "Suporte", active: true },
  { id: "u4", name: "Bruno Lima", email: "bruno@empresa.com", role: "Operador", team: "Comercial", active: false },
];
const s = (id: string, name: string, description: string, meta: string, status = true): SimpleItem => ({ id, name, description, meta, status });
export const catalogs: Record<string, SimpleItem[]> = {
  modelos: [s("m1", "GPT-4.1", "Raciocínio geral e respostas longas.", "OpenAI"), s("m2", "Claude Sonnet 4", "Atendimento com contexto extenso.", "Anthropic"), s("m3", "Gemini 2.5 Pro", "Entendimento multimodal.", "Google")],
  prompts: [s("p1", "Vendas consultivas", "Base para qualificação e proposta.", "Vendas"), s("p2", "Suporte empático", "Resolução com tom acolhedor.", "Atendimento")],
  filas: [s("q1", "Suporte nível 1", "Dúvidas gerais e pedidos.", "6 aguardando"), s("q2", "Financeiro", "Faturas e pagamentos.", "2 aguardando"), s("q3", "Comercial", "Leads transferidos pela IA.", "4 aguardando")],
  webhooks: [s("h1", "Novo pedido", "https://exemplo.com/webhooks/pedidos", "POST", false)],
  apis: [s("x1", "ERP Mercato", "Catálogo e estoque — credenciais no servidor futuro.", "REST", false), s("x2", "Agenda Google", "Disponibilidade de horários.", "OAuth", false)],
  gatilhos: [s("g1", "Nova mensagem", "Executa ao receber uma mensagem.", "Atendimento"), s("g2", "Conversa sem resposta", "Após 15 minutos sem retorno.", "SLA"), s("g3", "Novo lead", "Quando um lead é criado.", "Vendas")],
  regras: [s("r1", "Horário comercial", "Fora do horário, a IA responde e cria tarefa.", "Prioridade alta"), s("r2", "Cliente VIP", "Encaminha VIPs para supervisor.", "Prioridade média")],
  equipes: [s("eq1", "Comercial", "Ana Ribeiro e Bruno Lima.", "2 membros"), s("eq2", "Suporte", "Lucas Moura.", "1 membro")],
};
export const series = Array.from({ length: 12 }, (_, i) => ({ dia: `${i + 13}/11`, recebidas: 820 + Math.round(Math.sin(i / 2) * 170 + i * 42), enviadas: 760 + Math.round(Math.cos(i / 3) * 130 + i * 48), leads: 28 + i * 4 + (i % 3) * 7 }));
export const activity = ["Lívia Vendas criou lead para Aurora Têxtil", "Theo Suporte transferiu Pedro Almeida para humano", "Ana Ribeiro atualizou o prompt de vendas", "Clara Agenda foi pausada"];