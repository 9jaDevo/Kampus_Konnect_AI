"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AvailabilitySlot } from "@/types/profile";

const DAYS: AvailabilitySlot["day"][] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const PERIODS: AvailabilitySlot["period"][] = ["morning", "afternoon", "evening", "night"];

interface AvailabilityGridProps {
  value: AvailabilitySlot[];
  onChange: (value: AvailabilitySlot[]) => void;
}

export function AvailabilityGrid({ value, onChange }: AvailabilityGridProps) {
  const isOn = (day: AvailabilitySlot["day"], period: AvailabilitySlot["period"]) =>
    value.some((s) => s.day === day && s.period === period);

  function toggle(day: AvailabilitySlot["day"], period: AvailabilitySlot["period"]) {
    if (isOn(day, period)) {
      onChange(value.filter((s) => !(s.day === day && s.period === period)));
    } else {
      onChange([...value, { day, period }]);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="text-left text-slate-500 font-medium px-2 py-1"></th>
            {PERIODS.map((p) => (
              <th key={p} className="text-slate-400 font-medium capitalize px-2 py-1">
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day) => (
            <tr key={day}>
              <td className="text-slate-300 capitalize text-left pr-2 py-1 font-medium">
                {day.slice(0, 3)}
              </td>
              {PERIODS.map((period) => {
                const on = isOn(day, period);
                return (
                  <td key={period}>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggle(day, period)}
                      className={cn(
                        "w-full h-10 rounded-lg border transition-all",
                        on
                          ? "bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border-cyan-400/50 glow-cyan"
                          : "glass-subtle border-white/10 hover:border-white/20"
                      )}
                      aria-pressed={on}
                      aria-label={`${day} ${period}`}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
