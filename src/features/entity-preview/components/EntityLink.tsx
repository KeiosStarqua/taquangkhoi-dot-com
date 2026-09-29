import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithRef } from "react";
import type { EntityTarget } from "../types/entity";

type AnchorProps = Omit<ComponentPropsWithRef<"a">, "href">;

interface EntityLinkProps extends AnchorProps {
	destination: EntityTarget;
	lang: "en" | "vi";
}

/** Maps an entity target to a typed router link. */
export default function EntityLink({
	destination: target,
	lang,
	...rest
}: EntityLinkProps) {
	switch (target.kind) {
		case "product":
			return (
				<Link
					to="/$lang/products/$productId"
					params={{ lang, productId: target.productId }}
					{...rest}
				/>
			);
		case "experience":
			return (
				<Link
					to="/$lang/experience"
					params={{ lang }}
					hash={target.hash}
					{...rest}
				/>
			);
		case "research":
			return <Link to="/$lang/research" params={{ lang }} {...rest} />;
	}
}
