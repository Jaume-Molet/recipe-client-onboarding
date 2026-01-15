import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { Recipe, CreateRecipeInput, UpdateRecipeInput } from "../../api/dtos";
import { getRecipe, createRecipe, updateRecipe } from "../../api/client";

interface UseRecipeApiReturn {
  submitting: boolean;
  error: string | null;
  fetchRecipe: (id: string) => Promise<Recipe | null>;
  createRecipe: (input: CreateRecipeInput) => Promise<void>;
  updateRecipe: (id: string, input: UpdateRecipeInput) => Promise<void>;
  clearError: () => void;
}

/**
 * useRecipeApi Hook
 *
 * Manages API calls for recipe operations (fetch, create, update).
 * Handles loading states, error handling, and navigation after successful operations.
 *
 * @returns API functions and state management
 */
export const useRecipeApi = (): UseRecipeApiReturn => {
  const history = useHistory();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize fetchRecipe to avoid recreating it on every render
  // This prevents infinite loops in useEffect dependencies

  /**
   * Fetches a recipe by ID.
   * Used for initializing the form in edit mode.
   *
   * @param id - The recipe ID to fetch
   * @returns Promise resolving to the recipe or null on error
   */
  const fetchRecipe = useCallback(async (id: string): Promise<Recipe | null> => {
    try {
      const recipe = await getRecipe(id);
      return recipe;
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to load recipe: ${err.message}`);
      } else {
        setError(`Failed to load recipe: ${String(err)}`);
      }
      return null;
    }
  }, []);

  /**
   * Creates a new recipe.
   * Navigates to the recipe detail page on success.
   *
   * @param input - The recipe creation data
   */
  const handleCreateRecipe = async (input: CreateRecipeInput): Promise<void> => {
    try {
      setSubmitting(true);
      setError(null);
      const newRecipe = await createRecipe(input);
      history.push(`/recipes/${newRecipe.id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to create recipe: ${err.message}`);
      } else {
        setError(`Failed to create recipe: ${String(err)}`);
      }
      setSubmitting(false);
    }
  };

  /**
   * Updates an existing recipe by adding ingredients.
   * Navigates to the recipe detail page on success.
   *
   * @param id - The recipe ID to update
   * @param input - The update data
   */
  const handleUpdateRecipe = async (id: string, input: UpdateRecipeInput): Promise<void> => {
    try {
      setSubmitting(true);
      setError(null);
      await updateRecipe(id, input);
      history.push(`/recipes/${id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to update recipe: ${err.message}`);
      } else {
        setError(`Failed to update recipe: ${String(err)}`);
      }
      setSubmitting(false);
    }
  };

  /**
   * Clears the current error state.
   */
  const clearError = () => {
    setError(null);
  };

  return {
    submitting,
    error,
    fetchRecipe,
    createRecipe: handleCreateRecipe,
    updateRecipe: handleUpdateRecipe,
    clearError,
  };
};
