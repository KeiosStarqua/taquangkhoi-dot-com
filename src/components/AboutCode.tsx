import {
	type KeyboardEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
	type AboutProgram,
	buildAboutProgram,
	type RunStep,
} from "#/components/about-program";

const STEP_MS = 420;
const TRAVEL_MS = 220;

type Phase = "idle" | "running" | "done";

export default function AboutCode() {
	const { t } = useTranslation();
	const motto = t("home.terminal.motto");
	const hello = t("home.terminal.hello");
	const program = useMemo(
		() => buildAboutProgram({ motto, hello }),
		[motto, hello],
	);

	const [phase, setPhase] = useState<Phase>("idle");
	const [stepCursor, setStepCursor] = useState(-1);
	const [selected, setSelected] = useState<number | null>(null);
	const [copied, setCopied] = useState(false);
	const [edges, setEdges] = useState({ up: false, down: false });

	const scrollRef = useRef<HTMLDivElement>(null);
	const consoleRef = useRef<HTMLDivElement>(null);
	const lineRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const copyTimer = useRef<number | null>(null);

	const played = playedSteps(program, phase, stepCursor);
	const activeLine =
		phase === "running" ? (program.steps[stepCursor]?.line ?? null) : null;

	useEffect(() => {
		if (phase !== "running") return;
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduced || stepCursor >= program.steps.length) {
			setStepCursor(program.steps.length);
			setPhase("done");
			return;
		}
		const step = program.steps[stepCursor];
		const delay = step?.output ? STEP_MS : TRAVEL_MS;
		const id = window.setTimeout(
			() => setStepCursor((cursor) => cursor + 1),
			delay,
		);
		return () => window.clearTimeout(id);
	}, [phase, stepCursor, program.steps]);

	useEffect(() => {
		if (phase !== "running" || activeLine == null) return;
		scrollLineIntoView(scrollRef.current, lineRefs.current[activeLine - 1]);
	}, [phase, activeLine]);

	useEffect(() => {
		if (selected == null || phase === "running") return;
		const line = lineRefs.current[selected];
		line?.focus({ preventScroll: true });
		scrollLineIntoView(scrollRef.current, line ?? null);
	}, [selected, phase]);

	useEffect(() => {
		const el = consoleRef.current;
		if (!el) return;
		if (phase === "idle" || played.length === 0) {
			el.scrollTop = 0;
			return;
		}
		el.scrollTop = el.scrollHeight;
	}, [played.length, phase]);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el || program.lines.length === 0) return;
		const sync = () => {
			setEdges({
				up: el.scrollTop > 4,
				down: el.scrollTop + el.clientHeight < el.scrollHeight - 4,
			});
		};
		sync();
		const observer = new ResizeObserver(sync);
		observer.observe(el);
		el.addEventListener("scroll", sync, { passive: true });
		return () => {
			observer.disconnect();
			el.removeEventListener("scroll", sync);
		};
	}, [program.lines.length]);

	function run() {
		if (phase === "running") return;
		setSelected(null);
		setStepCursor(0);
		setPhase("running");
	}

	async function copySource() {
		try {
			await navigator.clipboard.writeText(program.source);
			setCopied(true);
			if (copyTimer.current != null) window.clearTimeout(copyTimer.current);
			copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}

	function onKeyDown(event: KeyboardEvent<HTMLElement>) {
		if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
			event.preventDefault();
			run();
			return;
		}
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		const target = event.target;
		if (
			!(target instanceof HTMLElement) ||
			!target.classList.contains("code-line")
		) {
			return;
		}
		event.preventDefault();
		setSelected((current) => {
			const start = current ?? 0;
			const next = event.key === "ArrowDown" ? start + 1 : start - 1;
			return Math.max(0, Math.min(program.lines.length - 1, next));
		});
	}

	const logs = played.filter(
		(step): step is RunStep & { output: string; kind: "log" | "result" } =>
			Boolean(step.output && step.kind),
	);

	const scrollClass = [
		"code-scroll-wrap",
		edges.up ? "can-scroll-up" : "",
		edges.down ? "can-scroll-down" : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<section
			className="code-window rise-in"
			style={{ animationDelay: "80ms" }}
			aria-label="about-me.ts"
			data-phase={phase}
			onKeyDown={onKeyDown}
		>
			<div className="code-chrome">
				<div className="code-dots" aria-hidden="true">
					<span />
					<span />
					<span />
				</div>
				<span className="code-filename">{"// about-me.ts"}</span>
				<div className="code-actions">
					<button
						type="button"
						className="code-tool"
						onClick={() => void copySource()}
					>
						{copied ? t("home.terminal.copied") : t("home.terminal.copy")}
					</button>
					<button
						type="button"
						className={phase === "done" ? "run-btn is-hot" : "run-btn"}
						onClick={run}
						disabled={phase === "running"}
						aria-busy={phase === "running"}
						aria-keyshortcuts="Control+Enter"
					>
						{phase === "running"
							? t("home.terminal.running")
							: `${t("home.terminal.run")} ▶`}
					</button>
				</div>
			</div>
			<div className={scrollClass}>
				<div className="code-scroll" ref={scrollRef}>
					{program.lines.map((codeLine, index) => {
						const lineNumber = index + 1;
						const isCurrent = activeLine === lineNumber;
						const isSelected = selected === index && !isCurrent;
						const className = [
							"code-line",
							isCurrent ? "is-current" : "",
							isSelected ? "is-selected" : "",
						]
							.filter(Boolean)
							.join(" ");
						return (
							<button
								key={lineNumber}
								type="button"
								ref={(node) => {
									lineRefs.current[index] = node;
								}}
								className={className}
								tabIndex={index === (selected ?? 0) ? 0 : -1}
								aria-current={isCurrent ? "true" : undefined}
								onClick={() => {
									if (phase === "running") return;
									setSelected(index);
								}}
							>
								<span className="ln" aria-hidden="true">
									{lineNumber}
								</span>
								<span className="code-text">
									{codeLine.tokens.length === 0
										? "\u00a0"
										: codeLine.tokens.map((token) => (
												<span
													key={token.key}
													className={
														token.kind ? `tok-${token.kind}` : undefined
													}
												>
													{token.text}
												</span>
											))}
								</span>
							</button>
						);
					})}
				</div>
			</div>
			<div
				className={phase === "done" ? "code-console is-hot" : "code-console"}
				ref={consoleRef}
				aria-live="polite"
			>
				{phase === "idle" ? (
					<p className="code-log is-idle">
						<span className="prompt-mark">&gt;</span>
						{t("home.terminal.idle")}
					</p>
				) : (
					logs.map((step) => (
						<ConsoleLine
							key={`${step.kind}-${step.line}-${step.output}`}
							step={step}
							wave={step.kind === "log" && step.output === hello}
						/>
					))
				)}
				{phase === "running" ? (
					<p className="code-log is-pending" aria-hidden="true">
						<span className="prompt-mark">&gt;</span>
						<span className="code-caret" />
					</p>
				) : null}
			</div>
		</section>
	);
}

function ConsoleLine({ step, wave }: { step: RunStep; wave: boolean }) {
	if (!step.output || !step.kind) return null;
	const mark = step.kind === "result" ? "←" : ">";
	return (
		<p className={step.kind === "result" ? "code-log is-result" : "code-log"}>
			<span className="prompt-mark">{mark}</span>
			{step.output}
			{wave ? " 👋" : null}
		</p>
	);
}

function playedSteps(
	program: AboutProgram,
	phase: Phase,
	stepCursor: number,
): RunStep[] {
	if (phase === "done") return [...program.steps];
	if (phase === "running") {
		return program.steps.slice(0, Math.max(0, stepCursor + 1));
	}
	return [];
}

function scrollLineIntoView(
	scroller: HTMLDivElement | null,
	line: HTMLElement | null,
) {
	if (!scroller || !line) return;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const top = line.offsetTop;
	const bottom = top + line.offsetHeight;
	const viewTop = scroller.scrollTop;
	const viewBottom = viewTop + scroller.clientHeight;
	const behavior = reduced ? "auto" : "smooth";
	if (top < viewTop) {
		scroller.scrollTo({ top, behavior });
	} else if (bottom > viewBottom) {
		scroller.scrollTo({ top: bottom - scroller.clientHeight, behavior });
	}
}
