import {
  MainNavigation,
  MainNavigationRenderer,
} from '@microsoft/arbutus.main-navigation';
import { useLocation } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import type { FC } from 'react';
import * as React from 'react';

import { getNavigationContent } from './get-navigation-content';
import type { MainNavigationCollectionsQuery } from './navigation.types';
import { MAIN_NAVIGATION } from './config';

const MainNavigationCollectionsQuery = graphql`
  query MainNavigationCollectionsQuery {
    guidance: allPagesJson(filter: { _path: { glob: "/guidance/*" } }) {
      nodes {
        _path
        title
      }
    }
    components: allPagesJson(filter: { _path: { glob: "/components/*" } }) {
      nodes {
        _path
        title
      }
    }
  }
`;

export const Navigation: FC = () => {
  const { pathname } = useLocation();

  const collectionsData = useStaticQuery<MainNavigationCollectionsQuery>(
    MainNavigationCollectionsQuery,
  );
  const items = getNavigationContent({ collectionsData, config: MAIN_NAVIGATION });

  return (
    <MainNavigation>
      <MainNavigationRenderer items={items} linkAs={Link} activeItemId={pathname} />
    </MainNavigation>
  );
};
