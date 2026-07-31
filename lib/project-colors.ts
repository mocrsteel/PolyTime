/**
 * Project color palette — typed hex values for database storage and runtime use.
 *
 * These values mirror the CSS custom properties defined in app/project-palette.css.
 * All colors are HSL(h, 50%, 62%) equally spaced across the hue wheel (step 3.6°),
 * giving 100 visually distinct, soft colours at identical luminosity.
 *
 *
 * Colors will be stored in the database as className `bg-project-{n}` (e.g. `bg-project-1`).
 * Usage:
 *   - Store `colorSlot: number` (1–100) on the Project row in the DB.
 *   - Retrieve the hex with `projectPalette[project.colorSlot]`.
 *   - Use the hex as an inline style or map it to a Tailwind class
 *     via `bg-project-{n}` (requires project-palette.css to be loaded).
 */

/** One entry per palette slot. */
export type ProjectColor = {
  /** Slot index (1–100), store this in the database. */
  readonly slot: number;
  /** Hex color value (e.g. "#CF6E6E"). */
  readonly hex: string;
  /** Human-readable hue family label. */
  readonly family: string;
  /** Tailwind utility class for this color. */
  readonly bg: string;
  /** Tailwind utility class for the color's "before" state. **Mostly used for this case. */
  readonly before: string;
};

export const projectPalette: ProjectColor[] = [
  /* ── Coral / Red ── */
  {slot: 1, hex: "#CF6E6E", family: "Coral Red", bg: "bg-project-1", before: "before:bg-project-1"},
  {slot: 2, hex: "#CF736E", family: "Coral Red", bg: "bg-project-2", before: "before:bg-project-2"},
  {slot: 3, hex: "#CF796E", family: "Coral Red", bg: "bg-project-3", before: "before:bg-project-3"},
  {slot: 4, hex: "#CF7F6E", family: "Coral Red", bg: "bg-project-4", before: "before:bg-project-4"},
  {slot: 5, hex: "#CF856E", family: "Coral Red", bg: "bg-project-5", before: "before:bg-project-5"},
  {slot: 6, hex: "#CF8B6E", family: "Coral Red", bg: "bg-project-6", before: "before:bg-project-6"},
  {slot: 7, hex: "#CF906E", family: "Coral Red", bg: "bg-project-7", before: "before:bg-project-7"},
  {slot: 8, hex: "#CF966E", family: "Coral Red", bg: "bg-project-8", before: "before:bg-project-8"},
  {slot: 9, hex: "#CF9C6E", family: "Coral Red", bg: "bg-project-9", before: "before:bg-project-9"},
  {slot: 10, hex: "#CFA26E", family: "Coral Red", bg: "bg-project-10", before: "before:bg-project-10"},

  /* ── Orange / Amber ── */
  {slot: 11, hex: "#CFA86E", family: "Orange", bg: "bg-project-11", before: "before:bg-project-11"},
  {slot: 12, hex: "#CFAE6E", family: "Orange", bg: "bg-project-12", before: "before:bg-project-12"},
  {slot: 13, hex: "#CFB36E", family: "Orange", bg: "bg-project-13", before: "before:bg-project-13"},
  {slot: 14, hex: "#CFB96E", family: "Orange", bg: "bg-project-14", before: "before:bg-project-14"},
  {slot: 15, hex: "#CFBF6E", family: "Orange", bg: "bg-project-15", before: "before:bg-project-15"},
  {slot: 16, hex: "#CFC56E", family: "Amber", bg: "bg-project-16", before: "before:bg-project-16"},
  {slot: 17, hex: "#CFCB6E", family: "Amber", bg: "bg-project-17", before: "before:bg-project-17"},
  {slot: 18, hex: "#CDCF6E", family: "Amber", bg: "bg-project-18", before: "before:bg-project-18"},
  {slot: 19, hex: "#C7CF6E", family: "Amber", bg: "bg-project-19", before: "before:bg-project-19"},
  {slot: 20, hex: "#C1CF6E", family: "Amber", bg: "bg-project-20", before: "before:bg-project-20"},

  /* ── Yellow / Lime ── */
  {slot: 21, hex: "#BBCF6E", family: "Yellow", bg: "bg-project-21", before: "before:bg-project-21"},
  {slot: 22, hex: "#B5CF6E", family: "Yellow", bg: "bg-project-22", before: "before:bg-project-22"},
  {slot: 23, hex: "#B0CF6E", family: "Yellow", bg: "bg-project-23", before: "before:bg-project-23"},
  {slot: 24, hex: "#AACF6E", family: "Yellow", bg: "bg-project-24", before: "before:bg-project-24"},
  {slot: 25, hex: "#A4CF6E", family: "Lime", bg: "bg-project-25", before: "before:bg-project-25"},
  {slot: 26, hex: "#9FCF6E", family: "Lime", bg: "bg-project-26", before: "before:bg-project-26"},
  {slot: 27, hex: "#99CF6E", family: "Lime", bg: "bg-project-27", before: "before:bg-project-27"},
  {slot: 28, hex: "#93CF6E", family: "Lime", bg: "bg-project-28", before: "before:bg-project-28"},
  {slot: 29, hex: "#8DCF6E", family: "Lime", bg: "bg-project-29", before: "before:bg-project-29"},
  {slot: 30, hex: "#87CF6E", family: "Lime", bg: "bg-project-30", before: "before:bg-project-30"},

  /* ── Green ── */
  {slot: 31, hex: "#82CF6E", family: "Green", bg: "bg-project-31", before: "before:bg-project-31"},
  {slot: 32, hex: "#7CCF6E", family: "Green", bg: "bg-project-32", before: "before:bg-project-32"},
  {slot: 33, hex: "#76CF6E", family: "Green", bg: "bg-project-33", before: "before:bg-project-33"},
  {slot: 34, hex: "#70CF6E", family: "Green", bg: "bg-project-34", before: "before:bg-project-34"},
  {slot: 35, hex: "#6ECF72", family: "Green", bg: "bg-project-35", before: "before:bg-project-35"},
  {slot: 36, hex: "#6ECF78", family: "Green", bg: "bg-project-36", before: "before:bg-project-36"},
  {slot: 37, hex: "#6ECF7D", family: "Green", bg: "bg-project-37", before: "before:bg-project-37"},
  {slot: 38, hex: "#6ECF83", family: "Green", bg: "bg-project-38", before: "before:bg-project-38"},
  {slot: 39, hex: "#6ECF89", family: "Green", bg: "bg-project-39", before: "before:bg-project-39"},
  {slot: 40, hex: "#6ECF8F", family: "Green", bg: "bg-project-40", before: "before:bg-project-40"},

  /* ── Mint / Seafoam ── */
  {slot: 41, hex: "#6ECF95", family: "Mint", bg: "bg-project-41", before: "before:bg-project-41"},
  {slot: 42, hex: "#6ECF9A", family: "Mint", bg: "bg-project-42", before: "before:bg-project-42"},
  {slot: 43, hex: "#6ECFA0", family: "Mint", bg: "bg-project-43", before: "before:bg-project-43"},
  {slot: 44, hex: "#6ECFA6", family: "Mint", bg: "bg-project-44", before: "before:bg-project-44"},
  {slot: 45, hex: "#6ECFAC", family: "Seafoam", bg: "bg-project-45", before: "before:bg-project-45"},
  {slot: 46, hex: "#6ECFB2", family: "Seafoam", bg: "bg-project-46", before: "before:bg-project-46"},
  {slot: 47, hex: "#6ECFB8", family: "Seafoam", bg: "bg-project-47", before: "before:bg-project-47"},
  {slot: 48, hex: "#6ECFBD", family: "Seafoam", bg: "bg-project-48", before: "before:bg-project-48"},
  {slot: 49, hex: "#6ECFC3", family: "Seafoam", bg: "bg-project-49", before: "before:bg-project-49"},
  {slot: 50, hex: "#6ECFC9", family: "Seafoam", bg: "bg-project-50", before: "before:bg-project-50"},

  /* ── Teal / Cyan ── */
  {slot: 51, hex: "#6ECFCF", family: "Teal", bg: "bg-project-51", before: "before:bg-project-51"},
  {slot: 52, hex: "#6EC9CF", family: "Teal", bg: "bg-project-52", before: "before:bg-project-52"},
  {slot: 53, hex: "#6EC3CF", family: "Teal", bg: "bg-project-53", before: "before:bg-project-53"},
  {slot: 54, hex: "#6EBDCF", family: "Teal", bg: "bg-project-54", before: "before:bg-project-54"},
  {slot: 55, hex: "#6EB8CF", family: "Cyan", bg: "bg-project-55", before: "before:bg-project-55"},
  {slot: 56, hex: "#6EB2CF", family: "Cyan", bg: "bg-project-56", before: "before:bg-project-56"},
  {slot: 57, hex: "#6EACCF", family: "Cyan", bg: "bg-project-57", before: "before:bg-project-57"},
  {slot: 58, hex: "#6EA6CF", family: "Cyan", bg: "bg-project-58", before: "before:bg-project-58"},
  {slot: 59, hex: "#6EA0CF", family: "Cyan", bg: "bg-project-59", before: "before:bg-project-59"},
  {slot: 60, hex: "#6E9ACF", family: "Cyan", bg: "bg-project-60", before: "before:bg-project-60"},

  /* ── Sky / Blue ── */
  {slot: 61, hex: "#6E95CF", family: "Sky", bg: "bg-project-61", before: "before:bg-project-61"},
  {slot: 62, hex: "#6E8FCF", family: "Sky", bg: "bg-project-62", before: "before:bg-project-62"},
  {slot: 63, hex: "#6E89CF", family: "Sky", bg: "bg-project-63", before: "before:bg-project-63"},
  {slot: 64, hex: "#6E83CF", family: "Sky", bg: "bg-project-64", before: "before:bg-project-64"},
  {slot: 65, hex: "#6E7DCF", family: "Blue", bg: "bg-project-65", before: "before:bg-project-65"},
  {slot: 66, hex: "#6E78CF", family: "Blue", bg: "bg-project-66", before: "before:bg-project-66"},
  {slot: 67, hex: "#6E72CF", family: "Blue", bg: "bg-project-67", before: "before:bg-project-67"},
  {slot: 68, hex: "#6F6ECF", family: "Blue", bg: "bg-project-68", before: "before:bg-project-68"},
  {slot: 69, hex: "#756ECF", family: "Blue", bg: "bg-project-69", before: "before:bg-project-69"},
  {slot: 70, hex: "#7B6ECF", family: "Blue", bg: "bg-project-70", before: "before:bg-project-70"},

  /* ── Indigo / Blue-Violet ── */
  {slot: 71, hex: "#816ECF", family: "Indigo", bg: "bg-project-71", before: "before:bg-project-71"},
  {slot: 72, hex: "#876ECF", family: "Indigo", bg: "bg-project-72", before: "before:bg-project-72"},
  {slot: 73, hex: "#8C6ECF", family: "Indigo", bg: "bg-project-73", before: "before:bg-project-73"},
  {slot: 74, hex: "#926ECF", family: "Indigo", bg: "bg-project-74", before: "before:bg-project-74"},
  {slot: 75, hex: "#986ECF", family: "Indigo", bg: "bg-project-75", before: "before:bg-project-75"},
  {slot: 76, hex: "#9E6ECF", family: "Blue Violet", bg: "bg-project-76", before: "before:bg-project-76"},
  {slot: 77, hex: "#A46ECF", family: "Blue Violet", bg: "bg-project-77", before: "before:bg-project-77"},
  {slot: 78, hex: "#AA6ECF", family: "Blue Violet", bg: "bg-project-78", before: "before:bg-project-78"},
  {slot: 79, hex: "#AF6ECF", family: "Blue Violet", bg: "bg-project-79", before: "before:bg-project-79"},
  {slot: 80, hex: "#B56ECF", family: "Blue Violet", bg: "bg-project-80", before: "before:bg-project-80"},

  /* ── Violet / Purple ── */
  {slot: 81, hex: "#BB6ECF", family: "Violet", bg: "bg-project-81", before: "before:bg-project-81"},
  {slot: 82, hex: "#C16ECF", family: "Violet", bg: "bg-project-82", before: "before:bg-project-82"},
  {slot: 83, hex: "#C76ECF", family: "Violet", bg: "bg-project-83", before: "before:bg-project-83"},
  {slot: 84, hex: "#CD6ECF", family: "Violet", bg: "bg-project-84", before: "before:bg-project-84"},
  {slot: 85, hex: "#CF6ECB", family: "Purple", bg: "bg-project-85", before: "before:bg-project-85"},
  {slot: 86, hex: "#CF6EC5", family: "Purple", bg: "bg-project-86", before: "before:bg-project-86"},
  {slot: 87, hex: "#CF6EBF", family: "Purple", bg: "bg-project-87", before: "before:bg-project-87"},
  {slot: 88, hex: "#CF6EB9", family: "Purple", bg: "bg-project-88", before: "before:bg-project-88"},
  {slot: 89, hex: "#CF6EB3", family: "Purple", bg: "bg-project-89", before: "before:bg-project-89"},
  {slot: 90, hex: "#CF6EAE", family: "Purple", bg: "bg-project-90", before: "before:bg-project-90"},

  /* ── Pink / Rose ── */
  {slot: 91, hex: "#CF6EA8", family: "Pink", bg: "bg-project-91", before: "before:bg-project-91"},
  {slot: 92, hex: "#CF6EA2", family: "Pink", bg: "bg-project-92", before: "before:bg-project-92"},
  {slot: 93, hex: "#CF6E9C", family: "Pink", bg: "bg-project-93", before: "before:bg-project-93"},
  {slot: 94, hex: "#CF6E96", family: "Pink", bg: "bg-project-94", before: "before:bg-project-94"},
  {slot: 95, hex: "#CF6E91", family: "Rose", bg: "bg-project-95", before: "before:bg-project-95"},
  {slot: 96, hex: "#CF6E8B", family: "Rose", bg: "bg-project-96", before: "before:bg-project-96"},
  {slot: 97, hex: "#CF6E85", family: "Rose", bg: "bg-project-97", before: "before:bg-project-97"},
  {slot: 98, hex: "#CF6E7F", family: "Rose", bg: "bg-project-98", before: "before:bg-project-98"},
  {slot: 99, hex: "#CF6E79", family: "Rose", bg: "bg-project-99", before: "before:bg-project-99"},
  {slot: 100, hex: "#CF6E73", family: "Rose", bg: "bg-project-100", before: "before:bg-project-100"},
];

/** Quick lookup: slot number → hex string. */
export const projectColorBySlot: Record<number, string> = Object.fromEntries(
  projectPalette.map(({slot, hex}) => [slot, hex]),
);

export const projectColorByHex: Record<string, number> = Object.fromEntries(
  projectPalette.map(({hex, slot}) => [hex, slot])
);

/** Tailwind utility class for a given slot (requires project-palette.css). */
export function projectColorClassFromSlot(
  slot: number,
  variant: "bg" | "before" = "bg",
): string {
  const slotEntry = projectPalette.filter(({slot: s}) => s === slot);
  if (slotEntry.length === 0) {
    throw new Error(`Invalid project color slot: ${slot}`);
  }
  switch (variant) {
    case "bg":
      return slotEntry[0].bg;
    case "before":
      return slotEntry[0].before;
    default:
      throw new Error(`Invalid project color variant: ${variant}`);

  }
}

export function projectColorClassFromHex(
  hex: string,
  variant: "bg" | "before" = "bg",
): string {
  const slot = projectColorByHex[hex];
  if (slot === undefined) {
    throw new Error(`Invalid project color hex: ${hex}`);
  }
  return projectColorClassFromSlot(slot, variant);
}

