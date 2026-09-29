import type { EntityRecord } from "../types/entity";

const OPENFARM_URL = "https://openfarmgroup.com/?utm_source=taquangkhoi.com";

/**
 * Entity registry. Add a record here and a matching `entities.<id>` block
 * in both locale catalogs to make `<EntityPreview entity="<id>">` available.
 */
export const entities = {
	openfarm: {
		type: "company",
		logo: {
			kind: "image",
			src: "https://openfarmgroup.com/images/brand/open-farm-logo-512.png",
		},
		statusTone: "live",
		target: { kind: "product", productId: "open-farm" },
		externalUrl: OPENFARM_URL,
	},
	"true-technology": {
		type: "experience",
		logo: { kind: "truetech" },
		statusTone: "past",
		target: { kind: "experience", hash: "truetech" },
	},
} as const satisfies Record<string, EntityRecord>;

export type EntityId = keyof typeof entities;
