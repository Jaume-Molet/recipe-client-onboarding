import React from "react";
import { Flex } from "../suitcase/atoms/Flex/Flex";
import { Spinner } from "../suitcase/atoms/Spinner/Spinner";

/**
 * LoadingState Component
 *
 * A reusable component that displays a loading spinner.
 * Used consistently across the application for loading states.
 *
 * @returns {JSX.Element} A flex container with a spinner
 */
export const LoadingState: React.FC = () => {
  return (
    <Flex>
      <Spinner />
    </Flex>
  );
};
