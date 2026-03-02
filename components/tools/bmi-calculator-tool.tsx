"use client";

import { useMemo, useState } from "react";
import { ToolButton } from "@/components/tool-shared";
import { StatCard } from "@/components/tools/stat-card";

function getCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function BmiCalculatorTool() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const bmi = useMemo(() => {
    const height = Number(heightCm) / 100;
    const weight = Number(weightKg);
    if (!height || !weight) {
      return 0;
    }
    return weight / (height * height);
  }, [heightCm, weightKg]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Height (cm)</span>
          <input
            type="number"
            min="1"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Weight (kg)</span>
          <input
            type="number"
            min="1"
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3"
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="BMI" value={bmi ? bmi.toFixed(1) : "0.0"} />
        <StatCard label="Category" value={bmi ? getCategory(bmi) : "Not calculated"} />
      </div>
      <ToolButton variant="secondary" onClick={() => { setHeightCm(""); setWeightKg(""); }}>
        Reset
      </ToolButton>
    </div>
  );
}
