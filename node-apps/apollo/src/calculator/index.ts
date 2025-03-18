import { add, subtract } from "@ouro/add-sub";
import { multiply, divide } from "@ouro/mult-div";
import { Effect } from "effect";

export type OperationType = "add" | "subtract" | "multiply" | "divide";
export type Operation = (
	a: number,
) => (b: number) => Effect.Effect<number, OperationError>;

export class OperationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "OperationError";
	}
}

const OperationStrategy: Record<OperationType, Operation> = {
	add: add,
	subtract: subtract,
	multiply: multiply,
	divide: divide,
};

const validOperations = Object.keys(OperationStrategy) as OperationType[];

export const calculate = (
	a: number,
	b: number,
	operation: OperationType,
): Effect.Effect<number, OperationError> =>
	validOperations.includes(operation)
		? OperationStrategy[operation](a)(b)
		: Effect.fail(new OperationError("Invalid operation"));
