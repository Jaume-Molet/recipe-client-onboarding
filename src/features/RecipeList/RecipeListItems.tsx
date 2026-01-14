import React from "react";
import { Link } from "react-router-dom";
import type { RecipeListItem } from "../../api/dtos";
import { Card } from "../../suitcase/atoms/Card/Card";
import { FormattedText } from "../../suitcase/atoms/FormattedText/FormattedText";
import { Flex } from "../../suitcase/atoms/Flex/Flex";
import { dt } from "../../suitcase/tokens";

interface RecipeListItemsProps {
  recipes: readonly RecipeListItem[];
}

/**
 * RecipeListItems Component
 *
 * Renders a list of recipe items as clickable cards.
 * Each card links to the recipe detail page.
 *
 * @param recipes - Array of recipe list items to display
 * @returns {JSX.Element} A flex container with recipe cards
 */
export const RecipeListItems: React.FC<RecipeListItemsProps> = ({ recipes }) => {
  return (
    <Flex flexDirection="column" gap={dt.dimensions.spacing["2x"]}>
      {recipes.map((recipe) => (
        <Link
          to={`/recipes/${recipe.id}`}
          key={recipe.id}
          className="link-unstyled"
        >
          <Card
            padding={dt.dimensions.spacing["2x"]}
            borderRadius={dt.dimensions.borderRadius.md}
          >
            <FormattedText
              as="h2"
              fontSize={dt.fontSizes.md}
              color="#ffffff"
            >
              {recipe.name}
            </FormattedText>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};
