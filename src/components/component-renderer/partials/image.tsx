import { tokens } from '@fluentui/react-theme';
import { makeStyles, shorthands } from '@griffel/react';
import { Text } from '@microsoft/arbutus.text';
import type { FC } from 'react';
import * as React from 'react';

import { Image } from '../../image';
import type { ImageComponentData } from '../component-renderer.types';
import { useImageComponentStyles } from './image.styles';

type ImageComponentProps = ImageComponentData;

export const ImageComponent: FC<ImageComponentProps> = ({ image, description }) => {
  const classes = useImageComponentStyles();

  return (
    <figure className={classes.figure}>
      <Image image={image} />
      {description && (
        <figcaption>
          <Text variant="description" color="secondary">
            {description}
          </Text>
        </figcaption>
      )}
    </figure>
  );
};
