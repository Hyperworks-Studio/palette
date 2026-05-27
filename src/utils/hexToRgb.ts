export function hexToRgb(hex: string): string {
    const clean = hex.replace(/^#/, "");

    if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) {
        return "rgb(0 0 0)";
    }

    const expanded =
        clean.length === 3
            ? clean
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : clean;

    const r = parseInt(expanded.slice(0, 2), 16);
    const g = parseInt(expanded.slice(2, 4), 16);
    const b = parseInt(expanded.slice(4, 6), 16);

    return `rgb(${r} ${g} ${b})`;
}
