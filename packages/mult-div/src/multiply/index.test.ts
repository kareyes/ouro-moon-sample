import { describe, it, expect } from "@effect/vitest";
import { multiply } from "./index.js";
import { Effect, pipe } from "effect";

describe("multiply tests", () => {
	it.effect("multiplies two numbers", () =>
		pipe(
			multiply(2)(3),
			Effect.map((result) => expect(result).toBe(6)),
		),
	);
});
