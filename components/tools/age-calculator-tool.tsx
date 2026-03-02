"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";

function calculateAge(dob: string) {
  if (!dob) {
    return { years: 0, months: 0, days: 0 };
  }

  const birthDate = new Date(dob);
  const today = new Date();

  if (birthDate > today) {
    return { years: 0, months: 0, days: 0 };
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += previousMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function AgeCalculatorTool() {
  const [dob, setDob] = useState("");
  const age = useMemo(() => calculateAge(dob), [dob]);

  return (
    <div className="space-y-5">
      <label className="block max-w-sm">
        <span className="mb-2 block text-sm font-semibold">Date of birth</span>
        <input
          type="date"
          value={dob}
          onChange={(event) => setDob(event.target.value)}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Years" value={age.years} />
        <StatCard label="Months" value={age.months} />
        <StatCard label="Days" value={age.days} />
      </div>
      <ToolButton variant="secondary" onClick={() => setDob("")}>
        Reset
      </ToolButton>
    </div>
  );
}
