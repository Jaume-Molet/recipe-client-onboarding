import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Recipe } from "../../api/dtos";
import { getRecipe, createRecipe, updateRecipe } from "../../api/client";
import { Spinner } from "../../suitcase/atoms/Spinner/Spinner";
import { FormattedText } from "../../suitcase/atoms/FormattedText/FormattedText";
import { Flex } from "../../suitcase/atoms/Flex/Flex";
import { Box } from "../../suitcase/atoms/Box/Box";
import { Button } from "../../suitcase/atoms/Button/Button";
import { TextInput } from "../../suitcase/atoms/TextInput/TextInput";
import { dt } from "../../suitcase/tokens";

interface IngredientInput {
    name: string;
}

/**
 * RecipeForm Component
 * 
 * Handles both creating new recipes and editing existing recipes.
 * 
 * Note: In edit mode, only ingredients can be added. The recipe name and author_id
 * cannot be changed as the backend API only supports adding ingredients to existing recipes.
 */
export const RecipeForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const history = useHistory();
    const isEditMode = !!id;

    const [name, setName] = useState<string>("");
    const [authorId, setAuthorId] = useState<string>("");
    const [ingredients, setIngredients] = useState<readonly IngredientInput[]>([]);
    const [loading, setLoading] = useState<boolean>(isEditMode);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditMode && id) {
            const fetchRecipe = async () => {
                try {
                    setLoading(true);
                    const recipe: Recipe = await getRecipe(id);
                    setName(recipe.name);
                    setAuthorId(recipe.author_id);
                    setIngredients(recipe.ingredients.map(ing => ({ name: ing.name })));
                } catch (err: any) {
                    setError(`Failed to load recipe: ${err.message}`);
                } finally {
                    setLoading(false);
                }
            };
            fetchRecipe();
        }
    }, [id, isEditMode]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: "" }]);
    };

    const handleRemoveIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleIngredientChange = (index: number, value: string) => {
        const updated = [...ingredients];
        updated[index] = { name: value };
        setIngredients(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim() || !authorId.trim()) {
            setError("Recipe name and author ID are required");
            return;
        }

        const validIngredients = ingredients.filter(ing => ing.name.trim());
        if (validIngredients.length === 0) {
            setError("At least one ingredient is required");
            return;
        }

        try {
            setSubmitting(true);
            if (isEditMode && id) {
                // Edit mode: add ingredients to existing recipe
                // Note: The backend API only supports adding ingredients, not updating recipe name or removing ingredients
                await updateRecipe(id, {
                    requester_id: authorId,
                    ingredients_to_add: validIngredients,
                });
                history.push(`/recipes/${id}`);
            } else {
                // Create mode: create new recipe
                const newRecipe = await createRecipe({
                    name: name.trim(),
                    author_id: authorId.trim(),
                    ingredients: validIngredients,
                });
                history.push(`/recipes/${newRecipe.id}`);
            }
        } catch (err: any) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} recipe: ${err.message}`);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Flex>
                <Spinner />
            </Flex>
        );
    }

    return (
        <Box padding={dt.dimensions.spacing['3x']}>
            <Flex flexDirection="column" gap={dt.dimensions.spacing['3x']}>
                <FormattedText as="h1" fontSize={dt.fontSizes.lg}>
                    {isEditMode ? 'Edit Recipe' : 'Create New Recipe'}
                </FormattedText>

                {error && (
                    <FormattedText color={dt.colors.text.error}>
                        {error}
                    </FormattedText>
                )}

                <form onSubmit={handleSubmit}>
                    <Flex flexDirection="column" gap={dt.dimensions.spacing['2x']}>
                        <Flex flexDirection="column" gap={dt.dimensions.spacing['1x']}>
                            <FormattedText as="label" fontSize={dt.fontSizes.md}>
                                Recipe Name
                            </FormattedText>
                            <TextInput
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={submitting || isEditMode}
                                required
                            />
                        </Flex>

                        <Flex flexDirection="column" gap={dt.dimensions.spacing['1x']}>
                            <FormattedText as="label" fontSize={dt.fontSizes.md}>
                                Author ID (UUID)
                            </FormattedText>
                            <TextInput
                                value={authorId}
                                onChange={(e) => setAuthorId(e.target.value)}
                                disabled={submitting || isEditMode}
                                required
                            />
                        </Flex>

                        <Flex flexDirection="column" gap={dt.dimensions.spacing['1x']}>
                            <Flex justifyContent="space-between" alignItems="center">
                                <FormattedText as="label" fontSize={dt.fontSizes.md}>
                                    Ingredients
                                </FormattedText>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleAddIngredient}
                                    disabled={submitting}
                                >
                                    Add Ingredient
                                </Button>
                            </Flex>
                            <Flex flexDirection="column" gap={dt.dimensions.spacing['1x']}>
                                {ingredients.map((ingredient, index) => (
                                    <Flex key={index} gap={dt.dimensions.spacing['1x']} alignItems="center">
                                        <TextInput
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            disabled={submitting}
                                            placeholder="Ingredient name"
                                        />
                                        <Button
                                            type="button"
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

                        <Flex gap={dt.dimensions.spacing['2x']}>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={submitting}
                            >
                                {submitting ? 'Saving...' : (isEditMode ? 'Update Recipe' : 'Create Recipe')}
                            </Button>
                            <Button
                                type="button"
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
