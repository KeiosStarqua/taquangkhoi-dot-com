import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EMAIL } from "#/data/connect";

/** `whoami` output lines under the name. Terminal copy stays in English. */
const ROLES = [
	"Software Engineer",
	"AI Researcher",
	"Co-Founder @ OpenFarm",
	"Based in Vietnam",
] as const;

const OPEN_TO = [
	"collaboration",
	"research",
	"open source",
	"interesting problems",
] as const;

/**
 * Hero terminal for `/$lang/connect`. Static transcript on the dark
 * `.code-window` panel. Copy writes the contact email to the clipboard.
 */
export default function ConnectTerminal() {
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);
	const timer = useRef<number | null>(null);

	useEffect(
		() => () => {
			if (timer.current != null) window.clearTimeout(timer.current);
		},
		[],
	);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(EMAIL);
			setCopied(true);
			if (timer.current != null) window.clearTimeout(timer.current);
			timer.current = window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}

	return (
		<section
			className="code-window rise-in self-start"
			style={{ animationDelay: "80ms" }}
			aria-label="~/connect"
		>
			<div className="code-chrome">
				<div className="code-dots" aria-hidden="true">
					<span />
					<span />
					<span />
				</div>
				<span className="code-filename">~/connect</span>
				<div className="code-actions">
					<button
						type="button"
						className={copied ? "run-btn is-hot" : "code-tool"}
						onClick={copyEmail}
						aria-label={t("connect.terminal.copyLabel", { email: EMAIL })}
					>
						{copied ? t("connect.terminal.copied") : t("connect.terminal.copy")}
					</button>
				</div>
			</div>
			<div className="px-5 py-4 font-mono text-xs leading-relaxed sm:text-[0.8rem]">
				<p className="m-0">
					<span className="prompt-mark">&gt;</span>{" "}
					<span className="tok-str">whoami</span>
				</p>
				<p className="m-0 mb-2 pl-4 font-semibold">Tạ Quang Khôi</p>
				<ul className="m-0 mb-4 list-none p-0 pl-4 tok-punct">
					{ROLES.map((role) => (
						<li key={role}>{role}</li>
					))}
				</ul>
				<p className="m-0">
					<span className="prompt-mark">&gt;</span>{" "}
					<span className="tok-str">open_to</span>
				</p>
				<ul className="m-0 list-none p-0 pl-4 tok-punct">
					{OPEN_TO.map((item) => (
						<li key={item}>
							<span className="prompt-mark">→</span> {item}
						</li>
					))}
				</ul>
				<p className="m-0 mt-2" aria-hidden="true">
					<span className="prompt-mark">&gt;</span>{" "}
					<span className="code-caret align-middle" />
				</p>
				<p className="sr-only" aria-live="polite">
					{copied ? t("connect.terminal.copied") : ""}
				</p>
			</div>
		</section>
	);
}
