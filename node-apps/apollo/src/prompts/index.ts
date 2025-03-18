import { Effect } from "effect";
import inquirer from "inquirer";

import type { OperationType } from "../calculator/index.js";

export const getNumberPromise = (prompt: string) =>
	Effect.promise(() =>
		inquirer.prompt<{ value: number }>([
			{
				type: "number",
				name: "value",
				message: prompt,
			},
		]),
	);

export const getShouldContinuePromise = (prompt: string) =>
	Effect.promise(() =>
		inquirer.prompt<{ shouldContinue: string }>([
			{
				type: "input",
				name: "shouldContinue",
				message: prompt,
			},
		]),
	);

export const getOperationPromise = (prompt: string) =>
	Effect.promise(() =>
		inquirer.prompt<{ operationChoice: OperationType }>([
			{
				type: "list",
				name: "operationChoice",
				message: prompt,
				choices: ["add", "subtract", "multiply", "divide"],
			},
		]),
	);

export const pickValue = <T>({ value }: { value: T }) => value;
