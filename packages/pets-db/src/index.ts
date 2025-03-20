import { Effect, Context } from "effect";
import { DatabaseSync } from "node:sqlite";
import type { Pet } from "./schema/index.js";

export * from "./schema/index.js";

const db = new DatabaseSync("pets.db");

// db.prepare(
// 	"CREATE TABLE IF NOT EXISTS pets (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, meowSound TEXT, barkSound TEXT)",
// ).run();

// db.prepare(
// 	"INSERT INTO pets (id, name, age, meowSound, barkSound) VALUES (?, ?, ?, ?, ?)",
// ).run(1, "Catto", 3, "Meow", "");

// db.prepare(
// 	"INSERT INTO pets (id, name, age, meowSound, barkSound) VALUES (?, ?, ?, ?, ?)",
// ).run(2, "Doggo", 5, "", "Woof");

type PetsDB = {
	readonly getPet: (id: string) => Effect.Effect<Pet>;
};

export const PetsDB = Context.Tag("PetsDB")<PetsDB, PetsDB>();

const getPet = (id: string) =>
	Effect.sync(() => {
		const petObj = db.prepare("SELECT * FROM pets WHERE id = ?").get(id) as {
			id: number;
			name: string;
			age: number;
		};
		return petObj as Pet;
	});

export const PetsDBImplementation = {
	getPet,
};
