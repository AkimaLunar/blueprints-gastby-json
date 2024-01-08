import { Text } from '@microsoft/arbutus.text';
import * as React from 'react';

import { useComponentNotFoundStyles } from './component-preview.styles';

const NotFoundComponent = () => {
  return (
    <div className={useComponentNotFoundStyles().root}>
      <Text as="p" block variant="caption" color="warning">
        Example not found.
      </Text>
    </div>
  );
};

export default NotFoundComponent;
