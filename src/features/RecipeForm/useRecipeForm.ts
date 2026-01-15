import { useState, useEffect, useRef } from "react";
import type { Recipe } from "../../api/dtos";

interface IngredientInput {
  name: string;
}

interface UseRecipeFormProps {
  isEditMode: boolean;
  recipeId?: string;
  onLoadingChange: (loading: boolean) => void;
  fetchRecipe: (id: string) => Promise<Recipe | null>;
}

interface UseRecipeFormReturn {
  name: string;
  authorName: string;
  ingredients: readonly IngredientInput[];
  setName: (value: string) => void;
  setAuthorName: (value: string) => void;
  handleAddIngredient: () => void;
  handleRemoveIngredient: (index: number) => void;
  handleIngredientChange: (index: number, value: string) => void;
  validateForm: () => { isValid: boolean; error: string | null; validIngredients: IngredientInput[] };
}

/**
 * useRecipeForm Hook
 *
 * Manages form state, validation, and ingredient handling for the recipe form.
 * Handles initialization of form data in edit mode.
 *
 * @param isEditMode - Whether the form is in edit mode
 * @param recipeId - The recipe ID when in edit mode
 * @param onLoadingChange - Callback for loading state changes
 * @param fetchRecipe - Function to fetch recipe data
 * @returns Form state and handlers
 */
export const useRecipeForm = ({
  isEditMode,
  recipeId,
  onLoadingChange,
  fetchRecipe,
}: UseRecipeFormProps): UseRecipeFormReturn => {
  const [name, setName] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [ingredients, setIngredients] = useState<readonly IngredientInput[]>([]);

  // Initialize form data in edit mode
  useEffect(() => {
    if (isEditMode && recipeId) {
      let isMounted = true;
      const loadRecipe = async () => {
        onLoadingChange(true);
        const recipe = await fetchRecipe(recipeId);
        if (isMounted && recipe) {
          setName(recipe.name);
          setAuthorName(recipe.author_name || "");
          setIngredients(recipe.ingredients.map((ing) => ({ name: ing.name })));
        }
        if (isMounted) {
          onLoadingChange(false);
        }
      };
      loadRecipe();
      return () => {
        isMounted = false;
      };
    } else {
      // Reset form when not in edit mode
      setName("");
      setAuthorName("");
      setIngredients([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, recipeId]); // fetchRecipe is stable (useCallback with no deps), onLoadingChange is intentionally excluded

  /**
   * Adds a new empty ingredient input field to the form.
   */
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "" }]);
  };

  /**
   * Removes an ingredient input field at the specified index.
   *
   * @param index - The index of the ingredient to remove
   */
  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  /**
   * Updates the name of an ingredient at the specified index.
   *
   * @param index - The index of the ingredient to update
   * @param value - The new name value for the ingredient
   */
  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = { name: value };
    setIngredients(updated);
  };

  /**
   * Validates the form fields and returns validation result.
   *
   * @returns Object with validation status, error message, and valid ingredients
   */
  const validateForm = (): { isValid: boolean; error: string | null; validIngredients: IngredientInput[] } => {
    if (!name.trim() || !authorName.trim()) {
      return {
        isValid: false,
        error: "Recipe name and author name are required",
        validIngredients: [],
      };
    }

    const validIngredients = ingredients.filter((ing) => ing.name.trim());
    if (validIngredients.length === 0) {
      return {
        isValid: false,
        error: "At least one ingredient is required",
        validIngredients: [],
      };
    }

    return {
      isValid: true,
      error: null,
      validIngredients,
    };
  };

  return {
    name,
    authorName,
    ingredients,
    setName,
    setAuthorName,
    handleAddIngredient,
    handleRemoveIngredient,
    handleIngredientChange,
    validateForm,
  };
};
