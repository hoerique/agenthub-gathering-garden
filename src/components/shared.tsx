import { Inbox, Search } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({ title, description, actions }: { title: string; description: string; actions?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="page-title">{title}</h1><p className="page-subtitle">{description}</p></div>{actions && <div className="flex flex-wrap gap-2">{actions}</div>}</div>;
}
export function StatusPill({ status }: { status: string }) {
  const kind = ["pausado", "aguardando", "Aguardando", "Humano"].includes(status) ? "warning" : ["erro", "Perdido"].includes(status) ? "error" : ["rascunho", "desconectado", "inativo", "Finalizada"].includes(status) ? "muted" : "";
  return <span className={`status-pill ${kind}`}><span className="status-dot" />{status}</span>;
}
export function SearchInput({ value, onChange, placeholder = "Pesquisar..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <div className="relative min-w-60 flex-1 sm:max-w-sm"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input aria-label={placeholder} className="field-input pl-9" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></div>;
}
export function EmptyState({ title = "Nada encontrado", text = "Ajuste a busca ou os filtros." }: { title?: string; text?: string }) {
  return <div className="flex flex-col items-center px-6 py-14 text-center"><span className="agent-avatar mb-4"><Inbox className="size-4" /></span><p className="font-medium">{title}</p><p className="mt-1 text-sm text-muted-foreground">{text}</p></div>;
}
export function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="field-label">{label}{children}</label>; }