import { Effect, pipe } from "effect";
import { type Pet, PetsDB, PetsDBImplementation } from "@ouro/pets-db";

const printPet = (pet: Pet) => {
	console.log(pet);
};

const petProgram = pipe(
	PetsDB,
	Effect.flatMap((petsDB) => petsDB.getPet("1")),
	Effect.map(printPet),
);

const runnable = pipe(
	petProgram,
	Effect.provideService(PetsDB, PetsDBImplementation),
);

Effect.runSync(runnable);
