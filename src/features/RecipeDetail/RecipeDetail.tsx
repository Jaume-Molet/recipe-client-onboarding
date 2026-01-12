import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Recipe } from "../../api/dtos";
import { getRecipe, deleteRecipe } from "../../api/client";
import { Spinner } from "../../suitcase/atoms/Spinner/Spinner";
import { Card } from "../../suitcase/atoms/Card/Card";
import { FormattedText } from "../../suitcase/atoms/FormattedText/FormattedText";
import { Flex } from "../../suitcase/atoms/Flex/Flex";
import { Box } from "../../suitcase/atoms/Box/Box";
import { Button } from "../../suitcase/atoms/Button/Button";
import { dt } from "../../suitcase/tokens";

export const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<boolean>(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const data = await getRecipe(id);
                setRecipe(data);
            } catch (err: any) {
                setError(`Failed to load recipe: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        if (!recipe) return;
        
        const confirmed = window.confirm(`Are you sure you want to delete "${recipe.name}"?`);
        if (!confirmed) return;

        try {
            setDeleting(true);
            await deleteRecipe(recipe.id, recipe.author_id);
            history.push('/');
        } catch (err: any) {
            setError(`Failed to delete recipe: ${err.message}`);
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <Flex>
                <Spinner />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex>
                <FormattedText>{error}</FormattedText>
            </Flex>
        );
    }

    if (!recipe) {
        return (
            <Flex>
                <FormattedText>Recipe not found</FormattedText>
            </Flex>
        );
    }

    return (
        <Box padding={dt.dimensions.spacing['3x']}>
            <Flex flexDirection="column" gap={dt.dimensions.spacing['3x']}>
                <Flex justifyContent="space-between" alignItems="center">
                    <FormattedText as="h1" fontSize={dt.fontSizes.lg}>
                        {recipe.name}
                    </FormattedText>
                    <Flex gap={dt.dimensions.spacing['2x']}>
                        <Button
                            variant="secondary"
                            onClick={() => history.push(`/recipes/${id}/edit`)}
                            disabled={deleting}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </Flex>
                </Flex>

                <Card padding={dt.dimensions.spacing['2x']} borderRadius={dt.dimensions.borderRadius.md}>
                    <Flex flexDirection="column" gap={dt.dimensions.spacing['2x']}>
                        <FormattedText>
                            <strong>Author ID:</strong> {recipe.author_id}
                        </FormattedText>
                        {recipe.author_name && (
                            <FormattedText>
                                <strong>Author:</strong> {recipe.author_name}
                            </FormattedText>
                        )}
                        <FormattedText>
                            <strong>Ingredients:</strong>
                        </FormattedText>
                        {recipe.ingredients.length > 0 ? (
                            <Flex flexDirection="column" gap={dt.dimensions.spacing['1x']}>
                                {recipe.ingredients.map((ingredient) => (
                                    <FormattedText key={ingredient.id}>
                                        • {ingredient.name}
                                    </FormattedText>
                                ))}
                            </Flex>
                        ) : (
                            <FormattedText color={dt.colors.text.secondary}>
                                No ingredients added yet.
                            </FormattedText>
                        )}
                    </Flex>
                </Card>
            </Flex>
        </Box>
    );
};
