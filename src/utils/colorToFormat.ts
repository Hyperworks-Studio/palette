function hexToComponents(hex: string): [number, number, number] {
    const clean = hex.replace(/^#/, "");
    const expanded =
        clean.length === 3
            ? clean
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : clean;

    return [
        parseInt(expanded.slice(0, 2), 16),
        parseInt(expanded.slice(2, 4), 16),
        parseInt(expanded.slice(4, 6), 16),
    ];
}

export function formatColor(
    hex: string,
    copy: "oklch" | "hex" | "rgb",
    target: "css" | "rblx",
    oklch: string,
    rgb: string,
): string {
    if (target === "rblx") {
        if (copy === "oklch") return `oklch not supported`;
        if (copy === "hex") return `Color3.fromHex("${hex}")`;
        const [r, g, b] = hexToComponents(hex);
        return `Color3.fromRGB(${r}, ${g}, ${b})`;
    }

    if (copy === "hex") return hex;
    if (copy === "rgb") return rgb;
    return oklch;
}
