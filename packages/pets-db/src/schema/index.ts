import { Schema } from "effect";

export const CatSchema = Schema.Struct({
	id: Schema.Number,
	name: Schema.String,
	age: Schema.Number,
	meowSound: Schema.String,
});

export const DogSchema = Schema.Struct({
	id: Schema.Number,
	name: Schema.String,
	age: Schema.Number,
	barkSound: Schema.String,
});

export const PetSchema = Schema.Union(CatSchema, DogSchema);

export type Cat = Schema.Schema.Type<typeof CatSchema>;
export type Dog = Schema.Schema.Type<typeof DogSchema>;
export type Pet = Schema.Schema.Type<typeof PetSchema>;
