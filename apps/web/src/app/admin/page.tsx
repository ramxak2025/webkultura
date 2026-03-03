"use client";

import { useEffect, useState } from "react";
import { X, Phone, MessageSquare, Wallet, Clock, Send, Mail, Filter } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Lead {
  id: string;
  name: string;
  phone: string;
  telegram?: string;
  budget?: string;
  comment?: string;
  status: string;
  createdAt: string;
  telegramSent: boolean;
  emailSent: boolean;
  selections: Array<{ service: { title: string } }>;
}

const statusConfig: Record<string, { label: string; class: string }> = {
  NEW: { label: "Новый", class: "bg-primary/20 text-primary" },
  IN_PROGRESS: { label: "В работе", class: "bg-amber-500/20 text-amber-400" },
  COMPLETED: { label: "Завершён", class: "bg-emerald-500/20 text-emerald-400" },
  REJECTED: { label: "Отклонён", class: "bg-red-500/20 text-red-400" },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const params = filterStatus ? `?status=${filterStatus}` : "";
    fetch(`${API}/leads${params}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filterStatus]);

  async function updateStatus(id: string, status: string) {
    const token = localStorage.getItem("admin_token");
    await fetch(`${API}/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (selectedLead?.id === id) setSelectedLead((prev) => (prev ? { ...prev, status } : null));
  }

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    inProgress: leads.filter((l) => l.status === "IN_PROGRESS").length,
    completed: leads.filter((l) => l.status === "COMPLETED").length,
  };

  if (loading) return <div className="text-muted-foreground">Загрузка лидов...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Заявки</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl glass">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Всего</div>
        </div>
        <div className="p-4 rounded-xl glass">
          <div className="text-2xl font-bold text-primary">{stats.new}</div>
          <div className="text-sm text-primary/70">Новых</div>
        </div>
        <div className="p-4 rounded-xl glass">
          <div className="text-2xl font-bold text-amber-400">{stats.inProgress}</div>
          <div className="text-sm text-amber-400/70">В работе</div>
        </div>
        <div className="p-4 rounded-xl glass">
          <div className="text-2xl font-bold text-emerald-400">{stats.completed}</div>
          <div className="text-sm text-emerald-400/70">Завершённых</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Filter size={16} className="text-muted-foreground" />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setLoading(true); }}
          className="text-sm rounded-lg px-3 py-1.5 bg-secondary border border-border text-white"
        >
          <option value="">Все статусы</option>
          <option value="NEW">Новые</option>
          <option value="IN_PROGRESS">В работе</option>
          <option value="COMPLETED">Завершённые</option>
          <option value="REJECTED">Отклонённые</option>
        </select>
      </div>

      {leads.length === 0 ? (
        <p className="text-muted-foreground">{filterStatus ? "Нет заявок с таким статусом" : "Пока нет заявок"}</p>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Имя</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Контакт</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Услуги</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Статус</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Дата</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const st = statusConfig[lead.status] ?? statusConfig.NEW;
                return (
                  <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/50 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                    <td className="p-4 font-medium text-white">{lead.name}</td>
                    <td className="p-4 hidden sm:table-cell text-muted-foreground">
                      <div>{lead.phone}</div>
                      {lead.telegram && <div className="text-xs">{lead.telegram}</div>}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {lead.selections.slice(0, 2).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">{s.service.title}</span>
                        ))}
                        {lead.selections.length > 2 && <span className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">+{lead.selections.length - 2}</span>}
                      </div>
                    </td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-md text-xs font-medium ${st.class}`}>{st.label}</span></td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{new Date(lead.createdAt).toLocaleDateString("ru-RU")}</td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)} className="text-xs rounded-md px-2 py-1 bg-secondary border border-border text-white">
                        <option value="NEW">Новый</option>
                        <option value="IN_PROGRESS">В работе</option>
                        <option value="COMPLETED">Завершён</option>
                        <option value="REJECTED">Отклонён</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedLead(null)} />
          <div className="relative glass-strong w-full max-w-md overflow-y-auto">
            <div className="sticky top-0 glass-strong border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Заявка от {selectedLead.name}</h2>
              <button onClick={() => setSelectedLead(null)} className="p-1.5 text-muted-foreground hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Статус</label>
                <select value={selectedLead.status} onChange={(e) => updateStatus(selectedLead.id, e.target.value)} className="w-full mt-2 rounded-lg px-3 py-2 text-sm bg-secondary border border-border text-white">
                  <option value="NEW">Новый</option>
                  <option value="IN_PROGRESS">В работе</option>
                  <option value="COMPLETED">Завершён</option>
                  <option value="REJECTED">Отклонён</option>
                </select>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Контакты</h3>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                  <Phone size={16} className="text-muted-foreground" />
                  <a href={`tel:${selectedLead.phone}`} className="text-sm font-medium text-white hover:text-primary">{selectedLead.phone}</a>
                </div>
                {selectedLead.telegram && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <MessageSquare size={16} className="text-muted-foreground" />
                    <a href={`https://t.me/${selectedLead.telegram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-primary">{selectedLead.telegram}</a>
                  </div>
                )}
                {selectedLead.budget && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <Wallet size={16} className="text-muted-foreground" />
                    <span className="text-sm text-white">{selectedLead.budget}</span>
                  </div>
                )}
              </div>
              {selectedLead.selections.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Услуги</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.selections.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-sm font-medium">{s.service.title}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedLead.comment && (
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Комментарий</h3>
                  <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-lg leading-relaxed">{selectedLead.comment}</p>
                </div>
              )}
              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Уведомления</h3>
                <div className="flex gap-3">
                  <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${selectedLead.telegramSent ? "bg-emerald-500/20 text-emerald-400" : "bg-secondary text-muted-foreground"}`}>
                    <Send size={12} /> Telegram {selectedLead.telegramSent ? "✓" : "✗"}
                  </div>
                  <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${selectedLead.emailSent ? "bg-emerald-500/20 text-emerald-400" : "bg-secondary text-muted-foreground"}`}>
                    <Mail size={12} /> Email {selectedLead.emailSent ? "✓" : "✗"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} />
                Создано: {new Date(selectedLead.createdAt).toLocaleString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
