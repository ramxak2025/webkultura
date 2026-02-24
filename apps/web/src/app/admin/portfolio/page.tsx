"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Loader2 } from "lucide-react";
import { Button, Input, Label, Textarea } from "@webkultura/ui";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  cover: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: Record<string, string> | null;
  published: boolean;
  order: number;
  categoryId: string;
  category: { name: string };
  createdAt: string;
}

interface ProjectForm {
  title: string;
  slug: string;
  cover: string;
  challenge: string;
  solution: string;
  techStack: string;
  metricsRaw: string;
  published: boolean;
  order: number;
  categoryId: string;
}

const emptyForm: ProjectForm = {
  title: "",
  slug: "",
  cover: "",
  challenge: "",
  solution: "",
  techStack: "",
  metricsRaw: "",
  published: false,
  order: 0,
  categoryId: "",
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

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API}/portfolio/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API}/portfolio/categories`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [fetchProjects, fetchCategories]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      cover: project.cover,
      challenge: project.challenge,
      solution: project.solution,
      techStack: project.techStack.join(", "),
      metricsRaw: project.metrics
        ? Object.entries(project.metrics)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        : "",
      published: project.published,
      order: project.order,
      categoryId: project.categoryId,
    });
    setError("");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.title || !form.challenge || !form.solution || !form.categoryId) {
      setError("Заполните обязательные поля");
      return;
    }

    setSaving(true);
    setError("");

    const metrics: Record<string, string> = {};
    if (form.metricsRaw.trim()) {
      form.metricsRaw.split("\n").forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) {
          metrics[key.trim()] = rest.join(":").trim();
        }
      });
    }

    const body = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      cover: form.cover || "/images/placeholder.svg",
      challenge: form.challenge,
      solution: form.solution,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      metrics: Object.keys(metrics).length > 0 ? metrics : undefined,
      published: form.published,
      order: form.order,
      categoryId: form.categoryId,
    };

    try {
      const url = editingId ? `${API}/portfolio/${editingId}` : `${API}/portfolio`;
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
      fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch(`${API}/portfolio/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ published: !published }),
    });
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !published } : p))
    );
  }

  async function deleteProject(id: string) {
    if (!confirm("Удалить проект?")) return;
    await fetch(`${API}/portfolio/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) return <div className="text-neutral-500">Загрузка...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Портфолио</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-1" /> Добавить проект
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-neutral-500">Нет проектов</p>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-4 font-medium text-neutral-600">Название</th>
                <th className="text-left p-4 font-medium text-neutral-600">Категория</th>
                <th className="text-left p-4 font-medium text-neutral-600">Статус</th>
                <th className="text-left p-4 font-medium text-neutral-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="p-4 font-medium text-neutral-900">{project.title}</td>
                  <td className="p-4 text-neutral-500">{project.category?.name}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        project.published ? "text-green-600" : "text-neutral-400"
                      }`}
                    >
                      {project.published ? (
                        <>
                          <Eye size={12} /> Опубликован
                        </>
                      ) : (
                        <>
                          <EyeOff size={12} /> Черновик
                        </>
                      )}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(project.id, project.published)}
                        className="p-1.5 text-neutral-400 hover:text-brand-600 transition-colors"
                        title={project.published ? "Снять с публикации" : "Опубликовать"}
                      >
                        {project.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => openEdit(project)}
                        className="p-1.5 text-neutral-400 hover:text-brand-600 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">
                {editingId ? "Редактировать проект" : "Новый проект"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="Название проекта"
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
              </div>

              <div>
                <Label>Категория *</Label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                  className="mt-1.5 w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Обложка (URL)</Label>
                <Input
                  className="mt-1.5"
                  value={form.cover}
                  onChange={(e) => setForm((f) => ({ ...f, cover: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label>Задача *</Label>
                <Textarea
                  className="mt-1.5"
                  rows={3}
                  value={form.challenge}
                  onChange={(e) => setForm((f) => ({ ...f, challenge: e.target.value }))}
                  placeholder="Опишите задачу клиента"
                />
              </div>

              <div>
                <Label>Решение *</Label>
                <Textarea
                  className="mt-1.5"
                  rows={3}
                  value={form.solution}
                  onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
                  placeholder="Опишите решение"
                />
              </div>

              <div>
                <Label>Технологии (через запятую)</Label>
                <Input
                  className="mt-1.5"
                  value={form.techStack}
                  onChange={(e) => setForm((f) => ({ ...f, techStack: e.target.value }))}
                  placeholder="Next.js, TypeScript, PostgreSQL"
                />
              </div>

              <div>
                <Label>Метрики (формат: Название: Значение, каждая на новой строке)</Label>
                <Textarea
                  className="mt-1.5"
                  rows={3}
                  value={form.metricsRaw}
                  onChange={(e) => setForm((f) => ({ ...f, metricsRaw: e.target.value }))}
                  placeholder={"Конверсия: +45%\nСкорость: 95/100"}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Порядок</Label>
                  <Input
                    className="mt-1.5"
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                      className="w-4 h-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm font-medium text-neutral-700">Опубликовать</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-neutral-200">
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
