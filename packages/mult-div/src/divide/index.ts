import { Effect } from "effect";

export class DivisionByZeroError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DivisionByZeroError";
	}
}

/**
 * Divide two numbers
 * @param a - The dividend
 * @param b - The divisor
 */
export const divide =
	(a: number) =>
	(b: number): Effect.Effect<number, DivisionByZeroError> =>
		b === 0
			? Effect.fail(new DivisionByZeroError("Division by zero"))
			: Effect.succeed(a / b);
