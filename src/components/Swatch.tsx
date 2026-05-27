import { ClipboardCheck } from "iconoir-react";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { copyTarget, copyValue } from "../data/atoms";
import "../styles.css";
import { formatColor } from "../utils/colorToFormat";
import { contrastColor } from "../utils/contrastColor";
import { hexToRgb } from "../utils/hexToRgb";
import { oklchToHex } from "../utils/oklchToHex";
import { textColor } from "../utils/textColor";

export interface SwatchProps {
    text: string;
    color: string;
    p3Supported: boolean;
}

export function Swatch(props: SwatchProps) {
    const [copied, setCopied] = useState<boolean | "error">(false);

    const copy = useAtomValue(copyValue);
    const format = useAtomValue(copyTarget);

    const fg = textColor(props.color);
    const hex = useMemo(() => oklchToHex(props.color), [props.color]);
    const rgb = useMemo(() => hexToRgb(hex.hex), [hex.hex]);

    const formatText = formatColor(hex.hex, copy, format, props.color, rgb);

    const [displayText, setDisplayText] = useState(formatText);
    const pendingTextRef = useRef(formatText);
    const [fadeSpring, fadeApi] = useSpring(() => ({
        opacity: 1,
        config: { tension: 320, friction: 24 },
    }));

    useEffect(() => {
        pendingTextRef.current = formatText;
        fadeApi.start({
            opacity: 0,
            onRest: () => {
                setDisplayText(pendingTextRef.current);
                fadeApi.start({ opacity: 1 });
            },
        });
    }, [formatText, fadeApi]);

    const [sizeSpring, api] = useSpring(() => ({
        transform: "scale(1)",
        shadowOpacity: 0,
        config: { tension: 180, friction: 16 },
    }));

    const overlaySpring = useSpring({
        opacity: copied ? 1 : 0,
        config: { tension: 200, friction: 20 },
    });

    const handleClick = (): void => {
        navigator.clipboard
            .writeText(formatText)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            })
            .catch(() => {
                setCopied("error");
            });
    };

    return (
        <animated.div
            className="swatch"
            style={{
                backgroundColor: props.color,
                transform: sizeSpring.transform,
                boxShadow: sizeSpring.shadowOpacity.to(
                    (o) =>
                        `0 8px 28px color-mix(in oklch, ${props.color} ${Math.round(o * 55)}%, transparent)`,
                ),
            }}
            onClick={handleClick}
            onMouseEnter={() => {
                api.stop();
                api.start({
                    transform: "scale(1.05)",
                    shadowOpacity: 1,
                    config: { tension: 180, friction: 16, velocity: 0.03 },
                });
            }}
            onMouseLeave={() => {
                api.start({
                    transform: "scale(1)",
                    shadowOpacity: 0,
                    config: { tension: 180, friction: 16, velocity: 0 },
                });
            }}
            onMouseDown={() => {
                api.stop();
                api.start({
                    transform: "scale(0.9)",
                    config: { tension: 255, friction: 26, velocity: 0.03 },
                });
            }}
            onMouseUp={() => {
                api.stop();
                api.start({
                    transform: "scale(1)",
                    config: { tension: 170, friction: 12, velocity: 0.03 },
                });
            }}
        >
            <animated.div className="swatch-overlay" style={overlaySpring}>
                {copied === true ? (
                    <ClipboardCheck color={contrastColor(props.color)} />
                ) : (
                    <span>Failed to copy!</span>
                )}
            </animated.div>
            {hex.clipped && !props.p3Supported && (
                <div
                    className="swatch-clipped-badge"
                    title="Color clipped to sRGB"
                />
            )}
            <div className="swatch-value" style={{ color: fg }}>
                {props.text}
            </div>
            <animated.div
                className="swatch-value"
                style={{ color: fg, fontSize: 12, ...fadeSpring }}
            >
                {displayText}
            </animated.div>
        </animated.div>
    );
}
