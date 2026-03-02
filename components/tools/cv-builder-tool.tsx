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

const templates: CvTemplate[] = [
  { id: "executive-red", name: "Executive Red", accent: "#d92d20", layout: "classic", summary: "Balanced business resume with strong section hierarchy." },
  { id: "metro-blue", name: "Metro Blue", accent: "#2563eb", layout: "modern", summary: "Clean modern header with a strong professional top band." },
  { id: "charcoal-pro", name: "Charcoal Pro", accent: "#1f2937", layout: "modern", summary: "Minimal grayscale layout for corporate and tech roles." },
  { id: "emerald-side", name: "Emerald Side", accent: "#0f766e", layout: "sidebar", summary: "Sidebar profile layout ideal for creative and operations roles." },
  { id: "amber-line", name: "Amber Line", accent: "#b45309", layout: "classic", summary: "Warm editorial style with polished content rhythm." },
  { id: "violet-edge", name: "Violet Edge", accent: "#6d28d9", layout: "sidebar", summary: "Bold visual split layout with strong left profile column." }
];

const initialCvData: CvData = {
  fullName: "Your Name",
  jobTitle: "Professional Title",
  email: "you@example.com",
  phone: "+1 555 000 0000",
  location: "City, Country",
  summary: "Write a short professional summary highlighting your strengths, achievements, and the kind of role you are targeting.",
  experience: "Senior Role at Company\n2022 - Present\nDescribe your impact, responsibilities, and measurable achievements.\n\nPrevious Role at Company\n2019 - 2022\nAdd strong bullet-style accomplishments and project outcomes.",
  education: "Bachelor's Degree\nUniversity Name\nGraduation Year",
  skills: "Leadership, Communication, Excel, Figma, Project Management, Problem Solving"
};

export function CvBuilderTool() {
  const { configured, user, ready } = useAuth();
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [form, setForm] = useState<CvData>(initialCvData);
  const [status, setStatus] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!ready || !user || !configured) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        setLoadingProfile(true);
        const savedCv = await loadCvForUser(user.id);
        if (!cancelled && savedCv) {
          setSelectedTemplateId(savedCv.templateId);
          setForm(savedCv.form);
        }
      } catch (error) {
        if (!cancelled) {
          setStatus(error instanceof Error ? error.message : "Unable to load saved CV.");
        }
      } finally {
        if (!cancelled) {
          setLoadingProfile(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [configured, ready, user]);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? templates[0],
    [selectedTemplateId]
  );

  function updateField<K extends keyof CvData>(field: K, value: CvData[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("");
  }

  async function saveCv() {
    if (!user || !configured) {
      return;
    }

    try {
      setSaving(true);
      setStatus("");
      await saveCvForUser(user.id, {
        templateId: selectedTemplateId,
        form
      });
      setStatus("CV saved to your profile.");
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
      const blob = new Blob([bytes], { type: "application/pdf" });
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
          Preview six responsive CV templates. Login is required for editing, saving to profile, and syncing resume data across sessions.
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
              <p className="mt-3 font-semibold">{template.name}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{template.summary}</p>
            </button>
          ))}
        </div>
      </section>

      {!user ? (
        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6">
            <h2 className="text-xl font-bold">Login to edit, save, and download</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Users can preview templates before login. To fill the form, save the selected CV in profile, use Google sign-in, email login, or reset password, configure Firebase and sign in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/auth/login" className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">
                Login
              </Link>
              <Link href="/auth/register" className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold">
                Create account
              </Link>
            </div>
          </div>
          <CvPreview selectedTemplate={selectedTemplate} form={form} />
        </section>
      ) : (
        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-white p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Edit selected template</h2>
              {loadingProfile ? <span className="text-sm text-[var(--muted)]">Loading saved CV...</span> : null}
            </div>
            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Full name</span>
                <input value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Job title</span>
                <input value={form.jobTitle} onChange={(event) => updateField("jobTitle", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Email</span>
                  <input value={form.email} onChange={(event) => updateField("email", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Phone</span>
                  <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Location</span>
                <input value={form.location} onChange={(event) => updateField("location", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Summary</span>
                <textarea rows={4} value={form.summary} onChange={(event) => updateField("summary", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Experience</span>
                <textarea rows={7} value={form.experience} onChange={(event) => updateField("experience", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Education</span>
                <textarea rows={5} value={form.education} onChange={(event) => updateField("education", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Skills</span>
                <textarea rows={3} value={form.skills} onChange={(event) => updateField("skills", event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3" />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ToolButton onClick={saveCv} disabled={!configured || saving}>
                {saving ? "Saving..." : "Save CV"}
              </ToolButton>
              <ToolButton variant="secondary" onClick={downloadPdf} disabled={downloading}>
                {downloading ? "Preparing PDF..." : "Download CV PDF"}
              </ToolButton>
              <Link href="/profile" className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold">
                Go to profile
              </Link>
            </div>
            {status ? <p className="mt-4 text-sm text-[var(--accent)]">{status}</p> : null}
          </div>
          <CvPreview selectedTemplate={selectedTemplate} form={form} />
        </section>
      )}
    </div>
  );
}

function TemplateThumb({ template }: { template: CvTemplate }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
      style={{
        background:
          template.layout === "sidebar"
            ? `linear-gradient(90deg, ${template.accent} 0 26%, #ffffff 26% 100%)`
            : template.layout === "modern"
              ? `linear-gradient(180deg, ${template.accent} 0 18%, #ffffff 18% 100%)`
              : "#ffffff"
      }}
    >
      <div className="min-h-40 p-4">
        <div className="rounded-xl bg-white/95 p-3 shadow-sm">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: template.accent }} />
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
            <div className="mt-8">
              <h4 className="text-sm font-bold uppercase tracking-[0.16em]">Skills</h4>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/90">{form.skills}</p>
            </div>
          </aside>
          <div className="p-6 md:p-8">
            <PreviewSection title="Summary" accent={selectedTemplate.accent} text={form.summary} />
            <PreviewSection title="Experience" accent={selectedTemplate.accent} text={form.experience} className="mt-7" />
            <PreviewSection title="Education" accent={selectedTemplate.accent} text={form.education} className="mt-7" />
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
          <div>
            <PreviewSection title="Education" accent={selectedTemplate.accent} text={form.education} />
            <PreviewSection title="Skills" accent={selectedTemplate.accent} text={form.skills} className="mt-7" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:p-8">
      <div className="border-b pb-6" style={{ borderColor: selectedTemplate.accent }}>
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
