"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { Button, Input, Label, Textarea } from "@webkultura/ui";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  cover: string;
  gradient: string | null;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: Record<string, string> | null;
  published: boolean;
  order: number;
  categoryId: string;
  category: { name: string };
  images: ProjectImage[];
  createdAt: string;
}

interface ProjectForm {
  title: string;
  slug: string;
  cover: string;
  gradient: string;
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
  gradient: "from-violet-600 via-purple-600 to-indigo-600",
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
  const [uploading, setUploading] = useState(false);
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

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

  async function uploadFile(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      return data.url;
    } catch {
      return null;
    }
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file);
    if (url) setForm((f) => ({ ...f, cover: url }));
    setUploading(false);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !editingId) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) {
        const res = await fetch(`${API}/portfolio/${editingId}/images`, {
          method: "POST",
          headers,
          body: JSON.stringify({ url, alt: file.name }),
        });
        if (res.ok) {
          const img = await res.json();
          setProjectImages((prev) => [...prev, img]);
        }
      }
    }
    setUploading(false);
  }

  async function removeProjectImage(imageId: string) {
    if (!editingId) return;
    await fetch(`${API}/portfolio/${editingId}/images/${imageId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjectImages((prev) => prev.filter((img) => img.id !== imageId));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setProjectImages([]);
    setError("");
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      cover: project.cover,
      gradient: project.gradient || "from-violet-600 via-purple-600 to-indigo-600",
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
    setProjectImages(project.images || []);
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
      cover: form.cover || "",
      gradient: form.gradient || undefined,
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

  if (loading) return <div className="text-muted-foreground">Загрузка...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Портфолио</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} className="mr-1" /> Добавить проект
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">Нет проектов</p>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Название</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Категория</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Статус</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {project.cover ? (
                        <img src={project.cover} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient || "from-violet-600 to-indigo-600"}`} />
                      )}
                      <span className="font-medium text-white">{project.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{project.category?.name}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        project.published ? "text-emerald-400" : "text-muted-foreground"
                      }`}
                    >
                      {project.published ? (
                        <><Eye size={12} /> Опубликован</>
                      ) : (
                        <><EyeOff size={12} /> Черновик</>
                      )}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(project.id, project.published)}
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                        title={project.published ? "Снять с публикации" : "Опубликовать"}
                      >
                        {project.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => openEdit(project)}
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
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
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative glass-strong rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Редактировать проект" : "Новый проект"}
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
                  className="mt-1.5 w-full h-11 px-4 rounded-lg border border-border bg-secondary text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cover image upload */}
              <div>
                <Label>Обложка</Label>
                <div className="mt-1.5 flex items-center gap-3">
                  {form.cover ? (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <img src={form.cover} alt="cover" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setForm((f) => ({ ...f, cover: "" }))}
                        className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white hover:bg-red-500"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${form.gradient} flex items-center justify-center`}>
                      <ImageIcon size={24} className="text-white/50" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                      {uploading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Upload size={14} className="mr-1.5" />}
                      Загрузить
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">или вставьте URL:</p>
                    <Input
                      className="mt-1"
                      value={form.cover}
                      onChange={(e) => setForm((f) => ({ ...f, cover: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Градиент (фоллбек)</Label>
                <Input
                  className="mt-1.5"
                  value={form.gradient}
                  onChange={(e) => setForm((f) => ({ ...f, gradient: e.target.value }))}
                  placeholder="from-violet-600 via-purple-600 to-indigo-600"
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
                <Label>Метрики (Название: Значение, каждая на новой строке)</Label>
                <Textarea
                  className="mt-1.5"
                  rows={3}
                  value={form.metricsRaw}
                  onChange={(e) => setForm((f) => ({ ...f, metricsRaw: e.target.value }))}
                  placeholder={"Конверсия: +45%\nСкорость: 95/100"}
                />
              </div>

              {/* Gallery (only for existing projects) */}
              {editingId && (
                <div>
                  <Label>Галерея</Label>
                  <div className="mt-1.5 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {projectImages.map((img) => (
                      <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden group">
                        <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeProjectImage(img.id)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={uploading}
                      className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      {uploading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                    </button>
                  </div>
                  <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                </div>
              )}

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
                      className="w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary/30"
                    />
                    <span className="text-sm font-medium text-foreground">Опубликовать</span>
                  </label>
                </div>
              </div>
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
