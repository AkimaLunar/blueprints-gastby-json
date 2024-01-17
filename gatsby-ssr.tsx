import { SSRProvider } from "@fluentui/react-utilities";
import { GatsbySSR } from "gatsby";
import {
  createDOMRenderer,
  RendererProvider,
  renderToStyleElements,
} from "@griffel/react";
import * as React from "react";
import { renderToString } from "react-dom/server";

import { Shell } from "./src/components/shell";
import { Theme } from "./src/components/theme";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  const renderer = createDOMRenderer();

  return (
    <RendererProvider renderer={renderer}>
      <Theme>{element}</Theme>
    </RendererProvider>
  );
};

// TODO: This is not working, but it should be
//
// export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({
//   element,
//   props,
// }) => <Shell {...props}>{element}</Shell>;

export const replaceRenderer: GatsbySSR["replaceRenderer"] = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const renderer = createDOMRenderer();

  const bodyHTML = renderToString(
    <RendererProvider renderer={renderer}>
      <SSRProvider>{bodyComponent}</SSRProvider>
    </RendererProvider>,
  );
  const styleElements = renderToStyleElements(renderer);

  replaceBodyHTMLString(bodyHTML);
  setHeadComponents(styleElements);
};
