import { ObjectType, Field, Int } from "type-graphql";
import { ObjectId } from "mongodb";
import {
	prop,
	arrayProp,
	index,
	pre,
	getModelForClass,
	Ref,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "./User";
import { RecipeStep } from "./RecipeStep";
import { RecipeIngredient } from "./RecipeIngredient";
import { NutritionalInfo } from "./NutritionalInfo";
import { RecipeCategory } from "./RecipeCategory";
import { updateNutritionalInfo, uniqueIngredients } from "../lib/hooks";

@index({ userId: 1, title: 1 }, { unique: true })
@pre("validate", uniqueIngredients)
@pre("save", updateNutritionalInfo)
@ObjectType({ description: "The Recipe model" })
export class Recipe extends TimeStamps {
	_id?: ObjectId;

	@Field()
	@prop({ required: true })
	title!: string;

	@Field((_type) => Int)
	@prop({ required: true })
	time!: number;

	@Field((_type) => Int)
	@prop({ required: true })
	servings!: number;

	@Field((_type) => String)
	@prop({ ref: "RecipeCategory", required: true })
	categoryId!: Ref<RecipeCategory>;

	@Field((_type) => RecipeStep)
	@arrayProp({ items: RecipeStep, default: [] })
	steps!: RecipeStep[];

	@Field((_type) => RecipeIngredient)
	@arrayProp({ items: RecipeIngredient, default: [] })
	ingredients!: RecipeIngredient[];

	@Field((_type) => NutritionalInfo, { nullable: true })
	@prop({ type: NutritionalInfo, _id: false })
	nutritionalInfo?: NutritionalInfo;

	@Field((_type) => String)
	@prop({ ref: "User", required: true })
	userId!: Ref<User>;

	@prop({ default: false })
	active!: boolean;

	@Field()
	createdAt!: Date;

	@Field()
	updatedAt!: Date;
}

export const RecipeModel = getModelForClass(Recipe);
