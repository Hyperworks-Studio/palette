import { animated, useSpring } from "react-spring";

export function Button({
    onClick,
    children,
    title,
}: {
    onClick: () => void;
    children: React.ReactNode;
    title: string;
}) {
    const handleClick = (): void => {
        onClick();

        api.stop();
        api.start({
            scale: 1,
            config: { tension: 270, friction: 26, velocity: -0.02 },
        });
    };

    const [sizeSpring, api] = useSpring(() => ({
        rotate: "0deg",
        scale: 1,
        config: { tension: 180, friction: 16 },
    }));

    return (
        <button
            style={{ background: "transparent", border: "none" }}
            onClick={handleClick}
            onMouseEnter={() => {
                api.start({
                    rotate: "15deg",
                    config: { tension: 270, friction: 16, mass: 1.5 },
                });
            }}
            onMouseLeave={() => {
                api.start({
                    rotate: "0deg",
                    scale: 1,
                    config: { tension: 67, friction: 12 },
                });
            }}
            onMouseDown={() => {
                api.stop();
                api.start({
                    scale: 0.7,
                    config: { tension: 270, friction: 38, velocity: -0.01 },
                });
            }}
        >
            <animated.button
                title={title}
                className="btn"
                style={{ ...sizeSpring }}
            >
                {children}
            </animated.button>
        </button>
    );
}
