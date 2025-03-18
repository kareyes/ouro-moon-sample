import { Effect } from "effect";

/**
 * Multiply two numbers together
 * @param a - The first number
 * @param b - The second number
 * @returns The product of the two numbers
 */
export const multiply =
	(a: number) =>
	(b: number): Effect.Effect<number> =>
		Effect.succeed(a * b);
