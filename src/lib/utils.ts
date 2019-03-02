import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency using given locale and currency code.
 * Allows optional configuration for fraction digits and locale.
 *
 * @param value - Numeric value to format
 * @param currency - ISO 4217 currency code, e.g. "USD"
 * @param options - Optional: {
 *    locale?: string (defaults to "en-US"),
 *    minimumFractionDigits?: number,
 *    maximumFractionDigits?: number
 * }
 */
export function formatCurrency(
  value: number,
  currency: string,
  options?: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
) {
  const {
    locale = "en-US",
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options ?? {};
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function formatDate(
  date?: string,
  opts?: {
    prefix?: string;
    fallback?: string;
    locale?: string;
    format?: Intl.DateTimeFormatOptions;
  }
): string {
  if (!date) return opts?.fallback ?? "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return opts?.fallback ?? "";
  const formatted = new Intl.DateTimeFormat(
    opts?.locale ?? "en-US",
    opts?.format ?? { month: "short", day: "numeric", year: "numeric" }
  ).format(d);
  return opts?.prefix ? `${opts.prefix} (${formatted})` : formatted;
}
