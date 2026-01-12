import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { RecipeListItem } from "../api/dtos";
import { getRecipes } from "../api/client";
import { Spinner } from "../suitcase/atoms/Spinner/Spinner";
import { Card } from "../suitcase/atoms/Card/Card";
import { FormattedText } from "../suitcase/atoms/FormattedText/FormattedText";
import { Flex } from "../suitcase/atoms/Flex/Flex";
import { Box } from "../suitcase/atoms/Box/Box";
import { Button } from "../suitcase/atoms/Button/Button";
import { dt } from "../suitcase/tokens";

export const RecipeList: React.FC = () => {
    const history = useHistory();
    const [recipes, setRecipes] = useState<readonly RecipeListItem[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const data = await getRecipes();
                setRecipes(data);
            } catch (err: any) {
                setError(`Failed to load recipes: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return(
            <Flex>
                <Spinner />
            </Flex>
        );
    }

    if (error) {
        return(
            <Flex>
                <FormattedText>{error}</FormattedText>
            </Flex>
        );
    }

    return (
    <Box padding={dt.dimensions.spacing['3x']}>
      <Flex justifyContent="space-between" alignItems="center" marginBottom={dt.dimensions.spacing['3x']}>
        <FormattedText as="h1" fontSize={dt.fontSizes.lg}>
          Recipes
        </FormattedText>
        <Button
          variant="primary"
          onClick={() => history.push('/recipes/new')}
        >
          Create New Recipe
        </Button>
      </Flex>

      <Flex flexDirection="column" gap={dt.dimensions.spacing['2x']}>
        {recipes.map((recipe) => (
          <Link
            to={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="link-unstyled"
          >
            <Card padding={dt.dimensions.spacing['2x']} borderRadius={dt.dimensions.borderRadius.md}>
              <FormattedText as="h2" fontSize={dt.fontSizes.md} color={dt.colors.text.primary}>
                {recipe.name}
              </FormattedText>
            </Card>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}


