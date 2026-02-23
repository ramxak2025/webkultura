"use client";

import { useEffect, useState } from "react";
import { Badge } from "@webkultura/ui";

interface Lead {
  id: string;
  name: string;
  phone: string;
  telegram?: string;
  budget?: string;
  status: string;
  createdAt: string;
  telegramSent: boolean;
  emailSent: boolean;
  selections: Array<{ service: { title: string } }>;
}

const statusLabels: Record<string, { label: string; variant: "default" | "warning" | "success" | "destructive" }> = {
  NEW: { label: "Новый", variant: "default" },
  IN_PROGRESS: { label: "В работе", variant: "warning" },
  COMPLETED: { label: "Завершён", variant: "success" },
  REJECTED: { label: "Отклонён", variant: "destructive" },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/leads`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    const token = localStorage.getItem("admin_token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/leads/${id}`, {
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
  }

  if (loading) {
    return <div className="text-neutral-500">Загрузка лидов...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Лиды</h1>

      {leads.length === 0 ? (
        <p className="text-neutral-500">Пока нет заявок</p>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-4 font-medium text-neutral-600">Имя</th>
                <th className="text-left p-4 font-medium text-neutral-600">Контакт</th>
                <th className="text-left p-4 font-medium text-neutral-600">Услуги</th>
                <th className="text-left p-4 font-medium text-neutral-600">Статус</th>
                <th className="text-left p-4 font-medium text-neutral-600">Дата</th>
                <th className="text-left p-4 font-medium text-neutral-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const st = statusLabels[lead.status] || statusLabels.NEW;
                return (
                  <tr key={lead.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="p-4 font-medium text-neutral-900">{lead.name}</td>
                    <td className="p-4">
                      <div>{lead.phone}</div>
                      {lead.telegram && (
                        <div className="text-xs text-neutral-400">{lead.telegram}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.selections.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-neutral-100 text-xs">
                            {s.service.title}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={st.variant}>{st.label}</Badge>
                    </td>
                    <td className="p-4 text-neutral-500">
                      {new Date(lead.createdAt).toLocaleDateString("ru-RU")}
                    </td>
                    <td className="p-4">
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
    </div>
  );
}
