import { useAtom } from "jotai";
import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { copyValue } from "../data/atoms";

export function Slider() {
    const [status, setCopyHexValue] = useAtom(copyValue);

    const [spring, api] = useSpring(
        () => ({
            x: 0,
            config: {
                tension: 210,
                friction: 20,
            },
        }),
        [],
    );

    useEffect(() => {
        if (status === "oklch") {
            api.start({ x: 0 });
        } else if (status === "hex") {
            api.start({ x: 66 });
        } else if (status === "rgb") {
            api.start({ x: 132 });
        }
    }, [status, api]);

    return (
        <div className="slider">
            <animated.div
                className="slider-indicator"
                style={{ transform: spring.x.to((x) => `translateX(${x}px)`) }}
            />
            <button
                onClick={() => setCopyHexValue("oklch")}
                className="slider-btn"
            >
                oklch
            </button>
            <button
                onClick={() => setCopyHexValue("hex")}
                className="slider-btn"
            >
                hex
            </button>
            <button
                onClick={() => setCopyHexValue("rgb")}
                className="slider-btn"
            >
                rgb
            </button>
        </div>
    );
}
