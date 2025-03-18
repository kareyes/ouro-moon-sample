import { describe, it, expect } from "@effect/vitest";
import { calculate, OperationError } from "./index.js";
import { Effect, pipe } from "effect";

describe("calculator", () => {
	it.effect("adds two numbers", () =>
		pipe(
			calculate(1, 2, "add"),
			Effect.map((result) => expect(result).toBe(3)),
		),
	);

	it.effect("subtracts two numbers", () =>
		pipe(
			calculate(1, 2, "subtract"),
			Effect.map((result) => expect(result).toBe(-1)),
		),
	);

	it.effect("fails if the operation is invalid", () =>
		pipe(
			// @ts-expect-error
			calculate(1, 2, "invalid"),
			Effect.catchAll((error) =>
				Effect.succeed(expect(error).toBeInstanceOf(OperationError)),
			),
		),
	);
});
