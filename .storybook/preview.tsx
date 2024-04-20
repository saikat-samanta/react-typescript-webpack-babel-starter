import React from "react";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";
import { DocsContainer, type DocsContainerProps } from "@storybook/blocks";
import { BrowserRouter } from "react-router-dom";
import type { Preview } from "@storybook/react";

const MyDocsContainer: React.FC<React.PropsWithChildren<DocsContainerProps>> = ({
  children,
  ...props
}) => {
  const darkMode = useDarkMode();

  return (
    <DocsContainer
      {...props}
      theme={
        darkMode
          ? {
              ...themes.dark,
              appContentBg: "transparent",
            }
          : {
              ...themes.light,
              appContentBg: "transparent",
            }
      }
    >
      {children}
    </DocsContainer>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: (props) => (
        <BrowserRouter>
          <MyDocsContainer {...props} />
        </BrowserRouter>
      ),
    },
  },
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      );
    },
  ],
};

export default preview;
