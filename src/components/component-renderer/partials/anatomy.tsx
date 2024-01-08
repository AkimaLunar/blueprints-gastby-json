import { Guidance } from '@microsoft/arbutus.guidance';
import type { FC } from 'react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Spinner } from '@fluentui/react-spinner';

import type { AnatomyComponentData } from '../component-renderer.types';
import { mergeClasses } from '@griffel/react';
import { usePreviewStyles } from './anatomy.styles';

type AnatomyComponentProps = AnatomyComponentData;

const formatListItemData = (listItems: AnatomyComponentProps['listItems']) =>
  listItems?.map(({ text, headline }) => ({ heading: headline, description: text }));

const Preview: FC<Pick<AnatomyComponentProps, 'embedUrl'> & { className: string }> = ({
  embedUrl,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const loadedHandler = () => setIsLoading(false);

  const classes = usePreviewStyles();
  const overlayClasses = mergeClasses(
    classes.overlay,
    isLoading && classes.loading,
    isAnimationComplete && classes.removeOverlay,
  );

  // NOTE: This effect will remove the loading overlay after the blur-in animation is complete. See `embed.styles.ts`,
  // tokens.durationSlow is 300ms.
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsAnimationComplete(true), 300);
    }
  }, [isLoading]);

  return (
    <div className={mergeClasses(classes.content, className)}>
      <div className={overlayClasses}>{isLoading && <Spinner />}</div>
      <iframe onLoad={loadedHandler} className={classes.iframe} src={embedUrl} />
    </div>
  );
};

export const AnatomyComponent: FC<AnatomyComponentProps> = ({
  embedUrl,
  description,
  heading,
  listItems,
}) => {
  const legendListItems = formatListItemData(listItems);

  return (
    <Guidance
      imageAs={Preview}
      imageProps={{ embedUrl }}
      heading={heading}
      description={description}
      legendListItems={legendListItems}
    />
  );
};
