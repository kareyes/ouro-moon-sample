import { Effect, pipe } from "effect";
import { calculate } from "./calculator/index.js";
import {
	getNumberPromise,
	getOperationPromise,
	getShouldContinuePromise,
	pickValue,
} from "./prompts/index.js";

const calculationCycle = pipe(
	getNumberPromise("Enter first number:"),
	Effect.map(pickValue<number>),
	Effect.flatMap((num1) =>
		pipe(
			getNumberPromise("Enter second number:"),
			Effect.map(pickValue<number>),
			Effect.map((num2) => ({ num1, num2 })),
		),
	),
	Effect.flatMap(({ num1, num2 }) =>
		pipe(
			getOperationPromise("Select operation:"),
			Effect.map(({ operationChoice }) => ({ num1, num2, operationChoice })),
		),
	),
	Effect.flatMap(({ operationChoice, num1, num2 }) =>
		calculate(num1, num2, operationChoice),
	),
	Effect.catchAll((error) => {
		console.error(`Error: ${error.message}`);
		return Effect.succeed(Number.NaN);
	}),
	Effect.flatMap((result) => {
		console.log(`Result: ${result}`);
		return getShouldContinuePromise(
			"Press x to exit or any other key to continue:",
		);
	}),
	Effect.map((result) => result.shouldContinue.toLowerCase() !== "x"),
	Effect.tap((shouldContinue) =>
		Effect.sync(() => {
			if (shouldContinue) {
				console.log("\n--- New Calculation ---\n");
			}
		}),
	),
);

const program = pipe(
	calculationCycle,
	Effect.repeat({
		while: (shouldContinue) => shouldContinue,
	}),
);

// Run the program
Effect.runPromise(program).catch((error) => console.error("Error:", error));
