import { describe, it, expect } from "@effect/vitest";
import { divide, DivisionByZeroError } from "./index.js";
import { Effect, pipe } from "effect";

describe("divide tests", () => {
	it.effect("divides two numbers", () =>
		pipe(
			divide(10)(2),
			Effect.map((result) => expect(result).toBe(5)),
		),
	);
});

it.effect("handles division by zero", () =>
	pipe(
		divide(10)(0),
		Effect.catchAll((error) =>
			Effect.succeed(expect(error).toBeInstanceOf(DivisionByZeroError)),
		),
	),
);
