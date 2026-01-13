import type {
  RecipesResponse,
  Recipe,
  RecipeListItem,
  CreateRecipeInput,
  UpdateRecipeInput,
} from "./dtos";

const BASE_URL = "/api";

/**
 * Handles HTTP response, throwing an error if the response is not OK.
 * Returns the JSON response body or undefined for 204 No Content responses.
 *
 * @template T - The expected response type
 * @param response - The fetch Response object
 * @returns The parsed JSON response or undefined for 204 responses
 * @throws {Error} If the response status is not OK
 */
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

/**
 * Fetches all recipes from the API.
 *
 * @returns Promise resolving to a readonly array of recipe list items
 * @throws {Error} If the API request fails
 */
export async function getRecipes(): Promise<readonly RecipeListItem[]> {
  const response = await fetch(`${BASE_URL}/recipes`);
  const data: RecipesResponse = await handleResponse<RecipesResponse>(response);
  return data.recipes;
}

/**
 * Fetches a single recipe by its ID.
 *
 * @param id - The unique identifier of the recipe
 * @returns Promise resolving to the recipe data
 * @throws {Error} If the API request fails or recipe is not found
 */
export async function getRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes/${id}`);
  return handleResponse<Recipe>(response);
}

/**
 * Creates a new recipe via the API.
 *
 * @param input - The recipe creation data (name, author_name, ingredients)
 * @returns Promise resolving to the created recipe data
 * @throws {Error} If the API request fails or validation errors occur
 */
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

/**
 * Updates an existing recipe by adding new ingredients.
 *
 * @param id - The unique identifier of the recipe to update
 * @param input - The update data (requester_name, ingredients_to_add)
 * @returns Promise resolving to the updated recipe data
 * @throws {Error} If the API request fails, user is not authorized, or validation errors occur
 */
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

/**
 * Deletes a recipe by its ID.
 *
 * @param id - The unique identifier of the recipe to delete
 * @param requesterName - The name of the user requesting the deletion (for authorization)
 * @returns Promise resolving to void on success
 * @throws {Error} If the API request fails, user is not authorized, or recipe is not found
 */
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
