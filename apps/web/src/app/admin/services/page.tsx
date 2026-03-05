"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2 } from "lucide-react";
import { Button, Input, Label, Textarea } from "@webkultura/ui";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  priceFrom: number | null;
  priceTo: number | null;
  durationEstimate: string | null;
  published: boolean;
  order: number;
  parentId: string | null;
  children?: Service[];
}

interface ServiceForm {
  title: string;
  slug: string;
  description: string;
  priceFrom: string;
  priceTo: string;
  durationEstimate: string;
  published: boolean;
  order: number;
  parentId: string;
}

const emptyForm: ServiceForm = {
  title: "",
  slug: "",
  description: "",
  priceFrom: "",
  priceTo: "",
  durationEstimate: "",
  published: true,
  order: 0,
  parentId: "",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => {
      const map: Record<string, string> = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
        ж: "zh", з: "z", и: "i", й: "j", к: "k", л: "l", м: "m",
        н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
        ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
        ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
      };
      return map[ch] || ch;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatPriceRange(from: number | null, to: number | null): string {
  if (!from && !to) return "По запросу";
  if (from && to) return `${from.toLocaleString("ru-RU")} - ${to.toLocaleString("ru-RU")} \u20BD`;
  if (from) return `от ${from.toLocaleString("ru-RU")} \u20BD`;
  return `до ${to!.toLocaleString("ru-RU")} \u20BD`;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch(`${API}/services/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const rootCategories = services.filter((s) => !s.parentId);

  function openCreate(parentId?: string) {
    setEditingId(null);
    setForm({ ...emptyForm, parentId: parentId || "" });
    setError("");
    setModalOpen(true);
  }

  function openEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description || "",
      priceFrom: service.priceFrom?.toString() || "",
      priceTo: service.priceTo?.toString() || "",
      durationEstimate: service.durationEstimate || "",
      published: service.published,
      order: service.order,
      parentId: service.parentId || "",
    });
    setError("");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.title || !form.description) {
      setError("Заполните обязательные поля");
      return;
    }

    setSaving(true);
    setError("");

    const body: Record<string, unknown> = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      description: form.description,
      published: form.published,
      order: form.order,
    };

    if (form.priceFrom) body.priceFrom = parseInt(form.priceFrom);
    if (form.priceTo) body.priceTo = parseInt(form.priceTo);
    if (form.durationEstimate) body.durationEstimate = form.durationEstimate;
    if (form.parentId) body.parentId = form.parentId;

    try {
      const url = editingId ? `${API}/services/${editingId}` : `${API}/services`;
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Ошибка сохранения");
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Удалить услугу?")) return;
    await fetch(`${API}/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchServices();
  }

  if (loading) return <div className="text-muted-foreground">Загрузка...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Услуги</h1>
        <Button size="sm" onClick={() => openCreate()}>
          <Plus size={16} className="mr-1" /> Добавить услугу
        </Button>
      </div>

      {services.length === 0 ? (
        <p className="text-muted-foreground">Нет услуг</p>
      ) : (
        <div className="space-y-6">
          {services.map((category) => (
            <div
              key={category.id}
              className="glass rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold text-white">{category.title}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openCreate(category.id)}
                    className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                    title="Добавить дочернюю услугу"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => openEdit(category)}
                    className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>

              {category.children && category.children.length > 0 && (
                <table className="w-full text-sm">
                  <tbody>
                    {category.children.map((svc) => (
                      <tr
                        key={svc.id}
                        className="border-b border-border/50 last:border-0 hover:bg-secondary/50"
                      >
                        <td className="p-4 font-medium text-white">
                          {svc.title}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {formatPriceRange(svc.priceFrom, svc.priceTo)}
                        </td>
                        <td className="p-4 text-muted-foreground text-xs hidden sm:table-cell">
                          {svc.durationEstimate || "\u2014"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-medium ${
                              svc.published ? "text-emerald-400" : "text-muted-foreground"
                            }`}
                          >
                            {svc.published ? "Активна" : "Скрыта"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEdit(svc)}
                              className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteService(svc.id)}
                              className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative glass-strong rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Редактировать услугу" : "Новая услуга"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-muted-foreground hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label>Название *</Label>
                <Input
                  className="mt-1.5"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: f.slug || slugify(e.target.value),
                    }))
                  }
                  placeholder="Название услуги"
                />
              </div>

              <div>
                <Label>Slug</Label>
                <Input
                  className="mt-1.5"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="avtogeneraciya-iz-nazvaniya"
                />
              </div>

              <div>
                <Label>Родительская категория</Label>
                <select
                  value={form.parentId}
                  onChange={(e) => setForm((f) => ({ ...f, parentId: e.target.value }))}
                  className="mt-1.5 w-full h-11 px-4 rounded-lg border border-border bg-secondary text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Корневая категория</option>
                  {rootCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Описание *</Label>
                <Textarea
                  className="mt-1.5"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Описание услуги"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Цена от (\u20BD)</Label>
                  <Input
                    className="mt-1.5"
                    type="number"
                    value={form.priceFrom}
                    onChange={(e) => setForm((f) => ({ ...f, priceFrom: e.target.value }))}
                    placeholder="30000"
                  />
                </div>
                <div>
                  <Label>Цена до (\u20BD)</Label>
                  <Input
                    className="mt-1.5"
                    type="number"
                    value={form.priceTo}
                    onChange={(e) => setForm((f) => ({ ...f, priceTo: e.target.value }))}
                    placeholder="150000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Срок</Label>
                  <Input
                    className="mt-1.5"
                    value={form.durationEstimate}
                    onChange={(e) => setForm((f) => ({ ...f, durationEstimate: e.target.value }))}
                    placeholder="от 2 нед."
                  />
                </div>
                <div>
                  <Label>Порядок</Label>
                  <Input
                    className="mt-1.5"
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary/30"
                />
                <span className="text-sm font-medium text-foreground">Активна</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Save size={16} className="mr-2" />
                )}
                {saving ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
