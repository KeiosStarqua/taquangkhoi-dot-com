export type TokenKind = "key" | "str" | "punct" | "comment";

export type CodeToken = {
	key: string;
	text: string;
	kind?: TokenKind;
};

export type CodeLine = {
	tokens: readonly CodeToken[];
};

export type RunStep = {
	/** 1-based line highlighted while this step plays. */
	line: number;
	output?: string;
	kind?: "log" | "result";
};

export type AboutProgram = {
	lines: readonly CodeLine[];
	steps: readonly RunStep[];
	source: string;
};

const ALIAS = "Keios Starqua";
const LOCATION = "Vietnam";
const ROLES = ["Developer", "AI Explorer", "Musician"] as const;
const FOCUS = [
	"AI Agents",
	"Quantum Programming",
	"Open Source",
	"Music with Ardour",
] as const;
const STACK = ["TypeScript", "React", "Kotlin", "Python"] as const;

function escapeString(value: string): string {
	return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function createTokens() {
	let seq = 0;
	function stamp(text: string, kind?: TokenKind): CodeToken {
		seq += 1;
		return { key: `t${seq}`, text, kind };
	}
	function key(text: string) {
		return stamp(text, "key");
	}
	function str(text: string) {
		return stamp(`"${escapeString(text)}"`, "str");
	}
	function punct(text: string) {
		return stamp(text, "punct");
	}
	function plain(text: string) {
		return stamp(text);
	}
	function comment(text: string) {
		return stamp(text, "comment");
	}
	function line(...tokens: CodeToken[]): CodeLine {
		return { tokens };
	}
	function stringList(items: readonly string[]): CodeLine[] {
		return items.map((item) => line(plain("    "), str(item), punct(",")));
	}
	return { key, str, punct, plain, comment, line, stringList };
}

function lineText(codeLine: CodeLine): string {
	return codeLine.tokens.map((token) => token.text).join("");
}

function findLine(
	lines: readonly CodeLine[],
	predicate: (text: string) => boolean,
): number {
	const index = lines.findIndex((codeLine) => predicate(lineText(codeLine)));
	if (index < 0) {
		throw new Error("about program is missing an expected line");
	}
	return index + 1;
}

export function buildAboutProgram(input: {
	motto: string;
	hello: string;
}): AboutProgram {
	const { motto, hello } = input;
	const { key, str, punct, plain, comment, line, stringList } = createTokens();
	const lines: CodeLine[] = [
		line(comment("/**")),
		line(comment(" * about-me.ts")),
		line(comment(" * Profile of Tạ Quang Khôi — scroll, then run.")),
		line(comment(" */")),
		line(),
		line(key("const"), plain(" taQuangKhoi = "), punct("{")),
		line(plain("  alias: "), str(ALIAS), punct(",")),
		line(plain("  roles: "), punct("[")),
		...stringList(ROLES),
		line(plain("  "), punct("],")),
		line(plain("  location: "), str(LOCATION), punct(",")),
		line(plain("  now: "), str("TRUE-TECH"), punct(",")),
		line(plain("  site: "), str("https://taquangkhoi.com"), punct(",")),
		line(plain("  currentFocus: "), punct("[")),
		...stringList(FOCUS),
		line(plain("  "), punct("],")),
		line(plain("  stack: "), punct("[")),
		...stringList(STACK),
		line(plain("  "), punct("],")),
		line(plain("  motto: "), str(motto), punct(",")),
		line(punct("}")),
		line(),
		line(
			key("function"),
			plain(" introduce(person: "),
			key("typeof"),
			plain(" taQuangKhoi) "),
			punct("{"),
		),
		line(plain("  console."), plain("log"), punct("("), str(hello), punct(")")),
		line(
			plain("  console."),
			plain("log"),
			punct("(`"),
			plain("$\u007Bperson.alias} · $\u007Bperson.location}"),
			punct("`)"),
		),
		line(
			plain("  console."),
			plain("log"),
			punct("(person.roles.join("),
			str(" · "),
			punct("))"),
		),
		line(plain("  console."), plain("log"), punct("(person.motto)")),
		line(plain("  "), key("return"), plain(" person.currentFocus.length")),
		line(punct("}")),
		line(),
		line(plain("introduce"), punct("(taQuangKhoi)")),
	];

	const callLine = findLine(lines, (text) => text.startsWith("introduce("));
	const steps: RunStep[] = [
		{ line: findLine(lines, (text) => text.startsWith("const ")) },
		{ line: findLine(lines, (text) => text.startsWith("function ")) },
		{ line: callLine },
		{
			line: findLine(
				lines,
				(text) => text.includes("console.log") && text.includes(hello),
			),
			output: hello,
			kind: "log",
		},
		{
			line: findLine(lines, (text) => text.includes("person.alias")),
			output: `${ALIAS} · ${LOCATION}`,
			kind: "log",
		},
		{
			line: findLine(lines, (text) => text.includes("roles.join")),
			output: ROLES.join(" · "),
			kind: "log",
		},
		{
			line: findLine(lines, (text) => text.includes("person.motto")),
			output: motto,
			kind: "log",
		},
		{ line: findLine(lines, (text) => text.includes("return ")) },
		{ line: callLine, output: String(FOCUS.length), kind: "result" },
	];

	return {
		lines,
		steps,
		source: lines.map(lineText).join("\n"),
	};
}
