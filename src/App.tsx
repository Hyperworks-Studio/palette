import { Github, HalfMoon, IconoirProvider, SunLight } from "iconoir-react";
import { useAtom } from "jotai";
import { Button } from "./components/Button";
import { GamutInfo } from "./components/GamutInfo";
import { Slider } from "./components/Slider";
import { Swatch } from "./components/Swatch";
import { TargetSlider } from "./components/TargetSlider";
import { darkMode } from "./data/atoms";
import { palettes } from "./data/palettes";
import { useP3Support } from "./hooks/useP3Support";
import "./styles.css";

export function App() {
    const [dark, setDark] = useAtom(darkMode);
    const p3Supported = useP3Support();

    return (
        <IconoirProvider iconProps={{ color: dark ? "white" : "black" }}>
            <>
                <div className="app">
                    <div className="header">
                        <h1 className="text">Hyperworks Palette</h1>

                        <div className="header-controls">
                            <TargetSlider />
                            <Slider />
                            <Button
                                onClick={() => {
                                    const next = !dark;
                                    setDark(next);
                                    document.body.classList.toggle(
                                        "dark",
                                        next,
                                    );
                                }}
                                children={dark ? <SunLight /> : <HalfMoon />}
                                title={
                                    dark
                                        ? "Switch to light mode"
                                        : "Switch to dark mode"
                                }
                            />

                            <Button
                                onClick={() => {
                                    window.open(
                                        "https://github.com/Hyperworks-Studio/palette",
                                        "_blank",
                                    );
                                }}
                                children={<Github />}
                                title="GitHub Repository"
                            />
                        </div>
                    </div>

                    <p className="subtitle">
                        Click any swatch to copy color codes in various formats.
                    </p>

                    <GamutInfo p3Supported={p3Supported} />

                    {palettes.map((palette) => (
                        <div key={palette.name} className="palette-group">
                            <div className="palette-header">
                                <span className="palette-name">
                                    {palette.name}
                                </span>
                                <span className="palette-description">
                                    {palette.description}
                                </span>
                            </div>
                            <div className="swatch-grid">
                                {palette.swatches.map((swatch) => (
                                    <Swatch
                                        key={swatch.name}
                                        text={swatch.name}
                                        color={swatch.color}
                                        p3Supported={p3Supported}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <footer style={{ textAlign: "center" }} className="footer">
                    <p className="footer-text">© 2026 Hyperworks Studio</p>
                    <p className="footer-text">Built and designed by @teakzc</p>
                </footer>
            </>
        </IconoirProvider>
    );
}
