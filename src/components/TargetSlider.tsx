import { useAtom } from "jotai";
import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { copyTarget } from "../data/atoms";

export function TargetSlider() {
    const [target, setTarget] = useAtom(copyTarget);

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
        if (target === "css") {
            api.start({ x: 0 });
        } else if (target === "rblx") {
            api.start({ x: 66 });
        }
    }, [target, api]);

    return (
        <div className="slider">
            <animated.div
                className="slider-indicator"
                style={{ transform: spring.x.to((x) => `translateX(${x}px)`) }}
            />
            <button onClick={() => setTarget("css")} className="slider-btn">
                css
            </button>
            <button onClick={() => setTarget("rblx")} className="slider-btn">
                rblx
            </button>
        </div>
    );
}
