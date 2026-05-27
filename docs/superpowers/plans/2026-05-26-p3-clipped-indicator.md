# P3 Clipped Indicator + Info Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a small dot badge on swatches whose oklch color is outside the sRGB gamut (clipped), and add an info section explaining what clipping means in terms of P3 monitor support.

**Architecture:** `oklchToHex` already returns a `clipped` boolean. We add a `useP3Support` hook that reads `window.matchMedia("(color-gamut: p3)")` once on mount. The hook result is passed down from `App` to `Swatch` via a prop. When the monitor lacks P3 and the swatch is clipped, a small dot badge renders in the top-right corner. A new `GamutInfo` component renders between the subtitle and the palette list, adapting its message to P3 support.

**Tech Stack:** React 19, TypeScript, react-spring (existing), CSS variables (existing)

---

### Task 1: Add `useP3Support` hook

**Files:**
- Create: `src/hooks/useP3Support.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useEffect, useState } from "react";

export function useP3Support(): boolean {
    const [supported, setSupported] = useState<boolean>(
        () => window.matchMedia("(color-gamut: p3)").matches
    );

    useEffect(() => {
        const mq = window.matchMedia("(color-gamut: p3)");
        const handler = (e: MediaQueryListEvent): void => setSupported(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return supported;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useP3Support.ts
git commit -m "feat: add useP3Support hook"
```

---

### Task 2: Add `clipped` prop to `Swatch` and render the badge

**Files:**
- Modify: `src/components/Swatch.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add `clipped` and `p3Supported` to `SwatchProps` and render badge**

In `src/components/Swatch.tsx`, update the interface and component:

```ts
export interface SwatchProps {
    text: string;
    color: string;
    clipped: boolean;
    p3Supported: boolean;
}
```

Inside the JSX, after the `swatch-overlay` div, add:

```tsx
{props.clipped && !props.p3Supported && (
    <div className="swatch-clipped-badge" title="Color clipped to sRGB" />
)}
```

- [ ] **Step 2: Add badge styles to `src/styles.css`**

```css
.swatch-clipped-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.75);
    pointer-events: none;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Swatch.tsx src/styles.css
git commit -m "feat: add clipped badge to Swatch"
```

---

### Task 3: Create `GamutInfo` component

**Files:**
- Create: `src/components/GamutInfo.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create the component**

```tsx
export interface GamutInfoProps {
    p3Supported: boolean;
    clippedCount: number;
}

export function GamutInfo(props: GamutInfoProps): JSX.Element {
    return (
        <div className="gamut-info">
            {props.p3Supported ? (
                <p className="gamut-info-text">
                    Your display supports wide-gamut P3. All swatches are shown accurately.
                </p>
            ) : (
                <p className="gamut-info-text">
                    Your display is sRGB.{" "}
                    {props.clippedCount > 0 && (
                        <>
                            <span className="gamut-info-badge" /> Swatches with this indicator contain P3 colors clipped to the nearest sRGB equivalent.
                        </>
                    )}
                </p>
            )}
        </div>
    );
}
```

- [ ] **Step 2: Add styles to `src/styles.css`**

```css
.gamut-info {
    background: var(--surface);
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 2rem;
}

.gamut-info-text {
    font-size: 13px;
    color: var(--subtle);
    margin: 0;
    font-family: monospace;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
}

.gamut-info-badge {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--subtle);
    flex-shrink: 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/GamutInfo.tsx src/styles.css
git commit -m "feat: add GamutInfo component"
```

---

### Task 4: Wire everything together in `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import and use `useP3Support`, `GamutInfo`, compute `clippedCount`, pass props to `Swatch`**

At the top of `App.tsx`, add imports:

```ts
import { GamutInfo } from "./components/GamutInfo";
import { useP3Support } from "./hooks/useP3Support";
import { oklchToHex } from "./utils/oklchToHex";
```

Inside `App()`, add:

```ts
const p3Supported = useP3Support();

const clippedCount = palettes.reduce(
    (total, palette) =>
        total + palette.swatches.filter((s) => oklchToHex(s.color).clipped).length,
    0
);
```

Replace the existing `<p className="subtitle">` block with:

```tsx
<p className="subtitle">Click any swatch to copy</p>

<GamutInfo p3Supported={p3Supported} clippedCount={clippedCount} />
```

Update each `<Swatch>` to pass the new props:

```tsx
{palette.swatches.map((swatch) => (
    <Swatch
        key={swatch.name}
        text={swatch.name}
        color={swatch.color}
        clipped={oklchToHex(swatch.color).clipped}
        p3Supported={p3Supported}
    />
))}
```

- [ ] **Step 2: Verify the app builds**

```bash
npm run build
```

Expected: exits with code 0, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire P3 support and clipped indicators in App"
```
