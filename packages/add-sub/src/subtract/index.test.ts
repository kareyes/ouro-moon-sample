import { describe, it, expect } from "@effect/vitest";
import { subtract } from "./index.js";
import { Effect, pipe } from "effect";

describe("subtract tests", () => {
    it.effect("subtracts two numbers", () => 
        pipe(
            subtract(1)(2),
            Effect.map(result => expect(result).toBe(-1))
        )
    )
})