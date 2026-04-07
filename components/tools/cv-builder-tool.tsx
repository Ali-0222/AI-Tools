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

type PreviewSectionChunk = {
  title: string;
  text: string;
};

type PreviewPage = {
  pageNumber: number;
  sections: PreviewSectionChunk[];
};

const LOCAL_DRAFT_KEY = "toolbeepro.cv-builder-draft";

const templates: CvTemplate[] = [
  {
    id: "executive-slate",
    name: "Executive Slate",
    accent: "#0f172a",
    layout: "classic",
    summary: "Sharp ATS-friendly business resume with clean spacing and strong hierarchy.",
    badge: "ATS"
  },
  {
    id: "cobalt-summit",
    name: "Cobalt Summit",
    accent: "#2563eb",
    layout: "modern",
    summary: "Confident top-band layout for corporate, product, and growth roles.",
    badge: "Modern"
  },
  {
    id: "emerald-edge",
    name: "Emerald Edge",
    accent: "#0f766e",
    layout: "modern",
    summary: "Fresh professional template with a cleaner recruiter-style document flow.",
    badge: "Clean"
  },
  {
    id: "burgundy-ledger",
    name: "Burgundy Ledger",
    accent: "#9f1239",
    layout: "classic",
    summary: "Premium editorial layout for leadership, consulting, and client-facing resumes.",
    badge: "Premium"
  },
  {
    id: "graphite-pro",
    name: "Graphite Pro",
    accent: "#334155",
    layout: "classic",
    summary: "Minimal professional resume for operations, finance, and senior support roles.",
    badge: "Structured"
  },
  {
    id: "onyx-board",
    name: "Onyx Board",
    accent: "#111827",
    layout: "sidebar",
    summary: "High-contrast executive sidebar layout with strong profile presence.",
    badge: "Executive"
  },
  {
    id: "steel-column",
    name: "Steel Column",
    accent: "#475569",
    layout: "sidebar",
    summary: "Balanced sidebar template for admin, HR, and business operations applicants.",
    badge: "Professional"
  }
];

function isTemplateId(value: string) {
  return templates.some((template) => template.id === value);
}

function getTemplateById(value: string) {
  return templates.find((template) => template.id === value) ?? templates[0];
}

const initialCvData: CvData = {
  fullName: "Ayesha Khan",
  jobTitle: "Senior Operations Manager",
  email: "ayesha.khan@email.com",
  phone: "+1 646 555 0148",
  location: "New York, USA",
  summary:
    "Results-focused operations leader with 8+ years of experience improving service delivery, team performance, and cross-functional execution. Known for building reliable workflows, reducing delays, and turning complex processes into scalable systems. Brings a strong mix of team leadership, reporting discipline, and cross-functional communication across operations, customer support, finance, and vendor management.",
  experience:
    "Senior Operations Manager | Northstar Logistics | 2022 - Present\n- Led a 24-member regional operations team across fulfillment, reporting, and vendor coordination.\n- Reduced order processing time by 31% by redesigning handoff workflows and dashboard tracking.\n- Launched weekly KPI reviews that improved on-time delivery from 89% to 97%.\n- Built monthly leadership reports covering SLA trends, staffing gaps, and cost-saving opportunities.\n\nOperations Lead | BluePeak Retail | 2018 - 2022\n- Managed store support, staffing plans, and escalation handling for 12 locations.\n- Standardized SOPs and onboarding documents, cutting ramp-up time for new hires by 40%.\n- Partnered with finance and HR teams to improve scheduling accuracy and labor planning.\n- Introduced service recovery guidelines that improved customer satisfaction scores by 18%.\n\nBusiness Operations Coordinator | CityMart Distribution | 2015 - 2018\n- Supported daily inventory, dispatch, and reporting workflows for a fast-moving regional network.\n- Prepared weekly operational scorecards and maintained vendor issue logs for leadership review.\n- Coordinated with warehouse and support teams to close service issues within agreed timelines.",
  education:
    "MBA, Operations Management\nBaruch College, City University of New York\n2018\n- Focus: operations planning, service systems, and performance analytics.\n\nBBA, Business Administration\nUniversity of Karachi\n2015\n- Graduated with distinction.\n\nCertification\nLean Six Sigma Yellow Belt | 2021",
  skills:
    "Operations Strategy, Team Leadership, Process Improvement, KPI Dashboards, Vendor Management, Project Coordination, SOP Development, Workforce Planning, Excel, Google Sheets, PowerPoint, Stakeholder Communication"
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

function wrapPreviewText(text: string, maxChars: number) {
  const paragraphs = text.split(/\r?\n/);
  const lines: string[] = [];

  paragraphs.forEach((paragraph) => {
    if (!paragraph.trim()) {
      lines.push("");
      return;
    }

    let current = "";
    paragraph.split(/\s+/).forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (next.length <= maxChars) {
        current = next;
        return;
      }

      if (current) {
        lines.push(current);
      }
      current = word;
    });

    if (current) {
      lines.push(current);
    }
  });

  return lines;
}

function paginatePreviewSections(
  sections: PreviewSectionChunk[],
  firstPageLines: number,
  nextPageLines: number,
  maxChars: number
) {
  const pages: PreviewPage[] = [];
  let currentSections: PreviewSectionChunk[] = [];
  let remainingLines = firstPageLines;
  let pageNumber = 1;

  const pushPage = () => {
    if (!currentSections.length) {
      return;
    }

    pages.push({
      pageNumber,
      sections: currentSections
    });
    currentSections = [];
    pageNumber += 1;
    remainingLines = nextPageLines;
  };

  sections.forEach((section) => {
    const lines = wrapPreviewText(section.text, maxChars);
    let index = 0;
    let continued = false;

    if (!lines.length) {
      if (remainingLines < 3) {
        pushPage();
      }

      currentSections.push(section);
      remainingLines -= 3;
      return;
    }

    while (index < lines.length) {
      if (remainingLines < 4) {
        pushPage();
      }

      const availableTextLines = Math.max(1, remainingLines - 2);
      const takenLines = lines.slice(index, index + availableTextLines);

      currentSections.push({
        title: continued ? `${section.title} (Cont.)` : section.title,
        text: takenLines.join("\n")
      });

      index += takenLines.length;
      remainingLines -= takenLines.length + 2;

      if (index < lines.length) {
        pushPage();
        continued = true;
      }
    }
  });

  pushPage();
  return pages;
}

function buildPreviewPages(template: CvTemplate, form: CvData) {
  const sectionsByLayout: Record<CvTemplate["layout"], PreviewSectionChunk[]> = {
    classic: [
      { title: "Summary", text: form.summary },
      { title: "Experience", text: form.experience }
    ],
    modern: [
      { title: "Summary", text: form.summary },
      { title: "Experience", text: form.experience }
    ],
    sidebar: [
      { title: "Summary", text: form.summary },
      { title: "Experience", text: form.experience },
      { title: "Education", text: form.education }
    ]
  };

  const limitsByLayout: Record<CvTemplate["layout"], { first: number; next: number; chars: number }> = {
    classic: { first: 32, next: 46, chars: 52 },
    modern: { first: 32, next: 46, chars: 52 },
    sidebar: { first: 38, next: 40, chars: 46 }
  };

  const limits = limitsByLayout[template.layout];
  return paginatePreviewSections(sectionsByLayout[template.layout], limits.first, limits.next, limits.chars);
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
          setSelectedTemplateId(isTemplateId(localDraft.templateId) ? localDraft.templateId : templates[0].id);
          setForm(localDraft.form);
        }

        if (user && configured) {
          setLoadingProfile(true);
          const savedCv = await loadCvForUser(user.id);
          if (!cancelled && savedCv) {
            setSelectedTemplateId(isTemplateId(savedCv.templateId) ? savedCv.templateId : templates[0].id);
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
    () => getTemplateById(selectedTemplateId),
    [selectedTemplateId]
  );
  const previewPages = useMemo(() => buildPreviewPages(selectedTemplate, form), [selectedTemplate, form]);

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
          Choose from {templates.length} polished CV templates, edit instantly without login, download PDF, and sign in later only if you want profile sync.
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
              <span className="mt-2 block text-xs leading-5 text-[var(--muted)]">
                Use a new paragraph for each role and short bullet-style lines for achievements to keep the PDF clean.
              </span>
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

        <CvPreview selectedTemplate={selectedTemplate} form={form} pages={previewPages} />
      </section>
    </div>
  );
}

function TemplateThumb({ template }: { template: CvTemplate }) {
  const softAccent = `${template.accent}12`;
  const softAccentStrong = `${template.accent}28`;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[#f8fafc]"
      style={{
        background:
          template.layout === "sidebar"
            ? `linear-gradient(90deg, ${template.accent} 0 30%, #ffffff 30% 100%)`
            : template.layout === "modern"
              ? `linear-gradient(180deg, ${template.accent} 0 22%, #ffffff 22% 100%)`
              : `linear-gradient(180deg, ${softAccent} 0 100%)`
      }}
    >
      <div className="p-4">
        <div
          className="mx-auto aspect-[210/297] w-full max-w-[180px] overflow-hidden rounded-[18px] bg-white shadow-[0_14px_24px_rgba(15,23,42,0.12)]"
          style={{
            border: `1px solid ${softAccentStrong}`
          }}
        >
          {template.layout === "sidebar" ? (
            <div className="grid h-full grid-cols-[0.32fr_0.68fr]">
              <div className="px-2 py-3" style={{ backgroundColor: template.accent }}>
                <div className="h-2.5 w-10 rounded-full bg-white/90" />
                <div className="mt-1.5 h-1.5 w-7 rounded-full bg-white/70" />
                <div className="mt-4 space-y-1.5">
                  <div className="h-1.5 w-9 rounded-full bg-white/60" />
                  <div className="h-1.5 w-8 rounded-full bg-white/50" />
                  <div className="h-1.5 w-10 rounded-full bg-white/40" />
                </div>
                <div className="mt-5 rounded-md border border-white/20 bg-white/10 p-1.5">
                  <div className="h-1.5 w-7 rounded-full bg-white/80" />
                  <div className="mt-1 space-y-1">
                    <div className="h-1.5 rounded-full bg-white/45" />
                    <div className="h-1.5 w-4/5 rounded-full bg-white/35" />
                    <div className="h-1.5 w-3/5 rounded-full bg-white/25" />
                  </div>
                </div>
              </div>
              <div className="p-2.5">
                <div className="space-y-1.5">
                  <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: template.accent }} />
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: template.accent }} />
                  <div className="space-y-1">
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          ) : template.layout === "modern" ? (
            <div className="h-full">
              <div className="px-2.5 py-2.5 text-white" style={{ backgroundColor: template.accent }}>
                <div className="h-2.5 w-14 rounded-full bg-white/90" />
                <div className="mt-1.5 h-1.5 w-8 rounded-full bg-white/70" />
                <div className="mt-2 flex gap-1.5">
                  <div className="h-1.5 w-6 rounded-full bg-white/60" />
                  <div className="h-1.5 w-6 rounded-full bg-white/50" />
                  <div className="h-1.5 w-5 rounded-full bg-white/40" />
                </div>
              </div>
              <div className="grid h-[calc(100%-46px)] grid-cols-[1.15fr_0.85fr] gap-2 p-2.5">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: template.accent }} />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: template.accent }} />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="rounded-md p-2" style={{ backgroundColor: softAccent }}>
                  <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: template.accent }} />
                  <div className="mt-1 space-y-1">
                    <div className="h-1.5 rounded-full bg-white" />
                    <div className="h-1.5 rounded-full bg-white" />
                    <div className="h-1.5 w-3/4 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full p-2.5">
              <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: template.accent }} />
              <div className="mt-3 border-b pb-3" style={{ borderColor: softAccentStrong }}>
                <div className="h-2.5 w-14 rounded-full bg-slate-800" />
                <div className="mt-1.5 h-1.5 w-9 rounded-full bg-slate-300" />
                <div className="mt-2 flex gap-1.5">
                  <div className="h-1.5 w-6 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-6 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-5 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-[1.12fr_0.88fr] gap-2">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: template.accent }} />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: template.accent }} />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="h-1.5 w-9 rounded-full" style={{ backgroundColor: template.accent }} />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: template.accent }} />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const CvPreview = ({
  selectedTemplate,
  form,
  pages
}: {
  selectedTemplate: CvTemplate;
  form: CvData;
  pages: PreviewPage[];
}) => {
  const accentStyle = { backgroundColor: selectedTemplate.accent, borderColor: selectedTemplate.accent };
  const panelTint = `${selectedTemplate.accent}12`;

  if (selectedTemplate.layout === "sidebar") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">Live PDF-style preview</p>
          <p className="text-xs text-[var(--muted)]">{pages.length} page preview with download-aligned spacing</p>
        </div>
        {pages.map((page) => (
          <div
            key={page.pageNumber}
            className="mx-auto aspect-[210/297] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="grid h-full grid-cols-[0.31fr_0.69fr]">
              <aside className="flex h-full flex-col p-6 text-white" style={{ backgroundColor: selectedTemplate.accent }}>
                <div>
                  <h3 className="text-[26px] font-bold leading-tight tracking-[-0.02em] break-words">{form.fullName}</h3>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">{form.jobTitle}</p>
                  <div className="mt-5 space-y-1.5 text-[11px] leading-[1.45] text-white/88 break-words">
                    <p>{form.email}</p>
                    <p>{form.phone}</p>
                    <p>{form.location}</p>
                  </div>
                </div>
                <div className="mt-6 rounded-[18px] border border-white/15 bg-white/10 p-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.22em]">Skills</h4>
                  <p className="mt-3 whitespace-pre-line break-words text-[11px] leading-[1.55] text-white/90">{form.skills}</p>
                </div>
                <div className="mt-auto pt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                  {selectedTemplate.name} | Page {page.pageNumber}
                </div>
              </aside>
              <div className="h-full p-6">
                <div className="flex h-full flex-col">
                  {page.sections.map((section, index) => (
                    <PreviewSection
                      key={`${page.pageNumber}-${section.title}`}
                      title={section.title}
                      accent={selectedTemplate.accent}
                      text={section.text}
                      className={index === 0 ? "" : "mt-5"}
                    />
                  ))}
                  <div className="mt-auto pt-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    Page {page.pageNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (selectedTemplate.layout === "modern") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">Live PDF-style preview</p>
          <p className="text-xs text-[var(--muted)]">{pages.length} page preview with download-aligned spacing</p>
        </div>
        {pages.map((page) =>
          page.pageNumber === 1 ? (
            <div
              key={page.pageNumber}
              className="mx-auto aspect-[210/297] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="flex h-[21%] flex-col justify-center px-7 py-5 text-white" style={accentStyle}>
                <div>
                  <h3 className="text-[26px] font-bold leading-tight tracking-[-0.02em] break-words">{form.fullName}</h3>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82">{form.jobTitle}</p>
                  <div className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/84">
                    <span>{form.email}</span>
                    <span>{form.phone}</span>
                    <span>{form.location}</span>
                  </div>
                </div>
              </div>
              <div className="grid h-[79%] grid-cols-[1.14fr_0.86fr] gap-5 p-6">
                <div className="flex h-full flex-col">
                  {page.sections.map((section, index) => (
                    <PreviewSection
                      key={`${page.pageNumber}-${section.title}`}
                      title={section.title}
                      accent={selectedTemplate.accent}
                      text={section.text}
                      className={index === 0 ? "" : "mt-5"}
                    />
                  ))}
                  <div className="mt-auto pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{selectedTemplate.name}</div>
                </div>
                <div className="rounded-[22px] p-4" style={{ backgroundColor: panelTint }}>
                  <PreviewSection title="Education" accent={selectedTemplate.accent} text={form.education} />
                  <PreviewSection title="Skills" accent={selectedTemplate.accent} text={form.skills} className="mt-5" />
                  <div className="mt-6 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Page 1</div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={page.pageNumber}
              className="mx-auto aspect-[210/297] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="flex h-full flex-col">
                <div className="rounded-[20px] px-5 py-4 text-white" style={accentStyle}>
                  <h3 className="text-[24px] font-bold">{form.fullName}</h3>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">{selectedTemplate.name}</p>
                </div>
                <div className="mt-5 flex-1">
                  {page.sections.map((section, index) => (
                    <PreviewSection
                      key={`${page.pageNumber}-${section.title}`}
                      title={section.title}
                      accent={selectedTemplate.accent}
                      text={section.text}
                      className={index === 0 ? "" : "mt-5"}
                    />
                  ))}
                </div>
                <div className="pt-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Page {page.pageNumber}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3">
        <p className="text-sm font-semibold text-[var(--foreground)]">Live PDF-style preview</p>
        <p className="text-xs text-[var(--muted)]">{pages.length} page preview with download-aligned spacing</p>
      </div>
      {pages.map((page) =>
        page.pageNumber === 1 ? (
          <div
            key={page.pageNumber}
            className="mx-auto aspect-[210/297] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="flex h-full flex-col">
              <div className="border-b pb-5" style={{ borderColor: `${selectedTemplate.accent}35` }}>
                <div className="h-1 w-24 rounded-full" style={accentStyle} />
                <h3 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.02em] text-[var(--foreground)] break-words">{form.fullName}</h3>
                <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{form.jobTitle}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[var(--muted)]">
                  <span>{form.email}</span>
                  <span>{form.phone}</span>
                  <span>{form.location}</span>
                </div>
              </div>
              <div className="mt-5 grid flex-1 grid-cols-[1.14fr_0.86fr] gap-5">
                <div className="flex h-full flex-col">
                  {page.sections.map((section, index) => (
                    <PreviewSection
                      key={`${page.pageNumber}-${section.title}`}
                      title={section.title}
                      accent={selectedTemplate.accent}
                      text={section.text}
                      className={index === 0 ? "" : "mt-5"}
                    />
                  ))}
                </div>
                <div className="flex h-full flex-col rounded-[20px] p-4" style={{ backgroundColor: panelTint }}>
                  <PreviewSection title="Education" accent={selectedTemplate.accent} text={form.education} />
                  <PreviewSection title="Skills" accent={selectedTemplate.accent} text={form.skills} className="mt-5" />
                  <div className="mt-auto pt-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {selectedTemplate.name} | Page 1
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            key={page.pageNumber}
            className="mx-auto aspect-[210/297] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="flex h-full flex-col">
              <div className="border-b pb-4" style={{ borderColor: `${selectedTemplate.accent}28` }}>
                <div className="h-1 w-20 rounded-full" style={accentStyle} />
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {selectedTemplate.name} continuation
                </p>
              </div>
              <div className="mt-5 flex-1">
                {page.sections.map((section, index) => (
                  <PreviewSection
                    key={`${page.pageNumber}-${section.title}`}
                    title={section.title}
                    accent={selectedTemplate.accent}
                    text={section.text}
                    className={index === 0 ? "" : "mt-5"}
                  />
                ))}
              </div>
              <div className="pt-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Page {page.pageNumber}
              </div>
            </div>
          </div>
        )
      )}
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
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
        {title}
      </h4>
      <p className="mt-2.5 whitespace-pre-line break-words text-[11px] leading-[1.55] text-[var(--muted)]">{text}</p>
    </section>
  );
}
