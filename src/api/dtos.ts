export interface Ingredient {
    readonly id: string;
    readonly name: string;
}

export interface Recipe {
    readonly id: string;
    readonly name: string;
    readonly author_id: string;
    readonly ingredients: readonly Ingredient[];
    readonly author_name?: string;
}

export interface RecipeListItem {
    readonly id: string;
    readonly name: string;
    readonly author_id: string;
}

export interface RecipesResponse {
    readonly recipes: readonly RecipeListItem[];
}

// Input types for API operations
export interface CreateRecipeInput {
    readonly name: string;
    readonly author_name: string;
    readonly ingredients: readonly { readonly name: string }[];
}

export interface UpdateRecipeInput {
    readonly requester_name: string;
    readonly ingredients_to_add: readonly { readonly name: string }[];
}

export interface DeleteRecipeInput {
    readonly requester_id: string;
}

