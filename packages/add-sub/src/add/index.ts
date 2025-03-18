import { Effect } from "effect";

/**
 * Add two numbers together
 * @param a - The first number
 * @param b - The second number
 * @returns The sum of the two numbers
 */
export const add = (a: number) => (b: number): Effect.Effect<number> => Effect.succeed(a + b);
