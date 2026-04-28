# How we work — homepage section design

**Status:** Draft → ready for implementation
**Date:** 2026-04-28
**Supersedes:** inline `twinLine` rendering inside `<Founder>`

## Context

The twin-doctrine statement (ADR-0017 wording) has been rendered as a small italic block at the bottom of the Founder section. Brand canon and the homepage reconciliation flag the AI-native operating model as a structural differentiator that should sit on its own surface, not as a Founder appendix. CONVENTIONS.md tracks this as a pending follow-up: *"Process / 'How we work' section — engagement-model signal absent from homepage."*

## Approach

Approach **A — dark interlude** (chosen). A new `<HowWeWork>` section between `<Founder>` and `<Work>`. Dark surface (`#1A1812`) creates rhythm against the warm-white run of Founder/Work and makes the doctrine read as a stated position. Lifts the existing canonical `twinLine` copy verbatim.

Rejected:
- B (paper, two-column) — visually repeats About; doctrine reads quiet rather than stated.
- C (inline expansion of Founder) — keeps doctrine as a Founder appendix; fails the "buried" diagnosis.

## Component

**File:** `src/components/HowWeWork.tsx`
**Mounted in:** `src/app/page.tsx` between `<Founder />` and `<Work />`.
**Pattern:** matches existing `<Services>` / `<Hero>` dark-surface composition (inline styles + `grain` + `lc-pad-section`).

### Surface

- Background: `#1A1812`
- `grain` className for canonical paper-grain texture
- `lc-pad-section` for responsive padding
- Subtle radial accent: `radial-gradient(ellipse 60% 50% at 30% 60%, rgba(201,169,97,0.05) 0%, transparent 70%)` (positioned-absolute, `pointer-events: none`, `inset: 0`)
- Top border: `1px solid rgba(246,241,235,0.06)`
- `position: relative`, `overflow: hidden`

### Layout

- Single centered column inside an outer `max-width: 1100px` wrapper (matches About / Services outer width)
- Inner content `max-width: 760px`, left-aligned within wrapper

### Visual structure (top → bottom)

1. **Overline** — `var(--font-mono)`, `0.62rem`, weight 600, letter-spacing `0.28em`, uppercase, color `#C9A961` (gold-on-dark). Margin-bottom: `2rem`.
2. **Headline** — `var(--font-display)`, `clamp(2.2rem, 4vw, 3.5rem)`, weight 300, line-height `1.1`, letter-spacing `-0.02em`, color `#F6F1EB`. Carries `id="how-we-work-heading"`. Margin-bottom: `2.5rem`.
3. **Gold separator** — `48px × 1px`, `#C9A961`. Margin-bottom: `2.5rem`.
4. **Statement** — `var(--font-display)` (Cormorant), `clamp(1.15rem, 1.6vw, 1.4rem)`, weight 400, line-height `1.6`, color `rgba(246,241,235,0.88)`. No italic. Renders the lifted `twinLine` content.

### Animation

None. `.reveal` animations are Hero-only (load-triggered fadeUp); below-fold sections don't use them. Don't introduce a new mechanism for this section.

### Mobile

Existing `lc-pad-section` handles padding shrink. Single column, no grid stacking needed. The `clamp()` on headline + statement handles type scale.

### A11y

- Section: `id="how-we-work"`, `aria-labelledby="how-we-work-heading"`
- Headline: `id="how-we-work-heading"`
- Contrast: `#F6F1EB` on `#1A1812` ≈ 14.6:1; `#C9A961` on `#1A1812` ≈ 7.4:1; `rgba(246,241,235,0.88)` on `#1A1812` effective ≈ 12.8:1 — all pass AAA.

## Dictionary changes

In `src/i18n/dictionaries.ts`, add to BOTH `en` and `de`:

```ts
howWeWork: {
  overline: ...,
  headline: ...,
  statement: ...,
}
```

**EN:**
- `overline`: `HOW WE WORK`
- `headline`: `AI-native, transparently.`
- `statement`: existing EN `twinLine` content, verbatim:
  > Every leader at Lechner Studios has a disclosed AI twin. Every twin operates inside a declared, revocable autonomy scope. Inside it, the twin acts; outside it, the twin drafts — and a human decides.

**DE:**
- `overline`: `WIE WIR ARBEITEN`
- `headline`: `KI-nativ, transparent.`
- `statement`: existing DE `twinLine` content, verbatim:
  > Jede Führungsperson bei Lechner Studios hat einen öffentlich deklarierten KI-Zwilling. Jeder Zwilling operiert innerhalb eines deklarierten und widerrufbaren Autonomie-Bereichs. Innerhalb dieses Bereichs handelt der Zwilling selbst; außerhalb entwirft er — und ein Mensch entscheidet.

Remove `twinLine` from both `en.founder` and `de.founder`. The doctrine has one home now.

## Founder.tsx change

Delete the trailing italic-block `<p>` at lines 139–149 (the `twinLine` container with `borderLeft` rule). Founder text block now ends after the body paragraph.

## page.tsx change

```tsx
import HowWeWork from "../components/HowWeWork";
// ...
<Founder />
<HowWeWork />
<Work />
```

## Acceptance criteria

1. Section renders between Founder and Work on `/`.
2. EN and DE both render correct overline, headline, statement.
3. `twinLine` no longer renders inside `<Founder>` in either locale.
4. Section accents use `--color-gold-on-dark` token (`#C9A961`); no `#B8944D` on dark surface.
5. Mobile (≤768px): padding shrinks via `lc-pad-section`; type scales via `clamp()`; no horizontal overflow.
6. Lighthouse / axe: no new contrast or landmark violations introduced.
7. TypeScript build passes; ESLint clean.

## Out of scope

- Process diagram / stage-by-stage treatment — future enhancement, not required for the position-signal that this section provides.
- Founder restructure beyond removing the italic block.
- Bilingual URL routes — separate pending follow-up.
- Color contrast fix for `#B8944D` overlines on light surfaces — separate spec/PR (next in queue).

## References

- `~/dev/websites/docs/superpowers/specs/2026-04-27-brand-v4.1-design.md` §3, §6, §7
- `~/dev/websites/docs/superpowers/specs/2026-04-28-brand-v4.2-portfolio-amendments-design.md`
- ADR-0017 — Twin Autonomy Scope (canonical doctrine wording source)
- `lechner-studios/CONVENTIONS.md` — token names, component patterns, mobile breakpoint
