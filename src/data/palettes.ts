export interface SwatchData {
    name: string;
    color: string;
}

export interface PaletteData {
    name: string;
    description: string;
    swatches: SwatchData[];
}

export const palettes: PaletteData[] = [
    {
        name: "Signature",
        description: "A well rounded palette consisting of curated colors.",

        swatches: [
            { name: "Sanguine", color: "oklch(0.33 0.15 10)" },
            { name: "Radiance", color: "oklch(0.67 0.28 23)" },
            { name: "Clementine", color: "oklch(0.65 0.17 49)" },
            { name: "Halcyon", color: "oklch(0.86 0.15 83)" },
            { name: "Solstice", color: "oklch(0.93 0.17 98)" },
            { name: "Verdant", color: "oklch(0.91 0.22 136)" },

            { name: "Valiant", color: "oklch(0.39 0.21 268)" },
            { name: "Abyss", color: "oklch(0.23 0.10 255)" },
            { name: "Meridian", color: "oklch(0.59 0.11 224)" },
            { name: "Quasar", color: "oklch(0.87 0.17 172)" },
            { name: "Hollow", color: "oklch(0.32 0.09 152)" },
            { name: "Jade", color: "oklch(0.55 0.14 142)" },

            { name: "Wisteria", color: "oklch(0.70 0.19 301)" },
            { name: "Sovereign", color: "oklch(0.45 0.25 295)" },
            { name: "Pulsar", color: "oklch(0.70 0.31 331)" },
            { name: "Cupid", color: "oklch(0.70 0.18 12)" },
            { name: "Dynasty", color: "oklch(0.51 0.17 359)" },
            { name: "Parchment", color: "oklch(0.95 0.02 82)" },

            { name: "Exile", color: "oklch(0.32 0 0)" },
            { name: "Pewter", color: "oklch(0.58 0.02 248)" },
            { name: "Shadow", color: "oklch(0.40 0.05 212)" },
            { name: "Sandglass", color: "oklch(0.70 0.05 72)" },
            { name: "Turpentine", color: "oklch(0.36 0.05 57)" },
            { name: "Sage", color: "oklch(0.87 0.05 128)" },
        ],
    },
];
