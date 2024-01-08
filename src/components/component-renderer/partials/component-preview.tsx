import type { WrapperProps } from '@microsoft/arbutus.component-preview';
import { ComponentPreview } from '@microsoft/arbutus.component-preview';
import type { ThemeOption } from '@microsoft/arbutus.theming';
import { ThemeProvider, useTheme } from '@microsoft/arbutus.theming';
import { useLocation } from '@reach/router';
import type { FC } from 'react';
import * as React from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';

import type { ComponentPreviewComponentData } from '../component-renderer.types';
import { useWrapperStyles } from './component-preview.styles';

// URL route constants
const PREVIEW = 'preview';

// Utilities
const removeExampleExtension = (str: string) => str.replace(/\.example\.(tsx|ts)$/, '');
const replaceExampleWithRaw = (str: string) =>
  str.replace(/\.example\.(tsx|ts)$/, '.raw.ts');

// Example component dynamic import
const importExample = (examplePath: string) =>
  lazy(() =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- import() is supposed to return a promise of type any.
    import(`../../../code-examples/${examplePath}`).catch(
      () => import('./component-preview-not-found'),
    ),
  );

// Raw code string dynamic import
const importExampleRaw = (examplePath: string): Promise<string> => {
  const exampleRawPath = replaceExampleWithRaw(examplePath);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- import() is supposed to return a promise of type any.
  return (
    import(`../../../code-examples/__raw__/${exampleRawPath}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- .default is a property of a module and refers to default export.
      .then((result) => result.default)
      .catch((err) => {
        console.log(err);

        return '';
      })
  );
};

// Theme wrapper
const themes: { value: ThemeOption; label: string }[] = [
  { value: 'light', label: 'Light Theme' },
  { value: 'dark', label: 'Dark Theme' },
];

export const ExampleWrapper: FC<WrapperProps> = ({ children, themeKey }) => {
  const classes = useWrapperStyles();

  return (
    <ThemeProvider currentThemeKey={themeKey as ThemeOption}>
      <div className={classes.root}>{children}</div>
    </ThemeProvider>
  );
};

type ComponentPreviewComponentProps = ComponentPreviewComponentData;

export const ComponentPreviewComponent: FC<ComponentPreviewComponentProps> = ({
  exampleFile,
  withMenu,
}) => {
  // Example component
  const [Example, setExample] = useState<FC | null>(null);
  const [exampleRaw, setExampleRaw] = useState<string>('');

  useEffect(() => {
    async function loadExample() {
      const Module = importExample(exampleFile);

      setExample(Module);

      const rawCode = await importExampleRaw(exampleFile);

      setExampleRaw(rawCode ?? '');
    }

    loadExample().catch((err) => {
      process?.env?.NODE_ENV === 'development' && console.error(err);
    });
  }, [exampleFile]);

  // Theme
  const { themeKey: arbutusThemeKey } = useTheme();
  const isDarkThemeDefault = arbutusThemeKey === 'dark';

  // Open full screen preview in new tab
  const fileName = removeExampleExtension(exampleFile);
  const location = useLocation();
  const baseUrl = location.host;
  const previewUrl = `${baseUrl}/${PREVIEW}/${fileName}`;
  const handleOpenPreview = () => {
    window.open(previewUrl, '_blank');
  };

  const menuProps = {
    code: exampleRaw,
    codeLanguage: 'typescript',
    themes,
    defaultThemeIndex: isDarkThemeDefault ? 1 : 0,
    wrapper: ExampleWrapper,
    onFullScreen: handleOpenPreview,
  };

  return (
    <Suspense fallback={<>Loading component preview.</>}>
      {Example && (
        <ComponentPreview component={Example} {...(withMenu ? menuProps : {})} />
      )}
    </Suspense>
  );
};
