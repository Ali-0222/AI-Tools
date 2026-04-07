"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { useAuth } from "@/components/auth/auth-provider";
import { buildCvPdf } from "@/lib/cv-pdf";
import { loadCvForUser, saveCvForUser } from "@/lib/cv-storage";

type CvTemplate = {
  id: string;
  name: string;
  accent: string;
  layout: "classic" | "modern" | "sidebar";
  summary: string;
  badge: string;
};

type CvData = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
};

type DraftRecord = {
  templateId: string;
  form: CvData;
};

const LOCAL_DRAFT_KEY = "toolbeepro.cv-builder-draft";

const templates: CvTemplate[] = [
  {
    id: "executive-red",
    name: "Executive Red",
    accent: "#d92d20",
    layout: "classic",
    summary: "Balanced business resume with strong section hierarchy.",
    badge: "Executive"
  },
  {
    id: "metro-blue",
    name: "Metro Blue",
    accent: "#2563eb",
    layout: "modern",
    summary: "Clean modern header with a strong professional top band.",
    badge: "Corporate"
  },
  {
    id: "charcoal-pro",
    name: "Charcoal Pro",
    accent: "#1f2937",
    layout: "modern",
    summary: "Minimal grayscale layout for corporate and tech roles.",
    badge: "Minimal"
  },
  {
    id: "emerald-side",
    name: "Emerald Side",
    accent: "#0f766e",
    layout: "sidebar",
    summary: "Sidebar profile layout ideal for creative and operations roles.",
    badge: "Creative"
  },
  {
    id: "amber-line",
    name: "Amber Line",
    accent: "#b45309",
    layout: "classic",
    summary: "Warm editorial style with polished content rhythm.",
    badge: "Warm"
  },
  {
    id: "violet-edge",
    name: "Violet Edge",
    accent: "#6d28d9",
    layout: "sidebar",
    summary: "Bold visual split layout with strong left profile column.",
    badge: "Bold"
  },
  {
    id: "navy-stripe",
    name: "Navy Stripe",
    accent: "#1d4ed8",
    layout: "modern",
    summary: "Confident recruiter-friendly layout with crisp top structure.",
    badge: "ATS-Friendly"
  },
  {
    id: "rose-minimal",
    name: "Rose Minimal",
    accent: "#e11d48",
    layout: "classic",
    summary: "Soft premium style with simple spacing for polished applications.",
    badge: "Elegant"
  },
  {
    id: "forest-grid",
    name: "Forest Grid",
    accent: "#166534",
    layout: "modern",
    summary: "Structured two-column feel for product, finance, and analyst roles.",
    badge: "Structured"
  },
  {
    id: "slate-column",
    name: "Slate Column",
    accent: "#475569",
    layout: "sidebar",
    summary: "Serious left-column resume for operations, admin, and leadership roles.",
    badge: "Professional"
  }
];

const initialCvData: CvData = {
  fullName: "Your Name",
  jobTitle: "Professional Title",
  email: "you@example.com",
  phone: "+1 555 000 0000",
  location: "City, Country",
  summary:
    "Write a short professional summary highlighting your strengths, achievements, and the kind of role you are targeting.",
  experience:
    "Senior Role at Company\n2022 - Present\nDescribe your impact, responsibilities, and measurable achievements.\n\nPrevious Role at Company\n2019 - 2022\nAdd strong bullet-style accomplishments and project outcomes.",
  education: "Bachelor's Degree\nUniversity Name\nGraduation Year",
  skills: "Leadership, Communication, Excel, Figma, Project Management, Problem Solving"
};

function isCvData(value: unknown): value is CvData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return [
    "fullName",
    "jobTitle",
    "email",
    "phone",
    "location",
    "summary",
    "experience",
    "education",
    "skills"
  ].every((key) => typeof record[key] === "string");
}

function readLocalDraft(): DraftRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(LOCAL_DRAFT_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as DraftRecord;
    if (!parsed || typeof parsed.templateId !== "string" || !isCvData(parsed.form)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeLocalDraft(record: DraftRecord) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(record));
}

export function CvBuilderTool() {
  const { configured, user, ready } = useAuth();
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [form, setForm] = useState<CvData>(initialCvData);
  const [status, setStatus] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);

  useEffect(() => {
    if (!ready) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const localDraft = readLocalDraft();
        if (!cancelled && localDraft) {
          setSelectedTemplateId(localDraft.templateId);
          setForm(localDraft.form);
        }

        if (user && configured) {
          setLoadingProfile(true);
          const savedCv = await loadCvForUser(user.id);
          if (!cancelled && savedCv) {
            setSelectedTemplateId(savedCv.templateId);
            setForm(savedCv.form);
          }
        }
      } catch (error) {
        if (!cancelled) {
          setStatus(error instanceof Error ? error.message : "Unable to load saved CV.");
        }
      } finally {
        if (!cancelled) {
          setLoadingProfile(false);
          setDraftLoaded(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [configured, ready, user]);

  useEffect(() => {
    if (!draftLoaded || (user && configured)) {
      return;
    }

    writeLocalDraft({
      templateId: selectedTemplateId,
      form
    });
  }, [configured, draftLoaded, form, selectedTemplateId, user]);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? templates[0],
    [selectedTemplateId]
  );

  function updateField<K extends keyof CvData>(field: K, value: CvData[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("");
  }

  async function saveCv() {
    try {
      setSaving(true);
      setStatus("");

      if (user && configured) {
        await saveCvForUser(user.id, {
          templateId: selectedTemplateId,
          form
        });
        setStatus("CV saved to your profile.");
        return;
      }

      writeLocalDraft({
        templateId: selectedTemplateId,
        form
      });
      setStatus("Draft saved in this browser. Login is optional if you want profile sync.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save CV.");
    } finally {
      setSaving(false);
    }
  }

  async function downloadPdf() {
    try {
      setDownloading(true);
      setStatus("");
      const bytes = await buildCvPdf({
        templateName: selectedTemplate.name,
        accent: selectedTemplate.accent,
        layout: selectedTemplate.layout,
        form
      });
      const pdfBytes = bytes instanceof Uint8Array ? new Uint8Array(bytes) : new Uint8Array(bytes);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${form.fullName.replace(/\s+/g, "-").toLowerCase() || "cv"}.pdf`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to download CV.");
    } finally {
      setDownloading(false);
    }
  }

  if (!ready) {
    return <div className="py-16 text-center text-[var(--muted)]">Loading CV builder...</div>;
  }

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Choose a template</h2>
        <p className="text-sm leading-6 text-[var(--muted)]">
          Choose from ten polished CV templates, edit instantly without login, download PDF, and sign in later only if you want profile sync.
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplateId(template.id)}
              className={`rounded-3xl border bg-white p-4 text-left transition ${
                selectedTemplateId === template.id
                  ? "border-[var(--accent)] shadow-[0_12px_24px_rgba(229,50,45,0.12)]"
                  : "border-[var(--border)]"
              }`}
            >
              <TemplateThumb template={template} />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="font-semibold">{template.name}</p>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ backgroundColor: `${template.accent}14`, color: template.accent }}
                >
                  {template.badge}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{template.summary}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-5 md:p-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {user
                ? "Profile sync is active for this CV."
                : "No login needed. Your draft stays available in this browser."}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {user
                ? "You can edit, download, and save this CV to your profile. Your browser draft still works as a fallback."
                : configured
                  ? "You can edit and download right away. If you sign in later, you can also sync the same CV to your profile."
                  : "You can edit, save in this browser, and download PDF without any account setup."}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Edit selected template</h2>
            {loadingProfile ? <span className="text-sm text-[var(--muted)]">Loading saved CV...</span> : null}
          </div>

          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Full name</span>
              <input
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Job title</span>
              <input
                value={form.jobTitle}
                onChange={(event) => updateField("jobTitle", event.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Email</span>
                <input
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Phone</span>
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Location</span>
              <input
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Summary</span>
              <textarea
                rows={4}
                value={form.summary}
                onChange={(event) => updateField("summary", event.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Experience</span>
              <textarea
                rows={7}
                value={form.experience}
                onChange={(event) => updateField("experience", event.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Education</span>
              <textarea
                rows={5}
                value={form.education}
                onChange={(event) => updateField("education", event.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Skills</span>
              <textarea
                rows={3}
                value={form.skills}
                onChange={(event) => updateField("skills", event.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <ToolButton onClick={saveCv} disabled={saving}>
              {saving
                ? "Saving..."
                : user && configured
                  ? "Save to profile"
                  : "Save in browser"}
            </ToolButton>
            <ToolButton variant="secondary" onClick={downloadPdf} disabled={downloading}>
              {downloading ? "Preparing PDF..." : "Download CV PDF"}
            </ToolButton>
            {user ? (
              <Link href="/profile" className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold">
                Go to profile
              </Link>
            ) : configured ? (
              <Link href="/auth/login" className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold">
                Login to sync
              </Link>
            ) : null}
          </div>

          {status ? <p className="mt-4 text-sm text-[var(--accent)]">{status}</p> : null}
        </div>

        <CvPreview selectedTemplate={selectedTemplate} form={form} />
      </section>
    </div>
  );
}

function TemplateThumb({ template }: { template: CvTemplate }) {
  const softAccent = `${template.accent}18`;
  const softAccentStrong = `${template.accent}30`;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
      style={{
        background:
          template.layout === "sidebar"
            ? `linear-gradient(90deg, ${template.accent} 0 26%, ${softAccent} 26% 100%)`
            : template.layout === "modern"
              ? `linear-gradient(180deg, ${template.accent} 0 20%, #ffffff 20% 100%)`
              : `linear-gradient(180deg, ${softAccent} 0 100%)`
      }}
    >
      <div className="min-h-40 p-4">
        <div
          className="rounded-xl p-3 shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            border: template.layout === "classic" ? `1px solid ${softAccentStrong}` : undefined
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="h-3 w-24 rounded-full" style={{ backgroundColor: template.accent }} />
            <div className="h-3 w-10 rounded-full" style={{ backgroundColor: softAccentStrong }} />
          </div>
          <div className="mt-3 h-2 w-16 rounded-full bg-slate-200" />
          <div className="mt-4 grid gap-2">
            <div className="h-2 rounded-full bg-slate-200" />
            <div className="h-2 rounded-full bg-slate-200" />
            <div className="h-2 w-4/5 rounded-full bg-slate-200" />
            <div className="h-2 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

const CvPreview = ({ selectedTemplate, form }: { selectedTemplate: CvTemplate; form: CvData }) => {
  const accentStyle = { backgroundColor: selectedTemplate.accent, borderColor: selectedTemplate.accent };
  const panelTint = `${selectedTemplate.accent}10`;

  if (selectedTemplate.layout === "sidebar") {
    return (
      <div className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <div className="grid md:grid-cols-[0.35fr_0.65fr]">
          <aside className="p-6 text-white" style={{ backgroundColor: selectedTemplate.accent }}>
            <h3 className="text-3xl font-bold">{form.fullName}</h3>
            <p className="mt-2 text-base font-semibold text-white/90">{form.jobTitle}</p>
            <div className="mt-6 space-y-2 text-sm leading-6 text-white/90">
              <p>{form.email}</p>
              <p>{form.phone}</p>
              <p>{form.location}</p>
            </div>
            <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4">
              <h4 className="text-sm font-bold uppercase tracking-[0.16em]">Skills</h4>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/90">{form.skills}</p>
            </div>
          </aside>
          <div className="p-6 md:p-8" style={{ backgroundColor: panelTint }}>
            <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_36px_rgba(15,23,42,0.08)] md:p-7">
              <PreviewSection title="Summary" accent={selectedTemplate.accent} text={form.summary} />
              <PreviewSection title="Experience" accent={selectedTemplate.accent} text={form.experience} className="mt-7" />
              <PreviewSection title="Education" accent={selectedTemplate.accent} text={form.education} className="mt-7" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTemplate.layout === "modern") {
    return (
      <div className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <div className="p-8 text-white" style={accentStyle}>
          <h3 className="text-4xl font-bold">{form.fullName}</h3>
          <p className="mt-2 text-lg font-semibold text-white/90">{form.jobTitle}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/90">
            <span>{form.email}</span>
            <span>{form.phone}</span>
            <span>{form.location}</span>
          </div>
        </div>
        <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div>
            <PreviewSection title="Summary" accent={selectedTemplate.accent} text={form.summary} />
            <PreviewSection title="Experience" accent={selectedTemplate.accent} text={form.experience} className="mt-7" />
          </div>
          <div className="rounded-[28px] p-5 md:p-6" style={{ backgroundColor: panelTint }}>
            <PreviewSection title="Education" accent={selectedTemplate.accent} text={form.education} />
            <PreviewSection title="Skills" accent={selectedTemplate.accent} text={form.skills} className="mt-7" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:p-8">
      <div className="rounded-[28px] border-b p-6 md:p-7" style={{ borderColor: selectedTemplate.accent, backgroundColor: panelTint }}>
        <div className="h-1 w-28 rounded-full" style={accentStyle} />
        <h3 className="mt-5 text-4xl font-bold text-[var(--foreground)]">{form.fullName}</h3>
        <p className="mt-2 text-lg font-semibold text-[var(--muted)]">{form.jobTitle}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
          <span>{form.email}</span>
          <span>{form.phone}</span>
          <span>{form.location}</span>
        </div>
      </div>
      <div className="mt-7 grid gap-7 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <PreviewSection title="Summary" accent={selectedTemplate.accent} text={form.summary} />
          <PreviewSection title="Experience" accent={selectedTemplate.accent} text={form.experience} className="mt-7" />
        </div>
        <div>
          <PreviewSection title="Education" accent={selectedTemplate.accent} text={form.education} />
          <PreviewSection title="Skills" accent={selectedTemplate.accent} text={form.skills} className="mt-7" />
        </div>
      </div>
    </div>
  );
};

function PreviewSection({
  title,
  accent,
  text,
  className = ""
}: {
  title: string;
  accent: string;
  text: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <h4 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
        {title}
      </h4>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--muted)]">{text}</p>
    </section>
  );
}
