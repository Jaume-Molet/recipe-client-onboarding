import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { RecipeListItem } from "../api/dtos";
import { getRecipes } from "../api/client";
import { LoadingState } from "../components/LoadingState";
import { FormattedText } from "../suitcase/atoms/FormattedText/FormattedText";
import { Flex } from "../suitcase/atoms/Flex/Flex";
import { Box } from "../suitcase/atoms/Box/Box";
import { Button } from "../suitcase/atoms/Button/Button";
import { dt } from "../suitcase/tokens";
import { RecipeListItems } from "./RecipeList/RecipeListItems";

/**
 * RecipeList Component
 *
 * Displays a list of all recipes with the ability to navigate to individual recipes
 * or create a new recipe. Handles loading states and error handling.
 *
 * @returns {JSX.Element} The recipe list view
 */
export const RecipeList: React.FC = () => {
  const history = useHistory();
  const [recipes, setRecipes] = useState<readonly RecipeListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to load recipes: ${err.message}`);
        } else {
          setError(`Failed to load recipes: ${String(err)}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <Box padding={dt.dimensions.spacing["3x"]}>
        <LoadingState />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={dt.dimensions.spacing["3x"]}>
        <Flex flexDirection="column" gap={dt.dimensions.spacing["2x"]}>
          <FormattedText as="h1" fontSize={dt.fontSizes.lg}>
            Error
          </FormattedText>
          <FormattedText color={dt.colors.text.error || "#ff0000"}>
            {error}
          </FormattedText>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Box padding={dt.dimensions.spacing["3x"]}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom={dt.dimensions.spacing["3x"]}
      >
        <FormattedText as="h1" fontSize={dt.fontSizes.lg}>
          Recipes
        </FormattedText>
        <Button variant="primary" onClick={() => history.push("/recipes/new")}>
          Create New Recipe
        </Button>
      </Flex>

      <RecipeListItems recipes={recipes} />
    </Box>
  );
};
