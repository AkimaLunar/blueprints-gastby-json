import { tokens } from '@fluentui/react-theme';
import { makeStyles, shorthands } from '@griffel/react';

export const useImageComponentStyles = makeStyles({
  figure: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    '& img': {
      ...shorthands.borderRadius(tokens.borderRadiusXLarge)
    },
    '& figcaption': {
      marginTop: tokens.spacingVerticalL
    }
  }
});
