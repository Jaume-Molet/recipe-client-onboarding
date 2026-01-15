import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createRecipe, updateRecipe } from "../../api/client";
import { FormattedText } from "../../suitcase/atoms/FormattedText/FormattedText";
import { Flex } from "../../suitcase/atoms/Flex/Flex";
import { LoadingState } from "../../components/LoadingState";
import { Box } from "../../suitcase/atoms/Box/Box";
import { Button } from "../../suitcase/atoms/Button/Button";
import { TextInput } from "../../suitcase/atoms/TextInput/TextInput";
import { dt } from "../../suitcase/tokens";
import { useRecipeForm } from "./useRecipeForm";

/**
 * RecipeForm Component
 *
 * Handles both creating new recipes and editing existing recipes.
 *
 * Note: In edit mode, only ingredients can be added. The recipe name cannot be changed
 * as the backend API only supports adding ingredients to existing recipes.
 * The author name field is used as the requester name for authorization.
 */
export const RecipeForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const isEditMode = !!id;

  const [loading, setLoading] = useState<boolean>(isEditMode);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    name,
    authorName,
    ingredients,
    setName,
    setAuthorName,
    handleAddIngredient,
    handleRemoveIngredient,
    handleIngredientChange,
    validateForm,
  } = useRecipeForm({
    isEditMode,
    recipeId: id,
    onError: setError,
    onLoadingChange: setLoading,
  });

  /**
   * Handles form submission for both create and edit modes.
   * Validates required fields and ingredients, then calls the appropriate API.
   *
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.error || "Validation failed");
      return;
    }

    try {
      setSubmitting(true);
      if (isEditMode && id) {
        // Edit mode: add ingredients to existing recipe
        // Note: The backend API only supports adding ingredients, not updating recipe name or removing ingredients
        await updateRecipe(id, {
          requester_name: authorName.trim(),
          ingredients_to_add: validation.validIngredients,
        });
        history.push(`/recipes/${id}`);
      } else {
        // Create mode: create new recipe
        const newRecipe = await createRecipe({
          name: name.trim(),
          author_name: authorName.trim(),
          ingredients: validation.validIngredients,
        });
        history.push(`/recipes/${newRecipe.id}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(
          `Failed to ${isEditMode ? "update" : "create"} recipe: ${err.message}`
        );
      } else {
        setError(
          `Failed to ${isEditMode ? "update" : "create"} recipe: ${String(err)}`
        );
      }
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Box padding={dt.dimensions.spacing["3x"]}>
      <Flex flexDirection="column" gap={dt.dimensions.spacing["3x"]}>
        <Flex justifyContent="space-between" alignItems="center">
          <FormattedText as="h1" fontSize={dt.fontSizes.lg}>
            {isEditMode ? "Edit Recipe" : "Create New Recipe"}
          </FormattedText>
          <Button
            variant="secondary"
            onClick={() => history.push("/")}
            disabled={submitting}
          >
            Back to Recipes
          </Button>
        </Flex>

        {error && (
          <FormattedText color={dt.colors.text.error}>{error}</FormattedText>
        )}

        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column" gap={dt.dimensions.spacing["2x"]}>
            <Flex flexDirection="column" gap={dt.dimensions.spacing["1x"]}>
              <FormattedText
                as="label"
                fontSize={dt.fontSizes.md}
                htmlFor="recipe-name"
              >
                Recipe Name
              </FormattedText>
              <TextInput
                id="recipe-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting || isEditMode}
                required
              />
            </Flex>

            <Flex flexDirection="column" gap={dt.dimensions.spacing["1x"]}>
              <FormattedText
                as="label"
                fontSize={dt.fontSizes.md}
                htmlFor="author-name"
              >
                {isEditMode ? "Your Name (Requester)" : "Author Name"}
              </FormattedText>
              <TextInput
                id="author-name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                disabled={submitting}
                required
                placeholder={isEditMode ? "Enter your name to add ingredients" : "Enter your name"}
              />
              {isEditMode && (
                <FormattedText color={dt.colors.text.secondary} fontSize={dt.fontSizes.sm}>
                  You must enter your name to add ingredients to this recipe.
                </FormattedText>
              )}
            </Flex>

            <Flex flexDirection="column" gap={dt.dimensions.spacing["1x"]}>
              <Flex justifyContent="space-between" alignItems="center">
                <FormattedText as="label" fontSize={dt.fontSizes.md}>
                  Ingredients
                </FormattedText>
                <Button
                  variant="secondary"
                  onClick={handleAddIngredient}
                  disabled={submitting}
                >
                  Add Ingredient
                </Button>
              </Flex>
              <Flex flexDirection="column" gap={dt.dimensions.spacing["1x"]}>
                {ingredients.map((ingredient, index) => (
                  <Flex
                    key={index}
                    gap={dt.dimensions.spacing["1x"]}
                    alignItems="center"
                  >
                    <TextInput
                      value={ingredient.name}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      disabled={submitting}
                      placeholder="Ingredient name"
                    />
                    <Button
                      variant="secondary"
                      onClick={() => handleRemoveIngredient(index)}
                      disabled={submitting}
                    >
                      Remove
                    </Button>
                  </Flex>
                ))}
                {ingredients.length === 0 && (
                  <FormattedText color={dt.colors.text.secondary}>
                    No ingredients added. Click "Add Ingredient" to add one.
                  </FormattedText>
                )}
              </Flex>
            </Flex>

            <Flex gap={dt.dimensions.spacing["2x"]}>
              <Button submit variant="primary" disabled={submitting}>
                {submitting
                  ? "Saving..."
                  : isEditMode
                  ? "Update Recipe"
                  : "Create Recipe"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => history.goBack()}
                disabled={submitting}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
