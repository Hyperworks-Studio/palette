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
