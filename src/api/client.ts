import type {
  RecipesResponse,
  Recipe,
  RecipeListItem,
  CreateRecipeInput,
  UpdateRecipeInput,
} from "./dtos";

const BASE_URL = "/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json();
}

export async function getRecipes(): Promise<readonly RecipeListItem[]> {
  const response = await fetch(`${BASE_URL}/recipes`);
  const data: RecipesResponse = await handleResponse<RecipesResponse>(response);
  return data.recipes;
}

export async function getRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes/${id}`);
  return handleResponse<Recipe>(response);
}

export async function createRecipe(input: CreateRecipeInput): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.name,
      author_name: input.author_name,
      ingredients: input.ingredients,
    }),
  });
  return handleResponse<Recipe>(response);
}

export async function updateRecipe(
  id: string,
  input: UpdateRecipeInput
): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requester_name: input.requester_name,
      ingredients_to_add: input.ingredients_to_add,
    }),
  });
  return handleResponse<Recipe>(response);
}

export async function deleteRecipe(
  id: string,
  requesterName: string
): Promise<void> {
  const response = await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requester_name: requesterName,
    }),
  });
  await handleResponse<void>(response);
}
