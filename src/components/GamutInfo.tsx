import { WarningTriangle } from "iconoir-react";

export interface GamutInfoProps {
    p3Supported: boolean;
}

export function GamutInfo(props: GamutInfoProps) {
    if (props.p3Supported) return null;

    return (
        <div className="gamut-info">
            <div className="gamut-info-header">
                <WarningTriangle
                    color="oklch(0.67 0.28 23)"
                    className="gamut-info-icon"
                />
                <span className="gamut-info-title">
                    Your display does not support P3.
                </span>
            </div>
            <p className="gamut-info-body">
                Some swatches contain wide-gamut P3 colors that cannot be
                displayed accurately on your screen. Swatches marked with{" "}
                <span className="gamut-info-badge" aria-hidden="true" /> are
                clipped to the nearest sRGB equivalent.
            </p>
        </div>
    );
}
