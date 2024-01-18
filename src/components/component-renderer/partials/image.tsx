import { tokens } from "@fluentui/react-theme";
import { makeStyles, shorthands } from "@griffel/react";
import { Text } from "@microsoft/arbutus.text";
import type { FC } from "react";
import * as React from "react";

import { Image } from "../../image";
import type { ImageProps } from "../../image";
import type { ImageComponentData } from "../component-renderer.types";

type ImageComponentProps = ImageComponentData;

const useImageComponentStyles = makeStyles({
  figure: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    display: "grid",
    rowGap: tokens.spacingVerticalL,
    "& img": {
      ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    },
    "& figcaption": {
      display: "grid",
      rowGap: tokens.spacingVerticalXXS,
    },
  },
});

export const ImageComponent: FC<ImageComponentProps> = ({
  src,
  alt,
  title,
  description,
}) => {
  const classes = useImageComponentStyles();

  const imageProp: ImageProps["image"] = {
    alternativeText: alt ?? "",
    localFile: src,
  };

  return (
    <figure className={classes.figure}>
      <Image image={imageProp} />
      {(description || title) && (
        <figcaption>
          {title && (
            <Text
              variant="caption"
              color="primary"
              block={Boolean(description)}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text
              variant="description"
              color="secondary"
              block={Boolean(title)}
            >
              {description}
            </Text>
          )}
        </figcaption>
      )}
    </figure>
  );
};
