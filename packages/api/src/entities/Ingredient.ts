import { ObjectType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
import { prop, arrayProp, getModelForClass, Ref } from "@typegoose/typegoose";
import { NutritionalInfo } from "./NutritionalInfo";
import { IFoodItem } from "./IFoodItem";
import { Recipe } from "./Recipe";

@ObjectType({ implements: IFoodItem, description: "The bedca Food Item Info" })
export class Ingredient {
	_id?: ObjectId;

	@prop({ required: true, unique: true })
	externalId!: string;

	@prop({ required: true })
	name!: string;

	@Field((_type) => NutritionalInfo)
	@prop({ required: true, _id: false })
	nutritionalInfo!: NutritionalInfo;

	@Field((_type) => [Recipe])
	@arrayProp({ ref: "Recipe", required: true, default: [] })
	recipes!: Ref<Recipe>[];
}

export const IngredientModel = getModelForClass(Ingredient);
