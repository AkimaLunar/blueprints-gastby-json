import type { WrapperProps } from '@microsoft/arbutus.component-preview';
import type { ThemeOption } from '@microsoft/arbutus.theming';
import { ThemeProvider } from '@microsoft/arbutus.theming';
import type { FC } from 'react';
import * as React from 'react';

import { useWrapperStyles } from './example-wrapper.styles';

export const ExampleWrapper: FC<WrapperProps> = ({ children, themeKey }) => {
  const classes = useWrapperStyles();

  return (
    <ThemeProvider currentThemeKey={themeKey as ThemeOption}>
      <div className={classes.root}>{children}</div>
    </ThemeProvider>
  );
};
