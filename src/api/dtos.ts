export interface Ingredient {
    readonly id: string;
    readonly name: string;
}

export interface Recipe {
    readonly id: string;
    readonly name: string;
    readonly author_id: string;
    readonly ingredients: readonly Ingredient[];
}