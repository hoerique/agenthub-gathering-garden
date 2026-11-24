import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronDown, PanelLeft, Search, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { companyIcon as Building, navigation } from "./navigation";

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [company, setCompany] = useState("Acme Comercial");
  const [query, setQuery] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const all = navigation.flatMap((g) => g.items);
  const results = query ? all.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())) : [];
  return (
    <div className="min-h-screen">
      <aside className={`app-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <span className="brand-symbol"><Sparkles className="size-4" /></span>
          {!collapsed && <span className="text-[15px] font-semibold text-foreground">AgentHub</span>}
        </div>
        <nav className="flex-1 overflow-y-auto px-2 pb-5" aria-label="Principal">
          {navigation.map((g) => <div key={g.title}>{!collapsed && <div className="nav-section">{g.title}</div>}{collapsed && <div className="h-3" />}
            {g.items.map((item) => { const active = item.to === "/" ? path === "/" : path === item.to || (item.to === "/agentes" && path.startsWith("/agentes/") && path !== "/agentes/novo"); return (
              <Button key={item.to} asChild variant="ghost" className="nav-item relative"><Link to={item.to} data-active={active} title={item.label} onClick={() => window.innerWidth < 768 && setCollapsed(true)}><item.icon />{!collapsed && item.label}</Link></Button>); })}
          </div>)}
        </nav>
      </aside>
      <div className={`app-main ${collapsed ? "collapsed" : ""}`}>
        <header className="app-header sticky top-0 z-30">
          <Button variant="ghost" size="icon" aria-label="Alternar menu" onClick={() => setCollapsed(!collapsed)}><PanelLeft /></Button>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input className="field-input pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar módulos..." aria-label="Busca global" />
            {query && <div className="panel absolute top-11 z-50 w-full p-1 shadow-xl">{results.length ? results.map((r) => <button key={r.to} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-accent" onClick={() => { navigate({ to: r.to }); setQuery(""); }}><r.icon className="size-4 text-muted-foreground" />{r.label}</button>) : <p className="p-3 text-sm text-muted-foreground">Nenhum resultado.</p>}</div>}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Notificações" className="relative"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72"><DropdownMenuLabel>Notificações</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem>Theo Suporte transferiu uma conversa</DropdownMenuItem><DropdownMenuItem>Agenda Técnica aguarda QR Code</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
            <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" className="hidden sm:inline-flex"><Building />{company}<ChevronDown /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">{["Acme Comercial", "Vértice Serviços"].map((c) => <DropdownMenuItem key={c} onClick={() => setCompany(c)}>{c}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
            <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="gap-2 px-1"><span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-semibold">EF</span></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end"><DropdownMenuLabel>Erique Ferreira<p className="text-xs font-normal text-muted-foreground">Administrador</p></DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem asChild><Link to="/configuracoes">Configurações</Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}