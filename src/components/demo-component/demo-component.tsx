import { mergeClasses } from '@griffel/react';
import { Text } from '@microsoft/arbutus.text';
import { Tile } from '@microsoft/arbutus.tile';
import { useSpaceStyles } from '@microsoft/arbutus.use-space-styles';
import type { FC } from 'react';
import * as React from 'react';

import type { DemoComponentProps } from './demo-component.types';

export const DemoComponent: FC<DemoComponentProps> = ({ title = '', text = '' }) => {
  const space = useSpaceStyles();

  return (
    <Tile variant="card" className={mergeClasses(space.py9, space.px7)}>
      <Text variant="headline" className={space.mb7} block>
        {title}
      </Text>
      <Text variant="description" block>
        {text}
      </Text>
    </Tile>
  );
};
