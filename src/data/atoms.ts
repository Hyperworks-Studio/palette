import { atom } from "jotai";

export const copyValue = atom<"oklch" | "hex" | "rgb">("oklch");
export const copyTarget = atom<"css" | "rblx">("css");
export const darkMode = atom(false);
