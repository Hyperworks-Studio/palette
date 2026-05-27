export interface HexResult {
    hex: string;
    clipped: boolean;
}

export function oklchToHex(str: string): HexResult {
    const m = str.match(
        /oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+|none)(?:\s*\/[^)]+)?\s*\)/,
    );

    if (!m) return { hex: "#000000", clipped: false };

    const L = parseFloat(m[1]);
    const C = parseFloat(m[2]);
    const H = m[3] === "none" ? 0 : parseFloat(m[3]);

    // Convert hue degrees to radians, then to OKLab a/b axes
    const hRad = (H * Math.PI) / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);

    // OKLab → LMS (cube root space)
    let l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    let m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    let s_ = L - 0.0894841775 * a - 1.291485548 * b;

    // Undo the cube root
    l_ = l_ ** 3;
    m_ = m_ ** 3;
    s_ = s_ ** 3;

    // LMS → linear sRGB
    const r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
    const g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
    const bv = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;

    // Clipped = color is outside the sRGB gamut (some oklch colors can't be displayed)
    const clipped = r < 0 || r > 1 || g < 0 || g > 1 || bv < 0 || bv > 1;

    // Linear sRGB → gamma-corrected sRGB (the numbers your monitor actually uses)
    const toSRGB = (c: number): number => {
        c = Math.max(0, Math.min(1, c));
        return c <= 0.0031308
            ? 12.92 * c
            : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };

    const toHex = (c: number): string =>
        Math.round(toSRGB(c) * 255)
            .toString(16)
            .padStart(2, "0");

    return {
        hex: `#${toHex(r)}${toHex(g)}${toHex(bv)}`,
        clipped,
    };
}
