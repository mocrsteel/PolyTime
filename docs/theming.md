# PolyTime color map

This map turns the prototype colors into a small, reusable design palette. The intent is to keep the brand colors stable while relying on standard Tailwind CSS colors wherever possible.

## Recommended semantic palette

| Semantic token | Current/custom value | Tailwind equivalent | Use |
|---|---:|---|---|
| `color.app.bg` | `#f4f6f4` | `slate-50` or `stone-50` | Main app background |
| `color.surface.default` | `#ffffff` | `white` | Cards, topbar, modals |
| `color.surface.subtle` | — | `slate-50` | Light panels, empty states, table rows |
| `color.surface.muted` | — | `slate-100` | Soft badges, skeleton blocks |
| `color.border.default` | `#e6e9e8` | `slate-200` | Card borders, section borders |
| `color.border.strong` | — | `slate-300` | Dashed add buttons, stronger dividers |
| `color.text.default` | `#17222b` | `slate-900` | Main text |
| `color.text.muted` | `#69757e` | `slate-500` | Helper text, descriptions |
| `color.text.subtle` | — | `slate-400` | Eyebrows, inactive icons, metadata |
| `color.text.button` | — | `slate-700` | Secondary button text |
| `color.nav.bg` | `#17384a` | `sky-950` or `slate-800` | Sidebar background |
| `color.nav.text` | — | `slate-300` | Sidebar inactive text/icons |
| `color.nav.textActive` | `#ffffff` | `white` | Sidebar active text/icons |
| `color.nav.hover` | `rgba(255,255,255,.10)` | `white/10` | Sidebar hover and active surface |
| `color.brand.primary` | `#007d79` | `teal-700` | Primary buttons, progress bars, selected states |
| `color.brand.primaryHover` | `#006864` | `teal-800` | Primary button hover |
| `color.brand.soft` | `#dff3ee` | `teal-50` | Soft brand backgrounds |
| `color.brand.line` | — | `teal-100` | Subtle teal borders |
| `color.brand.indicator` | `#55c7bd` | `teal-400` | Active sidebar rail, logo gradient start |
| `color.brand.badgeText` | — | `teal-200` | Manager badge text on dark sidebar |
| `color.accent.warning` | `#f07b61` | `red-400` or `orange-400` | Coral accent, alerts, notification dot |
| `color.status.success.bg` | — | `emerald-50` | Complete/success badges |
| `color.status.success.text` | — | `emerald-700` | Complete/success text |
| `color.status.success.strongText` | — | `emerald-800` | Author/status badges |
| `color.status.warning.bg` | — | `orange-50` | Incomplete day cards |
| `color.status.warning.soft` | — | `orange-100` | Warning pills, avatar backgrounds |
| `color.status.warning.text` | — | `orange-700` | Warning labels |
| `color.status.danger` | — | `red-500` | Delete hover |
| `color.overlay.modal` | — | `slate-950/50` | Modal backdrop |

## Project/category colors

These colors are used to visually distinguish demo projects. If possible, use Tailwind colors directly instead of custom hex values.

| Project/category | Current value | Tailwind replacement | Use |
|---|---:|---|---|
| Website Redesign / Digital blue | `#4f91a7` | `cyan-600` | Project strip / chart color |
| Retail Expansion / Commercial orange | `#dc8d51` | `orange-400` | Project strip / chart color |
| Data Migration / Operations violet | `#8d78b2` | `violet-400` | Project strip / chart color |
| Customer Portal / Digital coral | `#d96d6a` | `red-400` | Project strip / chart color |

Suggested implementation:

```ts
export const projectColors = {
  websiteRedesign: "bg-cyan-600",
  retailExpansion: "bg-orange-400",
  dataMigration: "bg-violet-400",
  customerPortal: "bg-red-400",
};
```

For inline chart styles, use the Tailwind hex equivalents:

```ts
export const projectHexColors = {
  websiteRedesign: "#0891b2", // cyan-600
  retailExpansion: "#fb923c", // orange-400
  dataMigration: "#a78bfa", // violet-400
  customerPortal: "#f87171", // red-400
};
```

## Logo colors

The logo may keep custom brand colors because logos usually need more exact control than UI surfaces.

| Logo token | Hex | Tailwind equivalent | Use |
|---|---:|---|---|
| `logo.gradient.start` | `#55c7bd` | `teal-400` | Logo gradient start |
| `logo.gradient.end` | `#2b827f` | `teal-700` | Logo gradient end |
| `logo.node.orange` | `#f39b6d` | `orange-300` | Polymer node |
| `logo.node.navy` | `#173347` | `sky-950` | Polymer node / wordmark |
| `logo.node.pale` | `#f4fbfa` | `teal-50` | Polymer node |
| `logo.stroke` | `#ffffff` | `white` | Logo connector strokes |

## Tailwind config option

If you want the app to keep readable semantic names while using standard Tailwind values, this is a clean compromise:

```js
// tailwind.config.js
import colors from "tailwindcss/colors";

export default {
  theme: {
    extend: {
      colors: {
        polytime: {
          bg: colors.slate[50],
          surface: colors.white,
          surfaceSubtle: colors.slate[50],
          border: colors.slate[200],
          ink: colors.slate[900],
          muted: colors.slate[500],
          subtle: colors.slate[400],
          navy: colors.sky[950],
          primary: colors.teal[700],
          primaryHover: colors.teal[800],
          primarySoft: colors.teal[50],
          primaryLine: colors.teal[100],
          indicator: colors.teal[400],
          coral: colors.red[400],
          successBg: colors.emerald[50],
          successText: colors.emerald[700],
          warningBg: colors.orange[50],
          warningText: colors.orange[700],
          danger: colors.red[500],
        },
      },
    },
  },
};
```

Then use classes like:

```tsx
<main className="bg-polytime-bg text-polytime-ink" />
<button className="bg-polytime-primary hover:bg-polytime-primaryHover text-white" />
<aside className="bg-polytime-navy text-slate-300" />
```

## Minimal Tailwind-only replacement

If you prefer to avoid almost all custom color tokens:

| Current usage | Use this Tailwind class |
|---|---|
| App background | `bg-slate-50` |
| Main text | `text-slate-900` |
| Muted text | `text-slate-500` |
| Sidebar | `bg-sky-950` |
| Primary button | `bg-teal-700 hover:bg-teal-800 text-white` |
| Active sidebar line | `before:bg-teal-400` |
| Soft brand panel | `bg-teal-50` |
| Brand border | `border-teal-100` |
| Default border | `border-slate-200` |
| Card | `bg-white border-slate-200` |
| Success badge | `bg-emerald-50 text-emerald-700` |
| Warning badge/card | `bg-orange-50 text-orange-700` |
| Delete hover | `hover:text-red-500` |
| Modal overlay | `bg-slate-950/50` |

