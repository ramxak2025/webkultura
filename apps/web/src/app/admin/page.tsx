"use client";

import { useEffect, useState } from "react";
import {
  X,
  Phone,
  MessageSquare,
  Wallet,
  Clock,
  Send,
  Mail,
  Filter,
} from "lucide-react";
import { Badge, Button } from "@webkultura/ui";

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

const statusLabels: Record<
  string,
  { label: string; variant: "default" | "warning" | "success" | "destructive" }
> = {
  NEW: { label: "Новый", variant: "default" },
  IN_PROGRESS: { label: "В работе", variant: "warning" },
  COMPLETED: { label: "Завершён", variant: "success" },
  REJECTED: { label: "Отклонён", variant: "destructive" },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const params = filterStatus ? `?status=${filterStatus}` : "";
    fetch(`${API}/leads${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filterStatus]);

  async function updateStatus(id: string, status: string) {
    const token = localStorage.getItem("admin_token");
    await fetch(`${API}/leads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    if (selectedLead?.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status } : null));
    }
  }

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    inProgress: leads.filter((l) => l.status === "IN_PROGRESS").length,
    completed: leads.filter((l) => l.status === "COMPLETED").length,
  };

  if (loading) {
    return <div className="text-neutral-500">Загрузка лидов...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Заявки</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-white border border-neutral-200">
          <div className="text-2xl font-bold text-neutral-900">{stats.total}</div>
          <div className="text-sm text-neutral-500">Всего</div>
        </div>
        <div className="p-4 rounded-xl bg-brand-50 border border-brand-200">
          <div className="text-2xl font-bold text-brand-700">{stats.new}</div>
          <div className="text-sm text-brand-600">Новых</div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="text-2xl font-bold text-amber-700">{stats.inProgress}</div>
          <div className="text-sm text-amber-600">В работе</div>
        </div>
        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <div className="text-2xl font-bold text-green-700">{stats.completed}</div>
          <div className="text-sm text-green-600">Завершённых</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        <Filter size={16} className="text-neutral-400" />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setLoading(true);
          }}
          className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white text-neutral-700"
        >
          <option value="">Все статусы</option>
          <option value="NEW">Новые</option>
          <option value="IN_PROGRESS">В работе</option>
          <option value="COMPLETED">Завершённые</option>
          <option value="REJECTED">Отклонённые</option>
        </select>
      </div>

      {leads.length === 0 ? (
        <p className="text-neutral-500">
          {filterStatus ? "Нет заявок с таким статусом" : "Пока нет заявок"}
        </p>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-4 font-medium text-neutral-600">Имя</th>
                <th className="text-left p-4 font-medium text-neutral-600 hidden sm:table-cell">
                  Контакт
                </th>
                <th className="text-left p-4 font-medium text-neutral-600 hidden lg:table-cell">
                  Услуги
                </th>
                <th className="text-left p-4 font-medium text-neutral-600">Статус</th>
                <th className="text-left p-4 font-medium text-neutral-600 hidden md:table-cell">
                  Дата
                </th>
                <th className="text-left p-4 font-medium text-neutral-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const st = statusLabels[lead.status] || statusLabels.NEW;
                return (
                  <tr
                    key={lead.id}
                    className="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="p-4 font-medium text-neutral-900">
                      {lead.name}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div>{lead.phone}</div>
                      {lead.telegram && (
                        <div className="text-xs text-neutral-400">
                          {lead.telegram}
                        </div>
                      )}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {lead.selections.slice(0, 2).map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-neutral-100 text-xs"
                          >
                            {s.service.title}
                          </span>
                        ))}
                        {lead.selections.length > 2 && (
                          <span className="px-2 py-0.5 rounded bg-neutral-100 text-xs text-neutral-400">
                            +{lead.selections.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={st.variant}>{st.label}</Badge>
                    </td>
                    <td className="p-4 text-neutral-500 hidden md:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className="text-xs border border-neutral-200 rounded-md px-2 py-1"
                      >
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

      {/* Lead detail drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative bg-white w-full max-w-md shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">
                Заявка от {selectedLead.name}
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Статус
                </label>
                <div className="mt-2">
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      updateStatus(selectedLead.id, e.target.value)
                    }
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="NEW">Новый</option>
                    <option value="IN_PROGRESS">В работе</option>
                    <option value="COMPLETED">Завершён</option>
                    <option value="REJECTED">Отклонён</option>
                  </select>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Контакты
                </h3>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                  <Phone size={16} className="text-neutral-400" />
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="text-sm font-medium text-neutral-900 hover:text-brand-600"
                  >
                    {selectedLead.phone}
                  </a>
                </div>
                {selectedLead.telegram && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                    <MessageSquare size={16} className="text-neutral-400" />
                    <a
                      href={`https://t.me/${selectedLead.telegram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-neutral-900 hover:text-brand-600"
                    >
                      {selectedLead.telegram}
                    </a>
                  </div>
                )}
                {selectedLead.budget && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                    <Wallet size={16} className="text-neutral-400" />
                    <span className="text-sm text-neutral-700">
                      {selectedLead.budget}
                    </span>
                  </div>
                )}
              </div>

              {/* Services */}
              {selectedLead.selections.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                    Выбранные услуги
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.selections.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium"
                      >
                        {s.service.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Comment */}
              {selectedLead.comment && (
                <div>
                  <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                    Комментарий
                  </h3>
                  <p className="text-sm text-neutral-700 bg-neutral-50 p-3 rounded-lg leading-relaxed">
                    {selectedLead.comment}
                  </p>
                </div>
              )}

              {/* Notifications status */}
              <div>
                <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                  Уведомления
                </h3>
                <div className="flex gap-3">
                  <div
                    className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${
                      selectedLead.telegramSent
                        ? "bg-green-50 text-green-700"
                        : "bg-neutral-50 text-neutral-400"
                    }`}
                  >
                    <Send size={12} />
                    Telegram {selectedLead.telegramSent ? "отправлено" : "не отправлено"}
                  </div>
                  <div
                    className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${
                      selectedLead.emailSent
                        ? "bg-green-50 text-green-700"
                        : "bg-neutral-50 text-neutral-400"
                    }`}
                  >
                    <Mail size={12} />
                    Email {selectedLead.emailSent ? "отправлено" : "не отправлено"}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Clock size={12} />
                Создано:{" "}
                {new Date(selectedLead.createdAt).toLocaleString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
