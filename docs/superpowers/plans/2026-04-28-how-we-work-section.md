# How we work — homepage section implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated "How we work" section between Founder and Work that lifts the canonical `twinLine` content out of the Founder section onto its own dark surface — making the AI-native operating model visible as a stated position.

**Architecture:** New `<HowWeWork>` component matching the existing dark-section composition pattern (`<Hero>` / `<Services>`): inline styles + `grain` texture + `lc-pad-section` mobile padding helper. Pulls from `dict.howWeWork` in both EN and DE locales. The `twinLine` is removed from `dict.founder` and the corresponding italic-block `<p>` is removed from `Founder.tsx` so the doctrine has one home.

**Tech Stack:** Next.js 16.2.4, React 19.2.4, TypeScript, client-side i18n via `LanguageContext` + `dictionaries.ts`. No unit-test infra in this repo for visual components — verification is `npm run lint`, `npx tsc --noEmit`, `npm run build`, and a dev-server smoke test.

**Worktree / branch:** `.worktrees/how-we-work-section/`, branch `claude/how-we-work-section`. Spec doc commit `2b3ca42` already on the branch.

**Compliance:** Lifts the existing 3-sentence `twinLine`. Compliant with ADR-0017 §Canonical public wording as amended on 2026-04-28T15:00 (PR #105 merged) — homepage is a marketing surface, AI-disclosure clause may be dropped.

---

## File map

| File | Action | What it does |
|---|---|---|
| `src/i18n/dictionaries.ts` | Modify (Tasks 1, 4) | Adds `howWeWork.{overline, headline, statement}` to EN + DE; removes `twinLine` from `founder.*` in both locales (Task 4) |
| `src/components/HowWeWork.tsx` | Create (Task 2) | New section component, dark surface, single column, lifts `dict.howWeWork` |
| `src/app/page.tsx` | Modify (Task 3) | Imports `HowWeWork`; mounts `<HowWeWork />` between `<Founder />` and `<Work />` |
| `src/components/Founder.tsx` | Modify (Task 4) | Deletes the trailing italic `<p>` block (lines 139–149) that renders `d.twinLine` |

---

## Task 1: Add `howWeWork` dictionary entries (both locales)

**Files:**
- Modify: `src/i18n/dictionaries.ts:35` (insert after `founder` block in EN, before `work`) and `:164` (DE, same position relative to `founder` block)

**Why this is task 1:** Adds the new keys without touching consumers. After this task, `Founder.tsx` still references `d.twinLine` which is still present in `founder.*` — no breakage. Sets up the dict for the new component.

- [ ] **Step 1: Read the current EN founder block to confirm exact insertion point**

Run: read `src/i18n/dictionaries.ts` lines 24–36

Expected: `founder` block ends with `twinLine: "...",` on line 34, `},` on line 35, then `work: {` on line 36.

- [ ] **Step 2: Insert `howWeWork` block in EN locale**

In `src/i18n/dictionaries.ts`, between the closing `},` of `founder` (line 35) and the opening `work: {` (line 36), insert:

```ts
    howWeWork: {
      overline: "HOW WE WORK",
      headline: "AI-native, transparently.",
      statement: "Every leader at Lechner Studios has a disclosed AI twin. Every twin operates inside a declared, revocable autonomy scope. Inside it, the twin acts; outside it, the twin drafts — and a human decides.",
    },
```

Indentation matches the existing `founder` and `work` blocks (4-space indent for the key, 6-space for inner properties).

- [ ] **Step 3: Insert `howWeWork` block in DE locale**

In `src/i18n/dictionaries.ts`, find the DE `founder` block (`founder: {` around line 153) and its closing `},` (around line 164). Between that closing `},` and the next `work: {`, insert:

```ts
    howWeWork: {
      overline: "WIE WIR ARBEITEN",
      headline: "KI-nativ, transparent.",
      statement: "Jede Führungsperson bei Lechner Studios hat einen öffentlich deklarierten KI-Zwilling. Jeder Zwilling operiert innerhalb eines deklarierten und widerrufbaren Autonomie-Bereichs. Innerhalb dieses Bereichs handelt der Zwilling selbst; außerhalb entwirft er — und ein Mensch entscheidet.",
    },
```

- [ ] **Step 4: Run typecheck to confirm dict structure compiles**

Run: `npx tsc --noEmit`

Expected: No errors. The TypeScript inferred type now includes `howWeWork` in both locales; nothing consumes it yet so no consumer errors either.

- [ ] **Step 5: Run lint**

Run: `npm run lint`

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/dictionaries.ts
git commit -m "feat(home): add howWeWork dict entries (EN+DE)

Adds the new section copy: overline, headline, and statement (the
canonical twinLine content) for both locales. Consumer component lands
in the next commit; twinLine stays in dict.founder until then to keep
Founder.tsx compiling.

Compliant with ADR-0017 §Canonical public wording (marketing-surface
rule) — three load-bearing claims preserved."
```

---

## Task 2: Create `HowWeWork.tsx` component

**Files:**
- Create: `src/components/HowWeWork.tsx`

- [ ] **Step 1: Create the component file**

Write to `src/components/HowWeWork.tsx`:

```tsx
"use client";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function HowWeWork() {
  const { dict } = useLanguage();
  const d = dict.howWeWork;

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="grain lc-pad-section"
      style={{
        position: "relative",
        background: "#1A1812",
        padding: "120px 48px",
        borderTop: "1px solid rgba(246,241,235,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(201,169,97,0.05) 0%, transparent 70%)",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "760px" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C9A961",
              marginBottom: "2rem",
            }}
          >
            {d.overline}
          </p>

          <h2
            id="how-we-work-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#F6F1EB",
              marginBottom: "2.5rem",
            }}
          >
            {d.headline}
          </h2>

          <div
            style={{
              width: "48px",
              height: "1px",
              background: "#C9A961",
              marginBottom: "2.5rem",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(246,241,235,0.88)",
            }}
          >
            {d.statement}
          </p>
        </div>
      </div>
    </section>
  );
}
```

Notes on conformance:
- Pattern matches `<Services>` (dark surface, `grain`, `lc-pad-section`, max-width 1100 wrapper, radial accent).
- All gold accents use `#C9A961` (gold-on-dark token), not `#B8944D`.
- No `.reveal` animation classes — those are Hero-only (load-triggered fadeUp).
- No hover/focus inline handlers (a11y anti-pattern per CONVENTIONS.md).

- [ ] **Step 2: Run typecheck**

Run: `npx tsc --noEmit`

Expected: No errors. `dict.howWeWork.{overline, headline, statement}` resolve via the dict shape added in Task 1.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/HowWeWork.tsx
git commit -m "feat(home): add HowWeWork section component

Dark-surface section that lifts the canonical twinLine onto its own
position-signal surface. Matches the <Services> composition pattern
(grain + lc-pad-section + max-width 1100 wrapper + radial accent).
Consumes dict.howWeWork.{overline, headline, statement} from Task 1.

Component is created but not yet mounted — see next commit."
```

---

## Task 3: Mount `<HowWeWork />` in `page.tsx`

**Files:**
- Modify: `src/app/page.tsx:7` (add import) and `:23–24` (add element between `<Founder />` and `<Work />`)

- [ ] **Step 1: Add import**

In `src/app/page.tsx`, after line 7 (`import Founder from "../components/Founder";`), add:

```tsx
import HowWeWork from "../components/HowWeWork";
```

- [ ] **Step 2: Mount the section**

In `src/app/page.tsx`, replace this block:

```tsx
        <Founder />
        <Work />
```

with:

```tsx
        <Founder />
        <HowWeWork />
        <Work />
```

After this edit, the section renders on the homepage. The `twinLine` italic block at the bottom of `<Founder>` is still present (still using `d.twinLine`), so the doctrine appears in two places transiently — the next task removes the duplicate.

- [ ] **Step 3: Run typecheck**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): mount HowWeWork between Founder and Work

The new section now renders on /. Doctrine still appears in two places
transiently (HowWeWork section + italic block in Founder); the next
commit removes the Founder appendix so the doctrine has one home."
```

---

## Task 4: Remove `twinLine` from `Founder.tsx` and `dict.founder.*`

**Files:**
- Modify: `src/components/Founder.tsx:139-149` (delete italic-block `<p>`)
- Modify: `src/i18n/dictionaries.ts:34` (remove EN `twinLine`) and `:163` (remove DE `twinLine`)

This task removes the duplicate. After it, the doctrine lives only in `<HowWeWork>` and `dict.howWeWork.statement`.

- [ ] **Step 1: Delete the italic block from Founder.tsx**

In `src/components/Founder.tsx`, delete lines 139–149 (the trailing `<p>` block that renders `d.twinLine`):

```tsx
          <p style={{
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#6B665C",
            fontWeight: 400,
            fontStyle: "italic",
            borderLeft: "1px solid rgba(26,24,18,0.12)",
            paddingLeft: "20px",
          }}>
            {d.twinLine}
          </p>
```

The text block (the `body` paragraph above it) becomes the last element inside the `<div style={{ maxWidth: "780px" }}>` wrapper.

- [ ] **Step 2: Remove `twinLine` from EN founder dict**

In `src/i18n/dictionaries.ts`, in the EN `founder` block, delete the `twinLine: "..."` line. The block goes from:

```ts
      body: "Sonja Lechner is a solutions-oriented founder. ...",
      twinLine: "Every leader at Lechner Studios has a disclosed AI twin. ...",
    },
```

to:

```ts
      body: "Sonja Lechner is a solutions-oriented founder. ...",
    },
```

- [ ] **Step 3: Remove `twinLine` from DE founder dict**

Same operation in the DE `founder` block — delete the `twinLine: "..."` line, keeping `body` as the last property before the closing `},`.

- [ ] **Step 4: Run typecheck**

Run: `npx tsc --noEmit`

Expected: No errors. `Founder.tsx` no longer references `d.twinLine`, so removing it from the dict is safe.

- [ ] **Step 5: Run lint**

Run: `npm run lint`

Expected: No errors.

- [ ] **Step 6: Run build**

Run: `npm run build`

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/Founder.tsx src/i18n/dictionaries.ts
git commit -m "feat(home): retire twinLine from Founder — single home in HowWeWork

Removes the italic twinLine block from Founder.tsx and the corresponding
twinLine key from dict.founder.{en,de}. The canonical doctrine wording
now lives in one place: dict.howWeWork.statement, rendered by
<HowWeWork>."
```

---

## Task 5: Manual verification (no commit unless fixes needed)

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

Expected: Server starts at http://localhost:3000.

- [ ] **Step 2: Verify EN render**

Open http://localhost:3000 (default EN locale). Scroll to between Founder and Work. Verify:

- Section appears on dark `#1A1812` background with grain texture
- Overline reads `HOW WE WORK` in gold-on-dark
- Headline reads `AI-native, transparently.` in warm-white display type
- 48px gold separator below the headline
- Statement renders the 3-sentence twinLine in Cormorant, no italic, slightly transparent warm-white
- Founder section above no longer has the bordered italic block

- [ ] **Step 3: Verify DE render**

Click the language toggle (`DE`). Verify the same structure renders with:
- Overline: `WIE WIR ARBEITEN`
- Headline: `KI-nativ, transparent.`
- Statement: 3-sentence German twinLine
- Founder section: italic block gone in DE too

- [ ] **Step 4: Verify mobile rendering**

Open browser DevTools, set viewport to 375px width. Verify:

- Section padding shrinks (per `lc-pad-section` → `72px 24px`)
- Type scales via `clamp()` — headline reads at the lower clamp bound, statement at the lower clamp bound
- No horizontal scroll
- Content remains left-aligned within its 760px inner container

- [ ] **Step 5: Verify keyboard a11y**

Press `Tab` from the page top. The skip-link should focus first; pressing Enter should jump to `#main`. Continue tabbing — `<HowWeWork>` has no interactive elements so it should not capture focus. The section heading should be reachable via screen-reader landmark navigation (it has `id="how-we-work-heading"` and the section is `aria-labelledby` to it).

- [ ] **Step 6: If any of steps 2–5 fail, fix in a follow-up commit**

Diagnose the issue, fix, run typecheck + lint + build, commit with `fix(home): ...` prefix.

- [ ] **Step 7: Stop the dev server**

Stop the running `npm run dev` process.

---

## Spec coverage check (self-review)

| Spec requirement | Implemented in |
|---|---|
| New `<HowWeWork>` component | Task 2 |
| Mounted between `<Founder>` and `<Work>` | Task 3 |
| Dark surface `#1A1812` + grain + `lc-pad-section` | Task 2 step 1 |
| Subtle radial accent (`rgba(201,169,97,0.05)`) | Task 2 step 1 |
| Outer 1100px wrapper, inner 760px content | Task 2 step 1 |
| Overline EN/DE | Task 1 + rendered Task 2 |
| Headline EN/DE | Task 1 + rendered Task 2 |
| 48px × 1px gold separator | Task 2 step 1 |
| Statement at clamp(1.15rem, 1.6vw, 1.4rem), no italic | Task 2 step 1 |
| `id="how-we-work"` + `aria-labelledby` | Task 2 step 1 |
| Headline `id="how-we-work-heading"` | Task 2 step 1 |
| All gold accents use `--gold-on-dark` (`#C9A961`) | Task 2 step 1 |
| No `.reveal` animation | Task 2 step 1 (verified omitted) |
| `twinLine` removed from `dict.founder.*` (EN + DE) | Task 4 steps 2–3 |
| Italic-block `<p>` removed from `Founder.tsx` | Task 4 step 1 |
| Build + typecheck + lint pass | Tasks 1–4 |
| Mobile padding via existing `lc-pad-section` | Task 5 step 4 (verification) |
| Color contrast AAA on dark surface | Spec acceptance criteria; verified by token choice |

---

## Out of scope (per spec)

- Process diagram / staged-work treatment — future enhancement.
- Founder section restructure beyond the italic block.
- Bilingual URL routes — separate pending follow-up.
- `#B8944D` light-surface contrast fix — separate spec/PR (next in queue).

---

## Acceptance — done when

1. All four feature commits land on `claude/how-we-work-section`.
2. Manual verification (Task 5) passes EN, DE, mobile, keyboard.
3. PR opened against `main`, scope tight (4 commits + spec + plan).
