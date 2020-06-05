import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { RecipeCategory } from "../entities/RecipeCategory";
import { Recipe } from "../entities/Recipe";
import { RecipeStepInput } from "./RecipeStepInput";
import { RecipeIngredientInput } from "./RecipeIngredientInput";
import { Ref } from "@typegoose/typegoose";

@InputType()
export class CreateAllRecipeInput
	implements Partial<Omit<Recipe, "ingredients">> {
	@Field()
	@Length(1, 255)
	title!: string;

	@Field()
	time!: number;

	@Field((_type) => String)
	categoryId!: Ref<RecipeCategory>;

	@Field((_type) => RecipeStepInput)
	steps!: RecipeStepInput[];

	@Field((_type) => RecipeIngredientInput)
	ingredients!: RecipeIngredientInput[];
}

@InputType()
export class CreateRecipeInput implements Partial<Recipe> {
	@Field()
	@Length(1, 255)
	title!: string;

	@Field()
	time!: number;

	@Field()
	servings!: number;

	@Field((_type) => String)
	categoryId!: Ref<RecipeCategory>;
}
