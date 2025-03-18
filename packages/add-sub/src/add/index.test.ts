import { describe, it, expect } from "@effect/vitest";
import { add } from "./index.js";
import { Effect, pipe } from "effect";

describe("add tests", () => {
    it.effect("adds two numbers", () => 
        pipe(
            add(1)(2),
            Effect.map(result => expect(result).toBe(3))
        )
    )
})

