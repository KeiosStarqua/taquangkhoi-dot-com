import { useState } from "react";
import { useTranslation } from "react-i18next";

type TokenKind = "key" | "str" | "punct";
type Token = readonly [text: string, kind?: TokenKind];

/** Static `research.ts` source, pre-tokenized for the dark code window. */
const LINES: readonly (readonly Token[])[] = [
	[["const", "key"], [" research "], ["= {", "punct"]],
	[["  focus"], [": [", "punct"]],
	[
		['    "AI Agents"', "str"],
		[",", "punct"],
	],
	[
		['    "Engineering Intelligence"', "str"],
		[",", "punct"],
	],
	[
		['    "Quantum Computing"', "str"],
		[",", "punct"],
	],
	[
		['    "LLM Systems"', "str"],
		[",", "punct"],
	],
	[["  ],", "punct"]],
	[
		["  goal"],
		[": ", "punct"],
		['"Turn research into real-world products"', "str"],
		[",", "punct"],
	],
	[["};", "punct"]],
];

/**
 * Hero code window for `/$lang/research`. Run prints a one-line result and
 * scrolls to the element with id `targetId`. Nothing is evaluated.
 */
export default function ResearchCode({ targetId }: { targetId: string }) {
	const { t } = useTranslation();
	const [done, setDone] = useState(false);

	function run() {
		setDone(true);
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		document
			.getElementById(targetId)
			?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
	}

	return (
		<section
			className="code-window rise-in self-start"
			style={{ animationDelay: "80ms" }}
			aria-label="research.ts"
		>
			<div className="code-chrome">
				<div className="code-dots" aria-hidden="true">
					<span />
					<span />
					<span />
				</div>
				<span className="code-filename">{"// research.ts"}</span>
				<div className="code-actions">
					<button
						type="button"
						className={done ? "run-btn is-hot" : "run-btn"}
						onClick={run}
					>
						{`${t("research.terminal.run")} ▶`}
					</button>
				</div>
			</div>
			<pre className="code-scroll m-0">
				<code>
					{LINES.map((tokens, index) => (
						<span
							// Static source: the index is the line identity.
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed line list
							key={index}
							className="code-line cursor-default"
						>
							<span className="ln" aria-hidden="true">
								{index + 1}
							</span>
							<span className="code-text">
								{tokens.map(([text, kind], i) => (
									<span
										// biome-ignore lint/suspicious/noArrayIndexKey: fixed token list
										key={i}
										className={kind ? `tok-${kind}` : undefined}
									>
										{text}
									</span>
								))}
							</span>
						</span>
					))}
				</code>
			</pre>
			<div
				className={done ? "code-console is-hot" : "code-console"}
				aria-live="polite"
			>
				<p className={done ? "code-log is-result" : "code-log is-idle"}>
					<span className="prompt-mark">{done ? "←" : ">"}</span>
					{done ? t("research.terminal.done") : t("research.terminal.idle")}
				</p>
			</div>
		</section>
	);
}
