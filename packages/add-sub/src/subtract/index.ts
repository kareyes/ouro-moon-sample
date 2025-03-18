import { Effect } from "effect";

export const subtract = (a: number) => (b: number): Effect.Effect<number> => Effect.succeed(a - b);