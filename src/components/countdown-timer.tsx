"use client";

import { useState, useEffect, useMemo } from "react";

type CountdownTimerProps = {
  endDate: string; // ISO date string
  className?: string;
};

type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

/**
 * Calculates the remaining time parts until the provided end date.
 * @param endDate ISO date string
 * @returns TimeParts object
 */
function getTimeParts(endDate: string): TimeParts {
  const now = Date.now();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}

/**
 * Returns most significant (up to 3) units for display
 */
function getDisplayUnits(timeParts: TimeParts) {
  const units = [
    { label: "D", value: timeParts.days },
    { label: "H", value: timeParts.hours },
    { label: "MIN", value: timeParts.minutes },
    { label: "s", value: timeParts.seconds },
  ];
  let firstNonZero = units.findIndex((u) => u.value > 0);
  if (firstNonZero === -1) firstNonZero = units.length - 1; // only seconds left
  return units.slice(firstNonZero, firstNonZero + 3);
}

export function CountdownTimer({
  endDate,
  className = "",
}: CountdownTimerProps) {
  const [timeParts, setTimeParts] = useState(() => getTimeParts(endDate));

  useEffect(() => {
    const update = () => setTimeParts(getTimeParts(endDate));
    update();

    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, [endDate]);

  if (timeParts.expired) {
    return (
      <span
        className={`text-xs px-2 py-0.5 rounded font-semibold font-mono bg-foreground text-background group-hover:bg-background group-hover:text-foreground ${className}`}
      >
        EXPIRED
      </span>
    );
  }

  const limitedUnits = useMemo(() => getDisplayUnits(timeParts), [timeParts]);

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold gap-1 ${className}`}
    >
      {limitedUnits.map((unit) => (
        <span
          key={unit.label}
          className="bg-foreground text-background group-hover:bg-background group-hover:text-foreground inline-flex items-baseline font-mono rounded px-1.5 py-0.5 text-xs font-semibold"
        >
          {unit.value}
          <span className="ml-0.5 font-semibold">{unit.label}</span>
        </span>
      ))}
    </span>
  );
}
