import { BookmarkTile } from '@microsoft/arbutus.bookmark-tile';
import type { FC } from 'react';
import * as React from 'react';

import { makeNavigate } from '../../../utilities';

import type { BookmarkTileComponentData } from '../component-renderer.types';
import { useBookmarkTileComponentStyles } from '../bookmark-tile.styles';

type BookmarkTileComponentProps = BookmarkTileComponentData;

export const BookmarkTileComponent: FC<BookmarkTileComponentProps> = ({
  description,
  isExternal,
  title,
  to,
  icon,
}) => {
  const classes = useBookmarkTileComponentStyles();

  const onClick = makeNavigate({ isExternal, to });

  return (
    <BookmarkTile
      title={title}
      description={description}
      onClick={onClick}
      iconAlt={icon?.alternativeText ?? ''}
      iconSrc={icon?.src}
      className={classes.root}
    />
  );
};
