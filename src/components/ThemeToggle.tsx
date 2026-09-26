import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return "dark";
	}

	const stored = window.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "auto") {
		return stored;
	}

	return "dark";
}

function applyThemeMode(mode: ThemeMode) {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);

	if (mode === "auto") {
		document.documentElement.removeAttribute("data-theme");
	} else {
		document.documentElement.setAttribute("data-theme", mode);
	}

	document.documentElement.style.colorScheme = resolved;

	const themeColor = resolved === "dark" ? "#05080d" : "#f3f7f6";
	document
		.querySelector('meta[name="theme-color"]')
		?.setAttribute("content", themeColor);
}

export default function ThemeToggle() {
	const [mode, setMode] = useState<ThemeMode>("dark");

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);

	useEffect(() => {
		if (mode !== "auto") {
			return;
		}

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyThemeMode("auto");

		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
	}, [mode]);

	function toggleMode() {
		const nextMode: ThemeMode =
			mode === "dark" ? "light" : mode === "light" ? "auto" : "dark";
		setMode(nextMode);
		applyThemeMode(nextMode);
		window.localStorage.setItem("theme", nextMode);
	}

	const label =
		mode === "auto"
			? "Theme mode: auto (system). Click to switch to dark mode."
			: `Theme mode: ${mode}. Click to switch mode.`;

	return (
		<button
			type="button"
			onClick={toggleMode}
			aria-label={label}
			title={label}
			className="icon-btn"
		>
			{mode === "light" ? (
				<MoonIcon />
			) : mode === "auto" ? (
				<AutoIcon />
			) : (
				<SunIcon />
			)}
		</button>
	);
}

function SunIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
		>
			<circle cx="12" cy="12" r="3.5" />
			<path
				strokeLinecap="round"
				d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
			/>
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"
			/>
		</svg>
	);
}

function AutoIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			width="16"
			height="16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
		>
			<circle cx="12" cy="12" r="7" />
			<path d="M12 5a7 7 0 0 1 0 14z" fill="currentColor" stroke="none" />
		</svg>
	);
}
