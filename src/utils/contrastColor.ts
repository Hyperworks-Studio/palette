function extractLightness(color: string): number {
    const match = color.match(/oklch\(([\d.]+)/);
    return match ? parseFloat(match[1]) : 0.5;
}

export function contrastColor(color: string): string {
    return extractLightness(color) > 0.7 ? "#1a1a1a" : "#ffffff";
}
